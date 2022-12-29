/* eslint-disable react/display-name */
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import request from "graphql-request";
import { useState, useMemo, useRef, forwardRef } from "react";
import Swal from "sweetalert2";

import axios from "axios";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Quill = dynamic(import("../../../components/QuillResize"), {
  ssr: false,
});

const QuillResize = forwardRef((props, ref) => {
  return <Quill {...props} forwardedRef={ref} />;
});
export default function PostEdit({ sessions }) {
  const user = JSON.parse(sessions);
  const router = useRouter();
  const quillRef = useRef();
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
      post(where: {id: {_eq: ${router.query.edit}}}) {
        created_at
        slug
        title
        description
        body
        id
      }
      
    }`,
    fetcher
  );
  const deletePost = (id) => {
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
              delete_post_by_pk(id: ${id}) {
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
              "/user"
          );
        });
      }
    });
  };
  const editPost = async (form) => {
    form.preventDefault();
    const html = quillRef.current.getHtml();
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/userQuery",
        {
          query: `mutation{
            update_post_by_pk(pk_columns: {id: ${router.query.edit}}, _set: {body: "${html}", slug: "${form.target.url.value}", title:"${form.target.title.value}", description:"${form.target.desc.value}"}) {
              body
              slug
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
      toast.error("Título já está em uso", {
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
      {data && (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="flex flex-col w-3/5 h-1/2 ">
            <div className="w-full text-3xl font-bold flex justify-center pb-4">
              <h1>Editar post</h1>
            </div>
            <form
              onSubmit={(form) => editPost(form)}
              className=" w-full h-full"
            >
              <div className="w-full  items-start">
                <div className="w-full   flex flex-col justify-center pb-4">
                  <h1 className="text-xl font-semibold px-1">Título</h1>
                  <input
                    className="border-2 rounded-md px-2 py-1 border-gray-300"
                    type="text"
                    defaultValue={data.post[0].title}
                    name="title"
                  />
                </div>
              </div>
              <div className="w-full  items-start">
                <div className="w-full   flex flex-col justify-center pb-4">
                  <h1 className="text-xl font-semibold px-1">Descrição</h1>
                  <input
                    className="border-2 rounded-md px-2 py-1 border-gray-300"
                    type="text"
                    defaultValue={data.post[0].description}
                    name="desc"
                  />
                </div>
              </div>
              <div className="w-full  items-start">
                <div className="w-full   flex flex-col justify-center pb-4">
                  <h1 className="text-xl font-semibold px-1">URL</h1>
                  <input
                    className="border-2 rounded-md px-2 py-1 border-gray-300"
                    type="text"
                    defaultValue={data.post[0].slug}
                    name="url"
                  />
                </div>
              </div>
              <div className="w-full   ">
                <QuillResize
                  ref={quillRef}
                  user={user}
                  initial={data.post[0].body}
                />
              </div>
              <div className="w-full mt-4 justify-end space-x-4 flex">
                <button
                  type="button"
                  onClick={() => deletePost(data.post[0].id)}
                  className="px-4 py-2 bg-red-600 text-xl hover:bg-red-700  font-bold text-white rounded-lg"
                >
                  Excluir post
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-xl font-bold text-white rounded-lg">
                  Editar post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
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
  if (session?.user?.role == "admin") {
    return {
      redirect: {
        destination: `/adm/`,
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
