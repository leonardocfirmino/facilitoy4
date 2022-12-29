import axios from "axios";
export default async function handler(req, res) {
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        banner {
          image_url
          link
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
  const list = response.data.data.banner.sort(() => Math.random() - 0.5);

  return res.status(200).json(list[0]);
}
