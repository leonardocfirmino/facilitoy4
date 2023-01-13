import Link from "next/link";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import SingleProductCart from "../components/singleProductCart";
import { useMercadopago } from "react-sdk-mercadopago";
import axios from "axios";
const products = [
  {
    id: 1,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35.00",
    color: "White",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  // More products...
];

const CarrinhoPage = ({ subdomain }) => {
  const products = useSelector((state) => state.cart);
  const mercadopago = useMercadopago.v2(
    "TEST-424dab6b-43c3-4826-bf8a-d4bc5d057c53",
    {
      locale: "pt-BR",
    }
  );
  const getTotalPrice = () => {
    return products.reduce(
      (accumulator, item) => accumulator + item.quantity * item.time.price,
      0
    );
  };
  const createCheckout = async () => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        (subdomain ? subdomain + "." : null) +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/create-checkout",
      {
        products: products,
      }
    );

    const checkout = mercadopago.checkout({
      preference: {
        id: response.data.body.id,
      },
    });
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

            {/* Order summary */}
            <div className="mt-10 sm:ml-32 sm:pl-6">
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
      </div>
    </Layout>
  );
};
export default CarrinhoPage;
export async function getServerSideProps(ctx) {
  const subdomain =
    ctx.req.headers["x-forwarded-host"] || ctx.req.headers["host"];
  if (subdomain.split(".")[1] == undefined)
    return {
      redirect: {
        destination: `/selecionar-estado`,
        permanent: false,
      },
    };
  return { props: { subdomain: subdomain.split(".")[0] } };
}
