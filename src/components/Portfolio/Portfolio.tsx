// src/components/Portfolio/Portfolio.tsx

import React from "react";
import YoutubeEmbed from "../YoutubeEmbed";
import { useAppContext } from "../../context/AppContext";
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
  const { portfolioRef, animations } = useAppContext();

  // Faz o prefetch da tabela "Portfolio"
  const { records, isFetching, error, fetched } = useAirtablePrefetch({
    tableId: TABLE_PORTFOLIO,
    delay: 3000, // Ex: aguarda 3 seg. antes de buscar
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
    <div ref={portfolioRef} id="portfolio" className="py-6 px-8 sm:px-24 md:px-48">
      <p
        className={`large-text text-violet-300 pb-12 transition-all duration-200 ${
          animations.portfolio ? "opacity-100" : "opacity-0"
        }`}
      >
        Portfolio
      </p>

      {/* Loading */}
      {isFetching && !fetched && <p className="text-white">Carregando portfolio...</p>}
      {/* Erro */}
      {error && <p className="text-red-500">Erro ao carregar: {error}</p>}

      {/* Se não há registros */}
      {fetched && portfolioData.length === 0 && (
        <p className="text-white">Nenhum item encontrado no Airtable.</p>
      )}

      {/* Renderiza o portfolio */}
      {fetched && portfolioData.length > 0 && (
        <div className="space-y-10">
          {portfolioData.map((item, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={item.titulo}
                className={`flex flex-col md:flex-row ${
                  isReversed ? "md:flex-row-reverse" : ""
                } items-start w-full gap-4 md:gap-12 pb-8 border-b border-stone-700`}
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
                <div className="w-full md:flex-1 mt-4 md:mt-0">
                  <p className="text-purple-200 large-title capitalize">
                    {item.titulo} ({item.artistas})
                  </p>
                  {/* Exibir os artistas, se houver */}
                  {item.artistas && (
                    <p className="text-violet-300 text-2xl mt-2">
                      {item.artistas}
                    </p>
                  )}
                  <p className="text-white medium-text mt-4">
                    {item.descricao}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
