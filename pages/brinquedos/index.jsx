import Layout from "../../components/Layout";
import { Fragment, useState } from "react";
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
const IndexBrinquedo = ({ subdomain }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const filters = {
    price: [
      { value: "0", label: "$0 - $25", checked: false },
      { value: "25", label: "$25 - $50", checked: false },
      { value: "50", label: "$50 - $75", checked: false },
      { value: "75", label: "$75+", checked: false },
    ],
    color: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
    size: [
      { value: "xs", label: "XS", checked: false },
      { value: "s", label: "S", checked: true },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "2xl", label: "2XL", checked: false },
    ],
    category: [
      { value: "all-new-arrivals", label: "All New Arrivals", checked: false },
      { value: "tees", label: "Tees", checked: false },
      { value: "objects", label: "Objects", checked: false },
      { value: "sweatshirts", label: "Sweatshirts", checked: false },
      { value: "pants-and-shorts", label: "Pants & Shorts", checked: false },
    ],
  };
  const products = [
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

    // More products...
  ];
  return (
    <Layout subdomain={subdomain}>
      <div
        style={{ backgroundImage: "url('/bg-brinquedos.webp')" }}
        className="w-full flex justify-center items-center bg-cover"
      >
        <div className="w-4/6 py-20">
          <h1 className="text-6xl text-gray-800 font-bold">Brinquedos</h1>
        </div>
      </div>
      <div className="py-8">
        {/*  <Disclosure
          as="section"
          aria-labelledby="filter-heading"
          className="grid items-center border-t border-b border-gray-200"
        >
          <h2 id="filter-heading" className="sr-only">
            Filters
          </h2>
          <div className="relative col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
              <div>
                <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                  <FunnelIcon
                    className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  2 Filters
                </Disclosure.Button>
              </div>
              <div className="pl-6">
                <button type="button" className="text-gray-500">
                  Clear all
                </button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="border-t border-gray-200 py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
              <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                <fieldset>
                  <legend className="block font-medium">Price</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.price.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`price-${optionIdx}`}
                          name="price[]"
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked={option.checked}
                        />
                        <label
                          htmlFor={`price-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="block font-medium">Color</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.color.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`color-${optionIdx}`}
                          name="color[]"
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked={option.checked}
                        />
                        <label
                          htmlFor={`color-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                <fieldset>
                  <legend className="block font-medium">Size</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.size.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`size-${optionIdx}`}
                          name="size[]"
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked={option.checked}
                        />
                        <label
                          htmlFor={`size-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="block font-medium">Category</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.category.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`category-${optionIdx}`}
                          name="category[]"
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked={option.checked}
                        />
                        <label
                          htmlFor={`category-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </Disclosure.Panel>
          <div className="col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
              <Menu as="div" className="relative inline-block">
                <div className="flex">
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </Disclosure> */}
        <div className="w-4/6 mx-auto py-6 flex justify-between items-center">
          <h2>
            Início / <span className="font-semibold">Brinquedos</span>
          </h2>
        </div>
        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8"
        >
          <h2 id="products-heading" className="sr-only">
            Brinquedos
          </h2>

          <div className="-mx-px grid grid-cols-2 gap-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative border-r border-b border-gray-200 p-4 sm:p-6"
              >
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <img
                    src={product.image}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="pt-10 pb-4 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={"/brinquedos/" + product.slug}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>

                  <p className="mt-4 text-base font-medium text-red-600">
                    R${product.price},00
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href={"/brinquedos/" + product.slug}
                    className="relative cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-8 text-sm font-medium text-white hover:bg-red-500"
                  >
                    Alugar<span className="sr-only">, {product.name}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default IndexBrinquedo;
export async function getServerSideProps(ctx) {
  const subdomain =
    ctx.req.headers["x-forwarded-host"] || ctx.req.headers["host"];
  if (subdomain.split(".")[1] == undefined)
    return {
      redirect: {
        destination: `/selecionar-estado`,
        permanent: false,
      },
    };
  return { props: { subdomain: subdomain.split(".")[0] } };
}
