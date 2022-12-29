/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import SearchBar from "./SearchBar";
import Carrinho from "./Carrinho";
const LayoutBlog = ({ children, subdomain }) => {
  const fetcher = async (query) =>
    axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        (subdomain ? subdomain + "." : null) +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/getBanner",
      query
    );

  const { data, mutate } = useSWR(subdomain, fetcher);

  return (
    <div className="bg-gray-100 flex flex-col justify-between ">
      <div>
        <div className="bg-gray-100 overflow-x-hidden shadow">
          <nav className="bg-white px-6 py-4 shadow">
            <div className="flex gap-4 flex-col container mx-auto md:flex-row md:items-center md:justify-between">
              <div className="flex w-48 h-24 justify-center  items-center">
                <div>
                  <Link href="/">
                    <a className="text-gray-800 text-xl font-bold md:text-2xl">
                      <img src="/logo.webp" alt="" />
                    </a>
                  </Link>
                </div>
              </div>
              <SearchBar />
              <div className=" font-semibold text-lg">
                <Link href="/login">
                  <a className="flex w-48 justify-center">
                    Entrar / Cadastrar-se
                  </a>
                </Link>
              </div>

              <Carrinho />
            </div>
          </nav>
        </div>
        {/* header ends here */}
        <main className="  h-full flex-1 flex">{children}</main>
      </div>
      {/* <footer className="px-6 py-2 bg-gray-800 text-gray-100">
        <div className="flex flex-col justify-between items-center container mx-auto md:flex-row">
          <a href="#" className="text-2xl font-bold">
            PrimeBlog
          </a>
          <p className="mt-2 md:mt-0">Todos os direitos reservados 2022.</p>
        </div>
      </footer> */}
    </div>
  );
};
export default LayoutBlog;
