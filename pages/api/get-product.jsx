import axios from "axios";
export default async function handler(req, res) {
  console.log(req.body);
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        product(where: {slug: {_eq: "${req.body.slug}"}, _and: {is_active: {_eq: true}}}) {
          details
          description
          created_at
          id
          youtube_link
          name
          price_one
          price_two
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
