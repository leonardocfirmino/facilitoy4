import LayoutAdm from "../../../components/LayoutAdm";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import request from "graphql-request";
import useSWR from "swr";
import { useRouter } from "next/router";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditBanner({ sessions }) {
  const user = JSON.parse(sessions);
  const router = useRouter();
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
      product(where: {id: {_eq: "${router.query.edit}"}}) {
        created_at
        name
        slug
        product_images {
          src
        }
        id
        
      }
      
    }`,
    fetcher
  );
  const [selectedFile, setSelectedFile] = useState("edit");
  const [preview, setPreview] = useState(undefined);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    if (selectedFile == "edit") {
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
  const deleteBanner = (id) => {
    Swal.fire({
      title: "Deseja excluir este post?",
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
              delete_banner_by_pk(id: ${id}) {
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
          "O post foi excluido com sucesso",
          "success"
        ).then(() => {
          router.push(
            process.env.NEXT_PUBLIC_PREFIX +
              process.env.NEXT_PUBLIC_SITE_URL +
              "/adm"
          );
        });
      }
    });
  };
  const editBanner = async (form) => {
    form.preventDefault();
    const formData = new FormData();
    formData.append("image", form.target.image.files[0]);
    formData.append("name", form.target.name.value);
    formData.append("id", router.query.edit);
    formData.append("link", form.target.link.value);
    try {
      await axios.put(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/createBanner",

        formData,

        {
          headers: {
            authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
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
  if (data) {
    if (preview == undefined) {
      setPreview(
        `https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/${data.product[0].product_images[0].src}`
      );
    }
  }
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
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col w-2/5 h-1/2 ">
          <div className="w-full text-3xl font-bold flex justify-center pb-4">
            <h1>Editar produto</h1>
          </div>
          {data && (
            <form
              onSubmit={(form) => editBanner(form)}
              className=" w-full h-full"
            >
              <div className="w-full  items-start">
                <div className="w-full   flex flex-col justify-center pb-4">
                  <h1 className="text-xl font-semibold px-1 pb-2">Nome</h1>
                  <input
                    className="border-2 rounded-md px-2 py-1 border-gray-300"
                    type="text"
                    defaultValue={data.product[0].name}
                    name="name"
                  />
                </div>
              </div>
              <div className="w-full  items-start">
                <div className="w-full   flex flex-col justify-center pb-4">
                  <h1 className="text-xl font-semibold px-1 pb-2">Link</h1>
                  <input
                    className="border-2 rounded-md px-2 py-1 border-gray-300"
                    type="text"
                    defaultValue={data.product[0].slug}
                    name="link"
                  />
                </div>
              </div>
              <div className="w-full ">
                <div className="w-full pb-2 justify-start px-1 flex text-xl font-semibold">
                  <h1>Imagem</h1>
                </div>
                <div className="w-full mx-auto lg:mx-0 flex flex-col justify-center ">
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
                </div>
              </div>
              <div className="w-full mt-4 space-x-4 justify-end flex">
                <button
                  type="button"
                  onClick={() => deleteBanner(data.product[0].id)}
                  className="px-4 py-2 bg-red-600 text-xl hover:bg-red-700  font-bold text-white rounded-lg"
                >
                  Excluir produto
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-xl font-bold text-white rounded-lg">
                  Editar produto
                </button>
              </div>
            </form>
          )}
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
