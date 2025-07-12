import React, { useState, useRef, useEffect, useCallback } from "react";

const Services = () => {
  const [contentExpanded, setContentExpanded] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  // Cria refs individuais para cada seção de serviço
  const musicSectionRef = useRef<HTMLDivElement>(null);
  const marketingSectionRef = useRef<HTMLDivElement>(null);
  const juridicoSectionRef = useRef<HTMLDivElement>(null);

  // Função para lidar com o clique "Veja mais"
  const handleVejaMais = useCallback((index: number) => {
    setContentExpanded((prev) => {
      const newContentExpanded = [...prev];
      newContentExpanded[index] = !prev[index];
      return newContentExpanded;
    });
  }, []);

  // useEffect para lidar com o scroll quando o conteúdo é expandido
  useEffect(() => {
    const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
      if (sectionRef.current) {
        const yCoordinate =
          sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
        const headerOffset = 80;
        window.scrollTo({
          top: yCoordinate - headerOffset,
          behavior: "smooth",
        });
      }
    };

    // Só executa o scroll se pelo menos uma seção estiver expandida
    const expandedSections = contentExpanded.filter(Boolean);
    if (expandedSections.length > 0) {
      const timeoutIds: NodeJS.Timeout[] = [];
      
      if (contentExpanded[0]) {
        timeoutIds.push(setTimeout(() => scrollToSection(musicSectionRef), 100));
      }
      if (contentExpanded[1]) {
        timeoutIds.push(setTimeout(() => scrollToSection(marketingSectionRef), 100));
      }
      if (contentExpanded[2]) {
        timeoutIds.push(setTimeout(() => scrollToSection(juridicoSectionRef), 100));
      }

      // Cleanup function
      return () => {
        timeoutIds.forEach(id => clearTimeout(id));
      };
    }
  }, [contentExpanded]);

  return (
    <div id="services" className="bg-zinc-800 py-8 sm:py-12 lg:py-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 min-h-[60vh]">
      {/* Centraliza o conteúdo e limita a largura em telas maiores */}
      <div className="max-w-7xl mx-auto">
        <p className="large-text text-violet-300 pb-8 sm:pb-12">
          Serviços
        </p>

        {/* Serviço: Músicas */}
        <div ref={musicSectionRef} className="mb-12 sm:mb-16">
          <p className="large-title text-purple-200 pb-4 sm:pb-6">
            Músicas
          </p>
          <p className="medium-text text-stone-200 pb-4 sm:pb-6 w-full leading-relaxed">
            Criar música é mais do que uma paixão; é uma jornada que exige
            dedicação e técnica. Na 2122, entendemos que o amor pela arte deve
            ser acompanhado das ferramentas certas para transformar ideias em
            obras de alta qualidade.
          </p>
          <div>
            <button
              name={`service-button-more-1`}
              className={`block text-right pl-4 hover:text-violet-300 cursor-pointer medium-text-bold ${
                !contentExpanded[0] ? "text-violet-500" : "text-violet-300"
              }`}
              onClick={() => handleVejaMais(0)}
            >
              Veja mais
            </button>
          </div>
          <div
            className={`medium-text pb-4 sm:pb-6 w-full overflow-hidden transition-all duration-1000 pt-4 sm:pt-6 ${
              contentExpanded[0]
                ? "max-h-[200vh] text-stone-200"
                : "max-h-0 text-transparent"
            }`}
          >
            <p className="medium-text pb-4 sm:pb-6 leading-relaxed">
              Oferecemos um suporte completo para cada etapa da produção
              musical:
            </p>
            <ul className="space-y-3 sm:space-y-4">
              <li className="ml-6 medium-text leading-relaxed">
                <strong>• Definição de conceito</strong> para alinhar sua
                identidade artística;
              </li>
              <li className="ml-6 medium-text leading-relaxed">
                <strong>• Composição lírica</strong> que transmite emoção e
                autenticidade;
              </li>
              <li className="ml-6 medium-text leading-relaxed">
                <strong>• Captação de voz</strong> e instrumentos com excelência
                técnica;
              </li>
              <li className="ml-6 medium-text leading-relaxed">
                <strong>• Mixagem e masterização</strong> para garantir que sua
                música tenha o impacto sonoro necessário para se destacar.
              </li>
            </ul>
            <p className="medium-text pb-4 sm:pb-6 pt-6 sm:pt-8 leading-relaxed">
              Com um olhar atento às necessidades dos artistas independentes,
              nossos serviços unem qualidade técnica a preços justos, porque
              sabemos o quanto é desafiador equilibrar sonhos e orçamento.
            </p>
          </div>
        </div>

        {/* Serviço: Marketing */}
        <div ref={marketingSectionRef} className="mb-12 sm:mb-16">
          <p className="large-title text-purple-200 pb-4 sm:pb-6 pt-8 sm:pt-12">
            Marketing
          </p>
          <p className="medium-text text-stone-200 pb-4 sm:pb-6 w-full leading-relaxed">
            Ter uma música incrível não basta para conquistar o público. Em um
            mercado saturado, o marketing é o que conecta sua arte às pessoas
            certas.
          </p>
          <div>
            <button
              name={`service-button-more-2`}
              className={`block text-right pl-4 hover:text-violet-300 cursor-pointer medium-text-bold ${
                !contentExpanded[1] ? "text-violet-500" : "text-violet-300"
              }`}
              onClick={() => handleVejaMais(1)}
            >
              Veja mais
            </button>
          </div>
          <div
            className={`medium-text pb-4 sm:pb-6 w-full overflow-hidden transition-all duration-1000 pt-4 sm:pt-6 ${
              contentExpanded[1]
                ? "max-h-[200vh] text-stone-200"
                : "max-h-0 text-transparent"
            }`}
          >
            <p className="medium-text pb-4 sm:pb-6 leading-relaxed">
              Na 2122, entendemos que cada artista precisa de uma estratégia
              personalizada para alcançar seus objetivos. Por isso, oferecemos:
            </p>
            <ul className="space-y-3 sm:space-y-4">
              <li className="ml-6 medium-text leading-relaxed">
                <strong>• Planejamento estratégico</strong>, com definição de
                público-alvo e cronograma de postagens;
              </li>
              <li className="ml-6 medium-text leading-relaxed">
                <strong>• Gestão de tráfego pago</strong>, garantindo que sua
                música alcance ouvintes potenciais;
              </li>
              <li className="ml-6 medium-text leading-relaxed">
                <strong>• Criação de artes e vídeos</strong>, que refletem sua
                identidade visual e destacam seu trabalho;
              </li>
              <li className="ml-6 medium-text leading-relaxed">
                <strong>• Contato com criadores de conteúdo e curadores</strong>
                , ampliando sua rede e alcance.
              </li>
            </ul>
            <p className="medium-text pb-4 sm:pb-6 pt-6 sm:pt-8 leading-relaxed">
              Com as práticas certas e uma execução consistente, o marketing
              digital pode transformar artistas independentes em referências
              reconhecidas em seus nichos.
            </p>
          </div>
        </div>

        {/* Serviço: Jurídico */}
        <div ref={juridicoSectionRef} className="mb-12 sm:mb-16">
          <p className="large-title text-purple-200 pb-4 sm:pb-6 pt-8 sm:pt-12">
            Jurídico
          </p>
          <p className="medium-text text-stone-200 pb-4 sm:pb-6 w-full leading-relaxed">
            A proteção legal é fundamental para que sua arte seja valorizada e
            respeitada. Na 2122, oferecemos suporte jurídico especializado para
            artistas independentes.
          </p>
          <div>
            <button
              name={`service-button-more-3`}
              className={`block text-right pl-4 hover:text-violet-300 cursor-pointer medium-text-bold ${
                !contentExpanded[2] ? "text-violet-500" : "text-violet-300"
              }`}
              onClick={() => handleVejaMais(2)}
            >
              Veja mais
            </button>
          </div>
          <div
            className={`medium-text pb-4 sm:pb-6 w-full overflow-hidden transition-all duration-1000 pt-4 sm:pt-6 ${
              contentExpanded[2]
                ? "max-h-[200vh] text-stone-200"
                : "max-h-0 text-transparent"
            }`}
          >
            <p className="medium-text pb-4 sm:pb-6 leading-relaxed">
              Oferecemos serviços essenciais para artistas independentes:
            </p>
            <ul className="space-y-3 sm:space-y-4">
              <li className="ml-6 medium-text leading-relaxed">
                <strong>• Registro de obras</strong> na Biblioteca Nacional;
              </li>
              <li className="ml-6 medium-text leading-relaxed">
                <strong>• Contratos de cessão de direitos</strong> para
                colaborações;
              </li>
              <li className="ml-6 medium-text leading-relaxed">
                <strong>• Proteção de marca</strong> e identidade artística;
              </li>
              <li className="ml-6 medium-text leading-relaxed">
                <strong>• Assessoria em negociações</strong> com gravadoras e
                plataformas.
              </li>
            </ul>
            <p className="medium-text pb-4 sm:pb-6 pt-6 sm:pt-8 leading-relaxed">
              Com o suporte jurídico adequado, você pode focar na criação sem
              se preocupar com questões legais que podem comprometer sua
              carreira.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
