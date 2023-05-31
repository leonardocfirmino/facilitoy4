import axios from "axios";
export default async function handler(req, res) {
  const subdomain = req.headers.host.split(".")[0];
  res.setHeader("Cache-Control", "s-maxage=86400");
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        category(where: {user: {franquia: {subdomain: {_eq: "${subdomain}"}}}}) {
          name
          image_src
          id
        }
        product(order_by: {carrinho_produtos_aggregate: {count: desc}}, where: {user: {franquia: {subdomain: {_eq: "${subdomain}"}}}, _and: {is_active: {_eq: true}, _and: {is_unavailable: {_eq: false}}}}) {
          name
          price_one
          is_unavailable
          product_image {
            src
          }
          product_images {
            src
          }
          slug
        }
        home_recomendados(where: {user: {franquia: {subdomain: {_eq: "${subdomain}"}}},_and: {product: {is_unavailable: {_eq: false}}}}, order_by: {position:asc}) {
          product {
            product_image {
              src
            }
            is_unavailable
            product_images {
              src
            }
            slug
            price_one
            name
          }
        }
        home_vendidos(where: {user: {franquia: {subdomain: {_eq: "${subdomain}"}}},_and: {product: {is_unavailable: {_eq: false}}}}, order_by: {position:asc}) {
          product {
            product_image {
              src
            }
            is_unavailable
            product_images {
              src
            }
            slug
            price_one
            name
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
