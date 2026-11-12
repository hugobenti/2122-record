import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { getTableRecords } from './airtableApi';
import { useAirtableRecords } from './useAirtableRecords';

jest.mock('./airtableApi', () => ({ getTableRecords: jest.fn() }));
const fetchRecords = getTableRecords as jest.MockedFunction<typeof getTableRecords>;
const record = { id: 'rec1', fields: { Nome: 'Beat' } };

beforeEach(() => fetchRecords.mockReset());

test('loads records into ready state', async () => {
  fetchRecords.mockResolvedValue([record]);
  const { result } = renderHook(() => useAirtableRecords('table'));
  expect(result.current.status).toBe('loading');
  await waitFor(() => expect(result.current.status).toBe('ready'));
  expect(result.current.records).toEqual([record]);
});

test('reports an empty table', async () => {
  fetchRecords.mockResolvedValue([]);
  const { result } = renderHook(() => useAirtableRecords('table'));
  await waitFor(() => expect(result.current.status).toBe('empty'));
});

test('reports a failed request', async () => {
  fetchRecords.mockRejectedValue(new Error('offline'));
  const { result } = renderHook(() => useAirtableRecords('table'));
  await waitFor(() => expect(result.current.status).toBe('error'));
});

test('retries an error and restores ready state', async () => {
  fetchRecords.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce([record]);
  const { result } = renderHook(() => useAirtableRecords('table'));
  await waitFor(() => expect(result.current.status).toBe('error'));
  act(() => result.current.retry());
  expect(result.current.status).toBe('loading');
  await waitFor(() => expect(result.current.status).toBe('ready'));
  expect(result.current.records).toEqual([record]);
  expect(fetchRecords).toHaveBeenCalledTimes(2);
});

test('ignores a response superseded by retry', async () => {
  let resolveFirst!: (records: typeof record[]) => void;
  fetchRecords.mockImplementationOnce(() => new Promise(resolve => { resolveFirst = resolve; }));
  fetchRecords.mockResolvedValueOnce([{ id: 'rec2', fields: { Nome: 'Second' } }]);
  const { result } = renderHook(() => useAirtableRecords('table'));
  act(() => result.current.retry());
  await waitFor(() => expect(result.current.records[0]?.id).toBe('rec2'));
  await act(async () => resolveFirst([record]));
  expect(result.current.records[0]?.id).toBe('rec2');
});

test('ignores an old table response after the table changes', async () => {
  let resolveOld!: (records: typeof record[]) => void;
  let resolveNew!: (records: typeof record[]) => void;
  fetchRecords.mockImplementationOnce(() => new Promise(resolve => { resolveOld = resolve; }));
  fetchRecords.mockImplementationOnce(() => new Promise(resolve => { resolveNew = resolve; }));
  const { result, rerender } = renderHook(({ tableId }) => useAirtableRecords(tableId), {
    initialProps: { tableId: 'old' },
  });
  rerender({ tableId: 'new' });
  await act(async () => resolveOld([record]));
  expect(result.current.status).toBe('loading');
  expect(result.current.records).toEqual([]);
  await act(async () => resolveNew([{ id: 'rec2', fields: { Nome: 'Second' } }]));
  await waitFor(() => expect(result.current.records[0]?.id).toBe('rec2'));
  expect(result.current.status).toBe('ready');
});

test('does not call state setters when a response arrives after unmount', async () => {
  let resolveRequest!: (records: typeof record[]) => void;
  fetchRecords.mockImplementationOnce(() => new Promise(resolve => { resolveRequest = resolve; }));
  const originalUseState = React.useState;
  const setterCalls = jest.fn();
  const spy = jest.spyOn(React, 'useState').mockImplementation(((initial: unknown) => {
    const [value, setValue] = originalUseState(initial);
    return [value, (next: React.SetStateAction<unknown>) => {
      setterCalls();
      setValue(next);
    }];
  }) as typeof React.useState);
  try {
    const { unmount } = renderHook(() => useAirtableRecords('table'));
    expect(setterCalls).toHaveBeenCalled();
    unmount();
    setterCalls.mockClear();
    await act(async () => resolveRequest([record]));
    expect(setterCalls).not.toHaveBeenCalled();
  } finally {
    spy.mockRestore();
  }
});
