import axios from "axios";
export default async function handler(req, res) {
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `{
       
        faixa_etaria {
          name
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
  console.log(response.config);
  if (response.data.errors != undefined) {
    return res.status(500).json(response.data.errors);
  }

  return res.status(200).json(response.data.data);
}
