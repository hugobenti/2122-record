import React from 'react';
import YoutubeEmbed from '../YoutubeEmbed';
import { useAppContext } from '../../context/AppContext';

interface BeatStyle {
  name: string;
  description?: string;
  videos: string[];
  playlist: string;
}














const catalogData: BeatStyle[] = [
  {
    name: 'Boom Bap',
    videos: [
      'www.youtube.com/watch?v=oiljLH5grIU&list=PLe2n3xCXYtXVUMmXzm1Lm8pWX6pkMSHas&index=12',
      'www.youtube.com/watch?v=2GNgRVdUB3w&list=PLe2n3xCXYtXVUMmXzm1Lm8pWX6pkMSHas&index=5',
      'www.youtube.com/watch?v=b9V2Bek4RKQ&list=PLe2n3xCXYtXVUMmXzm1Lm8pWX6pkMSHas&index=4'
    ],
    playlist: 'https://www.youtube.com/playlist?list=PLe2n3xCXYtXVUMmXzm1Lm8pWX6pkMSHas'
  },
  {
    name: 'Trap',
    videos: [
      'www.youtube.com/watch?v=KoO-muqpcQw&list=PLe2n3xCXYtXUoeBJsbcIdnc9Peln0uBw4&index=26',
      'www.youtube.com/watch?v=ObK5oUMamNc&list=PLe2n3xCXYtXUoeBJsbcIdnc9Peln0uBw4&index=11',
      'www.youtube.com/watch?v=n6yrzWRtKGI&list=PLe2n3xCXYtXUoeBJsbcIdnc9Peln0uBw4&index=168'
    ],
    playlist: 'https://www.youtube.com/playlist?list=PLe2n3xCXYtXUoeBJsbcIdnc9Peln0uBw4'
  },
 
];

const Catalog: React.FC = () => {
  const { catalogRef, animations } = useAppContext();

  return (
    <div ref={catalogRef} id="catalog" className="py-6 px-8 sm:px-24 md:px-48">
      <div className="max-w-7xl mx-auto">
        <p
          className={`large-text text-violet-300 pb-8 transition-all duration-200 ${
            animations.catalog ? "opacity-100" : "opacity-0"
          }`}
        >
          Catálogo de Beats
        </p>

        {catalogData.map((data, index) => (
          <div key={index} className="mb-12 border-b border-stone-700 pb-8">
            <p
              className={`text-purple-200 large-title capitalize pb-4 transition-all duration-1000 delay-150 ${
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
              className={`flex space-x-4 overflow-x-auto pb-4 transition-all duration-1000 delay-150 ${
                animations.catalog ? "opacity-100" : "opacity-0"
              }`}
            >
              {data.videos.map((video, idx) => (
                <div key={idx} className="min-w-[320px] grow">
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
