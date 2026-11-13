import { toPortfolioItems } from './portfolioRecords';

test('normalizes short links and omits absent embeds', () => {
  expect(toPortfolioItems([
    { id: 'one', fields: { titulo: 'Projeto', link: 'https://youtu.be/abc123' } },
    { id: 'two', fields: {} },
  ])).toEqual([
    { id: 'one', titulo: 'Projeto', artistas: '', descricao: '', videoId: 'abc123' },
    { id: 'two', titulo: '', artistas: '', descricao: '', videoId: null },
  ]);
});
