import { IAirtableRecord } from '../../services/airtableApi.type';
import { youtubeId } from '../../utils/youtube';
import { IFeaturedArtist } from './FeaturedArtist.type';

export function toFeaturedArtist(records: IAirtableRecord[]): IFeaturedArtist | null {
  if (!records.length) return null;
  const fields = records[0].fields;
  return {
    titulo_pagina: fields.titulo_pagina || '',
    titulo: fields.titulo || '',
    artistas: fields.artistas || '',
    descricao: fields.descricao || '',
    videoId: youtubeId(fields.link || ''),
  };
}
