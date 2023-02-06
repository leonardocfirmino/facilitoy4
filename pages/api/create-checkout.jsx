var mercadopago = require("mercadopago");
mercadopago.configure({
  access_token:
    "TEST-2534047183811832-122909-0e80680111a630ed1415d0028609d8d8-533323668",
});

export default async function handler(req, res) {
  const items = req.body.products.map((value) => {
    return {
      title: value.product.name,
      quantity: value.quantity,
      currency_id: "BRL",

      unit_price: value.time.price,
    };
  });
  console.log(items);
  var preference = {
    items: items,
    shipments: {
      cost: req.body.cep.value,
      mode: "not_specified",
      receiver_address: { zip_code: req.body.cep.cep },
    },
  };
  const response = await mercadopago.preferences.create(preference);
  res.status(200).json(response);
}
