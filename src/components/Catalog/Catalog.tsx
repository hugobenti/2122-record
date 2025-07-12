import React, { useEffect, useState } from 'react';
import YoutubeEmbed from '../YoutubeEmbed';

interface BeatStyle {
  name: string;
  description?: string;
  videos: string[];
  playlist: string;
}

const catalogData: BeatStyle[] = [
  {
    name: 'Boom Bap',
    description: 'Beats clássicos do boom bap',
    videos: [
      'oiljLH5grIU',
      '2GNgRVdUB3w',
      'b9V2Bek4RKQ'
    ],
    playlist: 'https://www.youtube.com/playlist?list=PLe2n3xCXYtXVUMmXzm1Lm8pWX6pkMSHas'
  },
  {
    name: 'Trap',
    description: 'Beats modernos de trap',
    videos: [
      'KoO-muqpcQw',
      'ObK5oUMamNc',
      'n6yrzWRtKGI'
    ],
    playlist: 'https://www.youtube.com/playlist?list=PLe2n3XCXYtXUoeBJsbcIdnc9Peln0uBw4'
  },
];

const Catalog: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BeatStyle[]>([]);

  useEffect(() => {
      setData(catalogData);
      setLoading(false);
  }, []);

  return (
    <div id="catalog" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 min-h-[60vh]">
      <div className="max-w-7xl mx-auto">
        <p className="large-text text-violet-300 pb-8 sm:pb-12">
          Catálogo de Beats
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-400 mb-4"></div>
            <p className="text-violet-300 text-lg mt-2">Carregando catálogo...</p>
          </div>
        ) : (
          data.map((data, index) => (
            <div key={index} className="mb-12 sm:mb-16 border-b border-stone-700 pb-8 sm:pb-12">
              <p className="text-purple-200 large-title capitalize pb-4 sm:pb-6">
                {data.name}
              </p>
              <p className="text-base md:text-xl text-stone-200 pb-4 sm:pb-6 w-full leading-relaxed">
                {data.description}
              </p>
              <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 sm:pb-6">
                {data.videos.map((video, idx) => (
                  <div key={idx} className="min-w-[280px] sm:min-w-[320px] grow">
                    <div className="border p-4 rounded-md bg-stone-900 border-stone-500 shadow-lg">
                      <YoutubeEmbed
                        embedId={video}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={data.playlist}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-right pl-4 hover:text-violet-500 cursor-pointer medium-text-bold text-violet-300"
              >
                Ver playlist completa
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Catalog;
