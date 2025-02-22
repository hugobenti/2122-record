import React from 'react';
import YoutubeEmbed from '../YoutubeEmbed';
import { useAppContext } from '../../context/AppContext';

interface BeatStyle {
  name: string;
  description: string;
  videos: string[];
  playlist: string;
}

const catalogData: BeatStyle[] = [
  {
    name: 'Hip Hop',
    description: 'Estilo com batidas marcantes e letras de rua.',
    videos: [
      'https://www.youtube.com/watch?v=abc123',
      'https://www.youtube.com/watch?v=abc124',
      'https://www.youtube.com/watch?v=abc125'
    ],
    playlist: 'https://www.youtube.com/playlist?list=hiphopPlaylist'
  },
  {
    name: 'Trap',
    description: 'Batidas pesadas e ritmos envolventes para festas.',
    videos: [
      'https://www.youtube.com/watch?v=def456',
      'https://www.youtube.com/watch?v=def457',
      'https://www.youtube.com/watch?v=def458'
    ],
    playlist: 'https://www.youtube.com/playlist?list=trapPlaylist'
  },
  {
    name: 'R&B',
    description: 'Suave e melódico, perfeito para momentos de relax.',
    videos: [
      'https://www.youtube.com/watch?v=ghi789',
      'https://www.youtube.com/watch?v=ghi790',
      'https://www.youtube.com/watch?v=ghi791'
    ],
    playlist: 'https://www.youtube.com/playlist?list=rnbPlaylist'
  },
  {
    name: 'Funk',
    description: 'Energia pura com grooves que contagiam.',
    videos: [
      'https://www.youtube.com/watch?v=jkl012',
      'https://www.youtube.com/watch?v=jkl013',
      'https://www.youtube.com/watch?v=jkl014'
    ],
    playlist: 'https://www.youtube.com/playlist?list=funkPlaylist'
  }
];

const Catalog: React.FC = () => {
  const { catalogRef, animations } = useAppContext();

  return (
    <div ref={catalogRef} id="catalog" className="py-6 px-8 sm:px-24 md:px-48">
      <div className="max-w-7xl mx-auto">
        <p
          className={`large-text text-stone-200 pb-8 transition-all duration-200 ${
            animations.catalog ? "opacity-100" : "opacity-0"
          }`}
        >
          Catálogo de Beats
        </p>

        {catalogData.map((data, index) => (
          <div key={index} className="mb-12 border-b border-stone-700 pb-8">
            <p
              className={`text-white text-2xl md:text-3xl font-bold capitalize pb-4 transition-all duration-1000 delay-150 ${
                animations.catalog ? "translate-x-0 opacity-100" : "-translate-x-24 opacity-0"
              }`}
            >
              {data.name}
            </p>
            <p
              className={`text-base md:text-xl text-stone-200 pb-2 w-full transition-all duration-1000 delay-300 ${
                animations.catalog ? "translate-x-0 opacity-100" : "-translate-x-24 opacity-0"
              }`}
            >
              {data.description}
            </p>
            <div
              className={`flex space-x-4 overflow-x-auto pb-4 transition-all duration-1000 delay-[1500ms] ${
                animations.catalog ? "opacity-100" : "opacity-0"
              }`}
            >
              {data.videos.map((video, idx) => (
                <div key={idx} className="min-w-[320px]">
                  <div className="border p-4 rounded-md bg-stone-900 border-stone-500 shadow-lg">
                    <YoutubeEmbed
                      embedId={video.replace("https://www.youtube.com/watch?v=", "")}
                    />
                  </div>
                </div>
              ))}
            </div>
            <a
              href={data.playlist}
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-right pl-4 hover:text-violet-500 cursor-pointer medium-text-bold text-violet-300 transition-all duration-1000 delay-[1500ms] ${
                animations.catalog ? "opacity-100" : "opacity-0"
              }`}
            >
              Ver playlist completa
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
