import { useEffect, useState } from "react";
import Constants from "expo-constants";

const { YOUTUBE_API_URL, YOUTUBE_API_KEY } = Constants.expoConfig.extra;

export function autoFetchYoutubeData(query = "movies", results = 10) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchVideos() {
      try {
        setLoading(true);

        const url = `${YOUTUBE_API_URL}/search?part=snippet&maxResults=${results}&q=${encodeURIComponent(
          query
        )}&key=${YOUTUBE_API_KEY}`;

        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok || json.error) {
          const msg =
            json?.error?.message || `Request failed with status ${res.status}`;
          throw new Error(msg);
        }

        if (!cancelled) setVideos(json.items || []);
      } catch (error) {
        if (!cancelled) setError(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchVideos();

    return () => {
      cancelled = true;
    };
  }, [query, results]);

  return { videos, loading, error };
}

export async function manualFetchYoutubeData(query = "movies", results = 10) {
  try {
    const url = `${YOUTUBE_API_URL}/search?part=snippet&maxResults=${results}&q=${encodeURIComponent(
      query
    )}&key=${YOUTUBE_API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const data = await res.json();

    return data.items || [];
  } catch (error) {
    console.error("Youtube API error:", error);
    return [];
  }
}
