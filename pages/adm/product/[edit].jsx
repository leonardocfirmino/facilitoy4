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
        description
        details
        category_id
        product_images {
          id
          src
        }
        category{
          id
          name
        }
        id
        
      }
      category {
        name
        image_src
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

  const multipleImage = useRef();
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
              delete_product_by_pk(id: "${id}") {
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

    formData.append("name", form.target.name.value);
    formData.append("id", router.query.edit);
    console.log(router.query.edit);
    console.log(form.target.categoria.value);
    formData.append("link", form.target.link.value);
    formData.append("desc", form.target.desc.value);
    formData.append("category", form.target.categoria.value);
    formData.append("details", form.target.details.value);
    multipleImage.current.sendFiles()?.map((value) => {
      formData.append("images", value);
    });

    multipleImage.current.sendFilesToRemove()?.map((value) => {
      formData.append("imagesToRemove", value);
    });

    try {
      await axios.put(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/editProduto",

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
        `https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/${data.product[0]?.product_images[0]?.src}`
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

      <div className="flex flex-col w-2/5 mx-auto my-auto py-10 ">
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
                <h1 className="text-xl font-semibold px-1 pb-2">Categoria</h1>
                <Select
                  placeholder="Selecione uma categoria"
                  name="categoria"
                  required
                  defaultValue={{
                    value: data?.category[0].id,
                    label: data?.category[0].name,
                  }}
                  options={data?.category.map((value) => {
                    return { label: value.name, value: value.id };
                  })}
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
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">Descrição</h1>
                <textarea
                  className="border-2 rounded-md px-2 h-32 py-1 border-gray-300"
                  type="text"
                  required
                  defaultValue={data.product[0].description}
                  placeholder="Descreva o produto"
                  name="desc"
                />
              </div>
            </div>
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1 pb-2">Detalhes</h1>
                <textarea
                  className="border-2 rounded-md px-2 h-32 py-1 border-gray-300"
                  type="text"
                  required
                  defaultValue={data.product[0].details}
                  placeholder="Descreva os detalhes"
                  name="details"
                />
              </div>
            </div>
            <div className="w-full ">
              <div className="w-full pb-2 justify-start px-1 flex text-xl font-semibold">
                <h1>Imagens</h1>
              </div>
              <div>
                <MultipleImages
                  ref={multipleImage}
                  editImages={data?.product[0].product_images}
                />
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
