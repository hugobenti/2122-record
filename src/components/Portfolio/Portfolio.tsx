import React from "react";
import YoutubeEmbed from "../YoutubeEmbed";
import { useAppContext } from "../../context/AppContext";

export interface IPortfolioItem {
  title: string;
  link: string;
  description: string;
}

const portfolioMock: IPortfolioItem[] = [

  {
    title: "INTERGALÁCTICA (Exoge - Prod. O SKR)",
    link: "https://www.youtube.com/watch?v=yl1qE9G4fog",
    description:
      "Projeto de Rap (Single; Boom Bap) interpretado por Exoge e produzido por O SKR. Captação, Produção Musical, Letra, Registro, Distribuição, Mixagem, Masterização, Artes Visuais (Lyric Video, Capa e Canvas) e Marketing Digital inteiramente desenvolvidos pela 2122.",
  },
 
  {
    title: "Cidade (Exoge - Prod. O SKR)",
    link: "https://www.youtube.com/watch?v=hDDxd3t7o-s",
    description:
      "Projeto de Rap (Single; Boom Bap) interpretado por Exoge e produzido por O SKR. Captação, Produção Musical, Letra, Registro, Distribuição, Mixagem, Masterização, Artes Visuais (Lyric Video, Capa e Canvas) e Marketing Digital inteiramente desenvolvidos pela 2122.",
  },
  {
    title: "EP A Força do Destino (Exoge - Prod. O SKR)",
    link: "https://www.youtube.com/watch?v=tD22I2w7HGU",
    description:
      "Projeto de Rap (EP; Boom Bap) interpretado por Exoge e produzido por O SKR. Captação, Produção Musical, Letra, Registro, Distribuição, Mixagem, Masterização e Artes Visuais (Vídeo Conceito e Capa) e inteiramente desenvolvidos pela 2122.",
  },
  {
    title: "Sinais (Exoge e Xav - Prod. O SKR)",
    link: "https://www.youtube.com/watch?v=eOlwXefX92k",
    description:
      "Projeto de Rap (Single; RnB) interpretado por Exoge e Xav e produzido por O SKR. Captação, Produção Musical, Letra, Registro, Distribuição, Mixagem, Masterização, Artes Visuais (Lyric Video, Capa e Canvas) e Marketing Digital inteiramente desenvolvidos pela 2122.",
  },
  {
    title: "gin rosa (Xav - Prod. O SKR)",
    link: "https://www.youtube.com/watch?v=0naArtCzY88",
    description:
      "Projeto de Rap (Single; Trap/RnB) interpretado por Xav e produzido por O SKR. Captação, Produção Musical, Letra, Registro, Distribuição, Mixagem, Masterização, Artes Visuais (Capa e Canvas) e Marketing Digital inteiramente desenvolvidos pela 2122.",
  },
  {
    title: "além (Xav - Prod. O SKR)",
    link: "https://www.youtube.com/watch?v=MdLPdxnx4Bw",
    description:
      "Projeto de Rap (Single; Trap/RnB) interpretado por Xav e produzido por O SKR. Captação, Produção Musical, Letra, Registro, Distribuição, Mixagem, Masterização, Artes Visuais (Capa, Visualizer e Canvas) e Marketing Digital inteiramente desenvolvidos pela 2122.",
  },
];

const Portfolio: React.FC = () => {
  const { portfolioRef, animations } = useAppContext();

  return (
    <div ref={portfolioRef} id="portfolio" className="py-6 px-8 sm:px-24 md:px-48">
          <p
        className={`large-text text-stone-200 pb-12 transition-all duration-200 ${
          animations.portfolio ? "opacity-100" : "opacity-0"
        }`}
      >Portfolio</p>
      <div className="space-y-10">
        {portfolioMock.map((item, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div
              key={item.title}
              className={`flex flex-col md:flex-row ${
                isReversed ? "md:flex-row-reverse" : ""
              } items-start w-full gap-4 md:gap-12 pb-8 border-b border-stone-700`}
            >
              {/* Container do vídeo: em mobile ocupa 100% da largura; em desktop usa 384px (md:w-96) */}
              <div className="w-full md:w-96 flex-shrink-0">
                <div className="border p-4 rounded-md bg-stone-900 border-stone-500 shadow-lg">
                  <YoutubeEmbed
                    embedId={item.link.replace(
                      "https://www.youtube.com/watch?v=",
                      ""
                    )}
                  />
                </div>
              </div>
              {/* Container do texto: ocupa o espaço restante */}
              <div className="w-full md:flex-1 mt-4 md:mt-0">
                <p className="text-white text-2xl md:text-3xl font-bold capitalize">
                  {item.title}
                </p>
                <p className="text-white text-base md:text-xl mt-4">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
