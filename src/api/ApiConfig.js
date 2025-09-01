import axios from 'axios';
import Constants from 'expo-constants';
const { YOUTUBE_API_BASE_URL, YOUTUBE_API_KEY } = Constants.expoConfig.extra;

const apiClient = axios.create({
  baseURL: YOUTUBE_API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['key'] = YOUTUBE_API_KEY;
  return config;
});

export default apiClient;
