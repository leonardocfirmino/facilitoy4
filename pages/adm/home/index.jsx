/* eslint-disable @next/next/no-img-element */
import LayoutAdm from "../../../components/LayoutAdm";
import useSWR from "swr";
import request from "graphql-request";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import Link from "next/link";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "moment/locale/pt-br";
import { useState } from "react";
import Empty from "../../../components/Empty";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ sessions }) => {
  const user = JSON.parse(sessions);

  console.log(user);
  const fetcher = async (query) =>
    request(
      process.env.NEXT_PUBLIC_PREFIX +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/userQuery",
      query,
      {},
      { authorization: `Bearer ${user.token}` }
    );
  const { data, mutate } = useSWR(
    `{
      home_recomendados(order_by:{position:asc}) {
        position
        id
        product {
          product_image {
            src
          }
          product_images {
            src
          }
          name
        }
      }
      
      home_vendidos (order_by:{position:asc}){
        position
        id
        product {
          product_image {
            src
          }
          product_images {
            src
          }
          name
        }
      }
   
    
    }`,
    fetcher
  );

  return (
    <LayoutAdm session={user}>
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
      />
      {data && (
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* This example requires Tailwind CSS v2.0+ */}
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Tela inicial
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    Organize a tela inicial
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
              </div>
              <div className="mt-6 flex justify-between text-gray-600 font-bold text-2xl">
                <h1>Carrossel dos BRINQUEDOS MAIS ALUGADOS</h1>
                <Link href="/adm/home/sellers/add">
                  <a className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                    Adicionar aos BRINQUEDOS MAIS ALUGADOS
                  </a>
                </Link>
              </div>
              <div className="w-full mt-4 bg-gray-100/50 mx-auto py-6">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={8}
                  breakpoints={{
                    360: {
                      slidesPerView: 3.5,
                    },
                    768: {
                      slidesPerView:
                        data.home_vendidos.length >= 7
                          ? 7
                          : data.home_vendidos.length,
                      width: 600,
                      spaceBetween: 10,
                    },
                    1025: {
                      slidesPerView:
                        data.home_vendidos.length >= 7
                          ? 7
                          : data.home_vendidos.length,
                      width: 900,
                      spaceBetween: 20,
                    },
                    1400: {
                      slidesPerView:
                        data.home_vendidos.length >= 7
                          ? 7
                          : data.home_vendidos.length,
                      width: 1200,
                      spaceBetween: 20,
                    },
                  }}
                  className=" swiper-container text-center "
                >
                  {data.home_vendidos.length > 0 ? (
                    data.home_vendidos.map((value, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <a className="  relative text-center  gap-2 flex flex-col items-center justify-center text-gray-600">
                            <img
                              src={
                                "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                                value.product.product_images[0].src
                              }
                              className="h-40"
                              alt=""
                            />
                            <h1 className="text-sm lg:text-md  text-center font-bold">
                              {value.position} - {value.product.name}
                            </h1>
                            <Link href={"/adm/home/sellers/" + value.id}>
                              <a>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="w-6 h-6 hover:text-blue-600 cursor-pointer text-blue-800 "
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </a>
                            </Link>
                          </a>
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    <Empty />
                  )}
                </Swiper>
              </div>
              <div className="mt-6 flex justify-between text-gray-600 font-bold text-2xl">
                <h1>Carrossel dos recomendados</h1>
                <Link href="/adm/home/recommended/add">
                  <a className="inline-flex items-center justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                    Adicionar aos recomendados
                  </a>
                </Link>
              </div>
              <div className="w-full mt-4 bg-gray-100/50 mx-auto py-6">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={8}
                  breakpoints={{
                    360: {
                      slidesPerView: 3.5,
                    },
                    768: {
                      slidesPerView:
                        data.home_recomendados.length >= 7
                          ? 7
                          : data.home_recomendados.length,
                      width: 600,
                      spaceBetween: 10,
                    },
                    1025: {
                      slidesPerView:
                        data.home_recomendados.length >= 7
                          ? 7
                          : data.home_recomendados.length,
                      width: 900,
                      spaceBetween: 20,
                    },
                    1400: {
                      slidesPerView:
                        data.home_recomendados.length >= 7
                          ? 7
                          : data.home_recomendados.length,
                      width: 1200,
                      spaceBetween: 20,
                    },
                  }}
                  className=" swiper-container  "
                >
                  {data.home_recomendados.length > 0 ? (
                    data.home_recomendados.map((value, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <a className="relative text-center  gap-2 flex flex-col items-center justify-start text-gray-600">
                            <img
                              src={
                                "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                                value.product.product_images[0].src
                              }
                              className=" h-40"
                              alt=""
                            />
                            <h1 className="text-sm lg:text-md  text-center font-bold">
                              {value.position} - {value.product.name}
                            </h1>
                            <Link href={"/adm/home/recommended/" + value.id}>
                              <a>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="w-6 h-6 hover:text-blue-600 cursor-pointer text-blue-800 "
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </a>
                            </Link>
                          </a>
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    <Empty />
                  )}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutAdm>
  );
};
export default Home;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: `/login?callbackUrl=${
          process.env.NEXT_PUBLIC_PREFIX + process.env.NEXT_PUBLIC_SITE_URL
        }/adm/`,
        permanent: false,
      },
    };
  }
  if (session?.user?.role == "user") {
    return {
      redirect: {
        destination: `/perfil`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      sessions: JSON.stringify(session, null, 2),
    },
  };
}
