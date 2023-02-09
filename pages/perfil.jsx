import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import Empty from "../components/Empty";
import request from "graphql-request";
import { useSession, signOut } from "next-auth/react";
import Moment from "react-moment";
const orders = [
  {
    number: "WU88191111",
    href: "#",
    invoiceHref: "#",
    createdDate: "Jul 6, 2021",
    createdDatetime: "2021-07-06",
    deliveredDate: "July 12, 2021",
    deliveredDatetime: "2021-07-12",
    total: "$160.00",
    products: [
      {
        id: 1,
        name: "Micro Backpack",
        description:
          "Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.",
        href: "#",
        price: "$70.00",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg",
        imageAlt:
          "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
      },
      // More products...
    ],
  },
  // More orders...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ subdomain }) {
  const session = useSession();
  const router = useRouter();
  const fetcher = async (query) =>
    request(
      process.env.NEXT_PUBLIC_PREFIX +
        subdomain +
        "." +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/userQuery",
      query,
      {},
      { authorization: `Bearer ${session.data.token}` }
    );
  const { data, mutate } = useSWR(
    `{
      user_carrinho {
      
        total
        frete_value
        id
        cep
        status
        mercado_order_id
       
        created_at
        carrinho_produtos {
          product {
            slug
            name
            product_images {
              src
            }
            description
          }
          preco
          quantity
          tempo
        }
      }
  }`,
    fetcher
  );
  return (
    <Layout subdomain={subdomain}>
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto flex justify-between max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Meus pedidos
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Veja o seu histórico de pedidos
              </p>
            </div>
            <button
              className="flex justify-center items-center gap-2 font-bold text-white px-4 py-2 rounded-md bg-red-500"
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Sair
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-14">
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {data?.user_carrinho.length > 0 ? (
                data?.user_carrinho.map((order) => (
                  <div
                    key={order.number}
                    className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                  >
                    <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                      <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                        <div>
                          <dt className="font-medium text-gray-900">Pedido</dt>
                          <dd className="mt-1 text-gray-500">{order.id}</dd>
                        </div>
                        <div className="hidden sm:block">
                          <dt className="font-medium text-gray-900">Data</dt>
                          <dd className="mt-1 text-gray-500">
                            <Moment format="HH:mm DD/MM/YYYY">
                              {order.created_at}
                            </Moment>
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-900">
                            Valor total
                          </dt>
                          <dd className="mt-1 font-medium text-gray-900">
                            {order.total}
                          </dd>
                        </div>
                      </dl>

                      {/* <Menu
                      as="div"
                      className="relative flex justify-end lg:hidden"
                    >
                      <div className="flex items-center">
                        <Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">
                            Options for order {order.number}
                          </span>
                          <EllipsisVerticalIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href={order.href}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  View
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href={order.invoiceHref}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Invoice
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                      <a
                        href={order.href}
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span>View Order</span>
                        <span className="sr-only">{order.number}</span>
                      </a>
                      <a
                        href={order.invoiceHref}
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span>View Invoice</span>
                        <span className="sr-only">
                          for order {order.number}
                        </span>
                      </a>
                    </div> */}
                    </div>

                    {/* Products */}

                    <ul role="list" className="divide-y divide-gray-200">
                      {order.carrinho_produtos.map((product) => (
                        <li key={product.id} className="p-4 sm:p-6">
                          <div className="flex items-center sm:items-start">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                              <img
                                src={
                                  "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                                  product.product.product_images[0].src
                                }
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-6 flex-1 text-sm">
                              <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                <h5>{product.product.name}</h5>
                                <p className="mt-2 sm:mt-0">{product.price}</p>
                              </div>
                              <p className="hidden text-gray-500 sm:mt-2 sm:block">
                                {product.product.description}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 sm:flex sm:justify-between">
                            <div className="flex items-center">
                              <CheckCircleIcon
                                className={classNames(
                                  order.status == "Aguardando pagamento"
                                    ? "text-gray-400"
                                    : "text-green-500",
                                  "h-5 w-5 "
                                )}
                                aria-hidden="true"
                              />
                              <p className="ml-2 text-sm font-medium text-gray-500">
                                {order.status}
                              </p>
                            </div>

                            <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                              <div className="flex flex-1 justify-center">
                                <a
                                  href={"/brinquedo/" + product.product.slug}
                                  className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                                >
                                  Ver produto
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="w-full justify-center items-center">
                  <Empty />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps(ctx) {
  const subdomain =
    ctx.req.headers["x-forwarded-host"] || ctx.req.headers["host"];
  if (process.env.NEXT_PUBLIC_PREFIX == "http://")
    if (subdomain.split(".")[1] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  if (process.env.NEXT_PUBLIC_PREFIX != "http://")
    if (subdomain.split(".")[2] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  return { props: { subdomain: subdomain.split(".")[0] } };
}
