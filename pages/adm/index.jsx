/* eslint-disable @next/next/no-img-element */
import LayoutAdm from "../../components/LayoutAdm";
import useSWR from "swr";
import request from "graphql-request";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import Link from "next/link";

import Pagination from "rc-pagination";
import Moment from "react-moment";

import "moment/locale/pt-br";
import { useState } from "react";
import Empty from "../../components/Empty";
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
      banner(offset:${actualPosts}, limit: 5, order_by: {created_at: desc}) {
        created_at
        name
        image_url
        id
      }
      banner_aggregate {
        aggregate {
          count
        }
      }
    }`,
    fetcher
  );
  return (
    <LayoutAdm session={user}>
      {data && (
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* This example requires Tailwind CSS v2.0+ */}
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Banners
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    Uma listagem de todos os banners do seu site
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <Link href="adm/banner/create">
                    <a className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                      Adicionar Banner
                    </a>
                  </Link>
                </div>
              </div>
              <div className="mt-8 flex flex-col">
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
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Imagem
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Editar</span>
                            </th>
                          </tr>
                        </thead>
                        {data && (
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {data.banner.map((value, index) => {
                              return (
                                <tr key={index}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {value.name}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <img
                                      className="w-2/4 h-[100px]"
                                      src={
                                        "https://space-primeblog.nyc3.cdn.digitaloceanspaces.com/" +
                                        value.image_url
                                      }
                                      alt=""
                                    />
                                  </td>
                                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <Link href={"/adm/banner/" + value.id}>
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
                      {data.banner.length == 0 && <Empty />}
                    </div>
                  </div>
                </div>
              </div>
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
                      pageSize={5}
                      total={data.banner_aggregate.aggregate.count}
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
        destination: `/login?callbackUrl=${process.env.VERCEL_URL}/adm/`,
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
  return {
    props: {
      sessions: JSON.stringify(session, null, 2),
    },
  };
}
