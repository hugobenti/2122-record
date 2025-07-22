// src/components/Portfolio/Portfolio.tsx

import React from "react";
import YoutubeEmbed from "../YoutubeEmbed";
import { useAirtablePrefetch } from "../../services/useAirtablePrefetch";
import { TABLE_PORTFOLIO } from "../../services/airtableApi";

/**
 * Interface local para o portfolio, com os mesmos campos:
 * (titulo, artistas, descricao, link).
 */
export interface IPortfolioItem {
  titulo: string;
  artistas: string;
  descricao: string;
  link: string;
}

const Portfolio: React.FC = () => {
  // Faz o prefetch da tabela "Portfolio"
  const { records, isFetching, error, fetched } = useAirtablePrefetch({
    tableId: TABLE_PORTFOLIO,
    // viewId: "viwCxofmowBZzmRC5", // se precisar usar a view
  });

  // Mapeia registros -> array de IPortfolioItem
  let portfolioData: IPortfolioItem[] = [];

  if (records && records.length > 0) {
    portfolioData = records.map((r) => ({
      titulo: r.fields.titulo || "",
      artistas: r.fields.artistas || "",
      descricao: r.fields.descricao || "",
      link: r.fields.link || "",
    }));
  }

  return (
    <div id="portfolio" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 min-h-[60vh]">
      <div className="max-w-7xl mx-auto">
        <p className="large-text text-violet-300 pb-8 sm:pb-12">
          Portfolio
        </p>

        {/* Loading */}
        {isFetching && !fetched && (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-400 mb-4"></div>
            <p className="text-violet-300 text-lg mt-2">Carregando portfolio...</p>
          </div>
        )}
        
        {/* Erro */}
        {error && (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <p className="text-red-500 text-lg">Erro ao carregar: {error}</p>
          </div>
        )}

        {/* Se não há registros */}
        {fetched && portfolioData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <p className="text-white text-lg">Nenhum item encontrado no portfolio.</p>
          </div>
        )}

        {/* Renderiza o portfolio */}
        {fetched && portfolioData.length > 0 && (
          <div className="space-y-10 sm:space-y-12 lg:space-y-16">
            {portfolioData.map((item, index) => {
              const isReversed = index % 2 !== 0;
              return (
                <div
                  key={item.titulo}
                  className={`flex flex-col md:flex-row ${
                    isReversed ? "md:flex-row-reverse" : ""
                  } items-start w-full gap-6 sm:gap-8 lg:gap-12 pb-8 sm:pb-12 border-b border-stone-700`}
                >
                  {/* Container do vídeo */}
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

                  {/* Texto */}
                  <div className="w-full md:flex-1 mt-6 md:mt-0">
                    <p className="text-purple-200 large-title capitalize">
                      {item.titulo} ({item.artistas})
                    </p>
                    {/* Exibir os artistas, se houver */}
                    {item.artistas && (
                      <p className="text-violet-300 text-xl sm:text-2xl mt-2 sm:mt-4">
                        {item.artistas}
                      </p>
                    )}
                    <p className="text-white medium-text mt-4 sm:mt-6 leading-relaxed">
                      {item.descricao}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
