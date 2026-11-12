import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

const renderHeader = () =>
  render(
    <MemoryRouter initialEntries={['/servicos']}>
      <Header />
    </MemoryRouter>
  );

it('names and announces the mobile toggle and shows every destination without Sobre', () => {
  renderHeader();
  const toggle = screen.getByRole('button', { name: 'Abrir menu' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveAttribute('aria-controls', 'menu-mobile');
  expect(screen.queryByRole('navigation', { name: 'Menu mobile' })).not.toBeInTheDocument();

  fireEvent.click(toggle);
  expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true');
  expect(within(screen.getByRole('navigation', { name: 'Menu mobile' })).getAllByRole('link').map((link) => link.textContent)).toEqual([
    'Home', 'Serviços', 'Catalogo', 'Portfolio',
  ]);
  expect(screen.queryByRole('link', { name: 'Sobre' })).not.toBeInTheDocument();
});

it('closes on Escape and restores focus to the toggle', () => {
  renderHeader();
  const toggle = screen.getByRole('button', { name: 'Abrir menu' });
  toggle.focus();
  fireEvent.click(toggle);
  const mobile = screen.getByRole('navigation', { name: 'Menu mobile' });
  within(mobile).getByRole('link', { name: 'Serviços' }).focus();
  expect(toggle).not.toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('navigation', { name: 'Menu mobile' })).not.toBeInTheDocument();
  expect(toggle).toHaveFocus();
});

it('closes when a mobile destination is selected', () => {
  renderHeader();
  fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
  fireEvent.click(within(screen.getByRole('navigation', { name: 'Menu mobile' })).getByRole('link', { name: 'Catalogo' }));
  expect(screen.queryByRole('navigation', { name: 'Menu mobile' })).not.toBeInTheDocument();
});

it('marks the current route in desktop navigation', () => {
  renderHeader();
  const desktop = screen.getByRole('navigation', { name: 'Menu principal' });
  expect(within(desktop).getByRole('link', { name: 'Serviços' })).toHaveAttribute('aria-current', 'page');
  expect(within(desktop).getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
});

it('gives the current destination exclusive highlight colors', () => {
  renderHeader();
  const desktop = screen.getByRole('navigation', { name: 'Menu principal' });
  const current = within(desktop).getByRole('link', { name: 'Serviços' });
  const idle = within(desktop).getByRole('link', { name: 'Home' });
  expect(current).toHaveClass('border-accent-strong', 'text-accent-strong');
  expect(current).not.toHaveClass('border-transparent', 'text-ink-muted');
  expect(idle).toHaveClass('border-transparent', 'text-ink-muted');

  fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
  const mobile = screen.getByRole('navigation', { name: 'Menu mobile' });
  expect(within(mobile).getByRole('link', { name: 'Serviços' })).not.toHaveClass('text-ink-muted');
  expect(within(mobile).getByRole('link', { name: 'Home' })).toHaveClass('text-ink-muted');
});
