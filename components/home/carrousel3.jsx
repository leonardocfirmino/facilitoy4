import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
function classOrganizer(...classes) {
  return classes.filter(Boolean).join(" ");
}
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
            <div
              className={classOrganizer(
                product.product.is_unavailable &&
                  "pointer-events-none saturate-50"
              )}
            >
              <div className="relative">
                <a
                  href={product.product.slug}
                  className="relative h-72 w-full overflow-hidden rounded-lg"
                >
                  <Image
                    width={256}
                    height={256}
                    alt={product.name}
                    className=" "
                    src={
                      product.product.product_image == null
                        ? "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                          product.product.product_images[0].src
                        : "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                          product.product.product_image.src
                    }
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
                  href={"/brinquedos/" + product.product.slug}
                  className={classOrganizer(
                    !product.product.is_unavailable
                      ? "bg-red-600 hover:bg-red-500 cursor-pointer"
                      : "bg-gray-400 hover:bg-gray-500 pointer-events-none",
                    "relative  flex items-center justify-center rounded-md border border-transparent  py-2 px-8 text-sm font-medium text-white "
                  )}
                >
                  {product.product.is_unavailable ? "Indisponível" : "Alugar"}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
