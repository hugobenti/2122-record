import { IAirtableRecord } from '../../services/airtableApi.type';
import { youtubeId } from '../../utils/youtube';
import { IBeatStyle } from './Catalog.type';

export function toBeatStyles(records: IAirtableRecord[]): IBeatStyle[] {
  return records.map(record => ({
    id: record.id,
    name: typeof record.fields.Nome === 'string' ? record.fields.Nome || 'Sem nome' : 'Sem nome',
    description: typeof record.fields.descricao_catalogo === 'string' ? record.fields.descricao_catalogo : '',
    videos: (Array.isArray(record.fields.Videos) ? record.fields.Videos.filter((video): video is string => typeof video === 'string') : []).map(youtubeId).filter((id): id is string => id !== null),
    playlist: typeof record.fields.Playlist_link === 'string' ? record.fields.Playlist_link : '',
  }));
}
