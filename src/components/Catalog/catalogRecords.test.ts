import { toBeatStyles } from './catalogRecords';

test('defaults a missing beat name and discards invalid videos', () => {
  expect(toBeatStyles([{ id: 'r1', fields: { Videos: ['https://youtu.be/abc123', '', 'https://example.com/watch?v=oops'] } }])).toEqual([
    { id: 'r1', name: 'Sem nome', description: '', videos: ['abc123'], playlist: '' },
  ]);
});
