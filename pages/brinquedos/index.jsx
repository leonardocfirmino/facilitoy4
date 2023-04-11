/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout";
import { Fragment, useEffect, useState } from "react";
import {
  ChevronDownIcon,
  FunnelIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Tab,
  Transition,
} from "@headlessui/react";
import useSWR from "swr";
import request from "graphql-request";
import Select from "react-select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Empty from "../../components/Empty";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
function classOrganizer(...classes) {
  return classes.filter(Boolean).join(" ");
}
const IndexBrinquedo = ({ subdomain }) => {
  const { data: user } = useSession();
  const router = useRouter();
  const [ages, setAges] = useState([]);
  const fetcher = async (query) =>
    axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        subdomain +
        "." +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/get-brinquedos-filter",
      query,
      {}
    );
  const [ageFilter, setAgeFilter] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [orderBy, setOrderBy] = useState("order_by: {created_at: desc}");
  const [select, setSelect] = useState(null);
  const [selectValue, setSelectValue] = useState(null);
  useEffect(() => {
    if (router.query.age != undefined) setAgeFilter(router.query.age);
    if (router.query.categoria != undefined)
      setCategoriaFilter(router.query.categoria);
  }, [router.query.age, router.query.categoria]);
  const { data, mutate } = useSWR(
    {
      age: ageFilter,
      name: router.query.search,
      subdomain: subdomain,
      category_id: categoriaFilter,
      order_by: orderBy,
    },
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  if (data && ages.length == 0) {
    setAges(data.data.faixa_etaria);
  }
  if (data && select == null) {
    setSelect(
      data.data.category.map((value) => {
        return {
          value: value.id,
          label: (
            <div className="flex gap-4  items-center">
              <img
                className="w-8 h-8"
                src={
                  "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                  value.image_src
                }
              />
              <h1>{value.name}</h1>
            </div>
          ),
        };
      })
    );
  }

  const getCategoryById = (id, data) => {
    const category = data.find((value) => {
      return value.id == id;
    });

    return {
      value: id,
      label: (
        <div className="flex gap-4  items-center">
          <img
            className="w-8 h-8"
            src={
              "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
              category.image_src
            }
          />
          <h1>{category.name}</h1>
        </div>
      ),
    };
  };
  if (data && selectValue == null && router.query.categoria != null) {
    setSelectValue(getCategoryById(router.query.categoria, data.data.category));
  }
  const sortOptions = [
    { name: "Mais novos", href: "order_by: {created_at: desc}", current: true },
    { name: "Nome ascendente", href: "order_by: {name: asc}", current: false },
    {
      name: "Nome decrescente",
      href: "order_by: {name: desc}",
      current: false,
    },

    {
      name: "Preço: menor ao maior",
      href: "order_by: {price_one: asc}",
      current: false,
    },
    {
      name: "Price: maior ao menor",
      href: "order_by: {price_one: desc}",
      current: false,
    },
  ];
  return (
    <Layout subdomain={subdomain}>
      <div
        style={{
          backgroundImage: "url('/ROSA-aviao.jpg')",
          backgroundPosition: "top",
        }}
        className="w-full py-20 flex justify-center items-center bg-cover"
      >
        <div className="lg:w-4/6 py-20">
          <h1 className="text-6xl text-gray-800 font-bold">Brinquedos</h1>
        </div>
      </div>
      <div className="py-8">
        <div className="mb-4  w-11/12 mx-auto">
          {data && (
            <Swiper
              spaceBetween={2}
              slidesPerView={10}
              breakpoints={{
                360: {
                  slidesPerView: 2.8,
                },
                768: {
                  slidesPerView: ages.length >= 7 ? 7 : ages.length,

                  spaceBetween: 10,
                },
                1025: {
                  slidesPerView: ages.length >= 7 ? 7 : ages.length,

                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: ages.length >= 7 ? 7 : ages.length,

                  spaceBetween: 20,
                },
                1500: {
                  slidesPerView: ages.length >= 7 ? 7 : ages.length,

                  spaceBetween: 20,
                },
              }}
              className=" swiper-container  "
            >
              <SwiperSlide>
                <button
                  onClick={() => setAgeFilter("")}
                  className={classNames(
                    ageFilter == "" && "border-8 border-faciRed",
                    "rounded-full relative flex items-center transition-none justify-center overflow-hidden bg-faciBabyBlue px-4 py-4 w-32 h-32 hover:border-4 border-faciRed duration-300"
                  )}
                >
                  <p className="uppercase text-center max-w-[100px] z-20 font-bold text-xl text-faciRed ">
                    Todas
                  </p>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 absolute top-2 right-2 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 absolute -scale-100 bottom-2 left-2 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                </button>
              </SwiperSlide>
              {ages.map((value) => (
                <SwiperSlide key={value.id}>
                  <button
                    onClick={() => setAgeFilter(value.id)}
                    className={classNames(
                      ageFilter == value.id && "border-8 border-faciRed",
                      "rounded-full relative flex items-center transition-none justify-center overflow-hidden bg-faciBabyBlue px-4 py-4 w-32 h-32 hover:border-4 border-faciRed duration-300"
                    )}
                  >
                    <p className="uppercase text-center max-w-[100px] z-20 font-bold text-xl text-faciRed ">
                      {value.name}
                    </p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 absolute top-2 right-2 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 absolute -scale-100 bottom-2 left-2 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      />
                    </svg>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <Disclosure
          as="section"
          aria-labelledby="filter-heading"
          className="grid items-center border-t border-b border-gray-200"
        >
          <h2 id="filter-heading" className="sr-only">
            Filters
          </h2>
          <div className="relative col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
              <Select
                placeholder="Selecione uma categoria"
                name="produto"
                className="sm:w-64"
                required
                onChange={(e) => {
                  setSelectValue(e);
                  setCategoriaFilter(e.value);
                }}
                value={selectValue}
                options={select}
              />
            </div>
          </div>

          <div className="col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
              <Menu as="div" className="relative inline-block">
                <div className="flex">
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Organizar por
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 flex flex-col justify-center">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={() => setOrderBy(option.href)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </Disclosure>
        <div className="w-4/6 mx-auto py-6 flex justify-between items-center">
          <h2>
            Início / <span className="font-semibold">Brinquedos</span>
          </h2>
        </div>
        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8"
        >
          {data ? (
            data.data.product.length > 0 ? (
              <div className="-mx-px grid grid-cols-2 gap-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                {data.data.product.map(
                  (product) =>
                    product.is_active == true && (
                      <div
                        key={product.id}
                        className={classOrganizer(
                          product.is_unavailable &&
                            "pointer-events-none saturate-50",
                          "group relative border-r border-b border-gray-200 p-4 sm:p-6"
                        )}
                      >
                        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                          <img
                            src={
                              product?.product_image?.src != undefined
                                ? "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                                  product?.product_image?.src
                                : "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                                  product?.product_images[0]?.src
                            }
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="pt-10 pb-4 text-center">
                          <h3 className="text-sm font-medium text-gray-900">
                            <a href={"/brinquedos/" + product.slug}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.name}
                            </a>
                          </h3>

                          <p className="mt-4 text-base font-medium text-red-600">
                            R${product.price_one},00
                          </p>
                        </div>
                        <div className="mt-6">
                          <a
                            href={"/brinquedos/" + product.slug}
                            className={classOrganizer(
                              !product.is_unavailable
                                ? "bg-red-600 hover:bg-red-500 cursor-pointer"
                                : "bg-gray-400 hover:bg-gray-500 pointer-events-none",
                              "relative  flex items-center justify-center rounded-md border border-transparent  py-2 px-8 text-sm font-medium text-white "
                            )}
                          >
                            {product.is_unavailable ? "Indisponível" : "Alugar"}
                          </a>
                        </div>
                      </div>
                    )
                )}
              </div>
            ) : (
              <Empty />
            )
          ) : (
            <div className="w-full flex justify-center">
              <RingLoader color="#00d6de" />
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default IndexBrinquedo;
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
