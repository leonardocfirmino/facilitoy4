import Layout from "../../../components/Layout";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useState, useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Editor = dynamic(() => import("../../../components/quill"), {
  ssr: false,
});
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);

export default function CreatePost({ sessions }) {
  const user = JSON.parse(sessions);
  useEffect;
  const sendPost = async (form) => {
    form.preventDefault();
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_PREFIX +
          process.env.NEXT_PUBLIC_SITE_URL +
          "/api/userQuery",
        {
          query: `mutation{
          insert_post_one(object: {body: "${value}", slug: "${form.target.url.value}", title:"${form.target.title.value}", description:"${form.target.desc.value}"}) {
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
  const quillRef = useRef();
  const imageHandler = () => {
    const input = document.createElement("input");
    const editor = quillRef.current.getEditor();
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append("image", file);

      try {
        const link = await axios.post(
          process.env.NEXT_PUBLIC_PREFIX +
            process.env.NEXT_PUBLIC_SITE_URL +
            "/api/imagePost",

          formData,

          {
            headers: {
              authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        editor.insertEmbed(
          editor.getSelection(),
          "image",
          "https://space-primeblog.nyc3.cdn.digitaloceanspaces.com/" +
            link.data.image_url
        );
      } catch (err) {
        console.log("upload err:", err);
      }
    };
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image", "code-block"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );
  const [value, setValue] = useState("");

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
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col w-3/5  ">
          <div className="w-full text-3xl font-bold flex justify-center pb-4">
            <h1>Novo post</h1>
          </div>
          <form onSubmit={(form) => sendPost(form)} className=" w-full h-full">
            <div className="w-full  items-start">
              <div className="w-full   flex flex-col justify-center pb-4">
                <h1 className="text-xl font-semibold px-1">Título</h1>
                <input
                  className="border-2 rounded-md px-2 py-1 border-gray-300"
                  type="text"
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
                  name="url"
                />
              </div>
            </div>
            <div className="w-full   ">
              <ReactQuill
                theme="snow"
                forwardedRef={quillRef}
                className="w-full  "
                modules={modules}
                value={value}
                onChange={setValue}
              />
              <Editor />
            </div>
            <div className="w-full mt-4 justify-end flex">
              <button className="px-4 py-2 bg-green-600 text-xl font-bold text-white rounded-lg">
                Criar post
              </button>
            </div>
          </form>
        </div>
      </div>
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
