// src/components/Home/ArtistOfTheMonth.tsx

import React from "react";
import YoutubeEmbed from "../YoutubeEmbed";
import { useAppContext } from "../../context/AppContext";
import { useAirtablePrefetch } from "../../services/useAirtablePrefetch";
import { TABLE_ARTISTA_MES } from "../../services/airtableApi";

/**
 * Interface local que mapeia o que você precisa exibir no componente,
 * baseando-se nos campos reais do Airtable (titulo, artistas, descricao, link).
 */
export interface IArtistOfTheMonth {
  titulo_pagina: string;
  titulo: string;
  artistas: string;
  descricao: string;
  link: string;
}

const ArtistOfTheMonth: React.FC = () => {
  const { animations, artistRef } = useAppContext();

  // Faz o prefetch da tabela "Artista do Mês"
  const { records, isFetching, error, fetched } = useAirtablePrefetch({
    tableId: TABLE_ARTISTA_MES,
    delay: 0, // Ex.: 2 segundos de delay
    // viewId: "viw9qZ5iMfdt3ZeoA", // Se quiser usar a view, descomente
  });

  // Vamos pegar APENAS o primeiro registro (caso só tenha 1).
  // Se tiver vários e quiser outro critério, ajuste aqui.
  let artistData: IArtistOfTheMonth | null = null;

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
    <div id="artist" ref={artistRef}>
      <div className="space-y-8">
        {/* Em telas menores que xl, exibe o título acima do vídeo */}
        <div className="flex w-full justify-center">
          <p
            className={`large-text text-violet-300 pb-2 transition-all duration-200 ${
              animations.artist ? "opacity-100" : "opacity-0"
            }`}
          >
            {artistData?.titulo_pagina}
          </p>
        </div>

        {/* Loading */}
        {isFetching && !fetched && (
          <p className="text-white text-center">Carregando artista...</p>
        )}
        {/* Erro */}
        {error && <p className="text-red-500">Erro: {error}</p>}

        {/* Se já buscou e temos dados */}
        {fetched && artistData && (
          <div
            key={artistData.titulo}
            className="flex flex-col xl:flex-row items-end w-full gap-4 lg:gap-12 "
          >
            <div className="w-full xl:w-[540px] flex-shrink-0">
              <YoutubeEmbed
                embedId={artistData.link.replace(
                  "https://www.youtube.com/watch?v=",
                  ""
                )}
              />
            </div>

            {/* Texto */}
            <div className="w-full md:flex-1 mt-4 md:mt-0">
              <p className="text-purple-200 large-title capitalize">
                {artistData.titulo}
              </p>
              <p className="text-violet-300 text-2xl mt-2">
                {artistData.artistas}
              </p>
              <p className="text-white medium-text mt-4">
                {artistData.descricao}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistOfTheMonth;
