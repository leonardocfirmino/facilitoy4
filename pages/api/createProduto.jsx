import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import randomName from "../../helpers/randomName";
import multer from "multer";
import axios from "axios";
import _ from "lodash";
export const config = {
  api: {
    bodyParser: false,
  },
};
var storage = multer.memoryStorage();

var upload = multer({ storage: storage });
function slugify(text) {
  return _.deburr(text.toString().toLowerCase())
    .replace(/\s+/g, "-") // Substitui espaços em branco por hífen
    .replace(/[^\w\-]+/g, "") // Remove caracteres especiais
    .replace(/\-\-+/g, "-") // Substitui dois ou mais hífens consecutivos por um único hífen
    .replace(/^-+/, "") // Remove hífens do início do texto
    .replace(/-+$/, ""); // Remove hífens do final do texto
}
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
    const link = slugify(req.body.name);
    if (req.files != undefined) {
      let imageNames = "[";
      const promises = req.files.map(async (fileMap) => {
        const imageName = randomName();
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: `${imageName}.${fileMap.originalname.split(".")[1]}`,
          Body: fileMap.buffer,
          ACL: "public-read",
          ContentType: fileMap.mimetype,
        };

        const data = await s3Client.send(new PutObjectCommand(params));
        if (data.$metadata.httpStatusCode == 200)
          return `{src: "${imageName}.${fileMap.originalname.split(".")[1]}"},`;
      });
      const arrayImages = await Promise.all(promises);
      arrayImages.map((value) => {
        imageNames += value;
      });
      imageNames += "]";
      console.log(imageNames);
      if (req.method == "POST") {
        const result = await axios.post(
          `${process.env.HASURA_URL}`,
          {
            query: `mutation {
              insert_product_one(object: {product_images: {data: ${imageNames}}, description: "${req.body.desc}", 
              details: "${req.body.details}",youtube_link: "${req.body.video}", slug: "${link}",name: "${req.body.name}", price_one: "${req.body.price_one}", price_two: "${req.body.price_two}",
              price_three: "${req.body.price_three}", category_id: "${req.body.category}"}) {
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
              details: "${req.body.details}",youtube_link: "${req.body.video}", slug: "${link}",name: "${req.body.name}",price_one: "${req.body.price_one}", price_two: "${req.body.price_two}",
              price_three: "${req.body.price_three}", category_id: "${req.body.category}"}) {
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
