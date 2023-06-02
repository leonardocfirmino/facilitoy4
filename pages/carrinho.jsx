import Link from "next/link";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import SingleProductCart from "../components/singleProductCart";
import { useMercadopago } from "react-sdk-mercadopago";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CepChecker from "../components/CepChecker";
import useSWR from "swr";
import Recomendados from "../components/Recomendados";
import Cupon from "../components/Cupon";
import { useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Contato from "../components/Contato";
const CarrinhoPage = ({ subdomain }) => {
  const session = useSession();
  const router = useRouter();
  const enderecoRef = useRef();
  const [cupon, setCupon] = useState();
  const products = useSelector((state) => state.cart);
  const cep = useSelector((state) => state.cep);

  const fetcher = async (query) => axios.post("/api/get-franquia", query);

  const { data, mutate } = useSWR({ subdomain }, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const testeKey = "TEST-6d2e03c2-dd24-40b2-8392-ed30bf41bfca";
  const prodKey = "APP_USR-1abac126-20b5-4469-8415-05893b943c16";
  const mercadopago = useMercadopago.v2(prodKey, {
    locale: "pt-BR",
  });

  const getTotalPrice = (data) => {
    const productValues = products.reduce(
      (accumulator, item) => accumulator + item.quantity * item.time.price,
      0
    );

    return (
      productValues +
      (data?.data.franquia[0].frete_gratis_min <= productValues ? 0 : cep.value)
    );
  };
  const createCheckout = async (form) => {
    form.preventDefault();
    if (!cep.take_in_local && cep.cep == null) {
      return toast.info("Esta unidade não atende no cep informado");
    }
    if (!cep.take_in_local && form.target.numero.value == "") {
      return toast.info("Preencha todos os campos antes de finalizar");
    }
    if (session.status == "unauthenticated")
      return router.push(
        "/login?callbackUrl=" +
          process.env.NEXT_PUBLIC_PREFIX +
          subdomain +
          "." +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/carrinho"
      );
    const response = await axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        (subdomain ? subdomain + "." : null) +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/create-checkout",
      {
        products: products,
        subdomain: subdomain,
        cep: cep,
        cupon: {
          discount: cuponDiscount(cupon),
          code: cupon?.code,
          id: cupon?.id,
        },
        total: getTotalPrice() - cep.value,
      }
    );

    const checkout = mercadopago.checkout({
      preference: {
        id: response.data.mpago.body.id,
      },
    });

    let finalProducts = "[";
    products.map((value) => {
      finalProducts += `{product_id:"${value.id}", preco:"${value.time.price}", tempo:"${value.time.tempo}", quantity: "${value.quantity}"},`;
    });

    finalProducts += "]";
    const saveTransaction = await axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        (subdomain ? subdomain + "." : null) +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/userQuery",

      {
        query: `mutation MyMutation2 {
          insert_user_carrinho_one(object: {total: "${getTotalPrice()}", 
          status: "pending", 
          endereco: "${form.target.endereco.value}", 
          numero: "${form.target.numero.value}", 
          complemento: "${form.target.complemento.value}", 
          mercado_order_id: "${response.data.uuid}", 
          frete_value: "${cep.value}", 
          cep: "${cep.cep}", 
          franquia_id: "${response.data.franquia_id}",
          ${
            cupon != undefined
              ? 'cupon_users: {data: {cupon_id: "${cupon.id}"}},'
              : ""
          }
          carrinho_produtos: {data: ${finalProducts}}}) {
            id
          }

      }`,
      },

      {
        headers: {
          authorization: `Bearer ${session.data.token}`,
        },
      }
    );
    checkout.open();
  };

  const cuponDiscount = (cupon) => {
    if (cupon == undefined) return 0;
    if (cupon.is_percentage == true) {
      return (getTotalPrice(data) * (cupon.discount / 100)).toFixed(2);
    }
    return cupon.discount;
  };
  console.log(session);
  return (
    <Layout subdomain={subdomain}>
      <div className="bg-white">
        <div className="mx-auto max-w-4xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Seu Carrinho
          </h1>

          <form onSubmit={(form) => createCheckout(form)} className="mt-12">
            <div>
              <h2 className="sr-only">Items in your shopping cart</h2>

              {products.length > 0 ? (
                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-t border-b border-gray-200"
                >
                  {products.map((product, productIdx) => (
                    <SingleProductCart key={productIdx} product={product} />
                  ))}
                </ul>
              ) : (
                <div className="w-full flex justify-center items-center min-h-[200px] bg-gray-300/30">
                  <h1 className="text-blue-400 font-bold text-2xl">
                    Nenhum produto em seu carrinho
                  </h1>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2">
              <div className=" flex-col justify-end w-full gap-1 mt-10 flex">
                <h1 className="font-semibold pb-3">Dados de entrega: </h1>
                <div className="w-[80%]  pl-1 flex flex-col justify-center pb-4">
                  <h1 className="text-md font-semibold px-1 pb-2">Endereço</h1>
                  <input
                    className="border-2 rounded-md px-2 py-1 border-gray-300"
                    type="text"
                    defaultValue={cep.logradouro}
                    placeholder="Seu endereço"
                    name="endereco"
                  />
                </div>
                <div className="w-[80%]  pl-1 flex flex-col justify-center pb-4">
                  <h1 className="text-md font-semibold px-1 pb-2">Número</h1>
                  <input
                    className="border-2 rounded-md px-2 py-1 border-gray-300"
                    type="text"
                    placeholder="Seu numero"
                    name="numero"
                  />
                </div>
                <div className="w-[80%] pl-1  flex flex-col justify-center pb-4">
                  <h1 className="text-md font-semibold px-1 pb-2">
                    Complemento
                  </h1>
                  <input
                    className="border-2 rounded-md px-2 py-1 border-gray-300"
                    type="text"
                    placeholder="Complemento"
                    name="complemento"
                  />
                </div>
              </div>
              <div>
                <div className="sm:flex-row flex-col justify-end w-full gap-4 mt-10 flex">
                  {data && (
                    <CepChecker
                      subdomain={subdomain}
                      endereco={data.data.franquia[0].endereco_completo}
                    />
                  )}
                </div>
                <div className="sm:flex-row flex-col justify-end w-full gap-4 mt-10 flex">
                  <Cupon
                    cupon={cupon}
                    products={products}
                    setCupon={setCupon}
                  />
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10  ">
              {session.status == "authenticated" && (
                <Contato user={session.data.user} />
              )}
              <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="sr-only">Order summary</h2>

                <div className="flow-root">
                  {products.length > 0 && (
                    <dl className="-my-4 divide-y divide-gray-200 text-sm">
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-base font-medium text-gray-900">
                          Brinquedos
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          R${" "}
                          {products.reduce(
                            (accumulator, item) =>
                              accumulator + item.quantity * item.time.price,
                            0
                          )}
                        </dd>
                      </div>
                    </dl>
                  )}
                  {cep != undefined && (
                    <dl className="-my-4 divide-y divide-gray-200 text-sm">
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-base font-medium text-gray-900">
                          Frete
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          {data?.data.franquia[0].frete_gratis_min <
                          getTotalPrice(data) ? (
                            <span className="text-semibold text-green-400">
                              Grátis
                            </span>
                          ) : (
                            "R$" + cep.value
                          )}
                        </dd>
                      </div>
                    </dl>
                  )}
                  {cupon != undefined && (
                    <dl className="-my-4 divide-y divide-gray-200 text-sm">
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-base font-medium text-gray-900">
                          Desconto aplicado
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          - R$ {cuponDiscount(cupon)}
                        </dd>
                      </div>
                    </dl>
                  )}
                  <dl className="-my-4 divide-y divide-gray-200 text-sm">
                    <div className="flex items-center justify-between py-4">
                      <dt className="text-base font-medium text-gray-900">
                        Valor total
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        R$ {getTotalPrice(data) - cuponDiscount(cupon)}
                      </dd>
                    </div>
                  </dl>
                  <dl className="-my-4 divide-y divide-gray-200 text-sm">
                    <div className="flex items-center justify-end py-4">
                      <dt className="text-xs flex items-center gap-1 font-medium text-faciBlue">
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
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          />
                        </svg>

                        <span>Parcele em seu cartão de crédito</span>
                      </dt>
                    </div>
                  </dl>
                </div>
              </div>

              {session.status != "authenticated" && (
                <div className="flex mt-4 justify-center gap-1 text-gray-500 items-center w-full">
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
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>

                  <h1 className=" text-center font-semibold">
                    Realize o seu cadastro para finalizar a compra!
                  </h1>
                </div>
              )}

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Finalizar locação
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  ou
                  <Link href="/brinquedos">
                    <a className="font-medium ml-0.5 text-blue-400 hover:text-blue-500">
                      Continuar comprando
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <Recomendados />
      </div>
    </Layout>
  );
};
export default CarrinhoPage;
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
    if (subdomain.split(".")[3] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  return { props: { subdomain: subdomain.split(".")[0] } };
}
