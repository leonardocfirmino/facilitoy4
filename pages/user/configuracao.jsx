import Layout from "../../components/Layout";
import useSWR from "swr";
import request from "graphql-request";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Config = ({ sessions }) => {
  const user = JSON.parse(sessions);
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
      user {
        reference
        blog_name
      }
    }`,
    fetcher
  );
  const changeReference = async (form) => {
    form.preventDefault();
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/userQuery",
        {
          query: `mutation{
            update_user(where: {email: {_eq: "${user.user.email}"}}, _set: {reference: "${form.target.afiliadoId.value}"}) {
              affected_rows
            }
          }`,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      mutate();
      toast.success("Alterado com sucesso", {
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
  const changeName = async (form) => {
    form.preventDefault();
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/userQuery",
        {
          query: `mutation{
            update_user(where: {email: {_eq: "${user.user.email}"}}, _set: {blog_name: "${form.target.blogName.value}"}) {
              affected_rows
            }
          }`,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      mutate();
      toast.success("Alterado com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch {
      toast.error("Este nome já está em uso", {
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
    <Layout session={user}>
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
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Configuração
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <form
              onSubmit={(form) => changeName(form)}
              className="space-y-6 mt-9"
            >
              <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Blog
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Defina o nome para seu blog
                    </p>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="afiliado-hotmart"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nome
                        </label>
                        {data && (
                          <input
                            type="text"
                            defaultValue={data.user[0].blog_name}
                            name="blogName"
                            id="blogName"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-2 px-3 mt-2 mb-3"
                          />
                        )}
                      </div>
                    </div>
                    <div className=" ">
                      <button
                        type="submit"
                        className=" inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <form
              onSubmit={(form) => changeReference(form)}
              className="space-y-6 mt-9"
            >
              <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Afiliado
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Coloque seus dados de afiliado ao lado para receber as
                      comissões pelos banners
                    </p>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="afiliado-hotmart"
                          className="block text-sm font-medium text-gray-700"
                        >
                          <img
                            src="/hotmart.png"
                            className="w-6 mr-1 rounded-2xl inline-block"
                            alt=""
                          />
                          ID afiliado Hotmart
                        </label>
                        {data && (
                          <input
                            type="text"
                            defaultValue={data.user[0].reference}
                            name="afiliadoId"
                            id="afiliadoId"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-2 px-3 mt-2 mb-3"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </Layout>
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
        destination: `/login?callbackUrl=${process.env.VERCEL_URL}/user/`,
        permanent: false,
      },
    };
  }
  if (session?.user?.role == "adm") {
    return {
      redirect: {
        destination: `/adm/`,
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
