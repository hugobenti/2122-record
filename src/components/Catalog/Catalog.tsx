import React, { useEffect, useState } from 'react';
import YoutubeEmbed from '../YoutubeEmbed';
import { getTableRecords, TABLE_CATALOG } from '../../services/airtableApi';

interface BeatStyle {
  id: string;
  name: string;
  description?: string;
  videos: string[];
  playlist: string;
}

const Catalog: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BeatStyle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalogData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const records = await getTableRecords(TABLE_CATALOG, "viwMYum1P37cF3kkf");
        
        // Transforma os dados do Airtable para a interface BeatStyle
        const catalogData: BeatStyle[] = records.map((record) => {
          // Mapeamento direto dos campos do Airtable
          return {
            id: record.id,
            name: record.fields.Nome || 'Sem nome',
            description: record.fields.descricao_catalogo || '',
            videos: record.fields.Videos || [],
            playlist: record.fields.Playlist_link || '',
          };
        });
        setData(catalogData);
      } catch (err) {
        console.error('Erro ao buscar dados do catálogo:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogData();
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
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <p className="text-red-500 text-lg">Erro ao carregar: {error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <p className="text-white text-lg">Nenhum item encontrado no catálogo.</p>
          </div>
        ) : (
          data.map((item) => (
            <div key={item.id} className="mb-12 sm:mb-16 border-b border-stone-700 pb-8 sm:pb-12">
              <p className="text-purple-200 large-title capitalize pb-4 sm:pb-6">
                {item.name}
              </p>
              <p className="text-base md:text-xl text-stone-200 pb-4 sm:pb-6 w-full leading-relaxed">
                {item.description}
              </p>
              <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 sm:pb-6">
                {item.videos.map((video, idx) => (
                  <div key={idx} className="min-w-[280px] sm:min-w-[320px] grow">
                    <div className="border p-4 rounded-md bg-stone-900 border-stone-500 shadow-lg">
                      <YoutubeEmbed
                        embedId={video}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {item.playlist && (
                <a
                  href={item.playlist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-right pl-4 hover:text-violet-500 cursor-pointer medium-text-bold text-violet-300"
                >
                  Ver playlist completa
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Catalog;
