import axios from "axios";
export default async function handler(req, res) {
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: req.body.query,
    },
    {
      headers: {
        Authorization: req.headers.authorization,
      },
    }
  );
  if (response.data.errors != undefined) {
    return res.status(500).json(response.data.errors);
  }
  return res.status(200).json(response.data);
}
