import axios from "axios";

export default async function handler(req, res) {
  const viaCep = await axios.get(
    `https://viacep.com.br/ws/${req.body.cep}/json/`
  );
  const cepBanco = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
        cep_user(where: {cidade: {_ilike: "%${viaCep.data.localidade}%"}, _and: {bairro: {_ilike: "%${viaCep.data.bairro}%"}}}) {
          cidade
          bairro
          valor
          tempo
        }
       
      }`,
    },
    {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN,
      },
    }
  );

  if (cepBanco.data.data.cep_user.length == 0)
    return res.status(200).json({ isNull: true });

  return res
    .status(200)
    .json({ cep: cepBanco.data.data.cep_user[0], isNull: false });
}
