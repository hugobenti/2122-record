import { IAirtableRecord } from './airtableApi.type';

const BASE_ID = 'appDoTTDEDNlEvZBh';
const AIRTABLE_TOKEN = process.env.REACT_APP_AIRTABLE_TOKEN || '';

export const TABLE_PORTFOLIO = 'tblbbnjpPS1SKVdR3';
export const TABLE_FEATURED_ARTIST = 'tblP6mJLg6BE3PFsW';
export const TABLE_CATALOG = 'tbl8TfB4rZ6J8mwxM';

export class AirtableError extends Error {
  constructor(public status: number) {
    super(`Airtable request failed (${status})`);
    this.name = 'AirtableError';
  }
}

export async function getTableRecords(tableId: string, viewId?: string): Promise<IAirtableRecord[]> {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${tableId}${viewId ? `?view=${encodeURIComponent(viewId)}` : ''}`;
  const headers: HeadersInit = AIRTABLE_TOKEN ? { Authorization: `Bearer ${AIRTABLE_TOKEN}` } : {};
  const response = await fetch(url, { headers });
  if (!response.ok) throw new AirtableError(response.status);
  const data = await response.json();
  return data.records as IAirtableRecord[];
}
