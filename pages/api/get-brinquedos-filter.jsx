import axios from "axios";
export default async function handler(req, res) {
  const ageFilter =
    req.body.age == ""
      ? ""
      : `brinquedo_etaria: {faixa_etaria_id: {_eq:"${req.body.age}"} }`;
  const nameFilter = req.body.name == undefined ? "" : req.body.name;
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        product(where: {name: {_ilike: "%${nameFilter}%"}, _and: {user: {franquia: {subdomain: {_ilike: "%${req.body.subdomain}%"}}}, _and: {${ageFilter} }}}, order_by: {created_at: desc})  {
          category {
            name
          }
          is_active
          name
          product_images {
            src
          }
          product_image {
            src
          }
          price
          id
          slug
        }
        faixa_etaria {
          name
          id
        }
        product_aggregate {
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
  console.log(response.config);
  return res.status(200).json(response.data.data);
}
