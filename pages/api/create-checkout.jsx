import axios from "axios";
var mercadopago = require("mercadopago");

export default async function handler(req, res) {
  const franquia = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        franquia(where: {subdomain: {_eq: "${req.body.subdomain}"}}) {
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
  const items = req.body.products.map((value) => {
    return {
      title: value.product.name,
      quantity: value.quantity,
      currency_id: "BRL",

      unit_price: value.time.price,
    };
  });

  var preference = {
    items: items,
    notification_url:
      process.env.NEXT_PUBLIC_PREFIX +
      process.env.NEXT_PUBLIC_SITE_URL +
      "/api/mpago-webhook",
    shipments: {
      cost: req.body.cep.take_in_local ? 0 : req.body.cep.value,
      mode: "not_specified",
      receiver_address: { zip_code: req.body.cep.cep },
    },
  };
  const response = await mercadopago.preferences.create(preference);
  res.status(200).json(response);
}
