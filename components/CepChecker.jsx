import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCep } from "../redux/features/cepSlice";
function classOrganizer(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function CepChecker({ subdomain, carrinho }) {
  const [cep, setCep] = useState("");
  const dispatch = useDispatch();
  const [showValor, setShowValor] = useState(false);
  const calcCep = async () => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        (subdomain ? subdomain + "." : null) +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/cep-calc",
      {
        cep: cep.replace("-", ""),
      }
    );
    setShowValor(response.data);
    if (carrinho && !showValor.isNull) {
      dispatch(
        addCep({ cep: cep.replace("-", ""), value: response.data.cep.valor })
      );
    }
  };
  return (
    <div className="">
      <div className="flex  items-end gap-4">
        <div>
          <label
            htmlFor="cep"
            className="block text-sm font-medium text-gray-700"
          >
            Calcular frete
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
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                />
              </svg>
            </div>
            <input
              type="cep"
              name="cep"
              id="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="block w-full form-input rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="00000-000"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => calcCep()}
          className="font-bold bg-blue-500 hover:bg-blue-700 duration-300 text-white px-4 py-2 rounded-md"
        >
          Calcular
        </button>
      </div>
      <div
        className={classOrganizer(
          showValor ? "h-28" : "h-0 hidden",
          "flex flex-col w-full duration-300 transition-all text-md justify-center bg-gray-300/50 mt-2 rounded-md gap-3 px-4 py-2 items-center"
        )}
      >
        {!showValor?.isNull ? (
          <>
            <div
              className={classOrganizer(
                showValor ? "flex" : "hidden",
                "gap-2  font-bold"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <h1>
                {showValor?.cep?.bairro + "," + " " + showValor?.cep?.cidade}
              </h1>
            </div>
            <div
              className={classOrganizer(showValor ? "flex" : "hidden", "gap-2")}
            >
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>

                <h1>Custo do frete</h1>
              </div>
              <span>R$ {showValor?.cep?.valor}</span>
            </div>
          </>
        ) : (
          <div className="flex justify-center flex-col gap-2 items-center">
            <h1 className="font-semibold">Endereço inválido</h1>
            <p className="text-sm">Não realizamos entregas neste endereço</p>
          </div>
        )}
      </div>
    </div>
  );
}
