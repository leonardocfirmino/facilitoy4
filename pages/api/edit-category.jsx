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

  upload.single("image")(req, {}, async (err) => {
    if (req.file != undefined) {
      const imageName = randomName();
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${imageName}.${req.file.originalname.split(".")[1]}`,
        Body: req.file.buffer,
        ACL: "public-read",
        ContentType: req.file.mimetype,
      };

      const data = await s3Client.send(new PutObjectCommand(params));

      const toUpload = `${imageName}.${req.file.originalname.split(".")[1]}`;
      if (req.method == "POST") {
        const result = await axios.post(
          `${process.env.HASURA_URL}`,
          {
            query: `mutation {
              update_category_by_pk(pk_columns: {id: "${req.body.id}"}, _set: {image_src: "${toUpload}", name: "${req.body.name}"}) {
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
        update_category_by_pk(pk_columns: {id: "${req.body.id}"}, _set: { name: "${req.body.name}"}) {
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
