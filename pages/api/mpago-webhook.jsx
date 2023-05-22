import axios from "axios";
var mercadopago = require("mercadopago");

export default async function handler(req, res) {
  if (req.body.type == "payment") {
    const subdomain = req.headers.host.split(".")[0];

    const franquia = await axios.post(
      process.env.HASURA_URL,
      {
        query: `{
        franquia(where: {subdomain: {_eq: "${subdomain}"}}) {
          mpago_key
        }
       
      }`,
      },
      {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN,
        },
      }
    );
    console.log(franquia.data);
    mercadopago.configure({
      access_token: franquia.data.data.franquia[0].mpago_key,
    });

    const orderStatus = await mercadopago.payment.get(req.body.data.id);

    console.log(orderStatus);
    const response = await axios.post(
      process.env.HASURA_URL,
      {
        query: `mutation {
        update_user_carrinho(where: {mercado_order_id: {_eq: "${
          orderStatus.body.metadata.id
        }"}}, _set: {payment_method: "${
          orderStatus.body.payment_type_id
        }",status: "${orderStatus.body.status}"}) {
          affected_rows
        }
        update_product(where: {carrinho_produtos: {user_carrinho: {mercado_order_id: {_eq: "${
          orderStatus.body.metadata.id
        }"}}}}, _set: {is_unavailable: ${
          orderStatus.body.status == "approved" ? true : false
        }}) {
          returning {
            id
            user {
              email
            }
            carrinho_produtos {
              preco
              tempo
              product {
                name
                product_images {
                  src
                }
              }
            }
            franquium {
              subdomain
              user {
                email
              }
            }
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
    /* if (orderStatus.body.status == "approved") {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/email-send",
        {
          pedido: response.data.data.update_user_carrinho.returning[0],
        }
      );
    } */
    res.status(200).json(response.data);
  }
  res.status(200).json("oi");
}
