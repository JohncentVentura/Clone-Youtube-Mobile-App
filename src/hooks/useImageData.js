import { useEffect } from "react";
import { fetchImageData } from "../api/imageApi";

export function useSetImageData({
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
        const data = await fetchImageData({ query, queryResults, signal });

        if (isMounted) setData(data);
      } catch (err) {
        console.error("useSetImageData error:", err);
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
