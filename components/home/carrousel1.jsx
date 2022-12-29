import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function HomeCarrousel1({ data }) {
  return (
    <div className="w-4/6 mx-auto py-6">
      <Swiper
        spaceBetween={10}
        navigation
        modules={[Navigation, Pagination]}
        slidesPerView={8}
        pagination={true}
        breakpoints={{
          360: {
            slidesPerView: 1,
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
            slidesPerView: 7,
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
                <img src={value.image} className="rounded-full" alt="" />
                <h1 className="text-lg h-14 text-center font-bold">
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
