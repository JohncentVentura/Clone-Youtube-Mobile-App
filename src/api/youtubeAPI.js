import axios from "axios";
import Constants from "expo-constants";
const { YOUTUBE_API_BASE_URL, YOUTUBE_API_KEY } = Constants.expoConfig.extra;

//Axios is a promise-based JavaScript library for making HTTP requests from a browser or Node.js
const youtubeAPIClient = axios.create({
  baseURL: YOUTUBE_API_BASE_URL, //All requests will start with this URL (no need to write it every time)
  timeout: 10000, //If the API takes more than 10 seconds, the request fails
});

//An interceptor is like a middleman that runs before every request
youtubeAPIClient.interceptors.request.use((config) => {
  config.params = config.params || {}; //Makes sure config.params exists
  config.params["key"] = YOUTUBE_API_KEY; //Adds your API key to the request query parameters automatically
  return config;
});

export default youtubeAPIClient;
