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
export default function CreateBanner({ sessions }) {
  const user = JSON.parse(sessions);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [loading, setLoading] = useState(false);
  const images = useRef();
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
      
        category {
          name
          image_src
          id
        }
        

      
    }`,
    fetcher
  );
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const input = useRef();
  const sendBanner = async (form) => {
    form.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (let i = 0; i < form.target.images.files.length; i++) {
      formData.append("images", form.target.images.files[i]);
    }

    formData.append("name", form.target.name.value);

    formData.append("desc", form.target.desc.value);
    formData.append("video", form.target.link.value);
    formData.append("price_one", form.target.price_one.value);
    formData.append("price_two", form.target.price_two.value);
    formData.append("price_three", form.target.price_three.value);
    formData.append("category", form.target.categoria.value);
    formData.append("details", form.target.details.value);

    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/createProduto",

        formData,

        {
          headers: {
            authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
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
      <div className="w-full flex justify-center overflow-auto  items-center">
        <div className="flex flex-col w-2/5 ">
          <div className="w-full text-3xl font-bold mt-6 flex justify-center pb-4">
            <h1>Novo Produto</h1>
          </div>
          <form
            onSubmit={(form) => sendBanner(form)}
            className=" w-full h-full"
          >
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">Nome</h1>
                <input
                  className="border-2 rounded-md px-2 py-1 border-gray-300"
                  type="text"
                  required
                  placeholder="Defina o nome do produto"
                  name="name"
                />
              </div>
            </div>
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">Categoria</h1>
                <Select
                  placeholder="Selecione uma categoria"
                  name="categoria"
                  required
                  options={data?.category.map((value) => {
                    return { label: value.name, value: value.id };
                  })}
                />
              </div>
            </div>

            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">Descrição</h1>
                <textarea
                  className="border-2 rounded-md px-2 h-32 py-1 border-gray-300"
                  type="text"
                  required
                  placeholder="Descreva o produto"
                  name="desc"
                />
              </div>
            </div>
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">
                  Link do video
                </h1>
                <input
                  className="border-2 rounded-md px-2  py-1 border-gray-300"
                  type="text"
                  required
                  placeholder="Video do youtube"
                  name="link"
                />
              </div>
            </div>
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">Detalhes</h1>
                <textarea
                  className="border-2 rounded-md px-2 py-1 h-32 border-gray-300"
                  type="text"
                  required
                  placeholder="Liste os detalhes do produto"
                  name="details"
                />
              </div>
            </div>
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">Preço 1</h1>
                <input
                  className="border-2 rounded-md px-2 py-1 border-gray-300"
                  type="text"
                  required
                  placeholder="Defina o preço"
                  name="price_one"
                />
              </div>
            </div>
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">Preço 2</h1>
                <input
                  className="border-2 rounded-md px-2 py-1 border-gray-300"
                  type="text"
                  required
                  placeholder="Defina o preço"
                  name="price_two"
                />
              </div>
            </div>
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">Preço 3</h1>
                <input
                  className="border-2 rounded-md px-2 py-1 border-gray-300"
                  type="text"
                  required
                  placeholder="Defina o preço"
                  name="price_three"
                />
              </div>
            </div>
            <div className="w-full ">
              <div className="w-full pb-2 justify-start px-1 flex text-xl font-semibold">
                <h1>Imagens</h1>
              </div>
              <div>
                <MultipleImages isCreate={true} ref={images} editImages={[]} />
              </div>
              {/* <div className="w-full mx-auto lg:mx-0 flex flex-col justify-center ">
                <div
                  onClick={() => input.current.click()}
                  className={
                    selectedFile
                      ? "flex mx-auto cursor-pointer hover:bg-opacity-10 transition-all duration-300 flex-col justify-center items-center w-full h-[200px] bg-gray-200"
                      : "flex mx-auto cursor-pointer hover:bg-opacity-10 transition-all duration-300 flex-col justify-center items-center w-full h-[200px] bg-gray-200 border-dashed border-gray-600 bg-opacity-40 border-2"
                  }
                >
                  {selectedFile && (
                    <img
                      className="h-full w-full"
                      alt="preview"
                      src={preview}
                    />
                  )}
                  <input
                    ref={input}
                    onChange={onSelectFile}
                    type="file"
                    className="hidden"
                    name="image"
                  />
                  {!selectedFile && (
                    <h2 className="text-gray-400 w-32 text-center">
                      Clique para adicionar uma imagem
                    </h2>
                  )}
                </div>
                {selectedFile && (
                  <span className=" pt-2 flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 hover:text-gray-300 cursor-pointer w-8 "
                      fill="none"
                      onClick={() => {
                        input.current.value = "";
                        setSelectedFile(undefined);
                      }}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </span>
                )}
              </div> */}
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
                  {loading ? "Cadastrando" : "Criar produto"}
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
