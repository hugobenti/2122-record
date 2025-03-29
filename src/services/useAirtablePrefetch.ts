// src/hooks/useAirtablePrefetch.ts

import { useEffect, useState } from "react";
import { getTableRecords, AirtableRecord } from "../services/airtableApi";

/**
 * Opções do hook de prefetch.
 * - `tableId`: ID da tabela (ex: TABLE_ARTISTA_MES)
 * - `viewId`: ID opcional da view (ex: viw9qZ5iMfdt3ZeoA)
 * - `delay`: quanto tempo esperar (ms) antes de disparar o fetch
 */
interface UseAirtablePrefetchOptions {
  tableId: string;
  viewId?: string;
  delay?: number;
}

export function useAirtablePrefetch({
  tableId,
  viewId,
  delay = 1,
}: UseAirtablePrefetchOptions) {
  const [records, setRecords] = useState<AirtableRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setIsFetching(true);
        const result = await getTableRecords(tableId, viewId);
        setRecords(result);
        setFetched(true);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setIsFetching(false);
      }
    }, delay);

    // Limpeza do setTimeout
    return () => clearTimeout(timer);
  }, [tableId, viewId, delay]);

  return {
    records,
    error,
    isFetching,
    fetched,
  };
}
