import { useRef } from 'react';

export default function useDataState(onRetry?: () => void) {
  const statusRef = useRef<HTMLDivElement>(null);
  const retry = () => {
    statusRef.current?.focus();
    onRetry?.();
  };
  return { statusRef, retry };
}
