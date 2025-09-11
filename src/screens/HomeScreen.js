import { useEffect, useState } from "react";
import { ActivityIndicator, Button } from "react-native";
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
  HeaderRightIconsContainer,
  HeaderNotificationIcon,
  HeaderSearchIcon,
  HeaderScreenShareIcon,
  HeaderCaptionIcon,
  HeaderSettingIcon,
} from "../components/ThemedComponents";
import {
  ExpoAVVideo,
  RNYIYoutubePlayer,
  LargeVideo,
  LargeVideoFlatList,
} from "../components/VideoComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import { useFetch } from "../hooks/useFetch";
import { pexelsAPIfetchVideos } from "../api/pexelsAPI";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const VideoStack = createStackNavigator();
const homeScreens = {
  homeFlatListScreen: "HomeFlatListScreen",
  homeVideoScreen: "HomeVideoScreen",
};

export default function HomeScreen() {
  return (
    <VideoStack.Navigator
      screenOptions={{
        headerLeft: () => {
          return (
            <HeaderRightIconsContainer>
              <HeaderScreenShareIcon
                style={styles.headerRightIcon}
                onPress={() => console.log("Screen Share Press")}
              />
              <HeaderCaptionIcon
                style={styles.headerRightIcon}
                onPress={() => console.log("Caption Press")}
              />
              <HeaderSettingIcon
                style={styles.headerRightIcon}
                onPress={() => console.log("Setting Press")}
              />
            </HeaderRightIconsContainer>
          );
        },
      }}
    >
      <VideoStack.Screen
        name={homeScreens.homeFlatListScreen}
        component={HomeFlatListScreen}
        options={{ headerShown: false }}
      />
      <VideoStack.Screen
        name={homeScreens.homeVideoScreen}
        component={HomeVideoScreen}
        options={{ headerShown: true }}
      />
    </VideoStack.Navigator>
  );
}

export function HomeFlatListScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("life");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      const data = await pexelsAPIfetchVideos(query);
      setVideos(data);
    }
    loadVideos();
  }, []);

  return (
    <ThemedView style={styles.homeContainer}>
      <LargeVideoFlatList
        homeScreens={homeScreens}
        videos={videos}
        navigation={navigation}
      />
    </ThemedView>
  );
}

export function HomeVideoScreen({ navigation, route }) {
  const { video } = route.params;

  return (
    <ThemedView style={styles.homeContainer}>
      <LargeVideo video={video} />
      <ThemedView>
        <ThemedText>Video Title</ThemedText>
        <ThemedView style={{ flexDirection: "row" }}>
          <ThemedText>{video.id} views * 1y ago * ...more (Link)</ThemedText>
        </ThemedView>
        <ThemedView style={{ flexDirection: "row" }}>
          <HomeChannelImage source={{ uri: video.video_pictures[0].picture }} />
          <ThemedText>Channel Name {video.id} Subsribers</ThemedText>
          <Button title="Subscribe" />
        </ThemedView>
        <ThemedView style={{ flexDirection: "row" }}>
          <Button title="Like | Dislike" />
          <Button title="Share" />
          <Button title="Remix" />
          <Button title="Download" />
        </ThemedView>
        <ThemedView>
          <ThemedText>Comments 5.1k</ThemedText>
          <ThemedView style={{ flexDirection: "row" }}>
            <HomeChannelImage
              source={{ uri: video.video_pictures[0].picture }}
            />
            <ThemedText>{video.video_pictures[0].picture}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
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
