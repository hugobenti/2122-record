import React from 'react';
import AnimatePolvo from '../../assets/AnimatePolvo';
import { useAppContext } from '../../context/AppContext';

const About: React.FC = () => {
  const { aboutRef, animations } = useAppContext();
  return (
    <div className="bg-zinc-800 text-stone-200" ref={aboutRef}>

      {/* Seção de introdução */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Nossa História</h2>
          <p className="text-lg text-center text-stone-300 max-w-3xl mx-auto">
            Fundada em [ano], nossa empresa começou com a visão de trazer soluções
            inovadoras para [setor/indústria]. Ao longo dos anos, crescemos e nos
            adaptamos às mudanças do mercado, sempre mantendo nosso compromisso
            com a qualidade e a inovação.
          </p>
        </div>
      </section>

      {/* Seção de missão, visão e valores */}
      <section className="bg-stone-900 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-200 p-6 rounded-lg shadow-lg">
            <h3 className="medium-text-bold font-semibold text-violet-600 mb-4">Missão</h3>
            <p className="text-gray-700 medium-text">
              Nossa missão é oferecer produtos e serviços de qualidade que atendam
              às necessidades dos nossos clientes, sempre buscando inovação e
              eficiência.
            </p>
          </div>
          <div className="bg-zinc-200 p-6 rounded-lg shadow-lg">
            <h3 className="medium-text-bold font-semibold text-violet-600 mb-4">Visão</h3>
            <p className="text-gray-700 medium-text">
              Ser reconhecida como uma empresa líder em [setor/indústria], inovadora
              e comprometida com o sucesso dos nossos clientes.
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
