import { IAirtableRecord } from '../../services/airtableApi.type';
import { youtubeId } from '../../utils/youtube';
import { IFeaturedArtist } from './FeaturedArtist.type';

export function toFeaturedArtist(records: IAirtableRecord[]): IFeaturedArtist | null {
  if (!records.length) return null;
  const fields = records[0].fields;
  return {
    titulo_pagina: typeof fields.titulo_pagina === 'string' ? fields.titulo_pagina : '',
    titulo: typeof fields.titulo === 'string' ? fields.titulo : '',
    artistas: typeof fields.artistas === 'string' ? fields.artistas : '',
    descricao: typeof fields.descricao === 'string' ? fields.descricao : '',
    videoId: youtubeId(fields.link),
  };
}
