import { toFeaturedArtist } from './featuredArtistRecord';

test('uses the first record and ignores invalid links', () => {
  expect(toFeaturedArtist([{ id: 'one', fields: { titulo: 'Artista', link: 'https://example.com/' } }, { id: 'two', fields: { titulo: 'Other' } }])).toEqual({
    titulo_pagina: '', titulo: 'Artista', artistas: '', descricao: '', videoId: null,
  });
  expect(toFeaturedArtist([])).toBeNull();
});

test('defaults non-string featured artist text and ignores an invalid video link', () => {
  const records = [{ id: 'one', fields: { titulo_pagina: 42, titulo: true, artistas: ['bad'], descricao: 9, link: 8 } }] as unknown as Parameters<typeof toFeaturedArtist>[0];
  expect(toFeaturedArtist(records)).toEqual({
    titulo_pagina: '', titulo: '', artistas: '', descricao: '', videoId: null,
  });
});
