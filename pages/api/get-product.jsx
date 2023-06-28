import axios from "axios";
export default async function handler(req, res) {
  const subdomain = req.headers.host.split(".")[0];
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        product(where: {slug: {_eq: "${req.body.slug}"}, _and: {user: {franquia: {subdomain: {_eq: "${subdomain}"}}}, _and: {is_active: {_eq: true}}}}, limit: 1) {
          details
          description
          created_at
          id
          youtube_link
          name
          price_one
          slug
          is_unavailable
          price_two
          category {
            name
          }
          price_three
          product_images {
            src
          }
      
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
