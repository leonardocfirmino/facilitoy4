import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Grid, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
function classOrganizer(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function HomeCarrousel2({ data, vendidos }) {
  const [slider, setSlider] = useState();
  const [slider2, setSlider2] = useState();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  /*  if (vendidos.length > 0) {
    data = vendidos.map((value) => value.product);
  } */
  if (data1.length == 0) {
    if (data.length > 7) {
      const meio = data.length / 2;
      setData1(data.slice(0, meio));
      setData2(data.slice(meio, data.length));
    }
    if (data.length < 7) setData1(data);
  }

  return (
    <div className=" relative px-2 w-full lg:w-11/12 mx-auto py-6">
      <div className="w-full flex justify-center mb-2">
        <h1 className="text-red-600 text-center text-2xl sm:text-3xl font-bold w-fit pb-4">
          BRINQUEDOS MAIS ALUGADOS!
        </h1>
      </div>
      <div className="relative mb-4">
        <button
          className="absolute left-0 z-20 bottom-0 top-0"
          onClick={() => slider.slidePrev()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className="mx-8">
          <Swiper
            spaceBetween={10}
            onSwiper={(swiper) => setSlider(swiper)}
            slidesPerView={8}
            breakpoints={{
              360: {
                slidesPerView: 2,

                spaceBetween: 50,
              },
              768: {
                slidesPerView: 2,

                spaceBetween: 50,
              },
              1200: {
                slidesPerView: data.length > 7 ? 4 : data.length,

                spaceBetween: 30,
              },
              1500: {
                slidesPerView: data.length > 7 ? 4 : data.length,

                spaceBetween: 70,
              },
            }}
            className=" swiper-container  "
          >
            {data1.length > 0 &&
              data1.map((product, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={classOrganizer(
                      product.is_unavailable && " saturate-50"
                    )}
                  >
                    <div className="relative flex justify-center flex-col items-center">
                      <Link href={"/brinquedos/" + product.slug}>
                        <a className="relative  object-scale-down rounded-lg">
                          <Image
                            width={256}
                            height={256}
                            alt={product.name}
                            className=" "
                            src={
                              product.product_image == null
                                ? "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                                  product.product_images[0]?.src
                                : "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                                  product.product_image?.src
                            }
                          />
                        </a>
                      </Link>
                      <div className="relative text-center mt-4">
                        <h3 className="text-sm font-medium h-12 text-gray-900">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-red-600">
                          A partir de R${product.price_one},00
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link href={"/brinquedos/" + product.slug}>
                        <a
                          className={classOrganizer(
                            !product.is_unavailable
                              ? "bg-red-600 hover:bg-red-500 cursor-pointer"
                              : "bg-gray-400 hover:bg-gray-500 ",
                            "relative max-w-sm mx-auto  flex items-center justify-center rounded-md border border-transparent  py-2 px-8 text-sm font-medium text-white "
                          )}
                        >
                          {product.is_unavailable ? "Indisponível" : "Alugar"}
                        </a>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <button
          className="absolute right-0 z-20 bottom-0 top-0"
          onClick={() => slider.slideNext()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      {data2.length > 0 && (
        <div className="relative">
          <button
            className="absolute left-0 z-20 bottom-0 top-0"
            onClick={() => slider2.slidePrev()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <div className="mx-8">
            <Swiper
              spaceBetween={10}
              onSwiper={(swiper) => setSlider2(swiper)}
              slidesPerView={8}
              breakpoints={{
                360: {
                  slidesPerView: 2,

                  spaceBetween: 50,
                },
                768: {
                  slidesPerView: 2,

                  spaceBetween: 50,
                },
                1200: {
                  slidesPerView: 4,

                  spaceBetween: 30,
                },
                1500: {
                  slidesPerView: 4,

                  spaceBetween: 70,
                },
              }}
              className=" swiper-container  "
            >
              {data2.map((product, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={classOrganizer(
                      product.is_unavailable &&
                        "pointer-events-none saturate-50"
                    )}
                  >
                    <div className="relative flex justify-center flex-col items-center">
                      <Link href={"/brinquedos/" + product.slug}>
                        <a className="relative  object-scale-down rounded-lg">
                          <Image
                            width={256}
                            height={256}
                            alt={product.name}
                            className=" "
                            src={
                              product.product_image == null
                                ? "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                                  product.product_images[0]?.src
                                : "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                                  product.product_image?.src
                            }
                          />
                        </a>
                      </Link>
                      <div className="relative text-center mt-4">
                        <h3 className="text-sm font-medium h-12 text-gray-900">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-red-600">
                          A partir de R${product.price_one},00
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link href={"/brinquedos/" + product.slug}>
                        <a
                          className={classOrganizer(
                            !product.is_unavailable
                              ? "bg-red-600 hover:bg-red-500 cursor-pointer"
                              : "bg-gray-400 hover:bg-gray-500 pointer-events-none",
                            "relative max-w-sm mx-auto flex items-center justify-center rounded-md border border-transparent  py-2 px-8 text-sm font-medium text-white "
                          )}
                        >
                          {product.is_unavailable ? "Indisponível" : "Alugar"}
                        </a>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            className="absolute right-0 z-20 bottom-0 top-0"
            onClick={() => slider2.slideNext()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
