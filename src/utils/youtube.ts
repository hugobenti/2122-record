export function youtubeId(value: string): string | null {
  const input = value.trim();
  if (/^[a-zA-Z0-9_-]+$/.test(input)) return input;
  try {
    const url = new URL(input);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    let id: string | null = null;
    if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
    if (url.hostname === 'youtube.com' || url.hostname === 'www.youtube.com' || url.hostname === 'm.youtube.com') {
      id = url.pathname === '/watch' ? url.searchParams.get('v') : url.pathname.startsWith('/embed/') ? url.pathname.slice(7) : null;
    }
    return id && /^[a-zA-Z0-9_-]+$/.test(id) ? id : null;
  } catch {
    return null;
  }
}
