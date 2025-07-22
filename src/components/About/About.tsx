import React from "react";
import AnimatePolvo from "../../assets/AnimatePolvo";
import { useAppContext } from "../../context/AppContext";
import SectionSeparator from "../Separator/SectionSeparator";

const About: React.FC = () => {
  const { aboutRef } = useAppContext();

  return (
    <div id="about" className="text-stone-200 z-10" ref={aboutRef}>
      {/* Seção de introdução */}
      <section className="py-8 sm:py-12 bg-zinc-800">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <div className="container mx-auto text-center max-w-4xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-purple-100">
              Conheça a 2122
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-stone-300 mx-auto leading-relaxed">
              A 2122 apoia artistas na construção de carreiras sólidas, unindo
              expertise em produção musical, direito e marketing. Oferecemos
              soluções completas que conectam música, estratégia e jurídico,
              pilares essenciais para viver de arte.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-stone-300 mx-auto pt-4 sm:pt-6 leading-relaxed">
              Trabalhamos lado a lado com os artistas, fornecendo suporte em
              todas as etapas, desde a produção até contratos e planejamento,
              com o propósito de transformar a paixão pela música em uma
              carreira sustentável.
            </p>
          </div>
        </div>
      </section>

      {/* Separator invertido */}
      <div className="rotate-180">
        <SectionSeparator
          bottomColor="fill-zinc-800"
          topColor="bg-transparent"
        />
      </div>

      {/* Seção de missão, o que fazemos e animação */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {/* Card - Nossa Missão */}
            <div className="bg-zinc-700 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg relative">
              <h3 className="text-xl sm:text-2xl text-center font-semibold text-violet-200 mt-2 mb-4 sm:mb-6">
                Nossa missão
              </h3>
              <p className="text-gray-200 medium-text text-center leading-relaxed">
                Na 2122, nossa missão é tornar o sonho de artistas independentes
                uma realidade. Unimos paixão pela arte, conhecimento técnico e
                entendimento do mercado para oferecer serviços de alta qualidade e
                acessíveis. Como artistas que já enfrentaram os desafios da
                carreira independente, entendemos suas necessidades e trabalhamos
                com confiança e empatia para superar essas barreiras.
              </p>
            </div>

            {/* Card - O Que Fazemos */}
            <div className="bg-zinc-700 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg relative">
              <h3 className="text-xl sm:text-2xl text-center font-semibold text-violet-200 mt-2 mb-4 sm:mb-6">
                O Que Fazemos
              </h3>
              <p className="text-gray-200 medium-text text-center leading-relaxed">
                Fundada por três artistas com formações em produção musical,
                direito e publicidade, a 2122 oferece suporte completo baseado em
                música, marketing e jurídico. Nosso propósito é permitir que{" "}
                <strong>você foque no que ama enquanto cuidamos do resto</strong>,
                garantindo uma carreira sólida e sustentável. Se deseja elevar sua
                trajetória artística, estamos prontos para fazer parte da sua
                história.
              </p>
            </div>

            {/* Bloco de animação e botão – exibido apenas em telas grandes */}
            <div className="hidden lg:flex flex-col items-center justify-center transition-all">
              <div className="scale-[1.5] hover:scale-[1.7] transition-all duration-1000">
                <AnimatePolvo />
              </div>
              <button
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/direct/t/2122producoes/",
                    "_blank"
                  )
                }
                className="z-10 group rounded-lg text-center text-stone-100 px-8 sm:px-12 py-3 sm:py-4 bg-purple-800 opacity-80 hover:opacity-100 transition-all hover:bg-purple-600 hover:text-stone-200 cursor-pointer mt-6 sm:mt-8"
              >
                Fale com a gente
              </button>
            </div>
          </div>

          {/* Botão para resoluções pequenas e médias – exibido fora do grid */}
          <div className="block lg:hidden mt-8 sm:mt-12 text-center">
            <button
              onClick={() =>
                window.open(
                  "https://www.instagram.com/2122producoes/",
                  "_blank"
                )
              }
              className="w-full sm:w-auto z-10 group rounded-lg text-center text-stone-100 px-6 sm:px-8 py-3 sm:py-4 bg-purple-800 opacity-80 hover:opacity-100 transition-all hover:bg-purple-600 hover:text-stone-200 cursor-pointer"
            >
              Fale com a gente
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
