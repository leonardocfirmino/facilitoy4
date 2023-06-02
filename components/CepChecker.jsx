import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCep, setTakeInLocal } from "../redux/features/cepSlice";
import useSWR from "swr";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
function classOrganizer(...classes) {
  return classes.filter(Boolean).join(" ");
}
import { RadioGroup } from "@headlessui/react";
export default function CepChecker({ subdomain, endereco }) {
  const storeCep = useSelector((state) => state.cep);

  const [cep, setCep] = useState(storeCep.cep);
  const dispatch = useDispatch();

  const [isTakeInLocal, setIsTakeInLocal] = useState(storeCep.take_in_local);
  const [showValor, setShowValor] = useState(
    storeCep.cep != null ? storeCep : false
  );
  const fetcher = async (query) =>
    axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        (subdomain ? subdomain + "." : null) +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/get-franquia",
      query
    );

  const { data, mutate } = useSWR({ subdomain: subdomain }, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const calcCep = async () => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        (subdomain ? subdomain + "." : null) +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/cep-calc",
      {
        cep: cep.replace("-", ""),
        subdomain: subdomain,
      }
    );

    if (!response.data.isNull) {
      dispatch(
        addCep({
          cep: cep.replace("-", ""),
          value: response.data.cep.valor,
          cidade: response.data.cep.cidade,
          logradouro: response.data.logradouro,
          tempo: response.data.cep.tempo,
          bairro: response.data.cep.bairro,
        })
      );
      setShowValor({
        cep: cep.replace("-", ""),
        value: response.data.cep.valor,
        tempo: response.data.cep.tempo,
        logradouro: response.data.logradouro,
        cidade: response.data.cep.cidade,
        bairro: response.data.cep.bairro,
      });
    }
    if (response.data.isNull) {
      setShowValor({ isNull: true });
      dispatch(
        addCep({
          cep: null,
          value: 0,
          logradouro: null,
          take_in_local: false,
          cidade: null,
          bairro: null,
        })
      );
    }
  };
  const handleIsLocal = (value) => {
    setIsTakeInLocal(value);
    dispatch(setTakeInLocal(value));
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
      <div className="py-2">
        <RadioGroup value={isTakeInLocal} onChange={handleIsLocal}>
          <div className="-space-y-px rounded-md bg-white">
            {showValor ? (
              !showValor?.isNull ? (
                <RadioGroup.Option
                  value={false}
                  className={({ checked }) =>
                    classOrganizer(
                      checked
                        ? "bg-indigo-50 border-indigo-200 z-10"
                        : "border-gray-200",
                      "relative border p-4 flex cursor-pointer focus:outline-none"
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <span
                        className={classOrganizer(
                          checked
                            ? "bg-indigo-600 border-transparent"
                            : "bg-white border-gray-300",
                          active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                          "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                        )}
                        aria-hidden="true"
                      >
                        <span className="rounded-full bg-white w-1.5 h-1.5" />
                      </span>
                      <span className="ml-3 flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className={classOrganizer(
                            checked ? "text-indigo-900" : "text-gray-900",
                            "block text-sm font-medium"
                          )}
                        >
                          {showValor?.bairro + "," + " " + showValor?.cidade}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={classOrganizer(
                            checked ? "text-indigo-700" : "text-gray-500",
                            "block text-sm"
                          )}
                        >
                          R$ {showValor?.value} - Prazo de entrega,{" "}
                          {showValor?.tempo}{" "}
                          {showValor?.tempo > 1 ? "dias úteis." : "dia útil."}
                        </RadioGroup.Description>
                      </span>
                    </>
                  )}
                </RadioGroup.Option>
              ) : (
                <div className="flex border-gray-200 z-10 border justify-center py-4 flex-col gap-2 items-center">
                  <h1 className="font-semibold text-sm w-60 text-center">
                    Que pena... Esta unidade não atende sua região.
                  </h1>
                  <p className="text-xs w-60 text-center">
                    Caso deseje, você pode selecionar a opção de retirada
                    gratuita em nossa loja.
                  </p>
                </div>
              )
            ) : (
              ""
            )}
            {data?.data?.franquia[0].take_in_local && (
              <RadioGroup.Option
                value={true}
                className={({ checked }) =>
                  classOrganizer(
                    checked
                      ? "bg-indigo-50 border-indigo-200 z-10"
                      : "border-gray-200",
                    "relative border p-4 flex cursor-pointer focus:outline-none"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span
                      className={classOrganizer(
                        checked
                          ? "bg-indigo-600 border-transparent"
                          : "bg-white border-gray-300",
                        active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                        "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                      )}
                      aria-hidden="true"
                    >
                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                    </span>
                    <span className="ml-3 flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className={classOrganizer(
                          checked ? "text-indigo-900" : "text-gray-900",
                          "block text-sm font-medium"
                        )}
                      >
                        Retirar no local - Grátis
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className={classOrganizer(
                          checked ? "text-indigo-700" : "text-gray-500",
                          "block text-sm"
                        )}
                      >
                        {endereco}
                      </RadioGroup.Description>
                    </span>
                  </>
                )}
              </RadioGroup.Option>
            )}
          </div>
        </RadioGroup>
        <div className="w-full justify-center flex bg-blue-500 font-bold text-white py-2 mt-2 rounded-md">
          Frete grátis em compras acima de R${" "}
          {data?.data.franquia[0].frete_gratis_min}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const subdomain =
    ctx.req.headers["x-forwarded-host"] || ctx.req.headers["host"];
  if (process.env.NEXT_PUBLIC_PREFIX == "http://")
    if (subdomain.split(".")[1] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  if (process.env.NEXT_PUBLIC_PREFIX != "http://")
    if (subdomain.split(".")[3] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  return { props: { subdomain: subdomain.split(".")[0] } };
}
