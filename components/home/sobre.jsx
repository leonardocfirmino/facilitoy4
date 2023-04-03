import Image from "next/image";

export default function Sobre() {
  return (
    <div
      id="sobre"
      className="w-full bg-gradient-to-r from-[#ecf8fe] to-[#ffe2ec] relative pt-10 pb-20 lg:py-0"
    >
      <div className="absolute z-10  -top-1 left-0 right-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          fill="#f3f4f6"
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
      <div className="pt-14 w-full flex justify-center items-center">
        <h2 className="text-center text-2xl font-bold tracking-tight text-blue-400 sm:text-3xl">
          QUEM SOMOS
        </h2>
      </div>
      <div className="w-full pb-20 flex flex-col lg:flex-row items-center justify-center px-2 gap-2 lg:gap-6  ">
        <Image
          width={550}
          quality={100}
          height={400}
          src="/sobre-png.png"
          className=" rounded-full "
          alt=""
        />

        <div className="bg-white lg:w-[480px] px-8 py-8 text-sm lg:text-md rounded-xl  text-gray-500 flex flex-col gap-10 justify-center items-center">
          <p>
            Queremos transformar e facilitar a vida das mães, fazendo com que o
            brincar seja a estrela para o melhor desenvolvimento de quem mais
            amamos.
          </p>

          <p className="font-bold">
            Nosso maior compromisso é com a segurança e o aprendizado dos
            pequenos, de maneira acessível e sustentável, economizando até 90%,
            com mais variedade e ocupando menos espaço.
          </p>
          <p>
            Oferecemos as melhores experiências com aluguel de brinquedos para
            mamães, papais e crianças desde 2020.
          </p>
        </div>
      </div>
      <div className="absolute z-10 box-border overflow-hidden -bottom-1 left-0 right-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          fill="#fff"
          preserveAspectRatio="none"
          style={{ width: "130%" }}
          className=" h-16 transform rotate-180"
        >
          <path
            className="elementor-shape-fill"
            d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
