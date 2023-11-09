/* eslint-disable @next/next/no-img-element */
import Select from "react-select"
import { useState } from "react"
import { useRouter } from "next/router"

import axios from "axios"
import useSWR from "swr"

import * as Dialog from "@radix-ui/react-dialog"
const ModalCidades = ({ isOpen, setOpen }) => {
  const router = useRouter()
  const [franquias, setFranquias] = useState(null)
  const [estado, setEstado] = useState()
  const fetcher = async query =>
    axios.get(
      process.env.NEXT_PUBLIC_PREFIX +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/all-franquias",
      query
    )

  const { data, mutate } = useSWR({}, fetcher)

  const sendToSite = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_PREFIX}${estado.value}.${process.env.NEXT_PUBLIC_SITE_URL}`
    )
  }

  if (data && franquias == null) {
    const franquiasAgrupadas = data.data.franquia.reduce((acc, franquia) => {
      const { estado, ...dadosFranquia } = franquia
      acc[estado] = acc[estado] || []
      if (
        !dadosFranquia.is_disabled &&
        dadosFranquia.subdomain != "franquiateste"
      )
        acc[estado].push({
          label: dadosFranquia.name,
          value: dadosFranquia.subdomain,
        })
      return acc
    }, {})
    const franquiasFormatoDesejado = Object.entries(franquiasAgrupadas).map(
      ([estado, franquias]) => ({
        label: estado,
        options: franquias,
      })
    )
    setFranquias(franquiasFormatoDesejado)
  }
  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
        <Dialog.Content className="z-40 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-full max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px]    focus:outline-none">
          <div className="w-full flex   flex-col justify-center items-center   bg-cover">
            {data && (
              <>
                <div className=" bg-faciRose z-30  px-6 mb-20 lg:min-w-[460px] py-4 rounded-2xl shadow-2xl">
                  <div className="w-full flex justify-center">
                    <img src="/logo.webp" className="w-52 h-28" alt="" />
                  </div>
                  <div className="flex gap-1 font-semibold pt-4 pb-2 justify-center w-full items-center text-center">
                    <p className="text-[#d72b3e]">Aluguel de brinquedos</p>
                    <p className="text-[#d72b3e]">e acessórios infantis</p>
                  </div>
                  {data && (
                    <Select
                      options={franquias}
                      onChange={value => setEstado(value)}
                      placeholder="Selecione a Facilitoy mais proxima de você"
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? "grey" : "black",
                          color: "black",
                        }),
                      }}
                      className="mt-2 border-black text-black"
                      /* formatGroupLabel={formatGroupLabel} */
                    />
                  )}

                  <button
                    onClick={() => sendToSite()}
                    className="hover:bg-[#1b7c80] transition-all duration-300 mt-4 bg-[#08b6bd] w-full rounded-full py-2 text-white font-bold"
                  >
                    Ir para o site
                  </button>
                  <div className="w-full text-sm pt-2 flex justify-center items-center">
                    <h2>
                      Não encontrou sua cidade? Seja um{" "}
                      <a
                        href="https://facilitoyfranquia.com.br"
                        className="text-blue-400 underline"
                      >
                        franqueado Facilitoy!
                      </a>
                    </h2>
                  </div>
                </div>
              </>
            )}
          </div>
          <Dialog.Close>
            <div
              className="text-faciBlue z-30 hover:bg-faciBlue/30 focus:shadow-black absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => setOpen(!isOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-faciBlue"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
export default ModalCidades
