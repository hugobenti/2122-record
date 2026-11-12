import { fireEvent, render, screen, within } from '@testing-library/react';
import Services from './Services';

test('collapsed music disclosure identifies a hidden details panel', () => {
  render(<Services />);
  const button = screen.getAllByRole('button', { name: 'Leia mais' })[0];
  expect(button).toHaveAttribute('aria-expanded', 'false');
  const panel = screen.getAllByRole('region', { hidden: true })[0];
  expect(button).toHaveAttribute('aria-controls', 'servico-musicas-detalhes');
  expect(panel).toHaveAttribute('id', 'servico-musicas-detalhes');
  expect(panel).toHaveAttribute('hidden');
  expect(screen.queryByText(/Captação de voz/)).not.toBeInTheDocument();
});

test('expanding music reveals details and announces the changed state', () => {
  render(<Services />);
  const button = screen.getAllByRole('button', { name: 'Leia mais' })[0];
  fireEvent.click(button);
  expect(button).toHaveTextContent('Leia menos');
  expect(button).toHaveAttribute('aria-expanded', 'true');
  expect(within(screen.getByRole('region', { name: 'Músicas' })).getByText(/Captação de voz/)).toBeVisible();
});

test('all three services and the page end link to the same Instagram inbox', () => {
  render(<Services />);
  const links = screen.getAllByRole('link').filter((link) => link.getAttribute('href') === 'https://ig.me/m/2122producoes');
  expect(links).toHaveLength(4);
  expect(links.map((link) => link.textContent)).toEqual([
    expect.stringContaining('Falar sobre música'),
    expect.stringContaining('Falar sobre marketing'),
    expect.stringContaining('Falar sobre jurídico'),
    expect.stringContaining('Fale com a gente'),
  ]);
});
