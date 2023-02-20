import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function Astrolovers() {
  return (
    <div className="w-full lg:w-4/6 mx-auto pb-8 flex flex-col justify-center">
      <div className="w-full flex  uppercase  justify-center text-center items-center text-xl px-4 lg:text-3xl text-blue-400 font-semibold pb-10">
        <h2 className="text-center text-2xl font-bold tracking-tight text-blue-400 sm:text-3xl">
          NOSSOS ASTROLOVERS
        </h2>
      </div>
      <div>
        <Swiper
          spaceBetween={10}
          navigation
          modules={[Navigation, Pagination]}
          slidesPerView={3}
          breakpoints={{
            360: {
              slidesPerView: 2,

              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              width: 600,
              spaceBetween: 10,
            },
            1025: {
              slidesPerView: 3,

              spaceBetween: 20,
            },
            1300: {
              slidesPerView: 4,

              spaceBetween: 20,
            },
          }}
          className=" swiper-container  "
        >
          {[...Array(17)].map((value, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex gap-4 flex-col text-center justify-center items-center">
                  <div className="w-full justify-center flex items-center">
                    <img
                      src={`/astrolovers/${index + 1}.jpeg`}
                      className="w-64 h-64 object-cover"
                      alt=""
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
