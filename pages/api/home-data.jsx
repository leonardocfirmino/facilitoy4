import axios from "axios";
export default async function handler(req, res) {
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        category(where: {user: {franquia: {subdomain: {_eq: "${req.body.subdomain}"}}}}) {
          name
          image_src
          id
        }
        product(order_by: {carrinho_produtos_aggregate: {count: desc}}, where: {user: {franquia: {subdomain: {_eq: "${req.body.subdomain}"}}}, _and: {is_active: {_eq: true}}}) {
          name
          price_one
          product_image {
            src
          }
          slug
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
