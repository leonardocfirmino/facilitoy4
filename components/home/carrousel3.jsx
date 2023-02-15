import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function HomeCarrousel2({ data }) {
  return (
    <div className="w-full px-4 lg:w-4/6 mx-auto py-6">
      <div className="border-b-2 mb-2">
        <h1 className="text-red-600 uppercase -mb-[2px] text-3xl font-bold w-fit pb-4 border-red-600 border-b-2">
          Recomendados para você!
        </h1>
      </div>
      <Swiper
        spaceBetween={10}
        navigation
        modules={[Navigation, Pagination]}
        slidesPerView={8}
        breakpoints={{
          360: {
            slidesPerView: 2,

            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            width: 600,
            spaceBetween: 10,
          },
          1025: {
            slidesPerView: 4,
            width: 900,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 4,
            width: 1200,
            spaceBetween: 20,
          },
        }}
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
  );
}
