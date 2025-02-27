import React from "react";
import YoutubeEmbed from "../YoutubeEmbed";
import { useAppContext } from "../../context/AppContext";

export interface IArtistOfTheMonth {
  title: string;
  artist: string;
  description: string;
  videoLink: string;
}

const artistMock: IArtistOfTheMonth = {
  title: "Hemisfério Sul",
  artist: "Vitor Muniz, Prod. O SKR",
  description:
    "A 2122 tem o prazer de apresentar Vitor Muniz como o primeiro Artista do Mês! Com um rap lírico, crítico e bem-humorado, Vitor traz uma identidade única que exalta cultura do sul global e a essência latino-americana através das rimas mais afiadas!",
  videoLink: "https://www.youtube.com/watch?v=eA_g0kHxIdM",
};

const ArtistOfTheMonth: React.FC = () => {
  const { animations, artistRef } = useAppContext();

  return (
    <div id="artist" ref={artistRef}>
      <div className="space-y-8">
        {/* Em telas menores que lg, exibe o título acima do vídeo */}
        <div className="block xl:hidden">
          <p
            className={`large-text text-violet-300 pb-8 transition-all duration-200 ${
              animations.artist ? "opacity-100" : "opacity-0"
            }`}
          >
            Artista do Mês
          </p>
        </div>
        <div
          key={artistMock.title}
          className="flex flex-col xl:flex-row items-center w-full gap-4 lg:gap-12"
        >
          <div className="w-full xl:w-[540px] flex-shrink-0">
            <YoutubeEmbed
              embedId={artistMock.videoLink.replace(
                "https://www.youtube.com/watch?v=",
                ""
              )}
            />
          </div>
          {/* Container do texto */}
          <div className="w-full md:flex-1 mt-4 md:mt-0">
            {/* Em telas lg e maiores, exibe o título dentro do container de texto */}
            <p
              className={`hidden xl:block large-text text-violet-300 pb-8 transition-all duration-200 ${
                animations.artist ? "opacity-100" : "opacity-0"
              }`}
            >
              Artista do Mês
            </p>
            <p className="text-purple-200 large-title capitalize">
              {artistMock.title}
            </p>
            <p className="text-violet-300 text-2xl mt-2">{artistMock.artist}</p>
            <p className="text-white medium-text mt-4">{artistMock.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistOfTheMonth;
