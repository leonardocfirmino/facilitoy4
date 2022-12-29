import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";
import Carrinho from "./Carrinho";
export default function Layout({ children, session, subdomain }) {
  const router = useRouter();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [actualMenu, setActualMenu] = useState(router.pathname);

  return (
    <div>
      {mobileMenu && (
        <div
          id="mobilemenu"
          className="relative z-40 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          <div className="fixed inset-0 flex z-40">
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-100">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  id="closebtn"
                  onClick={() => {
                    setMobileMenu(!mobileMenu);
                  }}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Close sidebar</span>

                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <h1 className="text-gray-600 text-2xl font-bold">
                    Facilitoy
                  </h1>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  <Link href="/">
                    <a
                      className={
                        "text-gray-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                      ÍNICIO
                    </a>
                  </Link>
                  <Link href="/#como-funciona">
                    <a
                      className={
                        "text-gray-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                        />
                      </svg>
                      COMO FUNCIONA?
                    </a>
                  </Link>
                  <Link href="/#razoes">
                    <a
                      className={
                        "text-gray-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                        />
                      </svg>
                      RAZÕES PARA ALUGAR
                    </a>
                  </Link>
                  <Link href="/brinquedos/">
                    <a
                      className={
                        "text-gray-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                      NOSSOS BRINQUEDOS
                    </a>
                  </Link>
                  <Link href="/#sobre">
                    <a
                      className={
                        "text-gray-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        {" "}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>
                      QUEM SOMOS
                    </a>
                  </Link>
                  <Link href="/#faq">
                    <a
                      className={
                        "text-gray-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      DÚVIDAS FREQUENTES
                    </a>
                  </Link>
                </nav>
              </div>
            </div>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </div>
      )}
      {/* Static sidebar for desktop */}

      <div className="flex flex-col flex-1">
        <div className=" top-0 z-10 ">
          <div className="bg-[#12bcc6] gap-4 w-full py-1 px-2 flex justify-center lg:justify-around">
            <div className="bg-white rounded-full pr-2">
              <button className="bg-red-600 font-semibold text-white px-4 py-2 rounded-full text-xs">
                MUDAR LOCAL
              </button>
              <span className="font-semibold uppercase text-xs px-4 py-2 text-[#12bcc6]">
                {subdomain}
              </span>
            </div>
            <div className="flex justify-center gap-2 items-center">
              <img
                src="/icons/facebook.png"
                className="invert w-6 h-6"
                alt=""
              />
              <img
                src="/icons/instagram.png"
                className="invert w-6 h-6"
                alt=""
              />
              <img src="/icons/youtube.png" className="invert w-6 h-6" alt="" />
            </div>
          </div>
          <div className="hidden xl:flex gap-2 lg:gap-4 py-6 container mx-auto md:flex-row md:items-center md:justify-center">
            <div className="flex lg:order-1 w-28 h-14  justify-center  items-center">
              <div>
                <Link href="/">
                  <a className="text-gray-800 text-xl font-bold md:text-2xl">
                    <img src="/logo.webp" className=" " alt="" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex lg:order-3 order-2 items-center gap-2">
              <div className=" font-semibold  text-lg">
                <Link href="/login">
                  <a className="flex lg:w-48 justify-center">
                    <span className="hidden lg:block">
                      Entrar / Cadastrar-se
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 block lg:hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </a>
                </Link>
              </div>

              <Carrinho />
            </div>

            <SearchBar />
          </div>
          <div className="flex xl:hidden flex-col gap-2 lg:gap-4  container mx-auto ">
            <div className="flex justify-between px-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenu(!mobileMenu);
                }}
                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex xl:hidden items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open sidebar</span>

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex lg:order-1 w-28 h-14 lg:w-48 lg:h-24 justify-center  items-center">
                <div>
                  <Link href="/">
                    <a className="text-gray-800 text-xl font-bold md:text-2xl">
                      <img src="/logo.webp" className=" " alt="" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="flex xl:order-3 order-2 items-center gap-2">
                <div className=" font-semibold  text-lg">
                  <Link href="/login">
                    <a className="flex lg:w-48 justify-center">
                      <span className="hidden lg:block">
                        Entrar / Cadastrar-se
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 block lg:hidden"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </a>
                  </Link>
                </div>

                <Carrinho />
              </div>
            </div>
            <SearchBar />
          </div>
          <div className="xl:flex hidden w-full border-t justify-center items-center font-semibold uppercase text-sm divide-x-2">
            <Link href="/">
              <a className="py-3 hover:text-gray-400 duration-300 px-4">
                Ínicio
              </a>
            </Link>
            <Link href="/#como-funciona">
              <a className="py-3 hover:text-gray-400 duration-300 px-4">
                COMO FUNCIONA?
              </a>
            </Link>
            <Link href="/#razoes">
              <a className="py-3 hover:text-gray-400 duration-300 px-4">
                RAZÕES PARA ALUGAR
              </a>
            </Link>
            <Link href="/brinquedos/">
              <a className="py-3 hover:text-gray-400 duration-300 px-4">
                NOSSOS BRINQUEDOS
              </a>
            </Link>
            <Link href="/#sobre">
              <a className="py-3 hover:text-gray-400 duration-300 px-4">
                QUem Somos
              </a>
            </Link>
            <Link href="/#faq">
              <a className="py-3 hover:text-gray-400 duration-300 px-4">
                DÚVIDAS FREQUENTES
              </a>
            </Link>
          </div>
        </div>
        <main className="flex-1">{children}</main>
        <footer
          style={{ backgroundImage: "url('/bg-footer.jpg')" }}
          className="px-4 divide-y bg-contain dark:bg-gray-800 dark:text-gray-100"
        >
          <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
            <div className="lg:w-1/3">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex justify-center space-x-3 lg:justify-start"
              >
                <span className="w-40">
                  <img src="/logo branca.webp" alt="" />
                </span>
              </a>
            </div>
            <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
              <div className="space-y-3">
                <h3 className="tracking-wide uppercase font-bold dark:text-gray-50">
                  Institucional
                </h3>
                <ul className="space-y-1">
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Politica de Privacidade
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Politica de reserva
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Politica de cookies
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" href="#">
                      Mundo Facilitoy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="165"
                  height="59"
                  viewBox="0 0 165 59"
                  fill="none"
                >
                  <path
                    d="M61.7371 18.7249C61.3984 16.853 59.9009 15.7478 58.0648 15.7478C55.7294 15.7478 54.0358 17.5483 54.0358 20.4363C54.0358 23.3243 55.7294 25.1248 58.0648 25.1248C59.9009 25.1248 61.3984 24.0195 61.7371 22.1477H60.6319C60.3644 23.4134 59.277 24.0908 58.0648 24.0908C56.4068 24.0908 55.1055 22.8073 55.1055 20.4363C55.1055 18.0653 56.4068 16.7817 58.0648 16.7817C59.277 16.7817 60.3644 17.4592 60.6319 18.7249H61.7371ZM66.1616 25.1426C68.0156 25.1426 69.2635 23.7343 69.2635 21.6129C69.2635 19.4736 68.0156 18.0653 66.1616 18.0653C64.3076 18.0653 63.0597 19.4736 63.0597 21.6129C63.0597 23.7343 64.3076 25.1426 66.1616 25.1426ZM66.1616 24.1978C64.7532 24.1978 64.1115 22.9855 64.1115 21.6129C64.1115 20.2402 64.7532 19.0101 66.1616 19.0101C67.5699 19.0101 68.2117 20.2402 68.2117 21.6129C68.2117 22.9855 67.5699 24.1978 66.1616 24.1978ZM70.869 25H71.9208V20.7215C71.9208 19.7187 72.6517 19.0101 73.4718 19.0101C74.2695 19.0101 74.8266 19.5316 74.8266 20.3115V25H75.8963V20.5432C75.8963 19.6608 76.4489 19.0101 77.4116 19.0101C78.1603 19.0101 78.8021 19.4068 78.8021 20.4185V25H79.8539V20.4185C79.8539 18.8096 78.9892 18.0653 77.7681 18.0653C76.7876 18.0653 76.0701 18.5154 75.718 19.224H75.6467C75.308 18.4931 74.7108 18.0653 73.8105 18.0653C72.9191 18.0653 72.2595 18.4931 71.9743 19.224H71.8852V18.1544H70.869V25ZM81.7769 27.5671H82.8287V23.9482H82.9179C83.1496 24.3226 83.5953 25.1426 84.9145 25.1426C86.6259 25.1426 87.8203 23.7699 87.8203 21.595C87.8203 19.438 86.6259 18.0653 84.8967 18.0653C83.5597 18.0653 83.1496 18.8853 82.9179 19.2419H82.7931V18.1544H81.7769V27.5671ZM82.8109 21.5772C82.8109 20.0441 83.4883 19.0101 84.7719 19.0101C86.1089 19.0101 86.7685 20.1332 86.7685 21.5772C86.7685 23.039 86.0911 24.1978 84.7719 24.1978C83.5062 24.1978 82.8109 23.1282 82.8109 21.5772ZM89.4247 25H90.4765V20.668C90.4765 19.741 91.2074 19.0636 92.2058 19.0636C92.4865 19.0636 92.7762 19.1171 92.8475 19.1349V18.0653C92.7272 18.0564 92.4509 18.0475 92.2949 18.0475C91.4749 18.0475 90.7618 18.511 90.5122 19.1884H90.4409V18.1544H89.4247V25ZM96.1088 25.1604C97.3032 25.1604 97.9271 24.5187 98.1411 24.073H98.1945V25H99.2463V20.4898C99.2463 18.3149 97.5884 18.0653 96.7149 18.0653C95.6809 18.0653 94.5043 18.4218 93.9695 19.6697L94.9678 20.0263C95.1996 19.5271 95.7478 18.9923 96.7505 18.9923C97.7177 18.9923 98.1945 19.5048 98.1945 20.3828V20.4185C98.1945 20.9265 97.6776 20.882 96.4297 21.0424C95.1595 21.2073 93.7734 21.4881 93.7734 23.0569C93.7734 24.3939 94.8074 25.1604 96.1088 25.1604ZM96.2692 24.2156C95.4313 24.2156 94.8252 23.8412 94.8252 23.1103C94.8252 22.3081 95.5561 22.0585 96.3762 21.9516C96.8219 21.8981 98.0163 21.7733 98.1945 21.5594V22.522C98.1945 23.3777 97.5171 24.2156 96.2692 24.2156ZM109.545 19.6875C109.215 18.716 108.475 18.0653 107.12 18.0653C105.676 18.0653 104.607 18.8853 104.607 20.0441C104.607 20.9889 105.168 21.6218 106.425 21.9159L107.566 22.1833C108.257 22.3438 108.582 22.6736 108.582 23.146C108.582 23.7343 107.958 24.2156 106.978 24.2156C106.118 24.2156 105.578 23.8457 105.391 23.1103L104.393 23.3599C104.638 24.5231 105.596 25.1426 106.996 25.1426C108.587 25.1426 109.67 24.2735 109.67 23.0925C109.67 22.1388 109.072 21.5371 107.851 21.2385L106.835 20.9889C106.024 20.7884 105.658 20.5165 105.658 19.9906C105.658 19.4023 106.282 18.9745 107.12 18.9745C108.038 18.9745 108.417 19.4825 108.6 19.9549L109.545 19.6875ZM114.123 25.1426C115.514 25.1426 116.53 24.4474 116.851 23.4134L115.834 23.1282C115.567 23.8412 114.947 24.1978 114.123 24.1978C112.888 24.1978 112.037 23.4 111.988 21.9337H116.957V21.4881C116.957 18.9388 115.442 18.0653 114.016 18.0653C112.162 18.0653 110.932 19.5271 110.932 21.6307C110.932 23.7343 112.144 25.1426 114.123 25.1426ZM111.988 21.0246C112.06 19.9594 112.813 19.0101 114.016 19.0101C115.157 19.0101 115.888 19.8658 115.888 21.0246H111.988ZM121.321 27.7097C122.961 27.7097 124.28 26.961 124.28 25.1961V18.1544H123.264V19.2419H123.157C122.925 18.8853 122.497 18.0653 121.16 18.0653C119.431 18.0653 118.237 19.438 118.237 21.5416C118.237 23.6808 119.484 24.893 121.142 24.893C122.479 24.893 122.907 24.1086 123.139 23.7343H123.228V25.1248C123.228 26.2657 122.426 26.7827 121.321 26.7827C120.077 26.7827 119.64 26.1276 119.36 25.7487L118.522 26.337C118.95 27.0546 119.792 27.7097 121.321 27.7097ZM121.285 23.9482C119.966 23.9482 119.288 22.9499 119.288 21.5237C119.288 20.1332 119.948 19.0101 121.285 19.0101C122.569 19.0101 123.246 20.0441 123.246 21.5237C123.246 23.039 122.551 23.9482 121.285 23.9482ZM130.519 22.2012C130.519 23.4847 129.539 24.073 128.755 24.073C127.881 24.073 127.257 23.4312 127.257 22.4329V18.1544H126.205V22.5042C126.205 24.2513 127.132 25.0891 128.416 25.0891C129.45 25.0891 130.127 24.5365 130.448 23.8412H130.519V25H131.571V18.1544H130.519V22.2012ZM133.498 25H134.549V20.668C134.549 19.741 135.28 19.0636 136.279 19.0636C136.559 19.0636 136.849 19.1171 136.92 19.1349V18.0653C136.8 18.0564 136.524 18.0475 136.368 18.0475C135.548 18.0475 134.835 18.511 134.585 19.1884H134.514V18.1544H133.498V25ZM140.182 25.1604C141.376 25.1604 142 24.5187 142.214 24.073H142.267V25H143.319V20.4898C143.319 18.3149 141.661 18.0653 140.788 18.0653C139.754 18.0653 138.577 18.4218 138.042 19.6697L139.041 20.0263C139.272 19.5271 139.821 18.9923 140.823 18.9923C141.791 18.9923 142.267 19.5048 142.267 20.3828V20.4185C142.267 20.9265 141.75 20.882 140.503 21.0424C139.232 21.2073 137.846 21.4881 137.846 23.0569C137.846 24.3939 138.88 25.1604 140.182 25.1604ZM140.342 24.2156C139.504 24.2156 138.898 23.8412 138.898 23.1103C138.898 22.3081 139.629 22.0585 140.449 21.9516C140.895 21.8981 142.089 21.7733 142.267 21.5594V22.522C142.267 23.3777 141.59 24.2156 140.342 24.2156Z"
                    fill="white"
                  />
                  <path
                    d="M58.6215 34.7872H60.339C60.3141 33.2767 59.0726 32.2338 57.1855 32.2338C55.3274 32.2338 53.9658 33.2602 53.9741 34.7997C53.9699 36.0495 54.8514 36.7654 56.2833 37.1089L57.2062 37.3406C58.1291 37.5641 58.6422 37.829 58.6464 38.4001C58.6422 39.0208 58.0546 39.443 57.1441 39.443C56.213 39.443 55.5425 39.0126 55.4846 38.1642H53.7506C53.7961 39.9975 55.108 40.9452 57.1648 40.9452C59.234 40.9452 60.4507 39.9561 60.4549 38.4042C60.4507 36.993 59.3871 36.244 57.9139 35.9129L57.1524 35.7308C56.4158 35.5611 55.7991 35.288 55.8115 34.6796C55.8115 34.1334 56.2957 33.7319 57.1731 33.7319C58.0297 33.7319 58.5553 34.121 58.6215 34.7872ZM63.4521 32.3497H61.6602V40.8252H63.4521V32.3497ZM64.6036 33.8271H67.1984V40.8252H68.9697V33.8271H71.5644V32.3497H64.6036V33.8271ZM72.7108 40.8252H78.4384V39.3478H74.5027V37.3241H78.128V35.8467H74.5027V33.8271H78.4218V32.3497H72.7108V40.8252ZM82.5437 40.8252H84.3356V38.0773H85.842C87.7912 38.0773 88.9251 36.9144 88.9251 35.2218C88.9251 33.5374 87.8119 32.3497 85.8875 32.3497H82.5437V40.8252ZM84.3356 36.6413V33.8147H85.544C86.5786 33.8147 87.0794 34.3775 87.0794 35.2218C87.0794 36.0619 86.5786 36.6413 85.5523 36.6413H84.3356ZM90.089 40.8252H91.881V37.8207H93.1887L94.7944 40.8252H96.7726L94.9724 37.531C95.9366 37.1172 96.4705 36.2771 96.4705 35.1183C96.4705 33.434 95.3573 32.3497 93.4329 32.3497H90.089V40.8252ZM91.881 36.3805V33.8147H93.0894C94.124 33.8147 94.6248 34.2741 94.6248 35.1183C94.6248 35.9584 94.124 36.3805 93.0977 36.3805H91.881ZM105.525 36.5875C105.525 33.8147 103.804 32.2338 101.557 32.2338C99.297 32.2338 97.5879 33.8147 97.5879 36.5875C97.5879 39.3478 99.297 40.9411 101.557 40.9411C103.804 40.9411 105.525 39.3602 105.525 36.5875ZM103.709 36.5875C103.709 38.3835 102.856 39.3561 101.557 39.3561C100.253 39.3561 99.4046 38.3835 99.4046 36.5875C99.4046 34.7914 100.253 33.8189 101.557 33.8189C102.856 33.8189 103.709 34.7914 103.709 36.5875ZM106.154 33.8271H108.749V40.8252H110.52V33.8271H113.115V32.3497H106.154V33.8271ZM114.262 40.8252H119.989V39.3478H116.053V37.3241H119.679V35.8467H116.053V33.8271H119.973V32.3497H114.262V40.8252ZM127.017 35.0893H128.838C128.606 33.4133 127.129 32.2338 125.213 32.2338C122.974 32.2338 121.248 33.8478 121.248 36.5957C121.248 39.2774 122.862 40.9411 125.25 40.9411C127.39 40.9411 128.917 39.5878 128.917 37.3572V36.2895H125.37V37.6386H127.191C127.166 38.6898 126.45 39.3561 125.258 39.3561C123.913 39.3561 123.065 38.3504 123.065 36.5792C123.065 34.8162 123.946 33.8189 125.242 33.8189C126.165 33.8189 126.79 34.2948 127.017 35.0893ZM132.055 32.3497H130.263V40.8252H132.055V32.3497ZM136.533 40.8252C139.116 40.8252 140.68 39.2278 140.68 36.5792C140.68 33.9389 139.116 32.3497 136.558 32.3497H133.529V40.8252H136.533ZM135.321 39.2898V33.8851H136.463C138.052 33.8851 138.892 34.6962 138.892 36.5792C138.892 38.4704 138.052 39.2898 136.459 39.2898H135.321ZM149.796 36.5875C149.796 33.8147 148.075 32.2338 145.827 32.2338C143.568 32.2338 141.859 33.8147 141.859 36.5875C141.859 39.3478 143.568 40.9411 145.827 40.9411C148.075 40.9411 149.796 39.3602 149.796 36.5875ZM147.979 36.5875C147.979 38.3835 147.127 39.3561 145.827 39.3561C144.524 39.3561 143.675 38.3835 143.675 36.5875C143.675 34.7914 144.524 33.8189 145.827 33.8189C147.127 33.8189 147.979 34.7914 147.979 36.5875Z"
                    fill="white"
                  />
                  <path
                    d="M27.4993 47.0091C27.9839 47.2984 28.5622 47.3135 29.0612 47.0501C32.0877 45.452 42.7651 39.1716 43.006 29.9891L43.301 18.746C43.3207 17.9989 42.8748 17.318 42.1821 17.0373L29.8284 12.0312C29.4267 11.8684 28.9795 11.8567 28.5698 11.9982L15.9705 16.3495C15.2641 16.5935 14.7831 17.25 14.7635 17.9971L14.4685 29.2403C14.2275 38.4227 24.5608 45.2545 27.4993 47.0091Z"
                    stroke="white"
                    strokeWidth="1.79289"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.4129 20.8726C27.0005 20.2923 27.7997 19.9643 28.6354 19.9643C29.4711 19.9643 30.2704 20.2923 30.858 20.8726C31.4452 21.4525 31.773 22.2367 31.773 23.052V26.2394C31.773 26.2394 31.773 26.2394 31.773 26.2395H25.4979C25.4979 26.2394 25.4979 26.2394 25.4979 26.2394V23.052C25.4979 22.2367 25.8257 21.4525 26.4129 20.8726ZM23.705 26.2395C23.705 26.2394 23.705 26.2394 23.705 26.2394V23.052C23.705 21.754 24.2272 20.5114 25.153 19.597C26.0785 18.6829 27.3314 18.1714 28.6354 18.1714C29.9395 18.1714 31.1924 18.6829 32.1178 19.597C33.0437 20.5114 33.5659 21.754 33.5659 23.052V26.2394C33.5659 26.2394 33.5659 26.2394 33.5659 26.2395H33.8647C34.6899 26.2395 35.3588 26.9692 35.3588 27.8694V33.574C35.3588 34.4742 34.6899 35.2039 33.8647 35.2039H23.4062C22.581 35.2039 21.9121 34.4742 21.9121 33.574V27.8694C21.9121 26.9692 22.581 26.2395 23.4062 26.2395H23.705Z"
                    fill="white"
                  />
                  <path
                    d="M161 0.75H4C2.20507 0.75 0.75 2.20507 0.75 4V55C0.75 56.7949 2.20507 58.25 4 58.25H161C162.795 58.25 164.25 56.7949 164.25 55V4C164.25 2.20507 162.795 0.75 161 0.75Z"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className="space-y-3">
                <img src="/icons-pagamento.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="py-6 text-sm text-center text-white">
            © Copyright 2022 Facilitoy - Todos os direitos reservados - CNPJ
            26.369.719/0001-98
          </div>
        </footer>
      </div>
    </div>
  );
}
