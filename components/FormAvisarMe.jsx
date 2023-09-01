import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatPhoneNumber from "../helpers/formatPhoneNumber";
function classOrganizer(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FormAvisarMe({ subdomain, produto }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const phoneHandler = (value) => {
    setPhone(formatPhoneNumber(value));
  };
  const sendPhone = async () => {
    const actualPhone = phone;
    setPhone("");
    setLoading(true);
    await axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        subdomain +
        "." +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/email-lembrar-brinquedo",
      {
        telefone: actualPhone
          .replaceAll("(", "")
          .replaceAll(")", "")
          .replaceAll("-", ""),
        produto: {
          image: produto.product_images[0].src,
          name: produto.name,
          id: produto.id,
        },
      }
    );
    setLoading(false);
    toast.success(
      "Você será lembrado assim que o brinquedo estiver disponível",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };
  return (
    <div className="w-full ">
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
      <div className="flex flex-col max-w-md justify-center bg-faciBlue py-6 rounded-xl items-center gap-4">
        <label htmlFor="cep" className="block text-lg font-bold text-white">
          Avise-me quando chegar
        </label>
        <div className="flex  justify-center  items-end gap-4">
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </div>
            <input
              type="cep"
              name="cep"
              id="cep"
              value={phone}
              onChange={(e) => phoneHandler(e.target.value)}
              className="block w-full form-input rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Telefone ou Whatsapp"
            />
          </div>
          <button
            type="button"
            onClick={() => sendPhone()}
            className={classOrganizer(
              loading
                ? " pointer-events-none bg-gray-500 text-black"
                : "bg-blue-500 hover:bg-blue-700 text-white",
              "font-bold  duration-300  px-4 py-2 rounded-md"
            )}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
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
    if (subdomain.split(".")[3] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  return { props: { subdomain: subdomain.split(".")[0] } };
}
