import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Swal from "sweetalert2";
function classOrganizer(...classes) {
  return classes.filter(Boolean).join(" ");
}
const MultipleImages = forwardRef((props, ref) => {
  const [images, setImages] = useState([]);
  const input = useRef();
  const [imageURLS, setImageURLs] = useState([]);
  const [fileBanco, setFileBanco] = useState([]);
  const [fileToRemove, setFileToRemove] = useState([]);
  const [principal, setPrincipal] = useState(
    props.isCreate
      ? null
      : props.principal_image_id == null
      ? props.editImages[0].id
      : props.principal_image_id
  );
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
    getPrincipal() {
      return principal;
    },
    resetImages(images) {
      setImageURLs([]);
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
  useEffect(() => {
    setFileBanco(props.editImages);
  }, [props]);
  function onImageChange(e) {
    setImages([...e.target.files]);
  }
  const setPrincipalImage = (id) => {
    setPrincipal(id);
  };

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
        <div className="flex flex-col gap-4 justify-center items-center min-h-[100px]  mt-4  border-dashed border border-gray-400/70">
          {!props.isCreate && (
            <h1 className="font-semibold pt-2 w-full text-center text-gray-700/70 text-xl">
              Pendentes
            </h1>
          )}
          <div
            className={classOrganizer(
              props.isCreate && "mt-4",
              "flex  w-full  gap-4 justify-center items-center"
            )}
          >
            {imageURLS.map((imageSrc, index) => (
              <div
                key={index}
                className="flex opacity-70 flex-col relative group"
              >
                <img
                  src={imageSrc}
                  alt="not fount"
                  className=" w-32 object-contain"
                />
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
                  className="w-full h-full   duration-300 flex justify-center items-center z-10 text-red-500 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          {!props.isCreate && (
            <h1 className="font-semibold border-t-2 pt-2 w-full text-center text-gray-700 text-xl">
              Salvas
            </h1>
          )}
          <div className="flex  w-full  gap-4 justify-center items-center">
            {fileBanco.map((imageSrc, index) => (
              <div key={index} className="relative flex flex-col group">
                <button
                  type="button"
                  onClick={() => setPrincipalImage(imageSrc.id)}
                  className={classOrganizer(
                    imageSrc.id == principal && "border-green-500 border-4",
                    "w-full relative rounded-md flex flex-col items-center text-green-500 font-bold"
                  )}
                >
                  <img
                    src={
                      "https://space-facilitoy.sfo3.digitaloceanspaces.com/" +
                      imageSrc.src
                    }
                    className=" w-32 object-contain"
                  />
                  <p
                    className={
                      imageSrc.id == principal
                        ? "flex w-full text-center justify-center bg-black/60 absolute py-1 bottom-0"
                        : "hidden"
                    }
                  >
                    Principal
                  </p>
                </button>
                <button
                  onClick={() => {
                    funcToRemoveFile(index, imageSrc.src);
                  }}
                  type="button"
                  className="w-full h-full flex duration-300 justify-center items-center z-10 text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
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
