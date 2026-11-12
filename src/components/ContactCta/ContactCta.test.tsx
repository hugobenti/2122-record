import { render, screen } from '@testing-library/react';
import ContactCta from './ContactCta';

test('opens the shared Instagram inbox in a new tab with an explicit accessible name', () => {
  render(<ContactCta label="Fale com a gente" />);
  const link = screen.getByRole('link', { name: 'Fale com a gente (abre o Instagram em nova aba)' });
  expect(link).toHaveAttribute('href', 'https://ig.me/m/2122producoes');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});
