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
        product(limit: 20,order_by: {carrinho_produtos_aggregate: {count:desc}}, where: {is_active: {_eq: true}, _and: {user: {franquia: {subdomain: {_eq: "${req.body.subdomain}"}}}}}) {
          product_images {
            src
          }
          slug
          price_one
          name
          is_unavailable
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
