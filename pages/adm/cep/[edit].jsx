import LayoutAdm from "../../../components/LayoutAdm";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import request from "graphql-request";
import useSWR from "swr";
import { useRouter } from "next/router";
import MultipleImages from "../../../components/MultipleImages";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
export default function EditBanner({ sessions }) {
  const user = JSON.parse(sessions);
  const router = useRouter();
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
  const [stateCep, setStateCep] = useState(null);
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
      cep_user(where: {id: {_eq: "${router.query.edit}"}}) {
       id
        bairro
        cidade
        tempo
        valor
        
      }
    
    }`,
    fetcher
  );

  const deleteBanner = (id) => {
    Swal.fire({
      title: "Deseja excluir este CEP?",
      showCancelButton: true,
      cancelButtonText: "Manter",
      confirmButtonText: "Excluir",
      confirmButtonColor: "#dc3741",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.put(
          process.env.NEXT_PUBLIC_PREFIX +
            process.env.NEXT_PUBLIC_SITE_URL +
            `/api/userQuery`,
          {
            query: `mutation{
              delete_cep_user_by_pk(id: "${id}") {
                id
              }
            }`,
          },
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        Swal.fire(
          "Excluido com sucesso",
          "O CEP foi excluida com sucesso",
          "success"
        ).then(() => {
          router.push(
            process.env.NEXT_PUBLIC_PREFIX +
              process.env.NEXT_PUBLIC_SITE_URL +
              "/adm/cep"
          );
        });
      }
    });
  };
  const editBanner = async (form) => {
    form.preventDefault();

    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/userQuery",

        {
          query: `mutation MyMutation2 {
            update_cep_user_by_pk(pk_columns: {id: "${router.query.edit}"}, _set: {valor: "${form.target.valor.value}",tempo: ${form.target.tempo.value}}) {
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
      toast.success("Editado com sucesso", {
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
  };
  if (data)
    if (stateCep == null)
      setStateCep({
        value: {
          bairro: data.cep_user[0].bairro,
          cidade: data.cep_user[0].cidade,
        },
        label: data.cep_user[0].bairro + "," + " " + data.cep_user[0].cidade,
      });
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

      <div className="flex flex-col w-2/5 mx-auto my-auto py-10 ">
        <div className="w-full text-3xl font-bold flex justify-center pb-4">
          <h1>Editar CEP</h1>
        </div>
        {data && (
          <form
            onSubmit={(form) => editBanner(form)}
            className=" w-full h-full"
          >
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">CEP</h1>
                <Select
                  placeholder="Selecione um CEP"
                  name="cep"
                  isSearchable
                  required
                  isDisabled
                  value={stateCep}
                  onChange={setStateCep}
                  options={ceps}
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
                  defaultValue={data?.cep_user[0].valor}
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
                  defaultValue={data?.cep_user[0].tempo}
                  placeholder="Digite o tempo da entrega"
                  name="tempo"
                />
              </div>
            </div>

            <div className="w-full mt-4 space-x-4 justify-end flex">
              <button
                type="button"
                onClick={() => deleteBanner(data.cep_user[0].id)}
                className="px-4 py-2 bg-red-600 text-xl hover:bg-red-700  font-bold text-white rounded-lg"
              >
                Excluir CEP
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-xl font-bold text-white rounded-lg">
                Editar CEP
              </button>
            </div>
          </form>
        )}
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
