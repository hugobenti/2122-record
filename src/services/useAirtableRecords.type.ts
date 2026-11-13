import { IAirtableRecord } from './airtableApi.type';

export type TLoadStatus = 'loading' | 'error' | 'empty' | 'ready';

export interface IAirtableRecordsState {
  status: TLoadStatus;
  records: IAirtableRecord[];
  retry: () => void;
}
