import axios from "axios"
export default async function handler(req, res) {
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        product {
          id
          slug
        }
      }`,
    },
    {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN,
      },
    }
  )
  await response.data.data.product.map(async p => {
    const randomChars = Math.random().toString(36).substring(2, 12)
    const finalSlug = `${p.slug}-${randomChars}`
    await axios.post(
      process.env.HASURA_URL,
      {
        query: `mutation{
          update_product_by_pk(pk_columns: {id: "${p.id}"}, _set: {slug: "${finalSlug}"}) {
            id
          }
      }`,
      },
      {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN,
        },
      }
    )
  })
  if (response.data.errors != undefined) {
    return res.status(500).json(response.data.errors)
  }

  return res.status(200).json(response.data.data)
}
