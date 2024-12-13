import React from "react";
import AnimatePolvo from "../../assets/AnimatePolvo";
import { useAppContext } from "../../context/AppContext";
import CommaIcon from "../../assets/svgIcon/CommaSvg";
import SectionSeparator from "../Separator/SectionSeparator";

const About: React.FC = () => {
  const { aboutRef, animations } = useAppContext();
  return (
    <div className="text-stone-200 z-10" ref={aboutRef}>
      {/* Seção de introdução */}
      <section className="py-12 bg-zinc-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-stone-100">
            Nossa História
          </h2>
          <p className="text-lg text-center text-stone-300 max-w-3xl mx-auto">
            Fundada em [ano], nossa empresa começou com a visão de trazer
            soluções inovadoras para [setor/indústria]. Ao longo dos anos,
            crescemos e nos adaptamos às mudanças do mercado, sempre mantendo
            nosso compromisso com a qualidade e a inovação.
          </p>
        </div>
      </section>

      <div className="rotate-180">
        <SectionSeparator
          bottomColor="fill-zinc-800"
          topColor="bg-transparent"
        />
      </div>

      {/* Seção de missão, visão e valores */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-700 p-6 rounded-lg shadow-lg">
            <div className="relative w-0 h-0">
              <div className="bg-purple-600 w-12 h-12 -ml-8 -mt-8 flex items-center justify-center text-5xl rounded-md">
                <div className="w-8 h-8">
                  <CommaIcon />
                </div>
              </div>
            </div>
            <h3 className="text-2xl text-center font-semibold text-violet-200 mb-4 mt-6">
              Missão
            </h3>
            <p className="text-gray-200 medium-text text-center">
              Nossa missão é oferecer produtos e serviços de qualidade que
              atendam às necessidades dos nossos clientes, sempre buscando
              inovação e eficiência.
            </p>
          </div>
          <div className="bg-zinc-700 p-6 rounded-lg shadow-lg">
          <div className="relative w-0 h-0">
              <div className="bg-purple-600 w-12 h-12 -ml-8 -mt-8 flex items-center justify-center text-5xl rounded-md">
                <div className="w-8 h-8">
                  <CommaIcon />
                </div>
              </div>
            </div>
            <h3 className="text-2xl text-center font-semibold text-violet-200 mb-4 mt-6">
              Visão
            </h3>
            <p className="text-gray-200 medium-text text-center">
              Ser reconhecida como uma empresa líder em [setor/indústria],
              inovadora e comprometida com o sucesso dos nossos clientes.
            </p>
          </div>

          <div className="flex items-center justify-center flex-col transition-all grow">
            <div className="scale-[1.5] hover:scale-[1.7] transition-all duration-1000">
              <AnimatePolvo />
            </div>
            <button className="z-10 group rounded-lg text-center text-stone-100 px-6 py-4 bg-stone-800 opacity-80 hover:opacity-100 transition-all hover:bg-stone-600 hover:text-stone-200 cursor-pointer">
              Saiba mais
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
