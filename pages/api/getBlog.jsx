import axios from "axios";
export default async function handler(req, res) {
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        post(where: {user: {blog_slug: {_eq: "${req.body.query}"}}}, offset:${req.body.offset}, limit: 5, order_by: {created_at: desc}) {
          slug
          title
          description
          created_at
        }
        user(where: {blog_slug: {_eq: "${req.body.query}"}}) {
          blog_name
          blog_slug
        }
        post_aggregate(where: {user: {blog_slug: {_eq: "${req.body.query}"}}}) {
          aggregate {
            count
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
