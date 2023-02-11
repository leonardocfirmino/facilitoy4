import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import request from "graphql-request";
export default function Recomendados({ data }) {
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
  return (
    <div className="w-full px-4 lg:w-4/6 mx-auto py-6">
      <div className="pb-2">
        <h1 className="text-gray-700  text-3xl font-bold w-fit  ">
          ESCOLHAS PARA VOCÊ:
        </h1>
      </div>
      <Swiper
        spaceBetween={10}
        navigation
        modules={[Navigation, Pagination]}
        slidesPerView={8}
        breakpoints={{
          360: {
            slidesPerView: 2,

            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            width: 600,
            spaceBetween: 10,
          },
          1025: {
            slidesPerView: 3,
            width: 900,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 4,
            width: 1200,
            spaceBetween: 20,
          },
        }}
        className=" swiper-container  "
      >
        {carrousel2.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <div className="relative h-72 w-full overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="relative text-center mt-4">
                <h3 className="text-sm font-medium h-12 text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-red-600">
                  A partir de R${product.price},00
                </p>
              </div>
            </div>
            <div className="mt-6">
              <a
                href={product.href}
                className="relative cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-8 text-sm font-medium text-white hover:bg-red-500"
              >
                Alugar<span className="sr-only">, {product.name}</span>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
