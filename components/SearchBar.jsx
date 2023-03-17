import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
export default function SearchBar({ subdomain }) {
  const [produto, setProduto] = useState([]);
  const router = useRouter();
  const getProducts = async (name) => {
    const result = await axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        subdomain +
        "." +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/search-products",
      { name: name, subdomain: subdomain }
    );
    return result;
  };
  const handler = async (input) => {
    if (input.length >= 2) {
      const { data } = await getProducts(input);

      if (data.product.length > 0) return setProduto(data.product);
      return setProduto([]);
    }
    if (input.length < 2) {
      setProduto([]);
    }
  };
  let filterTimeout;
  const filterHandler = (query) => {
    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => {
      handler(query);
    }, 600);
  };

  return (
    <div className="relative order-4  lg:order-2 w-full max-w-3xl">
      <form method="GET" action="/brinquedos" className="flex ">
        <input
          type="text"
          onChange={(e) => filterHandler(e.target.value)}
          name="search"
          defaultValue={router.query.search}
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
      </form>
      {produto.length > 0 && (
        <div className="w-full z-20 grid grid-cols-2 absolute min-h-[200px] rounded-b-xl bg-white">
          {produto.map((value, index) => {
            return (
              <Link
                legacyBehavior
                prefetch={false}
                key={index}
                href={"/brinquedos/" + value.slug}
              >
                <a className="flex hover:bg-gray-100 transition-all duration-300 max-h-[80px] py-2 border-[1px] gap-4 px-8">
                  <Image
                    src={
                      value.product_image?.src != undefined
                        ? "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                          value.product_image?.src
                        : "/logo.webp"
                    }
                    width={65}
                    height={65}
                    alt=""
                  />
                  <div className="space-y-2 flex flex-col text-xs lg:text-base justify-center items-start">
                    <h1 className="font-semibold">{value.name}</h1>
                    <h2 className="font-semibold text-red-500">
                      R${value.price_one},00
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
