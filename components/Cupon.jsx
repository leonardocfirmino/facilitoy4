import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classOrganizer from "../helpers/classOrganizer";
export default function Cupon({ cupon, products, setCupon }) {
  const [inputState, setInputState] = useState("default");
  const [cuponInput, setCuponInput] = useState();
  const checkCupon = async () => {
    if (products.length < 1) {
      return toast.info(
        "O cupom só pode ser aplicado caso haja brinquedos em seu carrinho",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
    const response = await axios.post("/api/cupon-checker", {
      cupon: cuponInput,
    });

    if (response.data.available == false) {
      toast.error("Cupom já usado ou indisponível", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return setInputState("error");
    }

    toast.success("Cupom aplicado com sucesso", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setInputState("success");
    setCupon(response.data.data);
  };
  return (
    <div className="flex flex-col items-center">
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
        theme="light"
      />
      <div className="flex  items-end gap-4">
        <div>
          <label
            htmlFor="cep"
            className="block text-sm font-medium text-gray-700"
          >
            Cupom
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="cupon"
              value={cuponInput}
              onChange={(e) => setCuponInput(e.target.value)}
              className={classOrganizer(
                inputState == "error" &&
                  "border-red-500 focus:border-red-500 focus:ring-red-600",
                inputState == "success" &&
                  "border-green-500 focus:border-green-500 focus:ring-green-600",
                inputState == "default" &&
                  "border-gray-300  focus:border-indigo-500 focus:ring-indigo-500",
                "block w-full form-input rounded-md pl-10  sm:text-sm"
              )}
              placeholder="Insira o cupom"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => checkCupon()}
          className="font-bold bg-green-500 hover:bg-green-600 duration-300 text-white px-4 py-2 rounded-md"
        >
          Aplicar
        </button>
      </div>
      {inputState == "success" && (
        <span className="text-sm mt-1 text-green-500 font-semibold">
          Cupom aplicado com sucesso!
        </span>
      )}
    </div>
  );
}
