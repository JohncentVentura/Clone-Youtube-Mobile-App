import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles, screenWidth, screenHeight } from "../styles/styles";
import { fetchTrendingYoutubeVideos } from "../api/youtubeService";
import { HomeChannelImage } from "../components/ImageComponents";
import {
  ThemedView,
  ThemedFlatList,
  ThemedText,
  ThemedTouchableOpacity,
  ThemedIcon,
} from "../components/ThemedComponents";
import {
  ExpoAVVideo,
  RNYIYoutubePlayer,
  PexelsVideoView,
} from "../components/VideoComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import { useFetch } from "../hooks/useFetch";
import { pexelsAPIfetchVideos } from "../api/pexelsAPI";
import HomeVideoScreen from "./HomeVideoScreen";

export default function HomeScreen({ navigation }) {
  return (
    <ThemedView style={styles.homeContainer}>
      <PexelsAPIFlatList navigation={navigation} />
    </ThemedView>
  );
}

export function HardCodedVideosFlatList() {
  const hardCodedVideos = [
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

  return (
    <ThemedView style={styles.homeContainer}>
      <ThemedFlatList
        data={hardCodedVideos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.homeVideoContainer}>
            <ExpoAVVideo source={item.source} thumbnail={item.thumbnail} />
            <ThemedView style={styles.homeVideoInfoContainer}>
              <HomeChannelImage
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjIDlX73Bezvep3MYr26IQSFBElpVGpNW0QAS6nsZdgpffU-ptjpyjccu-PUz6J2E3J_Y&usqp=CAU",
                  //uri: "https://www.youtube.com/watch?v=" + data.items[0].id
                }}
                style={{ flex: 2 }}
                resizeMode="stretch"
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

export function RNYIYoutubePlayerFlatList() {
  const { data, loading, error } = useFetch(fetchTrendingYoutubeVideos);

  if (loading) {
    console.log("Loading...");
  } else if (data) {
    console.log(data);
  } else if (error) {
    console.log(error);
  }

  return (
    <>
      {!data ? (
        <ActivityIndicator size="large" />
      ) : (
        <ThemedView style={styles.homeContainer}>
          <RNYIYoutubePlayer videoId={data?.items[0].id} />
          <RNYIYoutubePlayer videoId={data?.items[1].id} />
          <RNYIYoutubePlayer videoId={data?.items[2].id} />
          <RNYIYoutubePlayer videoId={data?.items[3].id} />
          <RNYIYoutubePlayer videoId={data?.items[4].id} />
        </ThemedView>
      )}
    </>
  );
}

export function PexelsAPIFlatList({ navigation }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      const data = await pexelsAPIfetchVideos("life");
      setVideos(data);
      console.log("useEffect HomeScreen pexelsAPIfetchVideos");
    }
    loadVideos();
  }, []);

  return (
    <ThemedView style={styles.homeContainer}>
      <ThemedFlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.homeVideoContainer}>
            <ThemedTouchableOpacity
              onPress={() =>
                navigation.navigate("HomeVideoScreen", { videoId: item.id })
              }
            >
              <PexelsVideoView video={item} />
            </ThemedTouchableOpacity>
            <ThemedView style={styles.homeVideoInfoContainer}>
              <HomeChannelImage
                style={{ flex: 2 }}
                source={{
                  uri: item.video_pictures[0].picture,
                }}
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
