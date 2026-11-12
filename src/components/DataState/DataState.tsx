import AnimatePolvo from '../../assets/AnimatePolvo';
import { cx } from '../../utils/cx';
import { YOUTUBE_CHANNEL } from './DataState.data';
import { dataState } from './DataState.style';
import useDataState from './useDataState';
import { IDataStateProps } from './DataState.type';

export default function DataState({ status, message, onRetry }: IDataStateProps) {
  const { statusRef, retry } = useDataState(onRetry);
  return (
    <div role="status" tabIndex={-1} ref={statusRef} className={cx(dataState.base, status === 'ready' && dataState.ready)}>
      {status === 'loading' && <div aria-hidden="true" className={cx(dataState.spinner)} />}
      {status === 'error' && <div aria-hidden="true" className={cx(dataState.octopus)}><AnimatePolvo /></div>}
      <p className={cx(dataState.message)}>{message}</p>
      {status !== 'loading' && status !== 'ready' && (
        <div className={cx(dataState.actions)}>
          {status === 'error' && onRetry && <button type="button" className={cx(dataState.retry)} onClick={retry}>Tentar de novo</button>}
          <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className={cx(dataState.link)} aria-label="Ouvir no YouTube (abre em nova aba)">Ouvir no YouTube</a>
        </div>
      )}
    </div>
  );
}
