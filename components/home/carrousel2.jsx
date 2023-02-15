import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Grid, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import { useState } from "react";
export default function HomeCarrousel2({ data }) {
  const [slider, setSlider] = useState();

  return (
    <div className="w-full relative px-2 lg:w-4/6 mx-auto py-6">
      <div className="border-b-2 mb-2">
        <h1 className="text-red-600 -mb-[2px] text-3xl font-bold w-fit pb-4 border-red-600 border-b-2">
          BRINQUEDOS MAIS ALUGADOS!
        </h1>
      </div>

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
          modules={[Grid]}
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
          grid={{ rows: 2, fill: "row" }}
          className=" swiper-container  "
        >
          {data.map((product, index) => (
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
  );
}
