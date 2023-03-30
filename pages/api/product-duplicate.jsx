import axios from "axios";
import path from "path";

import { readFileSync } from "fs";
export default async function handler(req, res) {
  const jsonDirectory = path.join(process.cwd(), "public");
  const queryCategory = `[
    {
      image_src: "XrWbKe5SVtLjXLZwR8.png",
      name: "Mamaroo",
      user_id: "${req.body.user_id}",
    },
    {
      image_src: "CVWKHzslFynyqVzwE1.png",
      name: "Cadeira de Atividades",
      user_id: "${req.body.user_id}",
    },
    {
      image_src: "zazjBg7tYv5ZEZ96rH.png",
      name: "Mini Carro Elétrico",
       user_id: "${req.body.user_id}",
    },
    {
      image_src: "xweNKwurAMxsAnbRg5.png",
      name: "Jumperoo",
       user_id: "${req.body.user_id}",
    },
    {
      image_src: "9iUfVP7GxPxq5tQPZj.png",
      name: "Tapete de Atividades",
      user_id: "${req.body.user_id}",
    },
    {
      image_src: "1laLIWXTGl6Hm2uQSW.png",
      name: "Berços",
      user_id: "${req.body.user_id}",
    },
    {
      image_src: "yXOkRQWIHinkzUk9ux.png",
      name: "Cadeirinha de Carro",
      user_id: "${req.body.user_id}",
    },
    {
      image_src: "2EmhpeSkvH3xqYUDLF.png",
      name: "Carrinho de Passeio",
      user_id: "${req.body.user_id}",
    },
    {
      image_src: "0QQDmXCfFxAtOG7W6v.png",
      name: "Cercadinhos",
      user_id: "${req.body.user_id}",
    },
    {
      image_src: "ih93b5dv9EFVe925u0.png",
      name: "Playground ",
      user_id: "${req.body.user_id}",
    },
    {
      image_src: "OtYDlkdUZrnYXks2ku.facilitoy",
      name: "Geral",
      user_id: "${req.body.user_id}",
    },
  ]`;
  const categoryResponse = await axios.post(
    process.env.HASURA_URL,
    {
      query: `mutation oi {
        insert_category(objects: ${queryCategory}) {
          returning {
            name
            id
          }
        }
      }
      `,
    },
    {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN,
      },
    }
  );

  const jsonDir = readFileSync(jsonDirectory + `/brinquedos.json`, "utf-8");
  const brinquedos = JSON.parse(jsonDir);
  console.log(
    brinquedos.product.find(
      (value) => value.slug == "cadeira-de-balanco-mamaroo"
    )
  );
  categoryResponse.data.data.insert_category.returning.map((value) => {
    let oldToys = brinquedos.product.filter(
      (brinquedo) => brinquedo.category.name == value.name
    );

    let newToys = [];
    if (oldToys != undefined) {
      newToys = oldToys.map((toy) => {
        return (toy = { ...toy, category: { id: value.id, name: value.name } });
      });
      brinquedos.product = brinquedos.product.filter(
        (newT) => newT.category.name != value.name
      );

      brinquedos.product.push(newToys);
      brinquedos.product = brinquedos.product.flat(1);
    }
  });
  console.log(
    brinquedos.product.find(
      (value) => value.slug == "cadeira-de-balanco-mamaroo"
    )
  );
  let queryBrinquedos = "[";
  brinquedos.product.map((value) => {
    queryBrinquedos += `{
      product_images: { data: { src: "${value.product_images[0].src}", user_id: "${req.body.user_id}" } },
      description: "${value.description}",
      details: "${value.details}",
      is_active: true,
      category_id: "${value.category.id}",
      price_three: "${value.price_three}",
      price_one: "${value.price_one}",
      price_two: "${value.price_two}",
      name: "${value.name}",
      slug: "${value.slug}",
      youtube_link: "${value.youtube_link}",
      user_id: "${req.body.user_id}",
    },`;
  });
  queryBrinquedos += "]";

  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `mutation oi {
        insert_product(objects: ${queryBrinquedos}) {
          affected_rows
        }
      }
      `,
    },
    {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN,
      },
    }
  );
  console.log(response);
  if (response.data.errors != undefined) {
    return res.status(500).json(response.data.errors);
  }

  return res.status(200).json("oi");
}
