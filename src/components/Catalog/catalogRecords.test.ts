import { toBeatStyles } from './catalogRecords';

test('defaults a missing beat name and discards invalid videos', () => {
  expect(toBeatStyles([{ id: 'r1', fields: { Videos: ['https://youtu.be/abc123', '', 'https://example.com/watch?v=oops'] } }])).toEqual([
    { id: 'r1', name: 'Sem nome', description: '', videos: ['abc123'], playlist: '' },
  ]);
});

test('ignores non-string catalog fields and video entries', () => {
  const records = [{ id: 'r1', fields: { Nome: 42, descricao_catalogo: true, Playlist_link: 9, Videos: [1, 'https://youtu.be/abc123'] } }] as unknown as Parameters<typeof toBeatStyles>[0];
  expect(toBeatStyles(records)).toEqual([
    { id: 'r1', name: 'Sem nome', description: '', videos: ['abc123'], playlist: '' },
  ]);
});
