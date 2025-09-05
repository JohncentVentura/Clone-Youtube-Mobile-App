//apiClient Has the YouTube base URL and automatically adds the API key to every request
import youtubeAPIClient from './youtubeAPI';

export const fetchTrendingYoutubeVideos = async () => {
  //Calls the YouTube Videos API endpoint (/videos)
  const response = await youtubeAPIClient.get('/videos', {
    params: {
      part: 'snippet', //Tells the API to include video details like title, description, thumbnails
      chart: 'mostPopular',
      regionCode: 'US',
      maxResults: 5,
    },
  });
  return response.data;
};

export const searchYoutubeVideos = async (query) => {
  //Calls the YouTube Search API endpoint (/search)
  const response = await youtubeAPIClient.get('/search', {
    params: {
      part: 'snippet',
      q: query, //The search keyword (provided when you call this function)
      maxResults: 20,
    },
  });
  return response.data;
};
