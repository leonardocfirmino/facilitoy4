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
function toDelete(ids, product_id) {
  let toDelete = "";
  if (ids.length > 0) {
    toDelete = `delete_brinquedo_etaria(where: {brinquedo_id: {_eq: "${product_id}"}, faixa_etaria_id: {_in: [`;
    if (Array.isArray(ids))
      ids.map((value) => {
        toDelete += `"${value}",`;
      });
    if (!Array.isArray(ids)) toDelete += `"${ids}",`;
    toDelete += `]}}) {
      affected_rows
    }`;
  }
  return toDelete;
}
function toAdd(ids, product_id) {
  let toAdd = "";
  if (ids?.length > 0) {
    toAdd = `insert_brinquedo_etaria(objects: [`;
    if (Array.isArray(ids))
      ids.map((value) => {
        toAdd += `{faixa_etaria_id: "${value}", brinquedo_id: "${product_id}"}`;
      });
    if (!Array.isArray(ids))
      toAdd += `{faixa_etaria_id: "${ids}", brinquedo_id: "${product_id}"}`;
    toAdd += `]) {
      affected_rows
    }`;
  }
  return toAdd;
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
    if (req.files != undefined) {
      let imageNames = `insert_product_image(objects: [`;
      console.log(req.body.faixasAdd);

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
        }", product_id: "${req.body.id}"},`;

        const data = await s3Client.send(new PutObjectCommand(params));
      });
      imageNames += `]) {
        affected_rows
      }`;

      let imageToDelete = "";

      if (req.body?.imagesToRemove?.length > 0) {
        imageToDelete = "delete_product_image(where: {id: {_in: [";
        if (Array.isArray(req.body?.imagesToRemove))
          req.body.imagesToRemove.map((value) => {
            imageToDelete += `"${value}",`;
          });
        if (!Array.isArray(req.body?.imagesToRemove))
          imageToDelete += `"${req.body?.imagesToRemove}",`;
        imageToDelete += `]}}) {
          affected_rows
        }`;
      }
      const link = slugify(req.body.name);
      const faixasAdd = toAdd(req.body.faixasAdd, req.body.id);
      const faixasDelete = toDelete(req.body.faixasToDelete, req.body.id);
      const result = await axios.post(
        `${process.env.HASURA_URL}`,
        {
          query: `mutation {
            ${imageNames}
            ${imageToDelete}
            ${faixasAdd}
            ${faixasDelete}
            update_product_by_pk(pk_columns: {id: "${req.body.id}"}, _set : {description: "${req.body.desc}", principal_image_id: "${req.body.principal}",
              details: "${req.body.details}",youtube_link: "${req.body.video}",price_one: "${req.body.price_one}", price_two: "${req.body.price_two}",
              price_three: "${req.body.price_three}", slug: "${link}", name: "${req.body.name}", category_id: "${req.body.category}"}) {
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
        console.log(result.config);
        return res.status(500).json(req.body.name);
      }
      return res.status(200).json(result.data.data);
    }
    /*  if (req.file == undefined) {
      let imageToDelete = "";
      if (req.body?.imagesToRemove?.length > 0) {
        imageToDelete = "delete_product_image(where: {id: {_in: [";
        req.body.imagesToRemove.map((value) => {
          imageToDelete += `"${value}",`;
        });
        imageToDelete += `]}}) {
          affected_rows
        }`;
      }
      const result = await axios.post(
        `${process.env.HASURA_URL}`,
        {
          query: `
      mutation{
        ${imageToDelete}
        update_product_by_pk(pk_columns: {id: "${req.body.id}"}, _set : {description: "${req.body.desc}", 
          details: "${req.body.details}", slug: "${req.body.link}", name: "${req.body.name}", category_id: "${req.body.category}"}) {
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
    } */
  });
}
