import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import randomName from "../../helpers/randomName";
import multer from "multer";

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
      if (data.$metadata.httpStatusCode == 200) {
        return res.status(200).json({
          image_url: `${imageName}.${req.file.originalname.split(".")[1]}`,
        });
      }
    }
  });
}
