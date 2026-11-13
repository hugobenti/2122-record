import { youtubeId } from './youtube';

test.each([
  ['https://www.youtube.com/watch?v=abc123&t=42', 'abc123'],
  ['https://youtu.be/abc123', 'abc123'],
  ['abc123', 'abc123'],
  ['', null],
  ['https://example.com/watch?v=abc123', null],
  ['https://www.youtube.com/watch?v=', null],
])('parses %s as %s', (value, expected) => {
  expect(youtubeId(value)).toBe(expected);
});
