import { fireEvent, render, screen } from '@testing-library/react';
import DataState from './DataState';

test('error announces message and provides retry and a safe external link', () => {
  const retry = jest.fn();
  render(<DataState status="error" message="Não conseguimos carregar o catálogo agora." onRetry={retry} />);
  expect(screen.getByRole('status')).toHaveTextContent('Não conseguimos carregar o catálogo agora.');
  fireEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }));
  expect(retry).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('link', { name: 'Ouvir no YouTube (abre em nova aba)' })).toHaveAttribute('href', 'https://www.youtube.com/@2122prod');
  expect(screen.getByRole('link', { name: 'Ouvir no YouTube (abre em nova aba)' })).toHaveAttribute('target', '_blank');
  expect(screen.getByRole('link', { name: 'Ouvir no YouTube (abre em nova aba)' })).toHaveAttribute('rel', 'noopener noreferrer');
});

test('empty state announces message and link without retry', () => {
  render(<DataState status="empty" message="Nenhum beat publicado por enquanto." />);
  expect(screen.getByRole('status')).toHaveTextContent('Nenhum beat publicado por enquanto.');
  expect(screen.getByRole('link', { name: 'Ouvir no YouTube (abre em nova aba)' })).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('loading announces the progress message', () => {
  render(<DataState status="loading" message="Carregando catálogo…" />);
  expect(screen.getByRole('status')).toHaveTextContent('Carregando catálogo…');
});
