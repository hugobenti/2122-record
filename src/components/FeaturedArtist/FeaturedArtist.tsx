import YoutubeEmbed from '../YoutubeEmbed';
import DataState from '../DataState/DataState';
import { cx } from '../../utils/cx';
import { featuredArtist } from './FeaturedArtist.style';
import { useFeaturedArtist } from './useFeaturedArtist';

export default function FeaturedArtist() {
  const { status, artist, retry, featuredArtistRef } = useFeaturedArtist();
  return (
    <div id="featuredArtist" ref={featuredArtistRef} className={cx(featuredArtist.base)}>
      <div className={cx(featuredArtist.inner)}>
        <p className={cx(featuredArtist.heading)}>{artist?.titulo_pagina}</p>
        <DataState status={status} message={status === 'loading' ? 'Carregando artista…' : status === 'error' ? 'Não conseguimos carregar o artista em destaque agora.' : status === 'ready' ? 'Artista em destaque carregado.' : ''} onRetry={retry} />
        {status === 'ready' && artist && (
          <div key={artist.titulo} className={cx(featuredArtist.item)}>
            {artist.videoId && <div className={cx(featuredArtist.video)}><div className={cx(featuredArtist.embed)}><YoutubeEmbed embedId={artist.videoId} /></div></div>}
            <div className={cx(featuredArtist.content)}>
              <p className={cx(featuredArtist.title)}>{artist.titulo}</p>
              <p className={cx(featuredArtist.artist)}>{artist.artistas}</p>
              <p className={cx(featuredArtist.description)}>{artist.descricao}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
