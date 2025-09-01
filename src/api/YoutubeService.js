import apiClient from './ApiConfig';

export const fetchTrendingVideos = async () => {
  const response = await apiClient.get('/videos', {
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      regionCode: 'US',
      maxResults: 20,
    },
  });
  return response.data;
};

export const searchVideos = async (query) => {
  const response = await apiClient.get('/search', {
    params: {
      part: 'snippet',
      q: query,
      maxResults: 20,
    },
  });
  return response.data;
};
