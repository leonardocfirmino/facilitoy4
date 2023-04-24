import LayoutAdm from "../../../components/LayoutAdm";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";
import Select from "react-select";
import MultipleImages from "../../../components/MultipleImages";
import useSWR from "swr";
import request from "graphql-request";
import classOrganizer from "../../../helpers/classOrganizer";

export default function CreateBanner({ sessions }) {
  const user = JSON.parse(sessions);

  const [isPercentage, setIsPercentage] = useState(false);
  const [loading, setLoading] = useState(false);

  const input = useRef();
  const sendBanner = async (form) => {
    form.preventDefault();
    setLoading(true);

    const formData = new FormData();

    const code = form.target.code.value;
    const description = form.target.description.value;
    const discount = form.target.discount.value;

    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/userQuery",

        {
          query: `mutation MyMutation2 {
            insert_cupons_one(object: {discount: "${discount}", is_active: false, is_percentage: ${isPercentage}, description: "${description}", code: "${code}"}) {
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
      toast.success("Cadastrado com sucesso", {
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
      <div className="w-full h-screen flex justify-center overflow-auto  items-center">
        <div className="flex flex-col w-2/5 ">
          <div className="w-full text-3xl font-bold mt-6 flex justify-center pb-4">
            <h1>Novo cupom</h1>
          </div>
          <form
            onSubmit={(form) => sendBanner(form)}
            className=" w-full h-full"
          >
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">Código</h1>
                <input
                  className="border-2 rounded-md px-2 py-1 border-gray-300"
                  type="text"
                  required
                  placeholder="Defina o código do cupom"
                  name="code"
                />
              </div>
            </div>
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">Descrição</h1>
                <input
                  className="border-2 rounded-md px-2 py-1 border-gray-300"
                  type="text"
                  required
                  placeholder="Descrição do cupom"
                  name="description"
                />
              </div>
            </div>
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">Desconto</h1>
                <input
                  className="border-2 rounded-md px-2 py-1 border-gray-300"
                  type="number"
                  required
                  placeholder="Descrição do cupom"
                  name="discount"
                />
              </div>
            </div>
            <div className="w-full flex  justify-end">
              <div className="items-end  flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">
                  Tipo de desconto
                </h1>
                <div>
                  <button
                    type="button"
                    onClick={() => setIsPercentage(false)}
                    className={classOrganizer(
                      isPercentage
                        ? "border-gray-300 hover:bg-gray-200 text-gray-600 bg-gray-100"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white border-white/40",
                      "px-6 py-2 border rounded-l-md duration-300 font-bold hover:"
                    )}
                  >
                    R$
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPercentage(true)}
                    className={classOrganizer(
                      !isPercentage
                        ? "border-gray-300 hover:bg-gray-200 text-gray-600 bg-gray-100"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white border-white/40",
                      "px-6 py-2 border rounded-r-md duration-300 font-bold hover:"
                    )}
                  >
                    %
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full mt-4 justify-end flex pb-10">
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
                  {loading ? "Cadastrando" : "Criar cupom"}
                </span>
              </button>
            </div>
          </form>
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
