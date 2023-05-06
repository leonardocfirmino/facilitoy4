import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from "swiper";
import "swiper/css";
import Link from "next/link";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
export default function Hero1() {
  return (
    <div className="flex w-full h-full justify-between ">
      <div className="w-full  relative">
        {/* <div className="absolute z-10  -bottom-1 left-0 right-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 100"
            fill="#fff"
            preserveAspectRatio="none"
            style={{ width: "100%" }}
            className=" h-14 transform rotate-180"
          >
            <path
              className="elementor-shape-fill"
              d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
            ></path>
          </svg>
        </div> */}
        <Swiper
          spaceBetween={0}
          navigation
          autoplay={{ delay: 4000 }}
          slidesPerView={1}
          modules={[Navigation, Autoplay]}
          className="w-full swiper-container  "
        >
          <SwiperSlide>
            <div className="w-full h-[55vh] sm:h-[70vh] lg:h-[26rem] 2xl:h-[38rem] back-branco relative bg-center md:gap-4 bg-[#12bdc64b] justify-between sm:justify-center flex-col pt-4 md:pt-0 md:flex-row flex items-center   bg-cover ">
              <Link href="/brinquedos">
                <a className="absolute bottom-0 duration-300 hover:scale-125 text-white px-14 py-4 bg-red-500 rounded-t-md font-bold">
                  ALUGAR
                </a>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[55vh] sm:h-[70vh] lg:h-[26rem] 2xl:h-[38rem] back-rosa relative gap-4 justify-between sm:justify-center flex-col pt-4 md:pt-0 md:flex-row flex items-center bg-cover ">
              <Link href="/brinquedos">
                <a className="absolute bottom-0 duration-300 hover:scale-125 text-white px-14 py-4 bg-red-500 rounded-t-md font-bold">
                  ALUGAR
                </a>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[55vh] sm:h-[70vh] lg:h-[26rem] 2xl:h-[38rem] back-azul relative  gap-4 justify-between sm:justify-center flex-col pt-4 md:pt-0 md:flex-row flex items-center   bg-cover ">
              <Link href="/brinquedos">
                <a className="absolute bottom-0 duration-300 hover:scale-125 text-white px-14 py-4 bg-red-500 rounded-t-md font-bold">
                  ALUGAR
                </a>
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
