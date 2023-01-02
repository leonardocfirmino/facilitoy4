import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function HomeCarrousel3({ data }) {
  return (
    <div className="w-4/6 mx-auto py-12">
      <div className="w-full flex justify-center items-center mb-6">
        <h1 className="text-blue-400  text-xl px-4 lg:text-3xl text-center font-semibold w-fit pb-4 ">
          Brinquedos da Facilitoy que você pode receber em casa:
        </h1>
      </div>
      <Swiper
        spaceBetween={10}
        navigation
        modules={[Navigation, Pagination]}
        slidesPerView={8}
        pagination={true}
        breakpoints={{
          360: {
            slidesPerView: 1,

            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            width: 600,
            spaceBetween: 10,
          },
          1025: {
            slidesPerView: 3,
            width: 900,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 4,
            width: 1200,
            spaceBetween: 20,
          },
        }}
        className=" swiper-container "
      >
        {data.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex  ">
              <div className="relative h-56 w-full overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  className="h-full w-full object-contain object-center"
                />
              </div>
              <div className="relative text-center flex flex-col justify-center items-center">
                <h3 className="text-sm font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-red-600">
                  A partir de R${product.price},00
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
