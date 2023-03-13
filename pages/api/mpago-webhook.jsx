import axios from "axios";
var mercadopago = require("mercadopago");

export default async function handler(req, res) {
  console.log(req.body);
  const franquia = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        user_carrinho(where: {mercado_order_id: {_eq: "${req.body.data.id}"}}) {
         
          carrinho_produtos {
            product {
              user {
                franquia {
                  mpago_key
                }
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
  mercadopago.configure({
    access_token:
      franquia.data.data.user_carrinho[0].carrinho_produtos[0].product.user
        .franquia[0].mpago_key,
  });
  const orderStatus = await mercadopago.payment.get(req.body.data.id);

  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `mutation {
        update_user_carrinho(where: {mercado_order_id: {_eq: "${req.body.data.id}"}}, _set: {status: "${orderStatus.body.status}"}) {
          affected_rows
        }
       
      }`,
    },
    {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN,
      },
    }
  );

  res.status(200).json(response);
}
