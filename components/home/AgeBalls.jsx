import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function AgeBalls({ subdomain }) {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, mutate } = useSWR(
    process.env.NEXT_PUBLIC_PREFIX +
      subdomain +
      "." +
      process.env.NEXT_PUBLIC_SITE_URL +
      "/api/age-balls",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  console.log(data);
  return (
    <div className=" relative px-2 w-11/12 mx-auto py-6">
      <div className="w-full flex justify-center mb-2">
        <h1 className="text-red-600  text-2xl sm:text-3xl text-center font-bold w-fit pb-4">
          BRINQUEDOS PARA TODAS AS IDADES!
        </h1>
      </div>
      <div>
        {data && (
          <Swiper
            spaceBetween={2}
            slidesPerView={10}
            breakpoints={{
              360: {
                slidesPerView: 2.5,
              },
              768: {
                slidesPerView:
                  data.faixa_etaria.length >= 7 ? 7 : data.faixa_etaria.length,

                spaceBetween: 10,
              },
              1025: {
                slidesPerView:
                  data.faixa_etaria.length >= 7 ? 7 : data.faixa_etaria.length,

                spaceBetween: 20,
              },
              1200: {
                slidesPerView:
                  data.faixa_etaria.length >= 7 ? 7 : data.faixa_etaria.length,

                spaceBetween: 20,
              },
              1500: {
                slidesPerView:
                  data.faixa_etaria.length >= 7 ? 7 : data.faixa_etaria.length,

                spaceBetween: 20,
              },
            }}
            className=" swiper-container  "
          >
            {data.faixa_etaria.map((value) => (
              <SwiperSlide key={value.id}>
                <a
                  href={`/brinquedos?age=${value.id}`}
                  className={
                    "rounded-full relative flex items-center transition-none justify-center overflow-hidden bg-faciBabyBlue px-4 py-4 w-32 h-32 hover:border-4 border-faciRed duration-300"
                  }
                >
                  <p className="uppercase text-center max-w-[100px] z-20 font-bold text-xl text-faciRed ">
                    {value.name}
                  </p>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 absolute top-2 right-2 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 absolute -scale-100 bottom-2 left-2 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
