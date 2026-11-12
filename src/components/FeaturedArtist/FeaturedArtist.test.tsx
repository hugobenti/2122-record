import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FeaturedArtist from './FeaturedArtist';

jest.mock('../../context/AppContext', () => ({ useAppContext: () => ({ featuredArtistRef: { current: null } }) }));

const fetchMock = jest.fn();
beforeEach(() => { fetchMock.mockReset(); global.fetch = fetchMock; });

test('keeps focus on the status when retry loads the featured artist', async () => {
  fetchMock.mockResolvedValueOnce({ ok: false, status: 503 });
  fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ records: [{ id: 'rec1', fields: { titulo: 'Artista de volta', titulo_pagina: 'Artista em destaque', artistas: '2122', descricao: 'Produção musical', link: '' } }] }) });
  render(<FeaturedArtist />);
  const retry = await screen.findByRole('button', { name: 'Tentar de novo' });
  retry.focus();
  fireEvent.click(retry);
  const status = screen.getByRole('status');
  expect(status).toHaveFocus();
  expect(await screen.findByText('Artista de volta')).toBeInTheDocument();
  expect(status).toHaveFocus();
  expect(document.body).not.toHaveFocus();
});

test('keeps an empty state non-visual while retaining its status landmark', async () => {
  fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ records: [] }) });
  render(<FeaturedArtist />);
  const status = screen.getByRole('status');
  await waitFor(() => expect(status).toHaveClass('sr-only'));
  expect(status).toHaveTextContent('');
  expect(screen.queryByRole('link', { name: 'Ouvir no YouTube (abre em nova aba)' })).not.toBeInTheDocument();
});
