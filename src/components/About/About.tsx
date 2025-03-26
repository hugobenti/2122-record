import React from "react";
import AnimatePolvo from "../../assets/AnimatePolvo";
import { useAppContext } from "../../context/AppContext";
import SectionSeparator from "../Separator/SectionSeparator";

const About: React.FC = () => {
  const { aboutRef } = useAppContext();

  return (
    <div className="text-stone-200 z-10" ref={aboutRef}>
      {/* Seção de introdução */}
      <section className="py-4 bg-zinc-800">
        <div className="md:px-48 sm:px-24 px-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-purple-100">
              Conheça a 2122
            </h2>
            <p className="text-lg text-stone-300 mx-auto">
              A 2122 apoia artistas na construção de carreiras sólidas, unindo
              expertise em produção musical, direito e marketing. Oferecemos
              soluções completas que conectam música, estratégia e jurídico,
              pilares essenciais para viver de arte.
            </p>
            <p className="text-lg text-stone-300 mx-auto pt-4">
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
      <section className="py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Card - Nossa Missão */}
          <div className="bg-zinc-700 p-8 md:p-12 rounded-lg shadow-lg relative">
            {/* <div className="absolute -top-6 -left-6 bg-purple-600 w-12 h-12 flex items-center justify-center text-5xl rounded-md">
              <div className="w-8 h-8">
                <CommaIcon />
              </div>
            </div> */}
            <h3 className="text-2xl text-center font-semibold text-violet-200 mt-2 mb-4">
              Nossa missão
            </h3>
            <p className="text-gray-200 medium-text text-center">
              Na 2122, nossa missão é tornar o sonho de artistas independentes
              uma realidade. Unimos paixão pela arte, conhecimento técnico e
              entendimento do mercado para oferecer serviços de alta qualidade e
              acessíveis. Como artistas que já enfrentaram os desafios da
              carreira independente, entendemos suas necessidades e trabalhamos
              com confiança e empatia para superar essas barreiras.
            </p>
          </div>

          {/* Card - O Que Fazemos */}
          <div className="bg-zinc-700 p-8 md:p-12 rounded-lg shadow-lg relative">
            {/* <div className="absolute -top-6 -left-6 bg-purple-600 w-12 h-12 flex items-center justify-center text-5xl rounded-md">
              <div className="w-8 h-8">
                <CommaIcon />
              </div>
            </div> */}
            <h3 className="text-2xl text-center font-semibold text-violet-200 mt-2 mb-4">
              O Que Fazemos
            </h3>
            <p className="text-gray-200 medium-text text-center">
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
            <a
            href="https://www.instagram.com/direct/t/johndoe/" target="_blank" rel="noopener noreferrer" 
            className="z-10 group rounded-lg text-center text-stone-100 px-12 py-4 bg-purple-800 opacity-80 hover:opacity-100 transition-all hover:bg-purple-600 hover:text-stone-200 cursor-pointer mt-8">
              Fale com a gente
            </a>
          </div>
        </div>

        {/* Botão para resoluções pequenas e médias – exibido fora do grid */}
        <div className="block lg:hidden mt-8 mx-4 text-center">
          <button className=" w-full z-10 group rounded-lg text-center text-stone-100 px-6 py-4 bg-purple-800 opacity-80 hover:opacity-100 transition-all hover:bg-purple-600 hover:text-stone-200 cursor-pointer">
            Fale com a gente
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
