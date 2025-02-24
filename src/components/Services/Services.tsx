import React, { useState, useRef } from "react";
import { useAppContext } from "../../context/AppContext";

const Services = () => {
  const { servicesRef, animations } = useAppContext();
  const [contentExpanded, setContentExpanded] = useState<boolean[]>([false, false, false]);

  // Cria refs individuais para cada seção de serviço
  const musicSectionRef = useRef<HTMLDivElement>(null);
  const marketingSectionRef = useRef<HTMLDivElement>(null);
  const juridicoSectionRef = useRef<HTMLDivElement>(null);

  // Função para lidar com o clique "Veja mais" e posicionar a seção
  const handleVejaMais = (index: number, sectionRef: React.RefObject<HTMLDivElement>) => {
    setContentExpanded((prev) => {
      const newContentExpanded = [...prev];
      newContentExpanded[index] = !prev[index];
      return newContentExpanded;
    });

    // Aguarda a atualização do layout para então rolar suavemente para a posição desejada
    setTimeout(() => {
      if (sectionRef.current) {
        const yCoordinate =
          sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
        const headerOffset = 80; // Substitua 80 pelo tamanho real do seu header fixo
        window.scrollTo({ top: yCoordinate - headerOffset, behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <div
      id="services"
      ref={servicesRef}
      className="bg-zinc-800 py-6 px-8 sm:px-24 md:px-48"
    >
      {/* Centraliza o conteúdo e limita a largura em telas maiores */}
      <div className="max-w-7xl mx-auto">
        <p
          className={`large-text text-purple-200 pb-8 transition-all duration-200 ${
            animations.services ? "opacity-100" : "opacity-0"
          }`}
        >
          Serviços
        </p>

        {/* Serviço: Músicas */}
        <div ref={musicSectionRef} className="mb-12">
          <p
            className={`large-title text-purple-200 pb-4 transition-all duration-1000 delay-150 ${
              animations.services
                ? "translate-x-0 opacity-100"
                : "-translate-x-24 opacity-0"
            }`}
          >
            Músicas
          </p>
          <p
            className={`medium-text text-stone-200 pb-2 w-full transition-all duration-1000 delay-300 ${
              animations.services
                ? "translate-x-0 opacity-100"
                : "-translate-x-24 opacity-0"
            }`}
          >
            Criar música é mais do que uma paixão; é uma jornada que exige
            dedicação e técnica. Na 2122, entendemos que o amor pela arte deve ser
            acompanhado das ferramentas certas para transformar ideias em obras
            de alta qualidade.
          </p>
          <div
            className={`duration-1000 delay-[1500ms] ${
              animations.services ? "opacity-100" : "opacity-0"
            }`}
          >
            <a
              className={`block text-right pl-4 hover:text-violet-300 cursor-pointer medium-text-bold ${
                !contentExpanded[0]
                  ? "text-violet-500"
                  : "text-violet-300"
              }`}
              onClick={() => handleVejaMais(0, musicSectionRef)}
            >
              Veja mais
            </a>
          </div>
          <div
            className={`medium-text pb-2 w-full overflow-hidden transition-all duration-1000 pt-2 ${
              contentExpanded[0]
                ? "max-h-[200vh] text-stone-200"
                : "max-h-0 text-transparent"
            }`}
          >
            <p className="medium-text pb-2">
              Oferecemos um suporte completo para cada etapa da produção musical:
            </p>
            <ul>
              <li className="ml-6 mt-2 medium-text">
                <strong>• Definição de conceito</strong> para alinhar sua
                identidade artística;
              </li>
              <li className="ml-6 mt-2 medium-text">
                <strong>• Composição lírica</strong> que transmite emoção e
                autenticidade;
              </li>
              <li className="ml-6 mt-2 medium-text">
                <strong>• Captação de voz</strong> e instrumentos com excelência
                técnica;
              </li>
              <li className="ml-6 mt-2 medium-text">
                <strong>• Mixagem e masterização</strong> para garantir que sua
                música tenha o impacto sonoro necessário para se destacar.
              </li>
            </ul>
            <p className="medium-text pb-2 pt-4">
              Com um olhar atento às necessidades dos artistas independentes,
              nossos serviços unem qualidade técnica a preços justos, porque
              sabemos o quanto é desafiador equilibrar sonhos e orçamento.
            </p>
          </div>
        </div>

        {/* Serviço: Marketing */}
        <div ref={marketingSectionRef} className="mb-12">
          <p
            className={`large-title text-purple-200 pb-4 pt-8 transition-all duration-1000 delay-150 ${
              animations.services
                ? "translate-x-0 opacity-100"
                : "-translate-x-24 opacity-0"
            }`}
          >
            Marketing
          </p>
          <p
            className={`medium-text text-stone-200 pb-2 w-full transition-all duration-1000 delay-300 ${
              animations.services
                ? "translate-x-0 opacity-100"
                : "-translate-x-24 opacity-0"
            }`}
          >
            Ter uma música incrível não basta para conquistar o público. Em um
            mercado saturado, o marketing é o que conecta sua arte às pessoas
            certas.
          </p>
          <div
            className={`duration-1000 delay-[1500ms] ${
              animations.services ? "opacity-100" : "opacity-0"
            }`}
          >
            <a
              className={`block text-right pl-4 hover:text-violet-300 cursor-pointer medium-text-bold ${
                !contentExpanded[1]
                  ? "text-violet-500"
                  : "text-violet-300"
              }`}
              onClick={() => handleVejaMais(1, marketingSectionRef)}
            >
              Veja mais
            </a>
          </div>
          <div
            className={`medium-text pb-2 w-full overflow-hidden transition-all duration-1000 pt-2 ${
              contentExpanded[1]
                ? "max-h-[200vh] text-stone-200"
                : "max-h-0 text-transparent"
            }`}
          >
            <p className="medium-text pb-2">
              Na 2122, entendemos que cada artista precisa de uma estratégia
              personalizada para alcançar seus objetivos. Por isso, oferecemos:
            </p>
            <ul>
              <li className="ml-6 mt-2 medium-text">
                <strong>• Planejamento estratégico</strong>, com definição de
                público-alvo e cronograma de postagens;
              </li>
              <li className="ml-6 mt-2 medium-text">
                <strong>• Gestão de tráfego pago</strong>, garantindo que sua
                música alcance ouvintes potenciais;
              </li>
              <li className="ml-6 mt-2 medium-text">
                <strong>• Criação de artes e vídeos</strong>, que refletem sua
                identidade visual e destacam seu trabalho;
              </li>
              <li className="ml-6 mt-2 medium-text">
                <strong>• Contato com criadores de conteúdo e curadores</strong>,
                ampliando sua rede e alcance.
              </li>
            </ul>
            <p className="medium-text pb-2 pt-4">
              Acreditamos que a divulgação não pode ser um obstáculo para artistas
              independentes. Com as práticas certas e uma execução profissional,
              garantimos que sua música seja ouvida, reconhecida e valorizada.
            </p>
          </div>
        </div>

        {/* Serviço: Jurídico */}
        <div ref={juridicoSectionRef} className="mb-12">
          <p
            className={`large-title text-purple-200 pb-4 pt-8 transition-all duration-1000 delay-150 ${
              animations.services
                ? "translate-x-0 opacity-100"
                : "-translate-x-24 opacity-0"
            }`}
          >
            Jurídico
          </p>
          <p
            className={`medium-text text-stone-200 pb-2 w-full transition-all duration-1000 delay-300 ${
              animations.services
                ? "translate-x-0 opacity-100"
                : "-translate-x-24 opacity-0"
            }`}
          >
            A arte é o centro da sua carreira, mas o conhecimento jurídico é o que
            protege o seu trabalho e garante sua estabilidade. Na 2122, cuidamos
            do que parece complicado, para que você possa focar no que realmente
            importa.
          </p>
          <div
            className={`duration-1000 delay-[1500ms] ${
              animations.services ? "opacity-100" : "opacity-0"
            }`}
          >
            <a
              className={`block text-right pl-4 hover:text-violet-300 cursor-pointer medium-text-bold ${
                !contentExpanded[2]
                  ? "text-violet-500"
                  : "text-violet-300"
              }`}
              onClick={() => handleVejaMais(2, juridicoSectionRef)}
            >
              Veja mais
            </a>
          </div>
          <div
            className={`medium-text pb-2 w-full overflow-hidden transition-all duration-1000 pt-2 ${
              contentExpanded[2]
                ? "max-h-[200vh] text-stone-200"
                : "max-h-0 text-transparent"
            }`}
          >
            <p className="medium-text pb-2">
              Oferecemos serviços essenciais para artistas independentes:
            </p>
            <ul>
              <li className="ml-6 mt-2 medium-text">
                <strong>• Registro autoral</strong> para proteger suas composições
                e garantir que seus direitos sejam respeitados;
              </li>
              <li className="ml-6 mt-2 medium-text">
                <strong>• Análise e elaboração de contratos</strong>, para
                prevenir cláusulas abusivas e assegurar acordos justos;
              </li>
              <li className="ml-6 mt-2 medium-text">
                <strong>• Consultoria jurídica</strong>, com orientações claras
                sobre direitos autorais, contratos de shows e campanhas
                publicitárias.
              </li>
              <li className="ml-6 mt-2 medium-text">
                <strong>• Contato com criadores de conteúdo e curadores</strong>,
                ampliando sua rede e alcance.
              </li>
            </ul>
            <p className="medium-text pb-2 pt-4">
              Nosso objetivo é garantir que você não seja prejudicado por falta de
              conhecimento ou por contratos desfavoráveis. Trabalhamos com ética e
              transparência para proteger o que há de mais precioso: o sonho de
              viver de sua arte.
            </p>
          </div>
        </div>
      </div>

      {/* Espaço inferior */}
      <div className="w-full h-8" />
    </div>
  );
};

export default Services;
