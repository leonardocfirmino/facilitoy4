/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Xarrow from "react-xarrows";
import Link from "next/link";
export default function Steps() {
  const steps = [
    {
      text: "Escolha os brinquedos",
      image: "/steps/1.webp",
      tip: "Escolha os brinquedos que deseja em nosso site ou fale com uma de nossas consultoras",
    },
    {
      text: "Defina o período de locação",
      image: "/steps/2.webp",
      tip: "7, 14 ou 28 dias, você é quem escolhe!",
    },
    {
      text: "Finalize a compra",
      image: "/steps/3.webp",
      tip: "Realize seu pagamento com segurança, de forma rápida e simples. Usamos a tecnologia do Mercado Pago.",
    },
    {
      text: "Receba em casa",
      image: "/steps/4.webp",
      tip: "Pronto, já iniciamos o processo de higienização e desinfecção, e nossa consultora entrará em contato para alinhar a entrega!",
    },
    {
      text: "Devolva ou troque por outro brinquedo",
      image: "/steps/5.webp",
      tip: "Buscamos os brinquedos em sua casa, ou trocamos por uma nova e inesquecível diversão!",
    },
    {
      text: "Sem preocupações",
      image: "/steps/6.webp",
      tip: "Quando o prazo do seu aluguel terminar, não se preocupe! Você pode renovar ou pedir novos brinquedos com a gente. Se resolver alugar novos, o astronauta retira o antigo e já deixa o brinquedo novo com você.",
    },
  ];
  const box1 = useRef();
  const box2 = useRef();
  const box3 = useRef();
  const box4 = useRef();
  const box5 = useRef();
  const box6 = useRef();
  const listBoxes = [box1, box2, box3, box4, box5, box6];
  return (
    <div
      style={{ backgroundImage: "url('/como-funciona.jpg')" }}
      id="como-funciona"
      className="w-full relative bg-cover flex gap-10  flex-col justify-center  items-center "
    >
      <div className="absolute z-10  -top-1 left-0 right-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          fill="#fff"
          preserveAspectRatio="none"
          style={{ width: "100%" }}
          className=" h-14 transform "
        >
          <path
            className="elementor-shape-fill"
            d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
	c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
	c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
          ></path>
        </svg>
      </div>
      <div className="absolute z-10  -bottom-1 left-0 right-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          fill="#fff"
          preserveAspectRatio="none"
          style={{ width: "100%" }}
          className=" h-14 transform rotate-180 "
        >
          <path
            className="elementor-shape-fill"
            d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
	c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
	c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
          ></path>
        </svg>
      </div>
      <div className="w-full flex pt-10 justify-center items-center">
        <h2 className="text-center text-2xl font-bold tracking-tight text-faciRed sm:text-3xl">
          COMO FUNCIONA
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 justify-center place-items-center pt-0 py-28  lg:w-4/6 ">
        {steps.map((value, index) => {
          return (
            <div
              key={index}
              id={index + 1}
              data-tooltip-html={value.tip}
              className="w-32 text-center gap-2 flex flex-col justify-center relative items-center"
            >
              <ReactTooltip
                anchorId={index + 1}
                className="max-w-[15rem] sm:max-w-[17rem] z-20 absolute"
              />

              <img
                ref={listBoxes[index]}
                className={index == 4 ? "w-20 h-28 z-20" : "w-24 h-28 z-20"}
                src={value.image}
                alt=""
              />
              <h1 className="font-bold font-skranji z-20">{value.text}</h1>
            </div>
          );
        })}
      </div>
      <div>
        <div className="hidden lg:flex">
          <Xarrow
            start={box1} //can be react ref
            startAnchor="bottom"
            endAnchor="top"
            dashness
            color="rgba(131, 131, 131, 0.5)"
            path="smooth"
            showHead={false}
            curveness={4}
            end={box2} //or an id
          />
          <Xarrow
            start={box2} //can be react ref
            startAnchor="bottom"
            endAnchor="top"
            dashness
            color="rgba(131, 131, 131, 0.5)"
            path="smooth"
            showHead={false}
            curveness={4}
            end={box3} //or an id
          />
          <Xarrow
            start={box3} //can be react ref
            startAnchor="bottom"
            endAnchor="top"
            dashness
            color="rgba(131, 131, 131, 0.5)"
            path="smooth"
            showHead={false}
            curveness={4}
            end={box4} //or an id
          />
          <Xarrow
            start={box4} //can be react ref
            startAnchor="bottom"
            endAnchor="top"
            dashness
            color="rgba(131, 131, 131, 0.5)"
            path="smooth"
            showHead={false}
            curveness={3}
            end={box5} //or an id
          />
          <Xarrow
            start={box5} //can be react ref
            startAnchor="bottom"
            endAnchor="top"
            dashness
            color="rgba(131, 131, 131, 0.5)"
            path="smooth"
            showHead={false}
            curveness={4}
            end={box6} //or an id
          />
        </div>
        <div className="flex lg:hidden">
          <Xarrow
            start={box1} //can be react ref
            startAnchor="right"
            endAnchor="left"
            _cpy2Offset={25}
            dashness
            color="rgba(131, 131, 131, 0.5)"
            path="smooth"
            showHead={false}
            end={box2} //or an id
          />
          <Xarrow
            start={box2} //can be react ref
            startAnchor="bottom"
            endAnchor="top"
            dashness
            _cpy1Offset={-25}
            _cpy2Offset={25}
            color="rgba(131, 131, 131, 0.5)"
            path="smooth"
            showHead={false}
            end={box3} //or an id
          />
          <Xarrow
            start={box3} //can be react ref
            startAnchor="right"
            endAnchor="left"
            dashness
            _cpy1Offset={-25}
            _cpy2Offset={25}
            color="rgba(131, 131, 131, 0.5)"
            path="smooth"
            showHead={false}
            end={box4} //or an id
          />
          <Xarrow
            start={box4} //can be react ref
            startAnchor="bottom"
            endAnchor="top"
            dashness
            _cpy1Offset={-25}
            _cpy2Offset={25}
            color="rgba(131, 131, 131, 0.5)"
            path="smooth"
            showHead={false}
            end={box5} //or an id
          />
          <Xarrow
            start={box5} //can be react ref
            startAnchor="right"
            endAnchor="left"
            dashness
            _cpy2Offset={25}
            color="rgba(131, 131, 131, 0.5)"
            path="smooth"
            showHead={false}
            end={box6} //or an id
          />
        </div>
      </div>
      <Link href="/brinquedos">
        <a className="absolute bottom-20 duration-300 hover:scale-125 hover:bg-[#3582a3] text-white px-14 py-4 bg-[#41a1c9] rounded-md font-bold">
          ALUGAR AGORA!
        </a>
      </Link>
    </div>
  );
}
