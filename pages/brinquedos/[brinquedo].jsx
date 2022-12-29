import { useState } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import axios from "axios";
import Script from "next/script";
import { useMercadopago } from "react-sdk-mercadopago";
const change = [
  {
    name: "Torre de Carrinhos",
    slug: "torre-carrinhos",
    images: [
      {
        id: 1,
        name: "1",
        src: "/torre/1.jpeg",
        alt: "1",
      },
      {
        id: 2,
        name: "2",
        src: "/torre/2.webp",
        alt: "2",
      },
      {
        id: 3,
        name: "3",
        src: "/torre/3.webp",
        alt: "3",
      },
      {
        id: 4,
        name: "4",
        src: "/torre/4.webp",
        alt: "4",
      },
      // More images...
    ],
    precos: [
      {
        tempo: "7 Dias",
        price: 89,
        desconto: 0,
      },
      {
        tempo: "14 Dias",
        price: 104,
        desconto: 74,
      },
      {
        tempo: "28 Dias",
        price: 139,
        desconto: 217,
      },
    ],
    description: `
    <p>A Torre de Carrinhos é a pista de corrida de Wheelies mais alta de todos os tempos! Com três pistas diferentes, um iniciador incrível, frases e sons de corrida bacanas e paradas de brincadeira ao longo do caminho, este conjunto de pistas é repleto de diversão incrível para crianças descobrirem e compartilharem. Brincadeira imaginativa: com veículos fáceis de manusear e brincadeiras como parar em um posto de gasolina e reparos, as crianças podem usar sua imaginação para criar histórias enquanto brincam.</p>
  `,
    details: [
      {
        name: "Descrição",
        items: [
          "Categorias: 1 a 2 anos, 2 a 4 anos, acima de 4 anos",
          "Especificação: Peças: 1 torre + 2 carrinhos",
          "Entregas: Segunda, Quarta, Quinta, Sexta e Sábado",
        ],
      },
    ],
  },
  {
    name: "Mesa Estação de Atividades",
    slug: "mesa-estacao-atividades",
    images: [
      {
        id: 1,
        name: "1",
        src: "/carrousel-2/2.png",
        alt: "1",
      },
    ],
    precos: [
      {
        tempo: "7 Dias",
        price: 89,
        desconto: 0,
      },
      {
        tempo: "14 Dias",
        price: 104,
        desconto: 74,
      },
      {
        tempo: "28 Dias",
        price: 139,
        desconto: 217,
      },
    ],
    description: `
    <p>A Mega Estação de Atividades possui uma torre central com luzes pulsantes que incentivam o bebê a se movimentar, vem com seis bolas coloridas e é repleta de diversão nas rampas para crianças de todas as fases. Sentado, o pequeno poderá jogar as bolas nas rampas mais baixas ou bater na roda de pás. Além disso, quando estiver pronto para engatinhar, o bebê pode passar pelo portão, que gira para todos os lados ou até mesmo engatinhar pelo outro arco, ativando o sensor e sendo recompensado com luzes e sons.</p>
  `,
    details: [
      {
        name: "Descrição",
        items: [
          "Categorias: 1-a-2-anos, 6-a-12-meses, Sem categoria",
          "Idade recomendada: a partir de 6 a 36 meses",
          "Funciona com 4 pilhas C (LR14) Alcalina - Inclusas",
          "Dimensões: Altura: 95cm; Largura: 95c m; Profundidade: 95 cm (ocupa aproximadamente 1 m²)",
          "Quantidade de peças:  3 Bolinhas + Estação de Atividades",
        ],
      },
    ],
  },
];
/* const product = {
  name: "Torre de Carrinhos",

  images: [
    {
      id: 1,
      name: "1",
      src: "/torre/1.jpeg",
      alt: "1",
    },
    {
      id: 2,
      name: "2",
      src: "/torre/2.webp",
      alt: "2",
    },
    {
      id: 3,
      name: "3",
      src: "/torre/3.webp",
      alt: "3",
    },
    {
      id: 4,
      name: "4",
      src: "/torre/4.webp",
      alt: "4",
    },
    // More images...
  ],
  precos: [
    {
      tempo: "7 Dias",
      price: 89,
      desconto: 0,
    },
    {
      tempo: "14 Dias",
      price: 104,
      desconto: 74,
    },
    {
      tempo: "28 Dias",
      price: 139,
      desconto: 217,
    },
  ],
  description: `
    <p>A Torre de Carrinhos é a pista de corrida de Wheelies mais alta de todos os tempos! Com três pistas diferentes, um iniciador incrível, frases e sons de corrida bacanas e paradas de brincadeira ao longo do caminho, este conjunto de pistas é repleto de diversão incrível para crianças descobrirem e compartilharem. Brincadeira imaginativa: com veículos fáceis de manusear e brincadeiras como parar em um posto de gasolina e reparos, as crianças podem usar sua imaginação para criar histórias enquanto brincam.</p>
  `,
  details: [
    {
      name: "Descrição",
      items: [
        "Categorias: 1 a 2 anos, 2 a 4 anos, acima de 4 anos",
        "Especificação: Peças: 1 torre + 2 carrinhos",
        "Entregas: Segunda, Quarta, Quinta, Sexta e Sábado",
      ],
    },
  ],
}; */

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ subdomain }) {
  const router = useRouter();
  const { brinquedo } = router.query;
  const mercadopago = useMercadopago.v2(
    "TEST-424dab6b-43c3-4826-bf8a-d4bc5d057c53",
    {
      locale: "pt-BR",
    }
  );
  const product = brinquedo == "torre-carrinhos" ? change[0] : change[1];

  const [selectedColor, setSelectedColor] = useState(product.precos[0]);
  console.log(selectedColor);
  const createCheckout = async () => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        (subdomain ? subdomain + "." : null) +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/create-checkout",
      {
        title: brinquedo == "torre-carrinhos" ? change[0].name : change[1].name,
        price: selectedColor.price,
      }
    );

    const checkout = mercadopago.checkout({
      preference: {
        id: response.data.body.id,
      },
    });
    checkout.open();
    console.log(response);
  };
  return (
    <Layout subdomain={subdomain}>
      <div className="pop-mercado"></div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-8 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only"> {image.name} </span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image.src}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-indigo-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                {product.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <form className="mt-6">
                <div>
                  <h3 className="text-sm text-gray-600">Escolha o período</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Escolha o período
                    </RadioGroup.Label>
                    <span className="flex items-center space-x-3">
                      {product.precos.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedColor,
                              checked
                                ? "bg-red-500 text-white"
                                : "text-red-500",

                              "-m-0.5 relative p-0.5   rounded-xl duration-300 flex items-center justify-center cursor-pointer focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.tempo}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.bgColor,

                              "flex text-sm gap-1  text-center flex-col border px-6 py-2 border-red-500 border-opacity-90 rounded-xl"
                            )}
                          >
                            <h1 className="font-bold">{color.tempo}</h1>
                            <h2>R$ {color.price},00</h2>
                          </span>
                          {color.desconto != 0 && (
                            <span className="absolute text-xs bg-white text-red-500 px-2 py-0.5 border-red-500 border rounded-full -bottom-3">
                              Economize R${color.desconto}
                            </span>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </span>
                  </RadioGroup>
                </div>

                <div className="sm:flex-col1 mt-10 flex">
                  <button
                    type="button"
                    onClick={() => createCheckout()}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-red-600 py-3 px-8 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Alugar
                  </button>
                </div>
              </form>

              {/* Reviews */}

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(
                                  open ? "text-indigo-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="prose prose-sm pb-6"
                          >
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
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
