export default function Hero1() {
  return (
    <div className="flex w-full h-full justify-between ">
      <div className="w-full  relative">
        <div className="absolute z-10  -bottom-1 left-0 right-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 100"
            fill="#fff"
            preserveAspectRatio="none"
            style={{ width: "100%" }}
            className=" h-14 transform rotate-180"
          >
            <path
              className="elementor-shape-fill"
              d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
            ></path>
          </svg>
        </div>

        <div
          style={{
            backgroundImage: "url('/hero1.webp')",
            backgroundPositon: "top right",
          }}
          className="w-full relative gap-4 justify-center flex-col pt-4 md:pt-0 md:flex-row flex items-center h-full md:h-[26rem] bg-cover "
        >
          <div className="max-w-sm px-4">
            <h1 className="font-bold text-3xl">
              Os melhores brinquedos para quem quer:
            </h1>
            <div className="mt-2 gap-2 flex items-center justify-start font-semibold text-2xl">
              <span className="text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
              <p>Diversão para os pequenos</p>
            </div>
            <div className="mt-2 gap-2 flex items-center justify-start font-semibold text-2xl">
              <span className="text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </span>

              <p>Gastos para os adultos</p>
            </div>
            <p className="mt-6 font-semibold">
              Você não precisa gastar muito dinheiro para proporcionar
              experiências incríveis na vida do seu filho. Alugue nossos
              brinquedos de forma fácil, rápida e acessível, pelo tempo certo
              que ele irá usar.
            </p>
          </div>
          <div className="flex items-end h-full">
            <img src="/banner_1 new.png" className="h-full" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
