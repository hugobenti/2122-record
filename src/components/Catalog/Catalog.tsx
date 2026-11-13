import YoutubeEmbed from '../YoutubeEmbed';
import DataState from '../DataState/DataState';
import { cx } from '../../utils/cx';
import { catalog } from './Catalog.style';
import { useCatalog } from './useCatalog';

export default function Catalog() {
  const { status, items, retry } = useCatalog();
  return (
    <div id="catalog" className={cx(catalog.base)}>
      <div className={cx(catalog.inner)}>
        <p className={cx(catalog.heading)}>Catálogo de Beats</p>
        <DataState status={status} message={status === 'loading' ? 'Carregando catálogo…' : status === 'error' ? 'Não conseguimos carregar o catálogo agora.' : status === 'ready' ? 'Catálogo carregado.' : 'Nenhum beat publicado por enquanto.'} onRetry={retry} />
        {status === 'ready' && items.map(item => (
          <div key={item.id} className={cx(catalog.item)}>
            <p className={cx(catalog.title)}>{item.name}</p>
            <p className={cx(catalog.description)}>{item.description}</p>
            <div className={cx(catalog.videos)}>
              {item.videos.map((video, index) => (
                <div key={index} className={cx(catalog.video)}>
                  <div className={cx(catalog.embed)}><YoutubeEmbed embedId={video} /></div>
                </div>
              ))}
            </div>
            {item.playlist && <a href={item.playlist} target="_blank" rel="noopener noreferrer" className={cx(catalog.playlist)}>Ver playlist completa</a>}
          </div>
        ))}
      </div>
    </div>
  );
}
