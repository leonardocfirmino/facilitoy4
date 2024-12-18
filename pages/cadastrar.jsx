import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatPhoneNumber from "../helpers/formatPhoneNumber";
import DatePicker from "react-date-picker";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
export default function Login({ subdomain }) {
  const router = useRouter();
  const [tel, setTel] = useState("");
  const [cpf, setCpf] = useState("");
  const [date, setDate] = useState(new Date());
  console.log(date.toISOString());
  const LoginMethod = async (form) => {
    form.preventDefault();
    const res = await axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        (subdomain ? subdomain + "." : null) +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/user-register",

      {
        email: form.target.email.value,
        phone_number: cleanNumber(form.target.phone.value),
        name: form.target.name.value,
        data_nascimento: date.toISOString(),
        cpf: cleanCpf(form.target.cpf.value),
        password: form.target.password.value,
      }
    );

    if (res.status == 500) {
      return toast.error("Email já cadastrado", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    await signIn("credentials", {
      redirect: false,
      email: form.target.email.value,
      password: form.target.password.value,
    });
    router.push("/carrinho");
  };
  const handleChange = (event) => {
    const { value } = event.target;

    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");

    // Aplica a máscara do CPF
    let maskedValue = "";
    if (numericValue.length > 0) {
      maskedValue += numericValue.substr(0, 3);
    }
    if (numericValue.length > 3) {
      maskedValue += "." + numericValue.substr(3, 3);
    }
    if (numericValue.length > 6) {
      maskedValue += "." + numericValue.substr(6, 3);
    }
    if (numericValue.length > 9) {
      maskedValue += "-" + numericValue.substr(9, 2);
    }

    setCpf(maskedValue);
  };
  const cleanNumber = (value) => {
    value = value.replaceAll("(", "");
    value = value.replaceAll(")", "");
    value = value.replaceAll("-", "");
    return value.trim();
  };
  const cleanCpf = (value) => {
    value = value.replaceAll(".", "");
    value = value.replaceAll("-", "");
    return value.trim();
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
        <div className="flex justify-center min-h-screen">
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className=" flex justify-center font-bold text-center text-gray-700 dark:text-white">
                  <img className="w-40" src="/logo.webp" alt="" />
                </h2>
                <p className="mt-3 text-gray-500 ">
                  Preencha os dados para criar sua conta
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
                      htmlFor="name"
                      className="block mb-2 text-sm text-gray-600 "
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder="Seu nome"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md    focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-3">
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
                      required
                      placeholder="email@gmail.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md    focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="cpf"
                      className="block mb-2 text-sm text-gray-600 "
                    >
                      CPF
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      required
                      value={cpf}
                      onChange={handleChange}
                      placeholder="999.999.999-99"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md    focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="date"
                      className="block mb-2 text-sm text-gray-600 "
                    >
                      Data de nascimento
                    </label>
                    <DatePicker
                      onChange={setDate}
                      value={date}
                      locale="pt-BR"
                      format="dd/MM/yyyy"
                      className="block  w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md    focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 "
                      >
                        Telefone
                      </label>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(11) 99999-9999"
                      required
                      value={tel}
                      onChange={(e) =>
                        setTel(formatPhoneNumber(e.target.value))
                      }
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 "
                      >
                        Sua Senha
                      </label>
                    </div>
                    <input
                      type="password"
                      name="password"
                      required
                      minLength={6}
                      id="password"
                      placeholder="**********"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="relative flex items-center justify-center mt-3">
                    <div className="flex h-6 items-center">
                      <input
                        name="termos"
                        required
                        type="checkbox"
                        className="h-5 w-5 form-checkbox rounded border-gray-300 text-faciBlue focus:ring-faciBlue"
                      />
                    </div>
                    <div className="ml-3 text-xs leading-6">
                      <span className="text-gray-500">
                        Concordo com os{" "}
                        <Link href={"/termos"}>
                          <a className="underline">Termos e Condições</a>
                        </Link>{" "}
                        e{" "}
                        <Link href={"/politica"}>
                          <a className="underline">Política de privacidade</a>
                        </Link>
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      id="entrar"
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400 focus:ring focus:ring-red-300 focus:ring-opacity-50"
                    >
                      Criar conta
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage: "url('/bg-login.jpg')",
            }}
          >
            <div className="flex justify-end items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="w-56 font-bold text-white">
                  <img src="/logo branca.webp" alt="" />
                </h2>
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
  const subdomain =
    context.req.headers["x-forwarded-host"] || context.req.headers["host"];
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
          }/user`,
          permanent: false,
        },
      };
    }
  }
  return { props: { subdomain: subdomain.split(".")[0] } };
}
