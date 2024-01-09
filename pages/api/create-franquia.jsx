import axios from "axios"
import path from "path"
import bcrypt from "bcrypt"
import { readFileSync } from "fs"
async function productDuplicate(user_id) {
  const jsonDirectory = path.join(process.cwd(), "public")
  const queryCategory = `[
    {
      image_src: "XrWbKe5SVtLjXLZwR8.png",
      name: "Mamaroo",
      user_id: "${user_id}",
    },
    {
      image_src: "CVWKHzslFynyqVzwE1.png",
      name: "Cadeira de Atividades",
      user_id: "${user_id}",
    },
    {
      image_src: "zazjBg7tYv5ZEZ96rH.png",
      name: "Mini Carro Elétrico",
       user_id: "${user_id}",
    },
    {
      image_src: "xweNKwurAMxsAnbRg5.png",
      name: "Jumperoo",
       user_id: "${user_id}",
    },
    {
      image_src: "9iUfVP7GxPxq5tQPZj.png",
      name: "Tapete de Atividades",
      user_id: "${user_id}",
    },
    {
      image_src: "1laLIWXTGl6Hm2uQSW.png",
      name: "Berços",
      user_id: "${user_id}",
    },
    {
      image_src: "yXOkRQWIHinkzUk9ux.png",
      name: "Cadeirinha de Carro",
      user_id: "${user_id}",
    },
    {
      image_src: "2EmhpeSkvH3xqYUDLF.png",
      name: "Carrinho de Passeio",
      user_id: "${user_id}",
    },
    {
      image_src: "0QQDmXCfFxAtOG7W6v.png",
      name: "Cercadinhos",
      user_id: "${user_id}",
    },
    {
      image_src: "ih93b5dv9EFVe925u0.png",
      name: "Playground ",
      user_id: "${user_id}",
    },
    {
      image_src: "OtYDlkdUZrnYXks2ku.facilitoy",
      name: "Geral",
      user_id: "${user_id}",
    },
  ]`
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
  )

  const jsonDir = readFileSync(jsonDirectory + `/brinquedos.json`, "utf-8")
  const brinquedos = JSON.parse(jsonDir)
  console.log(
    brinquedos.product.find(value => value.slug == "cadeira-de-balanco-mamaroo")
  )
  categoryResponse.data.data.insert_category.returning.map(value => {
    let oldToys = brinquedos.product.filter(
      brinquedo => brinquedo.category.name == value.name
    )

    let newToys = []
    if (oldToys != undefined) {
      newToys = oldToys.map(toy => {
        return (toy = { ...toy, category: { id: value.id, name: value.name } })
      })
      brinquedos.product = brinquedos.product.filter(
        newT => newT.category.name != value.name
      )

      brinquedos.product.push(newToys)
      brinquedos.product = brinquedos.product.flat(1)
    }
  })
  console.log(
    brinquedos.product.find(value => value.slug == "cadeira-de-balanco-mamaroo")
  )
  let queryBrinquedos = "["
  brinquedos.product.map(value => {
    queryBrinquedos += `{
      product_images: { data: { src: "${value.product_images[0].src}", user_id: "${user_id}" } },
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
      user_id: "${user_id}",
    },`
  })
  queryBrinquedos += "]"

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
  )

  if (response.data.errors != undefined) {
    return response.data.errors
  }

  return response.data
}
async function createUser(email, name, phoneNumber, password) {
  const passwordHashed = await bcrypt.hash(password, 10)
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `mutation MyMutation {
        insert_user_one(object: {email: "${email.trim()}", name: "${name.trim()}", password: "${passwordHashed}", phone_number: "${phoneNumber.trim()}", role: "franquiado", email_confirmed: true}) {
          id
        }
      }
      `,
    },
    {
      headers: {
        "x-hasura-admin-secret": "4w92h3qdkea3c8cuou",
      },
    }
  )
  return response.data.data.insert_user_one.id
}

async function createFranquia(
  user_id,
  full_address,
  cep,
  mpago_code,
  name,
  phone_number,
  estado,
  subdomain
) {
  const response = await axios.post(
    process.env.HASURA_URL,
    {
      query: `mutation MyMutation {
        insert_franquia_one(object: {mpago_key: "${mpago_code}", user_id: "${user_id}", subdomain: "${subdomain}", name: "${name}", estado: "${estado}", endereco_completo: "${full_address}", contato: "${phone_number}", cep: ${cep}}) {
          id
        }
      }
      `,
    },
    {
      headers: {
        "x-hasura-admin-secret": "4w92h3qdkea3c8cuou",
      },
    }
  )
  if (response.data.errors) {
    console.log(response.data.errors)
  }
  return response.data.data.insert_franquia_one.id
}
export default async function handler(req, res) {
  const form = req.body
  const user_id = await createUser(
    form.email,
    form.name,
    form.phone_number,
    form.password
  )
  const franquia_id = await createFranquia(
    user_id,
    form.full_address,
    form.cep,
    form.mpago_code,
    form.name,
    form.phone_number,
    form.estado,
    form.subdomain
  )
  console.log(franquia_id)
  const products = await productDuplicate(user_id)
  return res.status(200).json("oi")
}
