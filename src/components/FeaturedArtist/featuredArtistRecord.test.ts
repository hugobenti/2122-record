import { toFeaturedArtist } from './featuredArtistRecord';

test('uses the first record and ignores invalid links', () => {
  expect(toFeaturedArtist([{ id: 'one', fields: { titulo: 'Artista', link: 'https://example.com/' } }, { id: 'two', fields: { titulo: 'Other' } }])).toEqual({
    titulo_pagina: '', titulo: 'Artista', artistas: '', descricao: '', videoId: null,
  });
  expect(toFeaturedArtist([])).toBeNull();
});
