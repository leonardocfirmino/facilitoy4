import { unstable_getServerSession } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
export default function Login() {
  const router = useRouter();
  const LoginMethod = async (form) => {
    form.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: form.target.email.value,

      password: form.target.password.value,
    });
    console.log(res);
    if (res.status == 401) {
      return toast.error("Email ou senha incorretos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (res.status == 200) {
      const { user } = await getSession();

      router.push(
        user.role == "user"
          ? "/"
          : process.env.NEXT_PUBLIC_PREFIX +
              process.env.NEXT_PUBLIC_SITE_URL +
              "/adm"
      );
    }
  };
  return (
    <>
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
      <div className="bg-gray-100 ">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage: "url('/bg-login.jpg')",
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="w-56 font-bold text-white">
                  <img src="/logo branca.webp" alt="" />
                </h2>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className=" flex justify-center font-bold text-center text-gray-700 dark:text-white">
                  <img className="w-56" src="/logo.webp" alt="" />
                </h2>
                <p className="mt-3 text-gray-500 ">
                  Preencha os dados para entrar em sua conta
                </p>
              </div>
              <div className="mt-8">
                <form
                  method="post"
                  onSubmit={(form) => LoginMethod(form)}
                  /*  action="/api/auth/callback/credentials" */
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-600 "
                    >
                      Endereço de Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email@gmail.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md    focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 "
                      >
                        Sua Senha
                      </label>
                      <a
                        href="#"
                        className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >
                        Esqueceu sua senha?
                      </a>
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="**********"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-6">
                    <button
                      id="entrar"
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400 focus:ring focus:ring-red-300 focus:ring-opacity-50"
                    >
                      Entrar
                    </button>
                  </div>
                  <div className="mt-2">
                    <div
                      id="entrar"
                      className="w-full px-4 flex gap-1 justify-center items-center py-2 tracking-wide text-cyan-500 "
                    >
                      Ainda não possui conta?{" "}
                      <Link href="/cadastrar">
                        <a className="font-semibold text-blue-500">
                          Clique aqui
                        </a>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    if (session?.user?.role == "franquiado") {
      return {
        redirect: {
          destination: `${
            process.env.NEXT_PUBLIC_PREFIX + process.env.NEXT_PUBLIC_SITE_URL
          }/adm`,
          permanent: false,
        },
      };
    }
    if (session?.user?.role == "user") {
      return {
        redirect: {
          destination: `${
            process.env.NEXT_PUBLIC_PREFIX + process.env.NEXT_PUBLIC_SITE_URL
          }/perfil`,
          permanent: false,
        },
      };
    }
  }
  return {
    props: {},
  };
}
