import axios from "axios";
var mercadopago = require("mercadopago");

export default async function handler(req, res) {
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
  mercadopago.configure({
    access_token: franquia.data.data.franquia[0].mpago_key,
  });
  const orderStatus = await mercadopago.payment.get(req.body.data.id);
  console.log(orderStatus);
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `mutation {
        update_user_carrinho(where: {mercado_order_id: {_eq: "${orderStatus.body.metadata.id}"}}, _set: {status: "${orderStatus.body.status}"}) {
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
