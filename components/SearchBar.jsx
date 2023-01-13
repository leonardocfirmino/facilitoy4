import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function SearchBar() {
  const [search, setSearch] = useState();
  const [produto, setProduto] = useState(false);
  const handler = (input) => {
    if (input.target.value.length >= 3) {
      setSearch(input.target.value);
      if (produtos.find((value) => value.name.includes(search))) {
        return setProduto(true);
      }
      return setProduto(false);
    }
    if (input.target.value.length < 3) {
      setSearch();
      setProduto(false);
    }
  };
  const produtos = [
    {
      name: "Torre de Carrinhos",
      price: 89,
      image: "/carrousel-2/1.jpeg",
      slug: "torre-carrinhos",
    },
    {
      name: "Mesa Estação de Atividades",
      price: 89,
      image: "/carrousel-2/2.png",
      slug: "mesa-estacao-atividades",
    },
  ];
  return (
    <div className="relative order-4  lg:order-2 w-full max-w-3xl">
      <div className="flex ">
        <input
          type="text"
          onChange={handler}
          placeholder="Buscando algum brinquedo?"
          className="border-gray-200 w-full rounded-l-full text-base px-4 py-2 outline-none border-[1px]"
        />
        <button className="bg-red-600 pr-4 pl-3 py-2 text-white rounded-r-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {produto && (
        <div className="w-full z-20 grid grid-cols-2 absolute min-h-[200px] rounded-b-xl bg-white">
          {produtos.map((value, index) => {
            return (
              <Link key={index} href={"/brinquedos/" + value.slug}>
                <a className="flex hover:bg-gray-100 transition-all duration-300 max-h-[80px] py-2 border-[1px] gap-4 px-8">
                  <Image src={value.image} width={65} height={65} alt="" />
                  <div className="space-y-2 flex flex-col text-xs lg:text-base justify-center items-start">
                    <h1 className="font-semibold">{value.name}</h1>
                    <h2 className="font-semibold text-red-500">
                      R${value.price},00
                    </h2>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
