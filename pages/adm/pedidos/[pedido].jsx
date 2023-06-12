import LayoutAdm from "../../../components/LayoutAdm";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";
import Select from "react-select";
import Moment from "react-moment";
import useSWR from "swr";
import request from "graphql-request";
import { useRouter } from "next/router";
export default function CreateBanner({ sessions }) {
  const user = JSON.parse(sessions);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fetcher = async (query) =>
    request(
      process.env.NEXT_PUBLIC_PREFIX +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/userQuery",
      query,
      {},
      { authorization: `Bearer ${user.token}` }
    );
  const { data, mutate } = useSWR(
    `{
      user_carrinho(where: {id: {_eq: ${router.query.pedido}}}) {
        id
        frete_value
        status
        endereco
        numero
        complemento
        total
        cep
        payment_method
        created_at
        carrinho_produtos {
          quantity
          tempo
          product {
            name
            product_images {
              src
            }
            product_image {
              src
            }
          }
        }
        user {
          phone_number
          name
          email
        }
      }
    }`,
    fetcher
  );
  const [cep, setCep] = useState();
  async function endereco(cep) {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/cep-info-adm",
      {
        cep: cep.replace("-", ""),
      }
    );
    setCep(response.data);
  }

  useEffect(() => {
    if (data) endereco(data.user_carrinho[0].cep);
  }, [data]);
  return (
    <LayoutAdm session={user}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full flex justify-center overflow-auto  items-center">
        <div className="flex flex-col w-4/5 ">
          <div className="w-full text-3xl font-bold mt-6 flex justify-center pb-4">
            {data && <h1>Pedido #{data.user_carrinho[0].id}</h1>}
          </div>
          {data && (
            <form className="flex justify-around gap-4 ">
              <div className="w-1/2">
                <div className="w-full  items-start">
                  <h1 className="text-xl font-semibold px-1 pb-2">
                    Brinquedos
                  </h1>
                </div>
                <table className="border  border-gray-300 min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Nome
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Imagem
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Quantidade
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Tempo
                      </th>
                    </tr>
                  </thead>
                  {data && (
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data.user_carrinho[0].carrinho_produtos.map(
                        (value, index) => {
                          if (value.product != null)
                            return (
                              <tr key={index}>
                                <td className=" w-40 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  <p className="w-40">{value.product.name}</p>
                                </td>

                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <img
                                    className="w-32  h-40"
                                    src={
                                      value.product.product_images[0] !=
                                      undefined
                                        ? "https://space-facilitoy.sfo3.digitaloceanspaces.com/" +
                                          value.product.product_images[0]?.src
                                        : "/logo.webp"
                                    }
                                    alt=""
                                  />
                                </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {value.quantity}
                                </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {value.tempo}
                                </td>
                              </tr>
                            );
                        }
                      )}
                    </tbody>
                  )}
                </table>
                <div className="w-full mt-4 items-start">
                  <h1 className="text-2xl font-bold px-1 pb-6">
                    Detalhes do pedido
                  </h1>
                </div>
                <div className="w-full  items-start">
                  <div className="w-full flex flex-col px-1 justify-center pb-4">
                    <h1 className="text-xl font-semibold  pb-2">Endereço</h1>
                    <p>{cep}</p>
                    <p>
                      Data:{" "}
                      <Moment format="DD/MM/YYYY hh:mm">
                        {data.user_carrinho[0].created_at}
                      </Moment>
                    </p>
                  </div>
                  {data.user_carrinho[0].endereco != null && (
                    <div className="w-full flex flex-col px-1 justify-center pb-4">
                      <h1 className="text-xl font-semibold  pb-2">
                        Endereço informado
                      </h1>
                      <p>Rua: {data.user_carrinho[0].endereco}</p>
                      <p>Número: {data.user_carrinho[0].numero}</p>
                      <p>Complemento: {data.user_carrinho[0].complemento}</p>
                    </div>
                  )}
                  <div className="w-full flex flex-col px-1 justify-center pb-4">
                    <h1 className="text-xl font-semibold  pb-2">
                      Método de pagamento
                    </h1>
                    <p>
                      {data.user_carrinho[0].payment_method ?? "Não definido"}
                    </p>
                  </div>
                  <div className="w-full flex flex-col px-1 justify-center pb-4">
                    <h1 className="text-xl font-semibold  pb-2">
                      Total do pedido
                    </h1>
                    <p>R$: {data.user_carrinho[0].total}</p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 ">
                <div className="w-full  items-start">
                  <h1 className="text-2xl font-bold px-1 pb-1">Cliente</h1>
                </div>
                <div className="w-full border divide-y px-2 border-gray-300 items-start">
                  <div className="w-full flex flex-col px-1 justify-center py-3">
                    <h1 className="text-xl font-semibold  pb-2">Nome</h1>
                    <p>{data.user_carrinho[0].user.name}</p>
                  </div>
                  <div className="w-full flex flex-col px-1 justify-center py-3">
                    <h1 className="text-xl font-semibold  pb-2">Telefone</h1>
                    <p>{data.user_carrinho[0].user.phone_number}</p>
                  </div>
                  <div className="w-full flex flex-col px-1 justify-center py-3">
                    <h1 className="text-xl font-semibold  pb-2">Email</h1>
                    <p>{data.user_carrinho[0].user.email}</p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </LayoutAdm>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
  if (session?.user?.role == "user") {
    return {
      redirect: {
        destination: `/user/`,
        permanent: false,
      },
    };
  }
  const final = JSON.stringify(session, null, 2);
  return {
    props: {
      sessions: final,
    },
  };
}
