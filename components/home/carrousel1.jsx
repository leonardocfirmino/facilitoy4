import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function HomeCarrousel1({ data }) {
  return (
    <div className="w-full lg:w-4/6 mx-auto py-6">
      <Swiper
        spaceBetween={10}
        slidesPerView={8}
        breakpoints={{
          360: {
            slidesPerView: 3.5,
          },
          768: {
            slidesPerView: data.length >= 7 ? 7 : data.length,
            width: 600,
            spaceBetween: 10,
          },
          1025: {
            slidesPerView: data.length >= 7 ? 7 : data.length,
            width: 900,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: data.length >= 7 ? 7 : data.length,
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
                  src={
                    "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                    value.image_src
                  }
                  className="rounded-full"
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
