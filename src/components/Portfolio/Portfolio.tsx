import YoutubeEmbed from '../YoutubeEmbed';
import DataState from '../DataState/DataState';
import { cx } from '../../utils/cx';
import { portfolio } from './Portfolio.style';
import { usePortfolio } from './usePortfolio';

export default function Portfolio() {
  const { status, items, retry } = usePortfolio();
  return (
    <div id="portfolio" className={cx(portfolio.base)}>
      <div className={cx(portfolio.inner)}>
        <p className={cx(portfolio.heading)}>Portfolio</p>
        {status !== 'ready' ? (
          <DataState status={status} message={status === 'loading' ? 'Carregando portfolio…' : status === 'error' ? 'Não conseguimos carregar o portfolio agora.' : 'Nenhum projeto publicado por enquanto.'} onRetry={retry} />
        ) : (
          <div className={cx(portfolio.list)}>
            {items.map(item => (
              <div key={item.id} className={cx(portfolio.item, item.isReversed && portfolio.reverse)}>
                {item.videoId && <div className={cx(portfolio.video)}><div className={cx(portfolio.embed)}><YoutubeEmbed embedId={item.videoId} /></div></div>}
                <div className={cx(portfolio.content)}>
                  <p className={cx(portfolio.title)}>{item.titulo} ({item.artistas})</p>
                  {item.artistas && <p className={cx(portfolio.artist)}>{item.artistas}</p>}
                  <p className={cx(portfolio.description)}>{item.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
