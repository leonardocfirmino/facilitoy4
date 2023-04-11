/* eslint-disable @next/next/no-img-element */
import LayoutAdm from "../../components/LayoutAdm";
import useSWR from "swr";
import request from "graphql-request";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import Link from "next/link";

import Pagination from "rc-pagination";
import Moment from "react-moment";
import Switch from "react-switch";
import "moment/locale/pt-br";
import { useState } from "react";
import Empty from "../../components/Empty";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
const localeInfo = {
  // Options.jsx
  items_per_page: "/ page",
  jump_to: "Ir até",
  jump_to_confirm: "confirmar",
  page: "Página",

  // Pagination.jsx
  prev_page: "Página anterior",
  next_page: "Próxima página",
  prev_5: "Voltar 5 páginas",
  next_5: "Pular 5 Páginas",
  prev_3: "Voltar 3 Páginas",
  next_3: "Pular 3 Páginas",
  page_size: "Támanho da página",
};
const Home = ({ sessions }) => {
  const user = JSON.parse(sessions);
  const [pagination, setPagination] = useState();
  const [actualPosts, setActualPosts] = useState(0);
  const onChange = (page) => {
    mutate();
    setActualPosts((page - 1) * 30);
    setPagination(page);
  };

  const [filtro, setFiltro] = useState("");
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
      product(offset:${actualPosts}, where: {name:{_ilike:"%${filtro}%"}}, limit: 30, order_by: {created_at: desc}) {
        category {
          name
        }
        is_active
        name
        anotacao
        is_unavailable
        product_images {
          src
        }
        id
        slug
      }
    
      product_aggregate(where: {name:{_ilike:"%${filtro}%"}}) {
        aggregate {
          count
        }
      }
    }`,
    fetcher
  );
  const changeActive = async (id, actual) => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/userQuery",

        {
          query: `mutation {
            update_product_by_pk(pk_columns: {id: "${id}"}, _set: {is_active: ${!actual}}) {
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
      toast.success("Alterado com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      mutate();
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
  };
  const changeUnavailable = async (id, actual) => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/userQuery",

        {
          query: `mutation {
            update_product_by_pk(pk_columns: {id: "${id}"}, _set: {is_unavailable: ${!actual}}) {
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
      toast.success("Alterado com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      mutate();
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
  };
  const anotacao = (id) => {
    Swal.fire({
      title: "Anotar",
      showCancelButton: true,
      input: "textarea",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Anotar",
      confirmButtonColor: "#CA8A04",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.put(
          process.env.NEXT_PUBLIC_PREFIX +
            process.env.NEXT_PUBLIC_SITE_URL +
            `/api/userQuery`,
          {
            query: `mutation{
              update_product_by_pk(pk_columns: {id: "${id}"}, _set: {anotacao: "${result.value}"}) {
                anotacao
              }
            }`,
          },
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        mutate();
      }
    });
  };
  let filterTimeout;
  const filterHandler = (query) => {
    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => {
      setFiltro(query);
    }, 1000);
  };
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

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* This example requires Tailwind CSS v2.0+ */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  Produtos
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Uma listagem de todos os produtos de seu site
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link href="/adm/product/create">
                  <a className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                    Adicionar Produto
                  </a>
                </Link>
              </div>
            </div>

            <div className="mt-10 w-1/3">
              <label
                htmlFor="search"
                className="block text-md font-medium text-gray-800"
              >
                Pesquisar
              </label>
              <div className="relative  mt-1 flex items-center">
                <input
                  type="text"
                  onChange={(e) => filterHandler(e.target.value)}
                  name="search"
                  id="search"
                  placeholder="Exemplo: Torre de brinquedos"
                  className="block w-full form-input rounded-md bg-onfireBlack  pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <div className="absolute text-blue-600 inset-y-0 right-0 flex items-center py-1.5 pr-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {data && (
              <div className="mt-8  flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
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
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Categoria
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
                              Anotação
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Disponivel
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Visivel
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="">Editar</span>
                            </th>
                          </tr>
                        </thead>
                        {data && (
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {data.product.map((value, index) => {
                              return (
                                <tr key={index}>
                                  <td className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {value.name}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {value.category.name}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <img
                                      className="w-32  h-40"
                                      src={
                                        value.product_images[0] != undefined
                                          ? "https://space-facilitoy.sfo3.digitaloceanspaces.com/" +
                                            value.product_images[0]?.src
                                          : "/logo.webp"
                                      }
                                      alt=""
                                    />
                                  </td>
                                  <td className="whitespace-nowrap py-4  text-sm font-medium text-gray-900 ">
                                    <div className="flex  justify-center items-center gap-2">
                                      <span className="bg-yellow-600 text-white px-4 py-2 rounded-md">
                                        {value.anotacao}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => anotacao(value.id)}
                                        className="text-yellow-600"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-5 h-5"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    <Switch
                                      onChange={() =>
                                        changeUnavailable(
                                          value.id,
                                          value.is_unavailable
                                        )
                                      }
                                      checked={!value.is_unavailable}
                                    />
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    <button
                                      className="px-3 py-2 bg-faciRose rounded-md"
                                      onClick={() =>
                                        changeActive(value.id, value.is_active)
                                      }
                                    >
                                      {value.is_active ? (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={2}
                                          stroke="currentColor"
                                          className="w-6 h-6 text-green-500"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                          />
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                          />
                                        </svg>
                                      ) : (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={2}
                                          stroke="currentColor"
                                          className="w-6 h-6 text-red-600"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                          />
                                        </svg>
                                      )}
                                    </button>
                                  </td>
                                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <Link
                                      legacyBehavior
                                      prefetch={false}
                                      href={"/adm/product/" + value.id}
                                    >
                                      <a className="text-indigo-600 hover:text-indigo-900">
                                        Editar
                                      </a>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        )}
                      </table>
                      {data.product.length == 0 && <Empty />}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end px-4">
              <div>
                {data && (
                  <Pagination
                    locale={localeInfo}
                    onChange={onChange}
                    hideOnSinglePage={true}
                    current={pagination}
                    pageSize={30}
                    total={data.product_aggregate.aggregate.count}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdm>
  );
};
export default Home;

export async function getServerSideProps(context) {
  const subdomain =
    context.req.headers["x-forwarded-host"] || context.req.headers["host"];
  if (process.env.NEXT_PUBLIC_PREFIX == "http://")
    if (subdomain.split(".")[1] != undefined)
      return {
        redirect: {
          destination:
            process.env.NEXT_PUBLIC_PREFIX +
            process.env.NEXT_PUBLIC_SITE_URL +
            `/adm`,
          permanent: true,
        },
      };
  if (process.env.NEXT_PUBLIC_PREFIX != "http://")
    if (subdomain.split(".")[3] != undefined)
      return {
        redirect: {
          destination:
            process.env.NEXT_PUBLIC_PREFIX +
            process.env.NEXT_PUBLIC_SITE_URL +
            `/adm`,
          permanent: true,
        },
      };
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: `/login?callbackUrl=${
          process.env.NEXT_PUBLIC_PREFIX + process.env.NEXT_PUBLIC_SITE_URL
        }/adm/`,
        permanent: false,
      },
    };
  }
  /*  if (session?.user?.role == "user") {
    return {
      redirect: {
        destination: `/perfil`,
        permanent: false,
      },
    };
  } */
  return {
    props: {
      sessions: JSON.stringify(session, null, 2),
    },
  };
}
