import { useEffect } from "react";
import { fetchMainVideoData } from "../api/mainVideoApi";
import { fetchShortsVideoData } from "../api/shortsVideoApi";

export function useSetMainVideoData({
  query,
  queryResults,
  setVideos,
  setIsLoading,
  dependecies = [],
}) {
  useEffect(() => {
    let isMounted = true;
    setIsLoading?.(true);

    (async function () {
      try {
        const data = await fetchMainVideoData(query, queryResults);
        if (isMounted) {
          setVideos(data);
        }
      } catch (error) {
        console.error("useSetPexelsDataVideos error:", error);
      } finally {
        if (isMounted) setIsLoading?.(false); // 💫 end loading
      }
    })();

    return () => (isMounted = false);
  }, dependecies);
}

export function useSetShortsVideoData({
  query,
  queryResults,
  setVideos,
  setIsLoading,
  dependecies = [],
}) {
  useEffect(() => {
    let isMounted = true;
    setIsLoading?.(true);

    (async function () {
      try {
        const data = await fetchShortsVideoData(query, queryResults);
        if (isMounted) {
          setVideos(data);
        }
      } catch (error) {
        console.error("useSetPexelsDataVideos error:", error);
      } finally {
        if (isMounted) setIsLoading?.(false); // 💫 end loading
      }
    })();

    return () => (isMounted = false);
  }, dependecies);
}
