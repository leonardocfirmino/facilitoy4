import Layout from "../../components/Layout";
import LayoutAdm from "../../components/LayoutAdm";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import PulseLoader from "react-spinners/PulseLoader";
import Switch from "react-switch";
import axios from "axios";
import request from "graphql-request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Config = ({ sessions }) => {
  const user = JSON.parse(sessions);

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
      franquia {
        name
        id
        frete_gratis_min
        take_in_local
      }
    }`,
    fetcher
  );
  const changeActive = async (id, actual) => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/userQuery",

        {
          query: `mutation {
            update_franquia_by_pk(pk_columns: {id: "${id}"}, _set: {take_in_local: ${!actual}}) {
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
      toast.success("Alterado com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      mutate();
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
  };
  const saveFrete = async (id, form) => {
    form.preventDefault();
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/userQuery",

        {
          query: `mutation {
            update_franquia_by_pk(pk_columns: {id: "${id}"}, _set: {frete_gratis_min: ${form.target.valor.value}}) {
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
      toast.success("Alterado com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      mutate();
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
      {data && (
        <div className="max-w-7xl py-6 mx-auto px-4 sm:px-6 md:px-8">
          <div className="w-full py-10">
            <h1 className="font-bold text-gray-700 text-4xl">Configuração</h1>
          </div>
          <div className="w-full py-2">
            <h1 className="font-bold px-4 text-gray-700 text-3xl">
              {data?.franquia[0].name}
            </h1>
          </div>
          <div className="flex flex-col px-6">
            <label className="font-semibold mt-4 text-md py-2">
              Permitir retirada no local
            </label>
            <Switch
              onChange={() =>
                changeActive(
                  data?.franquia[0].id,
                  data?.franquia[0].take_in_local
                )
              }
              checked={data?.franquia[0].take_in_local}
            />
            <form onSubmit={(form) => saveFrete(data?.franquia[0].id, form)}>
              <div className="w-full max-w-sm mt-6 flex items-start">
                <div className="w-full   flex flex-col justify-center pb-4">
                  <h1 className="text-xl font-semibold px-1 pb-2">
                    Valor mínimo para frete grátis
                  </h1>

                  <input
                    className="border-2 rounded-md px-2 py-1 border-gray-300"
                    type="number"
                    defaultValue={data?.franquia[0].frete_gratis_min}
                    required
                    placeholder="Digite o valor da mínimo"
                    name="valor"
                  />
                  <p className="text-sm px-2 text-gray-400">
                    O valor 0 significa que o frete grátis está desativado.
                  </p>
                </div>
              </div>
              <button className="px-4 w-20 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md font-bold">
                Salvar
              </button>
            </form>
          </div>
        </div>
      )}
    </LayoutAdm>
  );
};
export default Config;

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
