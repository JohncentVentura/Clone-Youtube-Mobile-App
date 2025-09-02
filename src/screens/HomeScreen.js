import { useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles, screenWidth } from "../styles/styles";
import { fetchTrendingVideos } from "../api/youtubeService";
import {
  HomeVideoImage,
  HomeChannelImage,
} from "../components/ImageComponents";
import {
  ThemedView,
  ThemedFlatList,
  ThemedText,
  ThemedIcon,
} from "../components/ThemedComponents";
import { AutoPlayVideo } from "../components/VideoComponents";
import { useFetch } from "../hooks/useFetch";

import YoutubePlayer from "react-native-youtube-iframe";

const videos = [
  {
    id: "1",
    source: "https://www.pexels.com/download/video/3843091/",
    thumbnail:
      "https://images.pexels.com/videos/3843091/clouds-country-hiking-mountain-3843091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "2",
    source: "https://www.pexels.com/download/video/3843091/",
    thumbnail:
      "https://images.pexels.com/videos/3843091/clouds-country-hiking-mountain-3843091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "3",
    source: "https://www.pexels.com/download/video/3843091/",
    thumbnail:
      "https://images.pexels.com/videos/3843091/clouds-country-hiking-mountain-3843091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "4",
    source: "https://www.pexels.com/download/video/3843091/",
    thumbnail:
      "https://images.pexels.com/videos/3843091/clouds-country-hiking-mountain-3843091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function HomeScreen() {
  const { data, loading, error } = useFetch(fetchTrendingVideos);

  if (loading) {
    return <ActivityIndicator size="large" />;
  } else if (!loading && !data) {
    console.log(error);
  } else if (!loading && data) {
    console.log(data);
  }

  return (
    <ThemedView>
      <YoutubePlayer videoId={data?.items[0].id} />

      <ThemedFlatList
        keyExtractor={(item) => item.id}
        style={styles.homeScreenContainer}
        data={videos}
        renderItem={({ item }) => (
          <ThemedView style={styles.homeScreenVideoContainer}>
            <AutoPlayVideo source={item.source} thumbnail={item.thumbnail} />
            <ThemedView style={styles.homeScreenVideoInfoContainer}>
              <HomeChannelImage
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjIDlX73Bezvep3MYr26IQSFBElpVGpNW0QAS6nsZdgpffU-ptjpyjccu-PUz6J2E3J_Y&usqp=CAU",
                  //uri: "https://www.youtube.com/watch?v=" + data.items[0].id
                }}
                style={{ flex: 2 }}
              />
              <ThemedView style={{ flex: 10 }}>
                <ThemedText type="title">Video Title</ThemedText>
                <ThemedText type="small">
                  Channel Name * Views Count * Uploaded Date
                </ThemedText>
              </ThemedView>
              <ThemedIcon
                IconComponent={MaterialCommunityIcons}
                name="dots-vertical"
              />
            </ThemedView>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

export function YouTubePlayer({ videoId }) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <YoutubePlayer
      width={screenWidth}
      height={250}
      play={playing}
      videoId={videoId} // Pass the YouTube video ID
      onChangeState={onStateChange}
    />
  );
}
