import { useCallback, useEffect, useRef, useState } from 'react';
import { getTableRecords } from './airtableApi';
import { IAirtableRecord } from './airtableApi.type';
import { IAirtableRecordsState, TLoadStatus } from './useAirtableRecords.type';

export function useAirtableRecords(tableId: string, viewId?: string): IAirtableRecordsState {
  const [status, setStatus] = useState<TLoadStatus>('loading');
  const [records, setRecords] = useState<IAirtableRecord[]>([]);
  const [attempt, setAttempt] = useState(0);
  const latestRequest = useRef(0);
  const retry = useCallback(() => {
    latestRequest.current += 1;
    setRecords([]);
    setStatus('loading');
    setAttempt(value => value + 1);
  }, []);

  useEffect(() => {
    const request = ++latestRequest.current;
    setStatus('loading');
    setRecords([]);
    getTableRecords(tableId, viewId).then(
      result => {
        if (latestRequest.current !== request) return;
        setRecords(result);
        setStatus(result.length ? 'ready' : 'empty');
      },
      () => {
        if (latestRequest.current !== request) return;
        setRecords([]);
        setStatus('error');
      },
    );
    return () => { latestRequest.current += 1; };
  }, [tableId, viewId, attempt]);

  return { status, records, retry };
}
