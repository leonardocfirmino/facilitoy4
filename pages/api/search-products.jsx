import axios from "axios";
export default async function handler(req, res) {
  console.log(req.body);
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        product(where: {name: {_ilike: "%${req.body.name}%"}, _and: {user: {franquia: {subdomain: {_eq: "${req.body.subdomain}"}}}}}) {
          name
          product_image {
            src
          }
          price
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
