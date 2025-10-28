import { useEffect } from "react";
import { fetchMainVideoData } from "../api/mainVideoApi";
import { fetchShortsVideoData } from "../api/shortsVideoApi";

export const videoDataType = {
  main: "main",
  shorts: "shorts",
};

export function useSetVideoData({
  videoDataType = "main",
  query,
  queryResults,
  setVideos,
  setIsLoading,
  dependencies = [],
}) {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    let isMounted = true;
    setIsLoading?.(true);

    (async function () {
      try {
        const data =
          videoDataType === "shorts"
            ? await fetchShortsVideoData({ query, queryResults, signal })
            : await fetchMainVideoData({ query, queryResults, signal });

        if (isMounted) setVideos(data);
      } catch (err) {
        console.error("useSetVideoData error:", err);
      } finally {
        if (isMounted) setIsLoading?.(false);
      }
    })();

    return () => {
      isMounted = false;
      setVideos([]);
      controller.abort();
    };
  }, dependencies);
}
