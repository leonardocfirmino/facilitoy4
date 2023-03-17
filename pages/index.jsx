import useSWR from "swr";

import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "../components/Layout";
import HomeCarrousel2 from "../components/home/carrousel2";
import HomeCarrousel1 from "../components/home/carrousel1";
import Razoes from "../components/home/razoes";
import Hero1 from "../components/home/hero1";
import Sobre from "../components/home/sobre";
import Duvidas from "../components/home/duvidas";
import Testimonals from "../components/home/testimonals";
import HomeCarrousel3 from "../components/home/carrousel3";
import Steps from "../components/home/steps";
import EmpresasCarrousel from "../components/home/empresas";
import Astrolovers from "../components/home/astrolovers";

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
};
const Blog = ({ subdomain }) => {
  const router = useRouter();

  const [ages, setAges] = useState([]);
  const fetcher = async (query) =>
    axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        subdomain +
        "." +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/home-data",
      query,
      {}
    );

  const { data, mutate } = useSWR({ subdomain: subdomain }, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const carrousel1 = [
    {
      image: "/carrousel-1/1.png",
      name: "Jumperoo",
    },
    {
      image: "/carrousel-1/2.png",
      name: "Centro de atividades",
    },
    {
      image: "/carrousel-1/3.png",
      name: "Mamaroo",
    },
    {
      image: "/carrousel-1/4.png",
      name: "Tapete de atividades",
    },
    {
      image: "/carrousel-1/5.png",
      name: "Cercadinho",
    },
    {
      image: "/carrousel-1/6.png",
      name: "Mini veículo Elétrico",
    },
    {
      image: "/carrousel-1/7.webp",
      name: "Playground",
    },
    {
      image: "/carrousel-1/8.webp",
      name: "Cadeira bumbo",
    },
  ];
  const carrousel2 = [
    {
      image: "/carrousel-2/1.jpeg",
      name: "Torre de Carrinhos",
      price: 89,
      slug: "torre-de-carrinhos",
    },
    {
      image: "/carrousel-2/2.png",
      name: "Mesa Estação de Atividades (1)",
      price: 89,
      slug: "mega-estacao-de-carrinhos-1",
    },
    {
      image: "/carrousel-2/3.jpeg",
      name: "Play Urso (1)",
      price: 119,
      slug: "play-urso-1",
    },
    {
      image: "/carrousel-2/4.jpg",
      name: "Mega Estação Selva",
      price: 89,
      slug: "mega-estacao-selva",
    },
    {
      image: "/carrousel-2/5.jpg",
      name: "Cercadinho Playground Cinza (3)",
      price: 109,
      slug: "cercadinho-cinza",
    },
    {
      image: "/carrousel-2/6.jpg",
      name: "Escorrega de Plastico",
      price: 79,
      slug: "escorrega-plastico",
    },
    {
      image: "/carrousel-2/7.jpg",
      name: "Escorregador 2 degraus e gangorra",
      price: 59,
      slug: "escorregador-dois-degraus",
    },
    {
      image: "/carrousel-2/8.jpg",
      name: "Centro de atividades Summer Safari",
      price: 89,
      slug: "centro-safari",
    },
    {
      image: "/carrousel-2/9.jpeg",
      name: "Cama elastica colorida",
      price: 160,
      slug: "cama-elastica",
    },
    {
      image: "/carrousel-2/10.jpg",
      name: "Banheira dobravel azul",
      price: 79,
      slug: "banheira-dobravel",
    },
    {
      image: "/carrousel-2/11.webp",
      name: "Caminhão Food Truck",
      price: 129,
      slug: "caminhao-food-truck",
    },
    {
      image: "/carrousel-2/12.jpg",
      name: "Moto Elétrica azul",
      price: 79.0,
      slug: "moto-eletrica",
    },
  ];
  const empresas = [
    {
      image: "/empresas/4moms.jpg",
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
      image: "/empresas/safety.jpg",
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
  ];
  return (
    <Layout subdomain={subdomain}>
      <div className="w-full h-full">
        <Hero1 />
        {data && <HomeCarrousel1 data={data.data.category} />}
        {data && <HomeCarrousel2 data={data.data.product} />}
        <Steps />
        <HomeCarrousel3 data={carrousel2} />
        <Razoes />
        <Sobre />
        <EmpresasCarrousel data={empresas} />
        <Duvidas />
        <Astrolovers />
        <Testimonals />
      </div>
    </Layout>
  );
};
export default Blog;

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
