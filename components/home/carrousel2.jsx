import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Grid, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
export default function HomeCarrousel2({ data }) {
  const [slider, setSlider] = useState();
  const [slider2, setSlider2] = useState();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  if (data1.length == 0) {
    setData1(data.slice(0, 6));
    setData2(data.slice(6, data.length));
  }

  return (
    <div className="w-full relative px-2 lg:w-4/6 mx-auto py-6">
      <div className="border-b-2 mb-2">
        <h1 className="text-red-600 -mb-[2px] text-3xl font-bold w-fit pb-4 border-red-600 border-b-2">
          BRINQUEDOS MAIS ALUGADOS!
        </h1>
      </div>
      <div className="relative">
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
        <div className="mx-6">
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
                width: 600,
                spaceBetween: 50,
              },
              1025: {
                slidesPerView: 4,
                width: 900,
                spaceBetween: 70,
              },
              1400: {
                slidesPerView: 4,
                width: 1200,
                spaceBetween: 70,
              },
            }}
            className=" swiper-container  "
          >
            {data1.length > 0 &&
              data1.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    <a
                      href={"/brinquedos/" + product.slug}
                      className="relative h-72 w-full overflow-hidden rounded-lg"
                    >
                      <img
                        src={
                          product.product_image == null
                            ? "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                              product.product_images[0].src
                            : "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                              product.product_image.src
                        }
                        className="h-full w-full object-contain"
                      />
                    </a>
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
                    <a
                      href={"/brinquedos/" + product.slug}
                      className="relative cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-8 text-sm font-medium text-white hover:bg-red-500"
                    >
                      Alugar<span className="sr-only">, {product.name}</span>
                    </a>
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
        <div className="mx-6">
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
                width: 600,
                spaceBetween: 50,
              },
              1025: {
                slidesPerView: 4,
                width: 900,
                spaceBetween: 70,
              },
              1400: {
                slidesPerView: 4,
                width: 1200,
                spaceBetween: 70,
              },
            }}
            className=" swiper-container  "
          >
            {data2.length > 0 &&
              data2.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    <a
                      href={"/brinquedos/" + product.slug}
                      className="relative h-72 w-full overflow-hidden rounded-lg"
                    >
                      <img
                        src={
                          product.product_image == null
                            ? "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                              product.product_images[0].src
                            : "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                              product.product_image.src
                        }
                        className="h-full w-full object-contain"
                      />
                    </a>
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
                    <a
                      href={"/brinquedos/" + product.slug}
                      className="relative cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-8 text-sm font-medium text-white hover:bg-red-500"
                    >
                      Alugar<span className="sr-only">, {product.name}</span>
                    </a>
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
    </div>
  );
}
