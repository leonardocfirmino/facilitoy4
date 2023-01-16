import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import randomName from "../../helpers/randomName";
import multer from "multer";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false,
  },
};
var storage = multer.memoryStorage();

var upload = multer({ storage: storage });

export default async function handler(req, res) {
  const s3Client = new S3Client({
    endpoint: "https://sfo3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET,
    },
  });

  upload.array("images")(req, {}, async (err) => {
    if (req.files != undefined) {
      let imageNames = "[";
      req.files.map(async (fileMap) => {
        const imageName = randomName();
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: `${imageName}.${fileMap.originalname.split(".")[1]}`,
          Body: fileMap.buffer,
          ACL: "public-read",
          ContentType: fileMap.mimetype,
        };

        imageNames += `{src: "${imageName}.${
          fileMap.originalname.split(".")[1]
        }"},`;

        const data = await s3Client.send(new PutObjectCommand(params));
      });
      imageNames += "]";
      console.log(imageNames);
      if (req.method == "POST") {
        const result = await axios.post(
          `${process.env.HASURA_URL}`,
          {
            query: `mutation {
              insert_product_one(object: {product_images: {data: ${imageNames}}, description: "${req.body.desc}", 
              details: "${req.body.details}", slug: "${req.body.link}",name: "${req.body.name}", category_id: "${req.body.category}"}) {
                id
              }
          }`,
          },
          {
            headers: {
              authorization: req.headers.authorization,
            },
          }
        );
        console.log(result.data);
        if (result.data.errors != undefined) {
          return res.status(500).json(req.body.name);
        }
        return res.status(200).json(result.data.data);
      }
    }
    if (req.file == undefined) {
      const result = await axios.post(
        `${process.env.HASURA_URL}`,
        {
          query: `
      mutation{
        insert_product_one(object: { description: "${req.body.desc}", 
              details: "${req.body.details}", slug: "${req.body.link}",name: "${req.body.name}", category_id: "${req.body.category}"}) {
                id
              }
      }`,
        },
        {
          headers: {
            authorization: req.headers.authorization,
          },
        }
      );
      if (result.data.errors != undefined) {
        return res.status(500).json(result.data.errors);
      }
      return res.status(200).json(req.body.name);
    }
  });
}
