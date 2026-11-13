import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Catalog from './Catalog';

const fetchMock = jest.fn();
beforeEach(() => { fetchMock.mockReset(); global.fetch = fetchMock; });

test('recovers from unauthorized failure without leaking API details', async () => {
  fetchMock.mockResolvedValueOnce({ ok: false, status: 401 });
  fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ records: [{ id: 'rec1', fields: { Nome: 'Beat de volta' } }] }) });
  render(<Catalog />);
  const status = screen.getByRole('status');
  expect(status).toHaveTextContent('Carregando catálogo…');
  expect(await screen.findByText('Não conseguimos carregar o catálogo agora.')).toBeInTheDocument();
  expect(screen.queryByText(/tbl|401|Unauthorized/)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }));
  expect(screen.getByRole('status')).toBe(status);
  expect(screen.getByRole('status')).toHaveTextContent('Carregando catálogo…');
  expect(await screen.findByText('Beat de volta')).toBeInTheDocument();
  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  expect(screen.queryByText(/tbl|401|Unauthorized/)).not.toBeInTheDocument();
});

test('keeps keyboard focus on the status through retry and successful loading', async () => {
  fetchMock.mockResolvedValueOnce({ ok: false, status: 503 });
  fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ records: [{ id: 'rec1', fields: { Nome: 'Beat de volta' } }] }) });
  render(<Catalog />);
  const retry = await screen.findByRole('button', { name: 'Tentar de novo' });
  retry.focus();
  fireEvent.click(retry);
  const status = screen.getByRole('status');
  expect(status).toHaveFocus();
  await screen.findByText('Beat de volta');
  expect(status).toHaveFocus();
});

test('reports a malformed successful response as an error rather than loading forever', async () => {
  fetchMock.mockResolvedValue({ ok: true, json: async () => ({}) });
  render(<Catalog />);
  expect(await screen.findByText('Não conseguimos carregar o catálogo agora.')).toBeInTheDocument();
});

test('renders a friendly error for a malformed record instead of crashing', async () => {
  fetchMock.mockResolvedValue({ ok: true, json: async () => ({ records: [{}] }) });
  render(<Catalog />);
  expect(await screen.findByText('Não conseguimos carregar o catálogo agora.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Tentar de novo' })).toBeInTheDocument();
});
