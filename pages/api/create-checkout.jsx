import axios from "axios";
import { v4 as uuidv4 } from "uuid";
var mercadopago = require("mercadopago");

export default async function handler(req, res) {
  let products_id = "[";
  req.body.products.map((product) => (products_id += `"${product.id}",`));
  products_id += "]";
  const franquia = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        franquia(where: {subdomain: {_eq: "${req.body.subdomain}"}}) {
          mpago_key
          id
          frete_gratis_min
        }
        product(where: {id: {_in: ${products_id}}}) {
          is_unavailable
        }
      }`,
    },
    {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN,
      },
    }
  );
  if (
    franquia.data.data.product.some((product) => product.is_unavailable == true)
  ) {
    return res.json({ indisponivel: true });
  }
  const prodKey = franquia.data.data.franquia[0].mpago_key;
  const testeKey =
    "TEST-3584331251484724-102505-8141bc5a77ac68d1f65a123eb0b59866-476385198";
  mercadopago.configure({
    access_token: prodKey,
  });
  const items = req.body.products.map((value) => {
    return {
      id: value.product.id,
      title: value.product.name,
      quantity: value.quantity,
      currency_id: "BRL",

      unit_price: value.time.price,
    };
  });
  const idPay = uuidv4();
  var preference = {
    items: [
      ...items,
      {
        id: req.body.cupon.id,
        title: req.body.cupon.code,
        quantity: 1,
        currency_id: "BRL",

        unit_price: Math.abs(req.body.cupon.discount) * -1,
      },
    ],

    notification_url:
      process.env.NEXT_PUBLIC_PREFIX +
      (req.body.subdomain ? req.body.subdomain + "." : null) +
      process.env.NEXT_PUBLIC_SITE_URL +
      "/api/mpago-webhook",
    metadata: { id: idPay },

    shipments: {
      cost: req.body.cep.take_in_local ? 0 : req.body.cep.value,
      mode: "not_specified",
      free_shipping:
        franquia.data.data.franquia[0].frete_gratis_min == 0
          ? false
          : franquia.data.data.franquia[0].frete_gratis_min <= req.body.total,
      receiver_address: {
        zip_code: req.body.cep.cep == null ? "" : req.body.cep.cep,
      },
    },
  };
  const response = await mercadopago.preferences.create(preference);
  res.status(200).json({
    mpago: response,
    uuid: idPay,
    franquia_id: franquia.data.data.franquia[0].id,
  });
}
