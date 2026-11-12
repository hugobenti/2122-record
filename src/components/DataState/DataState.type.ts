import { TLoadStatus } from '../../services/useAirtableRecords.type';

export interface IDataStateProps {
  status: TLoadStatus;
  message: string;
  onRetry?: () => void;
}
