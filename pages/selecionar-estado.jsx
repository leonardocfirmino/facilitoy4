/* eslint-disable @next/next/no-img-element */
import Select from "react-select";
import { useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const SelectEstado = () => {
  const router = useRouter();
  const [estado, setEstado] = useState();
  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
  };

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
  const groupedOptions = [
    {
      label: "RJ",
      options: [
        {
          label: "Cabo Frio",
          value: "cabo-frio",
        },
        {
          label: "Rio de Janeiro - Zona Norte",
          value: "rjzonanorte",
        },
      ],
    },
    {
      label: "SP",
      options: [
        {
          label: "Araçatuba",
          value: "aracatuba",
        },
        {
          label: "São Paulo",
          value: "sao-paulo",
        },
      ],
    },
  ];
  const sendToSite = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_PREFIX}${estado.value}.${process.env.NEXT_PUBLIC_SITE_URL}`
    );
  };
  const images = [
    "/footer-estado/1.jpg",
    "/footer-estado/2.jpg",
    "/footer-estado/3.jpg",
    "/footer-estado/4.jpg",
    "/footer-estado/5.jpg",
    "/footer-estado/6.jpg",
    "/footer-estado/7.jpeg",
    "/footer-estado/8.jpeg",
    "/footer-estado/9.jpeg",
    "/footer-estado/10.jpeg",
  ];
  return (
    <div
      className="w-full flex flex-col justify-center items-center  flex-1 h-screen bg-cover"
      style={{
        backgroundImage: "url('/fundo-estado.jpg')",
        backgroundPosition: "center",
      }}
    >
      <div className=" bg-faciRose px-6 mb-20 lg:min-w-[460px] py-4 rounded-2xl shadow-2xl">
        <div className="w-full flex justify-center">
          <img src="/logo.webp" className="w-52 h-28" alt="" />
        </div>

        <Select
          options={groupedOptions}
          onChange={(value) => setEstado(value)}
          placeholder="Selecione a Facilitoy mais proxima de você"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "grey" : "black",
              color: "black",
            }),
          }}
          className="mt-2 border-black text-black"
          formatGroupLabel={formatGroupLabel}
        />
        <div className="w-full text-sm pt-2 flex justify-center items-center">
          <h2>
            Não encontrou sua cidade? Seja um{" "}
            <a href="" className="text-blue-400 underline">
              franqueado Facilitoy!
            </a>
          </h2>
        </div>
        <button
          onClick={() => sendToSite()}
          className="hover:bg-[#1b7c80] transition-all duration-300 mt-4 bg-[#08b6bd] w-full rounded-full py-2 text-white font-bold"
        >
          Ir para o site
        </button>
        <div className="flex gap-1 font-semibold pt-4 pb-2 justify-center w-full items-center text-center">
          <p className="text-[#d72b3e]">Aluguel de brinquedos</p>
          <p className="text-[#02d0da]">e acessórios infantis</p>
        </div>
      </div>
      <div className="w-full bg-[#f2f2f2] py-2  absolute bottom-0">
        <Swiper
          spaceBetween={10}
          slidesPerView={8}
          modules={[Navigation]}
          navigation
          breakpoints={{
            360: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 3,
            },
            1025: {
              slidesPerView: 4,
            },
            1400: {
              slidesPerView: 7,
            },
          }}
          className=" swiper-container  "
        >
          {images.map((value, index) => {
            return (
              <SwiperSlide key={index}>
                <a className="relative text-center  flex flex-col items-center justify-start  text-gray-600">
                  <img
                    src={value}
                    className="w-64 h-64 rounded-md object-cover"
                    alt=""
                  />
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
export default SelectEstado;
