/* eslint-disable @next/next/no-img-element */
import Select from "react-select";
import { useState } from "react";
import { useRouter } from "next/router";
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
  return (
    <div
      className="w-full flex justify-center items-center px-4 flex-1 h-screen bg-cover"
      style={{
        backgroundImage: "url('/Banner-site.png')",
        backgroundPosition: "top right",
      }}
    >
      <div className=" bg-faciRose px-6 lg:min-w-[460px] py-4 rounded-2xl shadow-2xl">
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
    </div>
  );
};
export default SelectEstado;
