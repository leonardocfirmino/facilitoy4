import axios from "axios";

export default async function handler(req, res) {
  const cupon = req.body.cupon;
  const subdomain = req.headers.host.split(".")[0];
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        cupons(where: {code: {_eq: "${cupon}"}, _and: {is_active: {_eq: true}}}) {
          id
          is_percentage
          discount
          code
          description
        }
        cupon_user(where: {cupon: {code: {_eq: "${cupon}"}}}) {
          id
        }
      }`,
    },
    {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN,
      },
    }
  );

  const responseCuponUser = response.data.data.cupon_user[0];
  const responseCupon = response.data.data.cupons[0];

  if (responseCuponUser != undefined) {
    return res.status(200).json({ available: false, data: null });
  }
  if (responseCupon == undefined) {
    return res.status(200).json({ available: false, data: null });
  }
  return res.status(200).json({ available: true, data: responseCupon });
}
