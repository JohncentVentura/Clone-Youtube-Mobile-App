import { useEffect, useState } from "react";

//apiFunc is a function that makes an API request (e.g., fetchTrendingVideos from youtubeService.js)
//params are optional parameters you want to send
export function useFetch(apiFunc, params = {}) {
  const [data, setData] = useState(null); //Stores the API response
  const [loading, setLoading] = useState(true); //Starts as true because we are loading data at the beginning
  const [error, setError] = useState(null); //Will hold an error if something goes wrong

  //Runs the fetching logic whenever apiFunc or params change
  useEffect(() => {
    let isMounted = true; //A safety check to avoid updating state after the component unmounts
    
    //fetchData calls your API function with params, sets data if fetching is successful,
    //sets error if there's an issue, and in both cases sets loading to false at the end
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

    //Call fetchData and isMounted = false for cleanup and avoid memory leaks
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [apiFunc, params]);

  //Gives back an object containing what happened in data, loading, and error states from fetchData()
  return { data, loading, error };
}
