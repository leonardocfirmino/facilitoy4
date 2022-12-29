import {
  useState,
  useMemo,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuillResize = ({ forwardedRef, user, initial }) => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
  });
  if (Quill && !quill) {
    Quill.register("modules/blotFormatter", BlotFormatter);
  }
  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", url);
  };
  useImperativeHandle(forwardedRef, () => ({
    getHtml() {
      return quill.root.innerHTML.replaceAll(`"`, `'`);
    },
  }));
  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

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

    insertToEditor(
      "https://space-primeblog.nyc3.cdn.digitaloceanspaces.com/" +
        link.data.image_url
    );
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };
  useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
      quill.clipboard.dangerouslyPasteHTML(initial);
    }
  }, [quill]);
  return (
    <div ref={forwardedRef}>
      <div ref={quillRef} />
    </div>
  );
};
QuillResize.displayName = "QuillResize";
export default QuillResize;
