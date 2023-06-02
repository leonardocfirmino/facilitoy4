import axios from "axios";
export default async function handler(req, res) {
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        franquia(where: {subdomain: {_eq: "${req.body.subdomain}"}}) {
          name
          cep
          endereco_completo
          take_in_local
          frete_gratis_min
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
