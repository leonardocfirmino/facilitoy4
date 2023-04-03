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

            spaceBetween: 50,
          },
          768: {
            slidesPerView: 2,

            spaceBetween: 50,
          },
          1200: {
            slidesPerView: 4,

            spaceBetween: 30,
          },
          1500: {
            slidesPerView: 4,

            spaceBetween: 70,
          },
        }}
        className=" swiper-container  "
      >
        {data.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <a
                href={product.product.slug}
                className="relative h-72 w-full overflow-hidden rounded-lg"
              >
                <img
                  src={
                    product.product_image == null
                      ? "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                        product.product_images[0].src
                      : "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                        product.product_image.src
                  }
                  className="h-full w-full object-contain"
                />
              </a>
              <div className="relative text-center mt-4">
                <h3 className="text-sm font-medium h-12 text-gray-900">
                  {product.product.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-red-600">
                  A partir de R${product.product.price_one},00
                </p>
              </div>
            </div>
            <div className="mt-6">
              <a
                href={product.product.slug}
                className="relative cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-8 text-sm font-medium text-white hover:bg-red-500"
              >
                Alugar<span className="sr-only">, {product.product.name}</span>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
