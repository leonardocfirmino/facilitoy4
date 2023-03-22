import LayoutAdm from "../../../../components/LayoutAdm";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";
import Select from "react-select";

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
      
      product {
        name
        id
        product_images {
          src
        }
      }
      home_vendidos(where: {id: {_eq: "${router.query.edit}"}}) {
        product{
          name
          id
          product_images {
            src
          }
        }
        position
      } 

      
    }`,
    fetcher
  );

  const sendBanner = async (form) => {
    form.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/userQuery",

        {
          query: `mutation MyMutation2 {
           
            update_home_vendidos_by_pk(pk_columns: {id: "${router.query.edit}"}, _set: {position: ${form.target.position.value}, product_id: "${form.target.produto.value}"}) {
              id
            }
        }`,
        },

        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Adicionado com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch {
      toast.error("Ocorreu um erro", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setLoading(false);
  };
  const deleteSeller = async () => {
    await axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/userQuery",

      {
        query: `mutation MyMutation2 {
         
          delete_home_vendidos_by_pk(id: "${router.query.edit}") {
            id
          }
      }`,
      },

      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
    router.push("/adm/home");
  };
  const [products, setProducts] = useState(null);
  if (data && products == null) {
    setProducts(
      data.product.map((value) => {
        return {
          value: value.id,
          label: (
            <div className="flex gap-4  items-center">
              <img
                className="w-8 h-8"
                src={
                  "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                  value.product_images[0].src
                }
              />
              <h1>{value.name}</h1>
            </div>
          ),
        };
      })
    );
  }
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
        <div className="flex flex-col w-2/5 ">
          <div className="w-full text-3xl font-bold mt-6 flex justify-center pb-4">
            <h1>Editar</h1>
          </div>
          {data && (
            <form
              onSubmit={(form) => sendBanner(form)}
              className=" w-full h-full"
            >
              <div className="w-full  items-start">
                <div className="w-full   flex flex-col justify-center pb-4">
                  <h1 className="text-xl font-semibold px-1 pb-2">
                    Brinquedos
                  </h1>
                  <Select
                    placeholder="Selecione uma categoria"
                    name="produto"
                    required
                    defaultValue={{
                      value: data.home_vendidos[0].product.id,
                      label: (
                        <div className="flex gap-4  items-center">
                          <img
                            className="w-8 h-8"
                            src={
                              "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                              data.home_vendidos[0].product.product_images[0]
                                .src
                            }
                          />
                          <h1>{data.home_vendidos[0].product.name}</h1>
                        </div>
                      ),
                    }}
                    options={products}
                  />
                </div>
              </div>

              <div className="w-full  items-start">
                <div className="w-full   flex flex-col justify-center pb-4">
                  <h1 className="text-xl font-semibold px-1 pb-2">Posição</h1>
                  <input
                    className="border-2 form-input rounded-md px-2 py-1 border-gray-300"
                    type="number"
                    required
                    defaultValue={data.home_vendidos[0].position}
                    placeholder="Defina a posição do produto"
                    name="position"
                  />
                </div>
              </div>

              <div className="w-full gap-2 mt-4 justify-end flex pb-10">
                <button
                  type="button"
                  onClick={() => deleteSeller()}
                  className={
                    "flex px-4 py-2 text-base font-semibold bg-red-700 hover:bg-red-800 text-white rounded-lg"
                  }
                >
                  <span>Excluir</span>
                </button>
                <button
                  disabled={loading}
                  className={
                    loading
                      ? "flex px-4 py-2 text-base font-semibold bg-gray-500  text-gray-300 rounded-lg"
                      : "flex px-4 py-2 text-base font-semibold bg-green-700 hover:bg-green-800 text-white rounded-lg"
                  }
                >
                  <MoonLoader size={20} color="#fff" loading={loading} />
                  <span className={loading ? "pl-2" : "pl-0"}>
                    {loading ? "Carregando" : "Editar"}
                  </span>
                </button>
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
