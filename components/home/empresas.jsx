import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function EmpresasCarrousel({ data }) {
  return (
    <div className="w-full lg:w-4/6 mx-auto py-10">
      <div className="w-full flex justify-center mb-2">
        <h1 className="text-blue-400 text-center text-3xl font-bold w-fit pb-4">
          AS MELHORES MARCAS ESTÃO NA FACILITOY!
        </h1>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={8}
        breakpoints={{
          360: {
            slidesPerView: 3.5,
          },
          768: {
            slidesPerView: 3,
            width: 600,
            spaceBetween: 10,
          },
          1025: {
            slidesPerView: 4,
            width: 900,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 6,
            width: 1200,
            spaceBetween: 20,
          },
        }}
        className=" swiper-container  "
      >
        {data.map((value, index) => {
          return (
            <SwiperSlide key={index}>
              <a className="relative text-center  gap-2 flex flex-col items-center justify-start text-gray-600">
                <img
                  src={value.image}
                  className="rounded-full w-32 h-32 object-contain object-center"
                  alt=""
                />
                <h1 className="text-sm lg:text-md h-10 text-center font-bold">
                  {value.name}
                </h1>
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
