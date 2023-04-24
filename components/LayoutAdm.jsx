import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PulseLoader } from "react-spinners";
import useSWR from "swr";
import request from "graphql-request";

import Notification from "./Notification";
export default function LayoutAdm({ children, session }) {
  const router = useRouter();
  const user = session;

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
    
    user_carrinho(where: {is_notify:{_eq:true}, _and:{status:{_eq:"approved"}}}, order_by: {created_at: desc}){
      created_at
      cep
      id
      frete_value
      mercado_order_id
      status
      is_notify
      total
      anotacao
      user {
        name
        email
      }
      carrinho_produtos {
        product {
          product_images {
            src
          }
        }
      }
    }

    user_carrinho_aggregate(where: {is_notify:{_eq:true}, _and:{status:{_eq:"approved"}}}, order_by: {created_at: desc}) {
      aggregate {
        count
      }
    }
  }`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const [mobileMenu, setMobileMenu] = useState(false);
  const [actualMenu, setActualMenu] = useState(router.pathname);

  return (
    <div>
      {mobileMenu && (
        <div
          id="mobilemenu"
          className="relative z-40 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          <div className="fixed inset-0 flex z-40">
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  id="closebtn"
                  onClick={() => {
                    setMobileMenu(!mobileMenu);
                  }}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Close sidebar</span>

                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <h1 className="text-white text-2xl font-bold">Facilitoy</h1>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  <Link href="/adm">
                    <a
                      onClick={() => {
                        setActualMenu("/adm");
                      }}
                      className={
                        actualMenu == "/adm"
                          ? "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>{" "}
                      Meus Produtos
                    </a>
                  </Link>
                  <Link href="/adm/category">
                    <a
                      onClick={() => {
                        setActualMenu("/adm/category");
                      }}
                      className={
                        actualMenu == "/adm/category"
                          ? "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 mr-3 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6h.008v.008H6V6z"
                        />
                      </svg>
                      Minhas categorias
                    </a>
                  </Link>
                  <Link href="/adm/cep">
                    <a
                      onClick={() => {
                        setActualMenu("/adm/cep");
                      }}
                      className={
                        actualMenu == "/adm/cep"
                          ? "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 mr-3 h-6"
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
                      Cep
                    </a>
                  </Link>
                </nav>
              </div>
              <div className="flex-shrink-0 flex bg-gray-700 p-4">
                <div className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        {session.user.name}
                      </p>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="text-xs font-medium text-gray-300 group-hover:text-gray-200"
                      >
                        Sair
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </div>
      )}
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-white text-2xl font-bold">Facilitoy</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <Link href="/adm/home">
                <a
                  onClick={() => {
                    setActualMenu("/adm/home");
                  }}
                  className={
                    actualMenu == "/adm/home"
                      ? "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>{" "}
                  Tela inicial
                </a>
              </Link>
              <Link href="/adm/">
                <a
                  onClick={() => {
                    setActualMenu("/adm");
                  }}
                  className={
                    actualMenu == "/adm"
                      ? "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>{" "}
                  Meus Produtos
                </a>
              </Link>
              <Link href="/adm/pedidos">
                <a
                  onClick={() => {
                    setActualMenu("/adm/pedidos");
                  }}
                  className={
                    actualMenu == "/adm/pedidos"
                      ? "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                  Pedidos
                </a>
              </Link>
              <Link href="/adm/category">
                <a
                  onClick={() => {
                    setActualMenu("/adm/category");
                  }}
                  className={
                    actualMenu == "/adm/category"
                      ? "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 mr-3 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6h.008v.008H6V6z"
                    />
                  </svg>
                  Minhas categorias
                </a>
              </Link>
              <Link href="/adm/cep">
                <a
                  onClick={() => {
                    setActualMenu("/adm/cep");
                  }}
                  className={
                    actualMenu == "/adm/cep"
                      ? "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 mr-3 h-6"
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
                  Cep
                </a>
              </Link>
              <Link href="/adm/cupom">
                <a
                  onClick={() => {
                    setActualMenu("/adm/cupom");
                  }}
                  className={
                    actualMenu == "/adm/cupom"
                      ? "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 mr-3 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                    />
                  </svg>
                  Cupons
                </a>
              </Link>
              <Link href="/adm/configuracao">
                <a
                  onClick={() => {
                    setActualMenu("/adm/configuracao");
                  }}
                  className={
                    actualMenu == "/adm/configuracao"
                      ? "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 mr-3 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Configuração
                </a>
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex bg-gray-700 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {session.user.name}
                  </p>
                  <button
                    onClick={async () => await signOut({ callbackUrl: "/" })}
                    className="text-xs font-medium text-gray-300 group-hover:text-gray-200"
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            type="button"
            onClick={() => {
              setMobileMenu(!mobileMenu);
            }}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Open sidebar</span>

            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="">
          <div className="sticky top-0 z-40  justify-end flex py-5  gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm w-full lg:mx-auto  lg:px-10">
            {data && (
              <Notification
                total={data.user_carrinho_aggregate.aggregate.count}
                pedidos={data.user_carrinho}
                user={user}
              />
            )}
          </div>
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
