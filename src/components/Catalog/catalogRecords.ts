import { IAirtableRecord } from '../../services/airtableApi.type';
import { youtubeId } from '../../utils/youtube';
import { IBeatStyle } from './Catalog.type';

export function toBeatStyles(records: IAirtableRecord[]): IBeatStyle[] {
  return records.map(record => ({
    id: record.id,
    name: record.fields.Nome || 'Sem nome',
    description: record.fields.descricao_catalogo || '',
    videos: (record.fields.Videos || []).map(youtubeId).filter((id): id is string => id !== null),
    playlist: record.fields.Playlist_link || '',
  }));
}
