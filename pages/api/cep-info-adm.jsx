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

  const localString = `Rua: ${viaCep.data.logradouro}, Bairro: ${viaCep.data.bairro} - ${viaCep.data.uf}`;

  return res.status(200).json(localString);
}
