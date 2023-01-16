import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Swal from "sweetalert2";
const MultipleImages = forwardRef((props, ref) => {
  const [images, setImages] = useState([]);
  const input = useRef();
  const [imageURLS, setImageURLs] = useState([]);
  const [fileBanco, setFileBanco] = useState(props.editImages);
  const [fileToRemove, setFileToRemove] = useState([]);
  useImperativeHandle(ref, () => ({
    sendFiles() {
      const fileSend = images;
      if (props.editImages.length > 0) setImages([]);
      return fileSend;
    },

    sendFilesToRemove() {
      const fileSend = fileToRemove;
      setImages([]);
      return fileSend;
    },
  }));
  const funcToRemoveFile = (fileIndex, name) => {
    Swal.fire({
      title: "Deseja retirar este anexo?",
      showCancelButton: true,
      text: name,
      cancelButtonText: "Manter",
      confirmButtonText: "Retirar",
      confirmButtonColor: "#dc3741",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (fileToRemove.length >= 1) {
          setFileToRemove((oldArray) => [...oldArray, fileBanco[fileIndex].id]);
        }
        if (fileToRemove.length == 0) {
          setFileToRemove([fileBanco[fileIndex].id]);
        }
        if (fileBanco.length > 1) {
          setFileBanco(fileBanco.filter((value, index) => fileIndex != index));
        }
        if (fileBanco.length <= 1) {
          setFileBanco([]);
        }
      }
    });
  };
  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  return (
    <div ref={ref}>
      <input
        ref={input}
        type="file"
        name="images"
        multiple
        accept="image/*"
        className="hidden"
        onChange={onImageChange}
      />

      {imageURLS.length > 0 || fileBanco?.length > 0 ? (
        <div className="flex gap-4 justify-center items-center min-h-[100px] flex-wrap mt-4 p-3 border-dashed border border-gray-400/70">
          {imageURLS.map((imageSrc, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => {
                  setImageURLs(
                    imageURLS.filter((value, indexArr) => indexArr != index)
                  );
                  setImages(
                    images.filter((value, indexArr) => indexArr != index)
                  );
                }}
                type="button"
                className="w-full h-full hidden absolute duration-300 group-hover:flex justify-center items-center z-10 text-red-500 bg-black/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={imageSrc}
                alt="not fount"
                className=" w-32 object-contain"
              />
            </div>
          ))}
          {fileBanco.map((imageSrc, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => {
                  funcToRemoveFile(index, imageSrc.src);
                }}
                type="button"
                className="w-full h-full hidden absolute duration-300 group-hover:flex justify-center items-center z-10 text-red-500 bg-black/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={
                  "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                  imageSrc.src
                }
                className=" w-32 object-contain"
              />
            </div>
          ))}
          <div
            onClick={() => input.current.click()}
            className="w-full flex justify-center items-center"
          >
            <button
              type="button"
              className="flex font-bold  gap-2 hover:bg-gray-400/30 duration-300 justify-center items-center px-4 py-4 rounded-full text-gray-400/70 text-xl"
            >
              <span className=""> Adicionar imagem</span>
              <PlusCircleIcon className="w-12 h-12" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => input.current.click()}
          className="font-bold text-xl w-full h-full min-h-[100px] mt-4  border-dashed border border-gray-400/70 text-gray-400/80"
        >
          Clique aqui para enviar as imagens
        </button>
      )}
    </div>
  );
});
MultipleImages.displayName = "MultipleImages";
export default MultipleImages;
