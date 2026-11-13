import { splitAtMiddleSpace } from './welcomeText';

it('breaks a phrase at the space near its middle', () => {
  expect(splitAtMiddleSpace('Seu som no topo')).toEqual(['Seu som', 'no topo']);
});

it('preserves words with no spaces', () => {
  expect(splitAtMiddleSpace('Independência')).toEqual(['Independência', '']);
});

it('handles an empty phrase', () => {
  expect(splitAtMiddleSpace('')).toEqual(['', '']);
});
