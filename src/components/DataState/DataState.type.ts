import { TLoadStatus } from '../../services/useAirtableRecords.type';

export interface IDataStateProps {
  status: Exclude<TLoadStatus, 'ready'>;
  message: string;
  onRetry?: () => void;
}
