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
const CarrinhoPage = ({ subdomain }) => {
  const session = useSession();
  const router = useRouter();

  const products = useSelector((state) => state.cart);
  const cep = useSelector((state) => state.cep);
  const fetcher = async (query) =>
    axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        subdomain +
        "." +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/get-franquia",
      query
    );

  const { data, mutate } = useSWR({ subdomain }, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const mercadopago = useMercadopago.v2(
    "APP_USR-1abac126-20b5-4469-8415-05893b943c16",
    {
      locale: "pt-BR",
    }
  );

  const getTotalPrice = () => {
    const productValues = products.reduce(
      (accumulator, item) => accumulator + item.quantity * item.time.price,
      0
    );

    return (
      productValues +
      (data?.data.franquia[0].frete_gratis_min <= productValues ? 0 : cep.value)
    );
  };
  const createCheckout = async () => {
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
    console.log(response.data);
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
          mercado_order_id: "${response.data.mpago.body.id}", 
          frete_value: "${cep.value}", 
          cep: "${cep.cep}", 
          franquia_id: "${response.data.franquia_id}",
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
  return (
    <Layout subdomain={subdomain}>
      <div className="bg-white">
        <div className="mx-auto max-w-4xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Seu Carrinho
          </h1>

          <form className="mt-12">
            <div>
              <h2 className="sr-only">Items in your shopping cart</h2>

              {products.length > 0 ? (
                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-t border-b border-gray-200"
                >
                  {products.map((product, productIdx) => (
                    <SingleProductCart
                      key={product.product.id}
                      product={product}
                    />
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
            <div className="sm:flex-row flex-col justify-end w-full gap-4 mt-10 flex">
              <CepChecker subdomain={subdomain} />
            </div>
            {/* Order summary */}
            <div className="mt-10  ">
              <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="sr-only">Order summary</h2>

                <div className="flow-root">
                  <dl className="-my-4 divide-y divide-gray-200 text-sm">
                    <div className="flex items-center justify-between py-4">
                      <dt className="text-base font-medium text-gray-900">
                        Valor total
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        R$ {getTotalPrice()}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => createCheckout()}
                  className="w-full rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Finalizar compra
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
    if (subdomain.split(".")[2] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  return { props: { subdomain: subdomain.split(".")[0] } };
}
