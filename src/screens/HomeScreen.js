import { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet } from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { styles, screenWidth, screenHeight } from "../styles/styles";
import { fetchTrendingYoutubeVideos } from "../api/youtubeService";
import { HomeChannelImage } from "../components/ImageComponents";
import {
  ThemedView,
  ThemedFlatList,
  ThemedText,
  ThemedTouchableOpacity,
  ThemedIcon,
  ThemedPressable,
  HeaderRightIconsContainer,
  HeaderNotificationIcon,
  HeaderSearchIcon,
  HeaderScreenShareIcon,
  ThemedScrollView,
  HeaderCaptionIcon,
  HeaderSettingIcon,
} from "../components/ThemedComponents";
import {
  ExpoAVVideo,
  RNYIYoutubePlayer,
  LargeVideoView,
  LargeVideoFlatList,
} from "../components/VideoComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import { useFetch } from "../hooks/useFetch";
import { pexelsAPIfetchVideos } from "../api/pexelsAPI";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { colors, textSizes } from "../styles/styles";

const VideoStack = createStackNavigator();
const homeScreens = {
  homeFlatListScreen: "HomeFlatListScreen",
  homeVideoScreen: "HomeVideoScreen",
};

export default function HomeScreen() {
  const bg = useThemeColor(colors.background);
  const fg = useThemeColor(colors.foreground);

  return (
    <VideoStack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: {
          backgroundColor: bg,
          elevation: 0,
        },
        headerTintColor: fg,
        headerLeft: () => {
          return (
            <ThemedIcon
              style={styles.headerLeftIcon}
              IconComponent={Ionicons}
              name="arrow-back"
              onPress={() => navigation.goBack()}
            />
          );
        },
        headerTitle: () => {
          return null;
        },
        headerRight: () => {
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
      })}
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
        videos={videos}
        navigation={navigation}
        homeScreens={homeScreens}
      />
    </ThemedView>
  );
}

export function HomeVideoScreen({ navigation, route }) {
  const { video } = route.params;

  const videoUrl = video.url;
  const splitUrl = videoUrl.split("/");
  const slug = splitUrl[splitUrl.length - 2];
  const videoTitle = slug.replace(/\d+/g, ""); //remove all digits
  //console.log(videoTitle);

  return (
    <ThemedView style={styles.homeContainer}>
      <ThemedView style={{ width: screenWidth, paddingHorizontal: 12 }}>
        <LargeVideoView style={{ marginBottom: 8 }} video={video} />
        <ThemedText
          style={{ marginBottom: 8, fontWeight: "bold" }}
          size={textSizes.xl}
        >
          Titled {videoTitle}
        </ThemedText>

        {/*ThemedView for total views, uploaded date, & ...more link*/}
        <ThemedView style={{ marginBottom: 8, flexDirection: "row" }}>
          <ThemedText color={colors.gray} size={textSizes.sm}>
            {video.id} views
          </ThemedText>
          <ThemedText
            style={{ marginHorizontal: 8 }}
            color={colors.gray}
            size={textSizes.sm}
          >
            1y ago
          </ThemedText>
          <ThemedText
            size={textSizes.sm}
            onPress={() => {
              console.log("...more press");
            }}
          >
            ...more
          </ThemedText>
        </ThemedView>

        {/*ThemedView for Channel image, channel name, subscribers, & subscribe button*/}
        <ThemedView
          style={{
            marginBottom: 8,
            width: screenWidth,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <HomeChannelImage
              source={{ uri: video.video_pictures[0].picture }}
            />
            <ThemedText style={{ marginHorizontal: 8, fontWeight: "500" }}>
              Channel Name
            </ThemedText>
            <ThemedText color={colors.gray} size={textSizes.sm}>
              {video.video_pictures[0].id}k
            </ThemedText>
          </ThemedView>
          <ThemedPressable>
            <ThemedText
              style={{ fontWeight: "500" }}
              color={colors.background}
              size={textSizes.xs}
              onPress={() => console.log("Subscribe Press")}
            >
              Subscribe
            </ThemedText>
          </ThemedPressable>
        </ThemedView>

        {/*ThemedScrollView for likes, shares, & other buttons */}
        <ThemedScrollView
          horizontal={true}
          style={{
            marginBottom: 8,
            width: screenWidth,
          }}
        >
          <ThemedPressable
            style={{
              marginRight: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
            backgroundColor={colors.gray}
          >
            <ThemedIcon
              style={{ paddingRight: 10 }}
              IconComponent={Foundation}
              name="like"
              size={14}
              onPress={() => console.log("Liked Press")}
            />
            <ThemedText
              style={{ paddingRight: 10, fontWeight: "500" }}
              color={colors.foreground}
              size={textSizes.xs}
            >
              {video.duration}
            </ThemedText>
            <ThemedText
              style={{ paddingRight: 10, fontWeight: "500" }}
              color={colors.foreground}
              size={textSizes.xs}
            ></ThemedText>
            <ThemedIcon
              IconComponent={Foundation}
              name="dislike"
              size={14}
              onPress={() => console.log("Disliked Press")}
            />
          </ThemedPressable>
          <ThemedPressable
            style={{
              marginRight: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
            backgroundColor={colors.gray}
            onPress={() => console.log("Share Press")}
          >
            <ThemedIcon
              IconComponent={MaterialCommunityIcons}
              name="share"
              size={16}
            />
            <ThemedText
              style={{ paddingLeft: 2, fontWeight: "500" }}
              color={colors.foreground}
              size={textSizes.xs}
            >
              Share
            </ThemedText>
          </ThemedPressable>
          <ThemedPressable
            style={{
              marginRight: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
            backgroundColor={colors.gray}
            onPress={() => console.log("Remix Press")}
          >
            <ThemedIcon
              IconComponent={Ionicons}
              name="videocam-outline"
              size={16}
            />
            <ThemedText
              style={{ paddingLeft: 4, fontWeight: "500" }}
              color={colors.foreground}
              size={textSizes.xs}
            >
              Remix
            </ThemedText>
          </ThemedPressable>
          <ThemedPressable
            style={{
              marginRight: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
            backgroundColor={colors.gray}
            onPress={() => console.log("Download Press")}
          >
            <ThemedIcon IconComponent={Octicons} name="download" size={16} />
            <ThemedText
              style={{ paddingLeft: 4, fontWeight: "500" }}
              color={colors.foreground}
              size={textSizes.xs}
            >
              Download
            </ThemedText>
          </ThemedPressable>
          <ThemedPressable
            style={{
              marginRight: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
            backgroundColor={colors.gray}
            onPress={() => console.log("Save Press")}
          >
            <ThemedIcon
              IconComponent={Ionicons}
              name="bookmark-outline"
              size={16}
            />
            <ThemedText
              style={{ paddingLeft: 4, fontWeight: "500" }}
              color={colors.foreground}
              size={textSizes.xs}
            >
              Save
            </ThemedText>
          </ThemedPressable>
          <ThemedPressable
            style={{
              marginRight: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
            backgroundColor={colors.gray}
            onPress={() => console.log("Report Press")}
          >
            <ThemedIcon
              IconComponent={Ionicons}
              name="flag-outline"
              size={16}
            />
            <ThemedText
              style={{ paddingLeft: 4, fontWeight: "500" }}
              color={colors.foreground}
              size={textSizes.xs}
            >
              Report
            </ThemedText>
          </ThemedPressable>
        </ThemedScrollView>

        {/*ThemedView for comments*/}
        <ThemedView style={{ marginBottom: 8 }} backgroundColor={colors.gray}>
          <ThemedView
            style={{ flexDirection: "row", alignItems: "center" }}
            backgroundColor={colors.gray}
          >
            <ThemedText style={{ paddingRight: 6, fontWeight: "500" }}>
              Comments
            </ThemedText>
            <ThemedText size={textSizes.sm}>5.1k</ThemedText>
          </ThemedView>
          <ThemedView
            style={{ paddingHorizontal: 8, flexDirection: "row" }}
            backgroundColor={colors.gray}
          >
            <HomeChannelImage
              style={{ marginRight: 8 }}
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
