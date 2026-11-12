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

test('defaults non-string portfolio text and ignores an invalid video link', () => {
  const records = [{ id: 'one', fields: { titulo: 42, artistas: true, descricao: ['bad'], link: 9 } }] as unknown as Parameters<typeof toPortfolioItems>[0];
  expect(toPortfolioItems(records)).toEqual([
    { id: 'one', titulo: '', artistas: '', descricao: '', videoId: null },
  ]);
});
