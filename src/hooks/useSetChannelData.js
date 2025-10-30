import { useEffect } from "react";
import { fetchChannelData } from "../api/channelApi";

export function useSetChannelData({
  query,
  queryResults,
  setData,
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
        const data = await fetchChannelData({ query, queryResults, signal });

        if (isMounted) setData(data);
      } catch (err) {
        console.error("useSetChannelData error:", err);
      } finally {
        if (isMounted) setIsLoading?.(false);
      }
    })();

    return () => {
      isMounted = false;
      setData([]);
      controller.abort();
    };
  }, dependencies);
}
