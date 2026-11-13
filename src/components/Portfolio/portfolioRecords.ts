import { IAirtableRecord } from '../../services/airtableApi.type';
import { youtubeId } from '../../utils/youtube';
import { IPortfolioItem } from './Portfolio.type';

export function toPortfolioItems(records: IAirtableRecord[]): IPortfolioItem[] {
  return records.map(record => ({
    id: record.id,
    titulo: record.fields.titulo || '',
    artistas: record.fields.artistas || '',
    descricao: record.fields.descricao || '',
    videoId: youtubeId(record.fields.link || ''),
  }));
}
