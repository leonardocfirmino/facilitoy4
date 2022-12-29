var mercadopago = require("mercadopago");
mercadopago.configure({
  access_token:
    "TEST-2534047183811832-122909-0e80680111a630ed1415d0028609d8d8-533323668",
});

export default async function handler(req, res) {
  var preference = {
    items: [
      {
        title: req.body.title,
        quantity: 1,
        currency_id: "BRL",
        unit_price: req.body.price,
      },
    ],
  };
  const response = await mercadopago.preferences.create(preference);
  res.status(200).json(response);
}
