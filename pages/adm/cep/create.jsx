import LayoutAdm from "../../../components/LayoutAdm";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";
import Autocomplete from "react-google-autocomplete";
import Select from "react-select";

export default function CreateBanner({ sessions }) {
  const user = JSON.parse(sessions);

  const [loading, setLoading] = useState(false);
  const ceps = [
    {
      value: { cidade: "Diadema", bairro: "Piraporinha" },
      label: "Piraporinha, Diadema",
    },

    {
      value: { cidade: "Itaquera", bairro: "Vila Suíça" },
      label: "Vila Suíça, Itaquera",
    },

    {
      value: { cidade: "Guarulhos", bairro: "Vila Rosália" },
      label: "Vila Rosália, Guarulhos",
    },

    {
      value: { cidade: "Osasco", bairro: "Centro" },
      label: "Centro, Osasco",
    },
  ];
  const [stateCep, setStateCep] = useState();

  const sendBanner = async (form) => {
    form.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/userQuery",

        {
          query: `mutation MyMutation2 {
          insert_cep_user_one(object: {cidade: "${stateCep.cidade}", bairro: "${stateCep.bairro}", tempo: ${form.target.tempo.value}, valor: "${form.target.valor.value}"}) {
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
    } catch (err) {
      console.log(err);
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
            <h1>Adicionar Bairro e Cidade</h1>
          </div>
          <form
            onSubmit={(form) => sendBanner(form)}
            className=" w-full h-full"
          >
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">
                  Digite aqui o Bairro e Cidade
                </h1>
                <Autocomplete
                  apiKey={"AIzaSyCLodMWPB7zeP4Xk2WJnZN5gfuQ7CpO5hk"}
                  onPlaceSelected={(place) => {
                    setStateCep({
                      bairro: place.address_components[0].long_name,
                      cidade: place.address_components[1].long_name,
                    });
                  }}
                  className="border-2 rounded-md px-2 form-input py-1 border-gray-300"
                  language="pt-BR"
                  options={{
                    types: ["sublocality"],
                    componentRestrictions: { country: "br" },
                  }}
                />
              </div>
            </div>
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">
                  Valor de entrega
                </h1>
                <input
                  className="border-2 rounded-md px-2 py-1 border-gray-300"
                  type="number"
                  required
                  placeholder="Digite o valor da entrega"
                  name="valor"
                />
              </div>
            </div>
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">
                  Tempo da entrega
                </h1>
                <input
                  className="border-2 rounded-md px-2 py-1 border-gray-300"
                  type="number"
                  required
                  placeholder="Digite o tempo da entrega"
                  name="tempo"
                />
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
                  {loading ? "Cadastrando" : "Salvar"}
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
