/* eslint-disable @next/next/no-img-element */
import Select from "react-select"
import { useState } from "react"
import { useRouter } from "next/router"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import axios from "axios"
import useSWR from "swr"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { validate } from "graphql"
const SelectEstado = () => {
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
  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }
  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
  }

  const sendToSite = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_PREFIX}${estado.value}.${process.env.NEXT_PUBLIC_SITE_URL}`
    )
  }
  const images = [
    "/footer-estado/1.jpg",
    "/footer-estado/2.jpg",
    "/footer-estado/3.jpg",
    "/footer-estado/4.jpg",
    "/footer-estado/5.jpg",
    "/footer-estado/6.jpg",
    "/footer-estado/7.jpeg",
    "/footer-estado/8.jpeg",
    "/footer-estado/9.jpeg",
    "/footer-estado/10.jpeg",
  ]
  if (data && franquias == null) {
    const SP = data.data.franquia
      .map(value => {
        if (value.estado == "SP") {
          if (value.subdomain == "indaiatuba") {
            return false
          }
          if (value.subdomain == "rio-das-ostras")
            return { label: value.name, value: "roemacae" }
          if (value.subdomain == "roemacae")
            return { label: "Macaé", value: "roemacae" }
          return { label: value.name, value: value.subdomain }
        }
      })
      .filter(item => !!item)
    const RJ = data.data.franquia
      .map(value => {
        if (value.subdomain == "campos") {
          return false
        }
        if (value.estado == "RJ") {
          if (value.subdomain == "rio-das-ostras")
            return { label: value.name, value: "roemacae" }
          if (value.subdomain == "roemacae")
            return { label: "Macaé", value: "roemacae" }
          return { label: value.name, value: value.subdomain }
        }
        return false
      })
      .filter(item => !!item)
    const MT = data.data.franquia
      .map(value => {
        if (value.estado == "MT") {
          if (value.subdomain == "rio-das-ostras")
            return { label: value.name, value: "roemacae" }
          if (value.subdomain == "roemacae")
            return { label: "Macaé", value: "roemacae" }
          return { label: value.name, value: value.subdomain }
        }
        return false
      })
      .filter(item => !!item)
    const MG = data.data.franquia
      .map(value => {
        if (value.estado == "MG") {
          if (value.subdomain == "rio-das-ostras")
            return { label: value.name, value: "roemacae" }
          if (value.subdomain == "roemacae")
            return { label: "Macaé", value: "roemacae" }
          return { label: value.name, value: value.subdomain }
        }
        return false
      })
      .filter(item => !!item)
    const GOIAS = data.data.franquia
      .map(value => {
        if (value.estado == "GOIAS") {
          if (value.subdomain == "rio-das-ostras")
            return { label: value.name, value: "roemacae" }
          if (value.subdomain == "roemacae")
            return { label: "Macaé", value: "roemacae" }
          return { label: value.name, value: value.subdomain }
        }
        return false
      })
      .filter(item => !!item)

    const ES = data.data.franquia
      .map(value => {
        if (value.estado == "ES") {
          if (value.subdomain == "rio-das-ostras")
            return { label: value.name, value: "roemacae" }
          if (value.subdomain == "roemacae")
            return { label: "Macaé", value: "roemacae" }
          return { label: value.name, value: value.subdomain }
        }
        return false
      })
      .filter(item => !!item)
    const SP_CAPITAL = data.data.franquia
      .map(value => {
        if (value.subdomain == "pinheiros") {
          return false
        }
        if (value.estado == "SP CAPITAL") {
          if (value.subdomain == "santos-guaruja")
            return { label: "Santos", value: "santos-guaruja" }
          return { label: value.name, value: value.subdomain }
        }
        return false
      })
      .filter(item => !!item)
    const PARA = data.data.franquia
      .map(value => {
        if (value.subdomain == "pinheiros") {
          return false
        }
        if (value.estado == "PARA") {
          return { label: value.name, value: value.subdomain }
        }
        return false
      })
      .filter(item => !!item)
    const PARANA = data.data.franquia
      .map(value => {
        if (value.subdomain == "pinheiros") {
          return false
        }
        if (value.estado == "PARANÁ") {
          return { label: value.name, value: value.subdomain }
        }
        return false
      })
      .filter(item => !!item)
    const SERGIPE = data.data.franquia
      .map(value => {
        if (value.subdomain == "pinheiros") {
          return false
        }
        if (value.estado == "SERGIPE") {
          return { label: value.name, value: value.subdomain }
        }
        return false
      })
      .filter(item => !!item)
    SP_CAPITAL.push({ label: "Guaruja", value: "santos-guaruja" })
    setFranquias([
      { label: "SP", options: SP },
      /* { label: "SP CAPITAL", options: SP_CAPITAL }, */
      { label: "RJ", options: RJ },
      { label: "GOIAS", options: GOIAS },
      { label: "MT", options: MT },
      { label: "MG", options: MG },
      { label: "ES", options: ES },
      { label: "PARÁ", options: PARA },
      { label: "PARANÁ", options: PARANA },
      { label: "SERGIPE", options: SERGIPE },
    ])
  }
  return (
    <div className="w-full flex estadoClass  flex-col justify-center items-center  flex-1 h-screen bg-cover">
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

          <div className="w-full bg-[#f2f2f2] py-2  absolute bottom-0">
            <Swiper
              spaceBetween={10}
              slidesPerView={8}
              modules={[Navigation]}
              navigation
              breakpoints={{
                360: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 3,
                },
                1025: {
                  slidesPerView: 6,
                },
                1400: {
                  slidesPerView: 7,
                },
              }}
              className=" swiper-container  "
            >
              {images.map((value, index) => {
                return (
                  <SwiperSlide key={index}>
                    <a className="relative text-center  flex flex-col items-center justify-start  text-gray-600">
                      <img
                        src={value}
                        className="sm:w-48 sm:h-48 2xl:w-64 w-32 h-32 2xl:h-64 rounded-md object-cover"
                        alt=""
                      />
                    </a>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </>
      )}
    </div>
  )
}
export default SelectEstado
