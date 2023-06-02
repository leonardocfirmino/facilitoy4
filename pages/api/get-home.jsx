import axios from "axios";
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=86400");
  const subdomain = req.headers.host.split(".")[0];
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        faixa_etaria{
          name
          id
        }
        franquia(where: {subdomain: {_eq: "${subdomain}"}}){
          contato
          endereco_completo
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

  return res.status(200).json(response.data.data);
}
