import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import Link from "next/link";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function HomeCarrousel1({ data }) {
  return (
    <div className=" w-11/12 mx-auto py-6">
      <Swiper
        spaceBetween={10}
        slidesPerView={10}
        breakpoints={{
          360: {
            slidesPerView: 3.5,
          },
          768: {
            slidesPerView: data.length >= 7 ? 7 : data.length,

            spaceBetween: 10,
          },
          1025: {
            slidesPerView: data.length >= 7 ? 7 : data.length,

            spaceBetween: 20,
          },
          1200: {
            slidesPerView: data.length >= 7 ? 8 : data.length,

            spaceBetween: 20,
          },
          1500: {
            slidesPerView: data.length >= 7 ? 10 : data.length,

            spaceBetween: 20,
          },
        }}
        className=" swiper-container  "
      >
        {data.map((value, index) => {
          if (value.name != "Geral")
            return (
              <SwiperSlide key={index}>
                <Link
                  href={"/brinquedos/?categoria=" + value.id}
                  className="relative cursor-pointer text-center  gap-2 flex flex-col items-center justify-start text-gray-600"
                >
                  <a>
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
                </Link>
              </SwiperSlide>
            );
        })}
      </Swiper>
    </div>
  );
}
