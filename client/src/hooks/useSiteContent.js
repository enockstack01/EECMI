import { useEffect, useState } from 'react';
import axios from 'axios';
import { DEFAULT_CONTENT } from '../data/defaultContent';

// Module-level cache so the whole app fetches /api/content at most once.
let cache = null;
let inflight = null;

async function fetchContent() {
  if (cache) return cache;
  if (!inflight) {
    inflight = axios.get('/api/content')
      .then((res) => {
        cache = { ...DEFAULT_CONTENT, ...(res.data?.data || {}) };
        return cache;
      })
      .catch(() => DEFAULT_CONTENT)
      .finally(() => { inflight = null; });
  }
  return inflight;
}

/**
 * Returns the admin-managed platform content, merged over the bundled
 * defaults so a section is always present. `content` is populated
 * synchronously with the defaults, then replaced once the API responds.
 */
export function useSiteContent() {
  const [content, setContent] = useState(cache || DEFAULT_CONTENT);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    let alive = true;
    fetchContent().then((c) => {
      if (!alive) return;
      setContent(c);
      setLoading(false);
    });
    return () => { alive = false; };
  }, []);

  return { content, loading };
}
