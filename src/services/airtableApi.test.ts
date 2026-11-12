import { AirtableError, getTableRecords, TABLE_CATALOG } from './airtableApi';

afterEach(() => {
  jest.restoreAllMocks();
});

test('HTTP failures expose status without leaking the table ID', async () => {
  const fetchMock = jest.fn().mockResolvedValue({ ok: false, status: 503 });
  global.fetch = fetchMock;
  const failure = getTableRecords(TABLE_CATALOG);
  await expect(failure).rejects.toBeInstanceOf(AirtableError);
  await expect(failure).rejects.toMatchObject({ status: 503, message: 'Airtable request failed (503)' });
  await expect(failure).rejects.not.toThrow(TABLE_CATALOG);
});

test('rejects a successful response without a records array as a gateway failure', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
  await expect(getTableRecords(TABLE_CATALOG)).rejects.toMatchObject({ name: 'AirtableError', status: 502 });
});

test('rejects records without a string id and object fields', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ records: [{}] }) });
  await expect(getTableRecords(TABLE_CATALOG)).rejects.toMatchObject({ name: 'AirtableError', status: 502 });
});
