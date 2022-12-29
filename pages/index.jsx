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

  const [pagination, setPagination] = useState();
  const [actualPosts, setActualPosts] = useState(0);
  const onChange = (page) => {
    mutate();
    setActualPosts((page - 1) / 1);
    setPagination(page);
  };
  const fetcher = async (query) =>
    axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        (subdomain ? subdomain + "." : null) +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/getBlog",
      query
    );
  const { data, mutate } = useSWR(
    { query: subdomain, offset: actualPosts },
    fetcher
  );
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
      image: "/carrousel-2/11.jpg",
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
  return (
    <Layout subdomain={subdomain}>
      {data && (
        <Head>
          <title>{data.data.user[0].blog_name}</title>
          <meta
            name="description"
            content={`Blog ${data.data.user[0].blog_name}`}
          />
          <meta property="og:title" content={data.data.user[0].blog_name} />
          <meta
            property="og:description"
            content={`Blog ${data.data.user[0].blog_name}`}
          />
          <meta
            property="og:url"
            content={`https://${data.data.user[0].blog_slug}.primeblog.online`}
          />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}
      <div className="w-full h-full">
        <Hero1 />
        <HomeCarrousel1 data={carrousel1} />
        <HomeCarrousel2 data={carrousel2} />
        <Steps />
        <HomeCarrousel3 data={carrousel2} />
        <Razoes />
        <Sobre />
        <Duvidas />
        <Testimonals />
        <div className="w-full flex  justify-center items-center bg-gray-200 py-4 ">
          <div className="text-center">
            <h1 className="text-sm font-bold mb-4 text-gray-600">
              Siga-nos em nossas redes
            </h1>
            <div className="flex justify-center gap-4 items-center">
              <div className="px-3 hover:bg-blue-700 transition-all duration-300 cursor-pointer py-3 rounded-full bg-gray-400">
                <img
                  src="/icons/facebook.png"
                  className="invert w-8 h-8"
                  alt=""
                />
              </div>
              <div className="px-3 hover:bg-rose-400 transition-all duration-300 cursor-pointer py-3 rounded-full bg-gray-400">
                <img
                  src="/icons/instagram.png"
                  className="invert w-8 h-8"
                  alt=""
                />
              </div>
              <div className="px-3 hover:bg-red-700 transition-all duration-300 cursor-pointer py-3 rounded-full bg-gray-400">
                <img
                  src="/icons/youtube.png"
                  className="invert w-8 h-8"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Blog;

export async function getServerSideProps(ctx) {
  const subdomain =
    ctx.req.headers["x-forwarded-host"] || ctx.req.headers["host"];
  if (subdomain.split(".")[1] == undefined)
    return {
      redirect: {
        destination: `/selecionar-estado`,
        permanent: false,
      },
    };
  return { props: { subdomain: subdomain.split(".")[0] } };
}
