import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('footer email opens a composed email while retaining its visible label', () => {
  render(<Footer />);
  expect(screen.getByRole('link', { name: '2122producoes@gmail.com' })).toHaveAttribute('href', 'mailto:2122producoes@gmail.com');
  expect(screen.getByText('Email:', { exact: false })).toBeInTheDocument();
});
