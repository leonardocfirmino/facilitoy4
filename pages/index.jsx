import useSWR from "swr"

import axios from "axios"
import Head from "next/head"
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import Layout from "../components/Layout"
import HomeCarrousel2 from "../components/home/carrousel2"
import HomeCarrousel1 from "../components/home/carrousel1"
import Razoes from "../components/home/razoes"
import Hero1 from "../components/home/hero1"
import Sobre from "../components/home/sobre"
import Duvidas from "../components/home/duvidas"
import Testimonals from "../components/home/testimonals"
import HomeCarrousel3 from "../components/home/carrousel3"
import Steps from "../components/home/steps"
import EmpresasCarrousel from "../components/home/empresas"
import Astrolovers from "../components/home/astrolovers"
import AgeBalls from "../components/home/AgeBalls"
import { SyncLoader } from "react-spinners"
import ModalCidades from "../components/ModalCidades"
import { useEffect, useRef } from "react"

const localeInfo = {
  // Options.jsx
  items_per_page: "/ page",
  jump_to: "Ir até",
  jump_to_confirm: "confirmar",
  page: "Página",

  // Pagination.jsx
  prev_page: "Página anterior",
  next_page: "Próxima página",
  prev_5: "Voltar 5 páginas",
  next_5: "Pular 5 Páginas",
  prev_3: "Voltar 3 Páginas",
  next_3: "Pular 3 Páginas",
  page_size: "Támanho da página",
}
const Blog = ({ subdomain }) => {
  const router = useRouter()
  console.log(router)
  const [ages, setAges] = useState([])

  const [modal, setModal] = useState(false)
  const fetcher = async query => axios.get(query, {})
  const isDragging = useRef(false)
  const { data, mutate } = useSWR(
    process.env.NEXT_PUBLIC_PREFIX +
      subdomain +
      "." +
      process.env.NEXT_PUBLIC_SITE_URL +
      "/api/home-data",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const empresas = [
    {
      image: "/empresas/4moms.png",
      name: "4 Moms",
    },
    {
      image: "/empresas/chicco.png",
      name: "Chicco",
    },
    {
      image: "/empresas/cosco.png",
      name: "Cosco",
    },
    {
      image: "/empresas/safety.png",
      name: "Safety",
    },
    {
      image: "/empresas/fisher.png",
      name: "Fisher-Price",
    },
    {
      image: "/empresas/girotondo.png",
      name: "Girotondo",
    },
    {
      image: "/empresas/infantino.png",
      name: "Infantino",
    },
    {
      image: "/empresas/ingenuity.png",
      name: "Ingenuity",
    },
    {
      image: "/empresas/skip hop.png",
      name: "Skip Hop",
    },
    {
      image: "/empresas/melissa e doug.png",
      name: "Melissa & Doug",
    },
    {
      image: "/empresas/vtech.png",
      name: "Vtech",
    },
  ]

  const handleClick = () => {
    if (!isDragging.current) {
      setModal(true)
    }
  }

  useEffect(() => {
    const parentElement = document.getElementById("parentElement")

    if (parentElement) {
      parentElement.addEventListener("mousedown", () => {
        isDragging.current = true
      })

      parentElement.addEventListener("mouseup", () => {
        isDragging.current = false
      })

      parentElement.addEventListener("click", event => {
        if (isDragging.current) {
          event.stopPropagation() // Impede a propagação do evento para os elementos filhos
        }
      })
    }

    return () => {
      if (parentElement) {
        parentElement.removeEventListener("mousedown", () => {
          isDragging.current = true
        })
        parentElement.removeEventListener("mouseup", () => {
          isDragging.current = false
        })
        parentElement.removeEventListener("click", event => {
          if (isDragging.current) {
            event.stopPropagation()
          }
        })
      }
    }
  }, [])

  useEffect(() => {
    if (!router.query.modal) {
      setModal(false)
    }
    if (router.query.open) {
      setModal(true)
    }
  }, [router])
  if (data) {
    if (data.data.category == undefined) {
      router.reload()
    }
  }
  return (
    <>
      <ModalCidades isOpen={modal} setOpen={setModal} />
      <div onClick={handleClick}>
        <div className={router.query.modal && !modal && "pointer-events-none"}>
          <Layout subdomain={subdomain}>
            <div className="w-full h-full">
              <Hero1 />
              {subdomain && data && data.data.category?.length > 0 ? (
                <HomeCarrousel1 data={data.data.category} />
              ) : (
                subdomain && (
                  <div className=" h-60 flex justify-center items-center">
                    <SyncLoader color="#ff2336" size={30} />
                  </div>
                )
              )}
              {subdomain && data && data.data.product?.length > 0 ? (
                <HomeCarrousel2
                  data={data.data.product}
                  vendidos={data.data.home_vendidos}
                />
              ) : (
                subdomain && (
                  <div className=" h-60 flex justify-center items-center">
                    <SyncLoader color="#ff2336" size={30} />
                  </div>
                )
              )}
              <Steps subdomain={subdomain} />
              {subdomain && data && data.data.home_recomendados?.length > 0 && (
                <HomeCarrousel3 data={data.data.home_recomendados} />
              )}
              <AgeBalls subdomain={subdomain} />
              <Razoes />
              <Sobre />
              <EmpresasCarrousel data={empresas} />
              <Duvidas />
              <Astrolovers />
              <Testimonals />
            </div>
          </Layout>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const subdomain =
    ctx.req.headers["x-forwarded-host"] || ctx.req.headers["host"]

  if (ctx.req.url.includes("modal")) return { props: { subdomain: "" } }
  if (process.env.NEXT_PUBLIC_PREFIX == "http://")
    if (subdomain.split(".")[1] == undefined)
      return {
        redirect: {
          destination:
            process.env.NEXT_PUBLIC_PREFIX +
            process.env.NEXT_PUBLIC_SITE_URL +
            `/?modal=true`,
          permanent: false,
        },
      }
  if (process.env.NEXT_PUBLIC_PREFIX != "http://")
    if (subdomain.split(".")[3] == undefined)
      return {
        redirect: {
          destination:
            process.env.NEXT_PUBLIC_PREFIX +
            process.env.NEXT_PUBLIC_SITE_URL +
            `/?modal=true`,
          permanent: false,
        },
      }
  return { props: { subdomain: subdomain.split(".")[0] } }
}
export default Blog
