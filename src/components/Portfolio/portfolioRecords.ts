import { IAirtableRecord } from '../../services/airtableApi.type';
import { youtubeId } from '../../utils/youtube';
import { IPortfolioItem } from './Portfolio.type';

export function toPortfolioItems(records: IAirtableRecord[]): IPortfolioItem[] {
  return records.map(record => ({
    id: record.id,
    titulo: typeof record.fields.titulo === 'string' ? record.fields.titulo : '',
    artistas: typeof record.fields.artistas === 'string' ? record.fields.artistas : '',
    descricao: typeof record.fields.descricao === 'string' ? record.fields.descricao : '',
    videoId: youtubeId(record.fields.link),
  }));
}
