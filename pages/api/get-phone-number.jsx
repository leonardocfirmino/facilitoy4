import axios from "axios";
export default async function handler(req, res) {
  const subdomain = req.headers.host.split(".")[0];
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        user(where: {email: {_eq: "${req.body.email}"}}) {
          phone_number
        }
       
      }`,
    },
    {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN,
      },
    }
  );
  if (response.data.errors != undefined) {
    return res.status(500).json(response.data.errors);
  }

  return res.status(200).json(response.data.data.user[0].phone_number);
}
