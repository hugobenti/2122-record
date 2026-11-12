import { TABLE_PORTFOLIO } from '../../services/airtableApi';
import { useAirtableRecords } from '../../services/useAirtableRecords';
import { toPortfolioItems } from './portfolioRecords';

export function usePortfolio() {
  const { status, records, retry } = useAirtableRecords(TABLE_PORTFOLIO);
  const items = status === 'ready' ? toPortfolioItems(records).map((item, index) => ({ ...item, isReversed: index % 2 !== 0 })) : [];
  return { status, items, retry };
}
