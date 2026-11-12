import { useAppContext } from '../../context/AppContext';
import { TABLE_FEATURED_ARTIST } from '../../services/airtableApi';
import { useAirtableRecords } from '../../services/useAirtableRecords';
import { toFeaturedArtist } from './featuredArtistRecord';

export function useFeaturedArtist() {
  const { featuredArtistRef } = useAppContext();
  const { status, records, retry } = useAirtableRecords(TABLE_FEATURED_ARTIST);
  const artist = status === 'ready' ? toFeaturedArtist(records) : null;
  return { status, artist, retry, featuredArtistRef };
}
