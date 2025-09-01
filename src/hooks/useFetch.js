import { useEffect, useState } from 'react';

export function useFetch(apiFunc, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const result = await apiFunc(params);
        if (isMounted) setData(result);
      } catch (err) {
        setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [apiFunc, params]);

  return { data, loading, error };
}
