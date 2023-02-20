import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "E se meu filho quebrar o brinquedo?",
    answer:
      "A Facilitoy conta com uma estrutura para realizar pequenos reparos, que na maioria das vezes não torna necessária a cobrança. Além disso, é extremamente raro que uma criança consiga estragar definitivamente um brinquedo da Facilitoy. Todos são de extrema qualidade e durabilidade, feitos para brincar de verdade. ",
  },
  {
    question: "Os brinquedos são novos?",
    answer:
      "Todos os brinquedos da Facilitoy são bem cuidados e em excelentes condições. Nosso estoque é renovado constantemente. Nunca alugamos brinquedos com defeitos! ",
  },
  {
    question: "Os brinquedos são higienizados?",
    answer:
      "Sim! Todos os brinquedos passam por um rigoroso processo de higienização, pois sabemos a importância dos brinquedos estarem bem limpinhos para os bebês.  ",
  },
  {
    question: "Quanto é para alugar um brinquedo?",
    answer:
      "O valor do aluguel de cada brinquedo depende do seu tipo e tempo de locação. Mas, a quantia economizada em um aluguel comparado à compra chega a 90%! ",
  },
  {
    question: "E se meu filho se apegar ao brinquedo?",
    answer:
      "Não precisa se preocupar. Se o seu filho gostar muito do brinquedo, você pode renovar o aluguel por quanto tempo quiser ou ainda comprar o brinquedo com a gente.  ",
  },
  {
    question: "A facilitoy é uma loja de aluguel para brinquedos de festa?",
    answer:
      "A Facilitoy não é especializada em aluguel de brinquedos para festas infantis como brinquedos infláveis, piscina de bolinhas, pula-pula gigante ou espaço kids. ",
  },
  // More questions...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div id="faq" className="">
      <div className="mx-auto w-3/5 py-12 px-4 sm:py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full  ">
          <h2 className="text-center text-2xl font-bold tracking-tight text-blue-400 sm:text-3xl">
            DÚVIDAS FREQUENTES
          </h2>
          <dl className="mt-6  px-4 space-y-3 gap-3 flex flex-col pb-3">
            {faqs.map((faq) => (
              <Disclosure
                as="div"
                key={faq.question}
                className={classNames(
                  "py-6 px-6 justify-between flex-col bg-[#ddeff7] gap-2 rounded-md flex items-center"
                )}
              >
                {({ open }) => (
                  <>
                    <dt className="text-md w-full">
                      <Disclosure.Button className="flex  w-full items-center justify-between text-left text-gray-400">
                        <span className="font-medium items-center flex text-gray-900">
                          {faq.question}
                        </span>
                        <span className="flex px-1 py-1 bg-white rounded-sm items-center">
                          <PlusIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-6 w-6 transform"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className=" ">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
