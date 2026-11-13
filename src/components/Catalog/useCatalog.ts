import { TABLE_CATALOG } from '../../services/airtableApi';
import { useAirtableRecords } from '../../services/useAirtableRecords';
import { toBeatStyles } from './catalogRecords';

export function useCatalog() {
  const { status, records, retry } = useAirtableRecords(TABLE_CATALOG, 'viwMYum1P37cF3kkf');
  return { status, items: status === 'ready' ? toBeatStyles(records) : [], retry };
}
