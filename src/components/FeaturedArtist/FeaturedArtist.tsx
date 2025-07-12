// src/components/FeaturedArtist/FeaturedArtist.tsx

import React from "react";
import YoutubeEmbed from "../YoutubeEmbed";
import { useAppContext } from "../../context/AppContext";
import { useAirtablePrefetch } from "../../services/useAirtablePrefetch";
import { TABLE_FEATURED_ARTIST } from "../../services/airtableApi";

/**
 * Interface local que mapeia o que você precisa exibir no componente,
 * baseando-se nos campos reais do Airtable (titulo, artistas, descricao, link).
 */
export interface IFeaturedArtist {
  titulo_pagina: string;
  titulo: string;
  artistas: string;
  descricao: string;
  link: string;
}

const FeaturedArtist: React.FC = () => {
  const { animations, featuredArtistRef } = useAppContext();

  // Faz o prefetch da tabela "Artista em Destaque"
  const { records, isFetching, error, fetched } = useAirtablePrefetch({
    tableId: TABLE_FEATURED_ARTIST,
    delay: 0, // Ex.: 2 segundos de delay
    // viewId: "viw9qZ5iMfdt3ZeoA", // Se quiser usar a view, descomente
  });

  // Vamos pegar APENAS o primeiro registro (caso só tenha 1).
  // Se tiver vários e quiser outro critério, ajuste aqui.
  let artistData: IFeaturedArtist | null = null;

  if (records && records.length > 0) {
    const first = records[0].fields;
    artistData = {
      titulo_pagina: first.titulo_pagina || "",
      titulo: first.titulo || "",
      artistas: first.artistas || "",
      descricao: first.descricao || "",
      link: first.link || "",
    };
  }

  return (
    <div id="featuredArtist" ref={featuredArtistRef} className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-8 mb-6">
        {/* Em telas menores que xl, exibe o título acima do vídeo */}
          <p
            className={`large-text text-violet-300 pb-2 sm:pb-4`}
          >
            {artistData?.titulo_pagina}
          </p>

        {/* Loading */}
        {isFetching && !fetched && (
          <div className="flex flex-col items-center justify-center py-20 sm:py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-400 mb-4"></div>
            <p className="text-violet-300 text-lg mt-2">Carregando artista...</p>
          </div>
        )}
        
        {/* Erro */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 sm:py-24">
            <p className="text-red-500 text-lg">Erro: {error}</p>
          </div>
        )}

        {/* Se já buscou e temos dados */}
        {fetched && artistData && (
          <div
            key={artistData.titulo}
            className="flex flex-col xl:flex-row items-start xl:items-end w-full gap-8 sm:gap-12 lg:gap-16"
          >
            <div className="w-full xl:w-[540px] flex-shrink-0">
              <div className="border p-4 rounded-md bg-stone-900 border-stone-500 shadow-lg">
                <YoutubeEmbed
                  embedId={artistData.link.replace(
                    "https://www.youtube.com/watch?v=",
                    ""
                  )}
                />
              </div>
            </div>

            {/* Texto */}
            <div className="w-full xl:flex-1 mt-8 xl:mt-0">
              <p className="text-purple-200 large-title capitalize">
                {artistData.titulo}
              </p>
              <p className="text-violet-300 text-xl sm:text-2xl mt-4 sm:mt-6">
                {artistData.artistas}
              </p>
              <p className="text-white medium-text mt-6 sm:mt-8 leading-relaxed">
                {artistData.descricao}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedArtist;
