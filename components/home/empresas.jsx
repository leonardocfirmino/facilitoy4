import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
export default function EmpresasCarrousel({ data }) {
  return (
    <div className="w-full lg:w-11/12 mx-auto py-10">
      <div className="w-full flex justify-center mb-2">
        <h1 className="text-blue-400 text-center text-2xl sm:text-3xl font-bold w-fit pb-4">
          AS MELHORES MARCAS ESTÃO NA FACILITOY!
        </h1>
      </div>
      <Swiper
        spaceBetween={10}
        loop={true}
        slidesPerView="auto"
        breakpoints={{
          360: {
            slidesPerView: 3,

            spaceBetween: 50,
          },
          768: {
            slidesPerView: 3,

            spaceBetween: 50,
          },
          1200: {
            slidesPerView: 7,

            spaceBetween: 20,
          },
          1500: {
            slidesPerView: 8,

            spaceBetween: 20,
          },
        }}
        className=" swiper-container  "
      >
        {data.map((value, index) => {
          return (
            <SwiperSlide key={index}>
              <a className="relative text-center bg-gray-200 w-32 h-32   rounded-full gap-2 flex items-center justify-center text-gray-600">
                <Image
                  width={96}
                  height={96}
                  src={value.image}
                  className=" grayscale brightness-75 contrast-200 object-contain object-center"
                  alt=""
                />
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
