/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";
import CookieConsent, { Cookies } from "react-cookie-consent";
import Carrinho from "./Carrinho";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import useSWR from "swr";
import { useSelector } from "react-redux";
import formatPhoneNumber from "../helpers/formatPhoneNumber";
import TagManager from "react-gtm-module";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Layout({ children, subdomain }) {
  const router = useRouter();
  const session = useSession();
  const fetcher = async (url) =>
    axios.get(
      process.env.NEXT_PUBLIC_PREFIX +
        (subdomain ? subdomain + "." : null) +
        process.env.NEXT_PUBLIC_SITE_URL +
        url
    );
  const { data, mutate } = useSWR("/api/get-home", fetcher);
  const callback =
    process.env.NEXT_PUBLIC_PREFIX +
    subdomain +
    "." +
    process.env.NEXT_PUBLIC_SITE_URL +
    "/carrinho";

  const items = useSelector((state) => state.cart);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [actualMenu, setActualMenu] = useState(router.pathname);
  const [tagEnabled, setTagEnabled] = useState(false);
  if (data && !tagEnabled) {
    if (
      data.data.franquia[0].pixel_google != null ||
      data.data.franquia[0]?.pixel_google?.length > 3
    ) {
      const tagManagerArgs = {
        gtmId: data.data.franquia[0].pixel_google,
      };
      TagManager.initialize(tagManagerArgs);
      setTagEnabled(true);
    }
  }
  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText="Permitir cookies"
        cookieName="cookiepermission"
        style={{ background: "#3582a3" }}
        buttonStyle={{
          backgroundColor: "#12bcc6",
          fontSize: "1.1rem",
          color: "white",
          fontWeight: "bold",
          paddingRight: "16px",
          paddingLeft: "16px",
          paddingTop: "8px",
          paddingBottom: "8px",
          borderRadius: "5px",
        }}
        expires={150}
      >
        Este site utiliza cookies para garantir que você obtenha a melhor
        experiência em nosso site
        <a href="#" className="ml-3 text-sm underline">
          Politica de privacidade
        </a>
      </CookieConsent>
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
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="flex w-full  text-gray-600 items-center px-2 py-2 text-sm font-medium   hover:text-gray-400 duration-300 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="mr-3 h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                        BRINQUEDOS
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div
                          className="py-1"
                          onClick={() => {
                            setMobileMenu(!mobileMenu);
                          }}
                        >
                          {data &&
                            data.data.faixa_etaria.map((value) => {
                              return (
                                <Menu.Item key={value.id}>
                                  {({ active }) => (
                                    <Link
                                      legacyBehavior
                                      prefetch={false}
                                      href={`/brinquedos?age=${value.id}`}
                                    >
                                      <a
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block px-4 py-2 text-sm"
                                        )}
                                      >
                                        {value.name}
                                      </a>
                                    </Link>
                                  )}
                                </Menu.Item>
                              );
                            })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <a
                    onClick={() => {
                      setMobileMenu(!mobileMenu);
                    }}
                    href="/#sobre"
                    className={
                      "text-gray-600 group uppercase flex items-center px-2 py-2 text-sm font-medium rounded-md"
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
                    Quem somos
                  </a>

                  <a
                    href="/#faq"
                    onClick={() => {
                      setMobileMenu(!mobileMenu);
                    }}
                    className={
                      "text-gray-600 group uppercase flex items-center px-2 py-2 text-sm font-medium rounded-md"
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
                    dúvidas frequentes
                  </a>

                  <a
                    href="#razoes"
                    onClick={() => {
                      setMobileMenu(!mobileMenu);
                    }}
                    className={
                      "text-gray-600 group uppercase flex items-center px-2 py-2 text-sm font-medium rounded-md"
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
                    Por que alugar?
                  </a>
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

      <div className="flex flex-col flex-1 ">
        <div className=" top-0 z-10 border-b-2 border-gray-300/40">
          <div className="bg-[#12bcc6] gap-2 lg:gap-4 w-full py-1 px-2 flex  items-center lg:flex-row flex-col justify-center lg:justify-around">
            <a
              href={
                process.env.NEXT_PUBLIC_PREFIX +
                process.env.NEXT_PUBLIC_SITE_URL +
                "/selecionar-estado"
              }
              className="bg-white rounded-full pr-2"
            >
              <button className="bg-red-600 font-semibold uppercase text-white px-4 py-2 rounded-full text-xs">
                Brinquedos disponíveis para
              </button>
              <span className="font-semibold uppercase text-xs px-4 py-2 text-[#12bcc6]">
                {subdomain}
              </span>
            </a>
            <div className="flex justify-center gap-2 items-center">
              <a
                href="https://facilitoyfranquia.com.br/"
                target="_blank"
                rel="noreferrer"
                className="bg-white rounded-xl px-4 text-xs text-red-500 py-2 uppercase font-bold"
              >
                Seja um franqueado
              </a>
            </div>
          </div>
          <div className="hidden xl:flex gap-2 lg:gap-4 py-6 container mx-auto md:flex-row md:items-center md:justify-center">
            <div className="flex lg:order-1 w-48 h-24  justify-center  items-center">
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
                {session.data != undefined ? (
                  <Link href="/perfil">
                    <a className="flex w-48 justify-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </a>
                  </Link>
                ) : (
                  <Link
                    legacyBehavior
                    prefetch={false}
                    href={`/login?callbackUrl=${callback}`}
                  >
                    <a className="flex w-48 justify-center">
                      <span className="hidden lg:block">
                        Entrar / Cadastrar-se
                      </span>
                    </a>
                  </Link>
                )}
              </div>

              <Carrinho products={items} />
            </div>

            <SearchBar subdomain={subdomain} />
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
                  <Link
                    legacyBehavior
                    prefetch={false}
                    href={
                      session.data != undefined
                        ? "/perfil"
                        : `/login?callbackUrl=${callback}`
                    }
                  >
                    <a className="flex lg:w-48 justify-center">
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

                <Carrinho products={items} />
              </div>
            </div>
            <SearchBar subdomain={subdomain} />
          </div>
          <div className="xl:flex divide-gray-300 hidden bg-gray-100 w-full border-t justify-center items-center font-semibold uppercase text-sm divide-x-2">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center    px-4 py-2 text-sm font-medium  hover:text-gray-400 duration-300 ">
                  BRINQUEDOS
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0  mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {data &&
                      data.data.faixa_etaria.map((value) => {
                        return (
                          <Menu.Item key={value.id}>
                            {({ active }) => (
                              <Link
                                legacyBehavior
                                prefetch={false}
                                href={`/brinquedos?age=${value.id}`}
                              >
                                <a
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {value.name}
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        );
                      })}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Link href="/#sobre">
              <a className="py-3 hover:text-gray-400 duration-300 px-4">
                Quem Somos
              </a>
            </Link>
            <Link href="/#faq">
              <a className="py-3 hover:text-gray-400 duration-300 px-4">
                DÚVIDAS FREQUENTES
              </a>
            </Link>
            <Link href="/#razoes">
              <a className="py-3 hover:text-gray-400 duration-300 px-4">
                Por que alugar?
              </a>
            </Link>
          </div>
        </div>
        <main className="flex-1">{children}</main>
        <footer className=" divide-y bg-contain bg-[#12bcc6] text-gray-100">
          <div className="w-full px-10 lg:gap-10 flex flex-col items-center justify-center py-10 mx-auto gap-4 space-y-8 lg:flex-row lg:space-y-0">
            <div className="">
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
            <div className="space-y-3 text-sm">
              <h3 className="tracking-wide uppercase font-bold dark:text-gray-50">
                Empresa
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

            <div className="flex justify-center">
              <img src="/eu-reciclo-trans.png" className=" w-40 h-40" alt="" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex h-full   items-center  gap-4 justify-center  ">
                <div className="text-center">
                  <h1 className="text-sm font-bold mb-4 text-white">
                    Nos encontre nas redes sociais
                  </h1>
                  <div className="flex justify-center gap-4 items-center">
                    <div className=" transition-all duration-300 cursor-pointer  rounded-full">
                      <img
                        src="/icons/facebook.png"
                        className="invert w-8 h-8"
                        alt=""
                      />
                    </div>
                    <div className=" transition-all duration-300 cursor-pointer  rounded-full ">
                      <img
                        src="/icons/instagram.png"
                        className="invert w-8 h-8"
                        alt=""
                      />
                    </div>
                    <div className="  transition-all duration-300 cursor-pointer  rounded-full">
                      <img
                        src="/icons/youtube.png"
                        className="invert w-8 h-8"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {data && data.data.franquia[0].endereco_completo && (
              <div className=" shadow-xl flex flex-col rounded-xl  bg-white px-4 py-4 text-xl ">
                <div className="space-y-2">
                  <h1 className="font-bold text-red-500 mb-2">Facilitoy</h1>
                  <h2 className="font-semibold text-red-500 flex text-sm items-center justify-start gap-1">
                    Facilitoy Locação de Brinquedos Ltda
                  </h2>
                  <h2 className="font-semibold text-red-500 flex text-sm items-center justify-start gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <span className="w-3/4">
                      {data.data.franquia[0].endereco_completo}
                    </span>
                  </h2>
                  <h2 className="font-semibold text-red-500 flex text-sm items-center justify-start gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z" />
                    </svg>
                    <span>
                      {formatPhoneNumber(data.data.franquia[0].contato)}
                    </span>
                  </h2>
                </div>
              </div>
            )}
          </div>
          <div className="py-4 bg-gray-100 w-full text-sm text-center text-black">
            <h1>
              © Copyright 2022 Facilitoy - Todos os direitos reservados - CNPJ
              26.369.719/0001-98
            </h1>
            <h1 className="text-[10px] text-center  text-black">
              Se alguma foto de sua autoria estiver em nosso site e você desejar
              sua remoção ou registrar sua autoria, por favor envie um email
              para{" "}
              <a className="text-blue-600 underline">
                contato@facilitoy.com.br
              </a>{" "}
              que prontamente lhe atenderemos
            </h1>
          </div>
        </footer>
      </div>
      {data && data.data.franquia[0].contato && (
        <a
          href={`https://wa.me/+55${data.data.franquia[0].contato.replace(
            " ",
            ""
          )}?text=Ol%C3%A1%2C+vim+pelo+site+da+facilitoy+e+preciso+de+ajuda`}
          className="fixed bottom-5 z-50 right-5 duration-300 hover:scale-110"
        >
          <img src="/pngwing.com.png" className="w-16 h-16 " alt="" />
        </a>
      )}
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const subdomain =
    ctx.req.headers["x-forwarded-host"] || ctx.req.headers["host"];
  if (process.env.NEXT_PUBLIC_PREFIX == "http://")
    if (subdomain.split(".")[1] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  if (process.env.NEXT_PUBLIC_PREFIX != "http://")
    if (subdomain.split(".")[3] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  return { props: { subdomain: subdomain.split(".")[0] } };
}
