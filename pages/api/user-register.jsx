import axios from "axios";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  const form = req.body;
  const password = await bcrypt.hash(req.body.password, 10);
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `mutation MyMutation {
        insert_user_one(object: {email: "${form.email.trim()}", cpf: "${form.cpf.trim()}" name: "${form.name.trim()}", password: "${password}", phone_number: "${form.phone_number.trim()}"}) {
          id
        }
      }
      `,
    },
    {
      headers: {
        "x-hasura-admin-secret": "4w92h3qdkea3c8cuou",
      },
    }
  );
  const listId = "f3MH0";
  const saveContact = await axios.post(
    "https://api.getresponse.com/v3/contacts",
    {
      name: form.name.trim(),
      campaign: {
        campaignId: listId,
      },
      email: form.email.trim(),
    },
    {
      headers: {
        "X-Auth-Token": "api-key nxzb7pzd0ipzew62pivdc4dmsyvktdlo",
      },
    }
  );
  if (response.data.errors != undefined) {
    return res.status(500).json(response.data.errors);
  }
  return res.status(200).json(response.data);
}
