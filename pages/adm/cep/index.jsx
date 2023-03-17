/* eslint-disable @next/next/no-img-element */
import LayoutAdm from "../../../components/LayoutAdm";
import useSWR from "swr";
import request from "graphql-request";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import Link from "next/link";

import Pagination from "rc-pagination";
import Moment from "react-moment";
import Switch from "react-switch";
import "moment/locale/pt-br";
import { useState } from "react";
import Empty from "../../../components/Empty";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import groupByCidade from "../../../helpers/groupByCidade";
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
    setActualPosts((page - 1) / 1);
    setPagination(page);
  };
  console.log(user);
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
      cep_user {
        id
        cidade
        bairro
        tempo
        valor
      }
      cep_user_aggregate {
        aggregate {
          count
        }
      }
    }`,
    fetcher
  );
  let ceps = [];
  if (data) ceps = groupByCidade(data?.cep_user);
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
      {data && (
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* This example requires Tailwind CSS v2.0+ */}
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">CEPs</h1>
                  <p className="mt-2 text-sm text-gray-700">
                    Uma listagem de todas os CEPs
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <Link href="/adm/cep/create">
                    <a className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                      Adicionar CEP
                    </a>
                  </Link>
                </div>
              </div>
              <div className="flex gap-4 mt-10 justify-start  flex-wrap w-full">
                {ceps.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="grow pt-2 border-2 max-w-sm border-gray-200 rounded-lg"
                    >
                      <h1 className="font-bold flex gap-2 justify-start items-center text-xl text-gray-700 py-4 px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                        {value.cidade}
                      </h1>
                      <ul role="list" className="">
                        {value.bairros.map((bairro) => (
                          <li
                            key={bairro.nome}
                            className="py-4 px-6 border-t border-gray-200"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0"></div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-md font-medium text-gray-900">
                                  {bairro.nome}
                                </p>
                                <div className="flex items-center gap-2">
                                  <p className="truncate text-md font-semibold text-blue-500">
                                    R$ {bairro.valor}
                                  </p>
                                  <p className="truncate text-sm font-semibold text-gray-400">
                                    - {bairro.tempo} dias
                                  </p>
                                </div>
                              </div>
                              <div>
                                <Link
                                  legacyBehavior
                                  prefetch={false}
                                  href={"/adm/cep/" + bairro.id}
                                >
                                  <a className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50">
                                    Editar
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              {/* <div className="mt-8 flex flex-col">
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
                              Bairro
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Valor
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
                            {data.cep_user.map((value, index) => {
                              return (
                                <tr key={index}>
                                  <td className="whitespace-nowrap flex flex-col justify-center overflow-y-auto h-32 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {value.bairro}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    R$ {value.valor}
                                  </td>

                                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <Link href={"/adm/cep/" + value.id}>
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
                      {data.cep_user.length == 0 && <Empty />}
                    </div>
                  </div>
                </div>
              </div> */}
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
                      pageSize={100}
                      total={data.cep_user_aggregate.aggregate.count}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutAdm>
  );
};
export default Home;

export async function getServerSideProps(context) {
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
  if (session?.user?.role == "user") {
    return {
      redirect: {
        destination: `/perfil`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      sessions: JSON.stringify(session, null, 2),
    },
  };
}
