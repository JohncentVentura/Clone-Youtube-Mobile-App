import 'dotenv/config';

export default {
  expo: {
    name: "clone-youtube-mobile-app",
    slug: "clone-youtube-mobile-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-video"
    ],
    extra: {
      YOUTUBE_API_URL: process.env.YOUTUBE_API_URL,
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
      PEXELS_API_URL: process.env.PEXELS_API_URL,
      PEXELS_API_KEY: process.env.PEXELS_API_KEY,
    }
  }
};
