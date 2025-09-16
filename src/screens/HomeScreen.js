import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { pexelsAPIfetchVideos } from "../api/pexelsAPI";
import { HomeChannelImage } from "../components/ImageComponents";
import {
  HeaderRightIconsContainer,
  HeaderCaptionIcon,
  HeaderSettingIcon,
  HeaderScreenShareIcon,
  ThemedButton,
  ThemedIcon,
  ThemedPressable,
  ThemedRowScrollView,
  ThemedText,
  ThemedView,
} from "../components/ThemedComponents";
import {
  RNYIYoutubePlayer,
  LargeVideoView,
  LargeVideoFlatList,
} from "../components/VideoComponents";
import { styles, screenWidth } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

//Deprecated: Imports and export for using youtube API
import { fetchTrendingYoutubeVideos } from "../api/youtubeService";
import { useFetch } from "../api/useFetch";
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

const VideoStack = createStackNavigator();
const homeScreens = {
  homeFlatListScreen: "HomeFlatListScreen",
  homeVideoScreen: "HomeVideoScreen",
};

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <VideoStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
        },
        headerTintColor: colors.foreground,
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

export function HomeVideoScreen({ route }) {
  const { colors, fontSizes, iconSizes } = useTheme();
  const { video } = route.params;

  const videoUrl = video.url;
  //console.log("videoUrl: " + videoUrl);
  const splitUrl = videoUrl.split("/");
  //console.log("splitUrl: " + splitUrl);
  const slug = splitUrl[splitUrl.length - 2];
  //console.log("slug: " + slug);
  const videoTitle = slug.replace(/\d+/g, ""); //remove all digits
  //console.log(videoTitle);

  return (
    <ThemedView style={styles.homeContainer}>
      <ThemedView style={{ width: screenWidth, paddingHorizontal: 12 }}>
        <LargeVideoView style={{ marginBottom: 8 }} video={video} />
        <ThemedText
          style={{
            marginBottom: 8,
            fontSize: fontSizes.xl,
            fontWeight: "bold",
          }}
        >
          Titled {videoTitle}
        </ThemedText>

        {/*ThemedView for total views, uploaded date, & ...more link*/}
        <ThemedView style={{ marginBottom: 8, flexDirection: "row" }}>
          <ThemedText style={{ color: colors.gray, fontSize: fontSizes.sm }}>
            {video.id} views
          </ThemedText>
          <ThemedText
            style={{ fontSize: fontSizes.sm, marginHorizontal: 8 }}
            color={colors.gray}
          >
            1y ago
          </ThemedText>
          <ThemedText
            style={{ fontSize: fontSizes.sm }}
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
            width: "100%",
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
            <ThemedText style={{ color: colors.gray, fontSize: fontSizes.sm }}>
              {video.video_pictures[0].id}k
            </ThemedText>
          </ThemedView>
          <ThemedButton>
            <ThemedText
              style={{
                color: colors.background,
                fontSize: fontSizes.xs,
                fontWeight: "500",
              }}
              onPress={() => console.log("Subscribe Press")}
            >
              Subscribe
            </ThemedText>
          </ThemedButton>
        </ThemedView>

        {/*ThemedScrollView for likes, shares, & other buttons */}
        <ThemedRowScrollView style={{ marginBottom: 8 }}>
          <ThemeGrayButton style={{ marginRight: 8 }}>
            <ThemedIcon
              style={{ paddingRight: 10 }}
              IconComponent={Foundation}
              name="like"
              size={iconSizes.xs}
              onPress={() => console.log("Liked Press")}
            />
            <ThemedText
              style={{
                paddingRight: 10,
                color: colors.foreground,
                fontSize: fontSizes.xs,
                fontWeight: "500",
              }}
            >
              {video.duration}
            </ThemedText>
            <ThemedText
              style={{
                paddingRight: 10,
                colors: colors.foreground,
                fontSize: fontSizes.xs,
                fontWeight: "500",
              }}
            >
              |
            </ThemedText>
            <ThemedIcon
              IconComponent={Foundation}
              name="dislike"
              size={iconSizes.xs}
              onPress={() => console.log("Disliked Press")}
            />
          </ThemeGrayButton>
          <ThemeGrayButton
            style={{ marginRight: 8 }}
            onPress={() => console.log("Share Press")}
          >
            <ThemedIcon
              IconComponent={MaterialCommunityIcons}
              name="share"
              size={iconSizes.xs}
            />
            <ThemedText
              style={{
                paddingLeft: 2,
                color: colors.foreground,
                fontSize: fontSizes.xs,
                fontWeight: "500",
              }}
            >
              Share
            </ThemedText>
          </ThemeGrayButton>
          <ThemeGrayButton
            style={{ marginRight: 8 }}
            onPress={() => console.log("Remix Press")}
          >
            <ThemedIcon
              IconComponent={Ionicons}
              name="videocam-outline"
              size={iconSizes.xs}
            />
            <ThemedText
              style={{
                paddingLeft: 4,
                color: colors.foreground,
                fontSize: fontSizes.xs,
                fontWeight: "500",
              }}
            >
              Remix
            </ThemedText>
          </ThemeGrayButton>
          <ThemeGrayButton
            style={{ marginRight: 8 }}
            onPress={() => console.log("Download Press")}
          >
            <ThemedIcon
              IconComponent={Octicons}
              name="download"
              size={iconSizes.xs}
            />
            <ThemedText
              style={{
                paddingLeft: 4,
                color: colors.foreground,
                fontSize: fontSizes.xs,
                fontWeight: "500",
              }}
            >
              Download
            </ThemedText>
          </ThemeGrayButton>
          <ThemeGrayButton
            style={{ marginRight: 8 }}
            onPress={() => console.log("Save Press")}
          >
            <ThemedIcon
              IconComponent={Ionicons}
              name="bookmark-outline"
              size={iconSizes.xs}
            />
            <ThemedText
              style={{
                paddingLeft: 4,
                color: colors.foreground,
                fontSize: fontSizes.xs,
                fontWeight: "500",
              }}
            >
              Save
            </ThemedText>
          </ThemeGrayButton>
          <ThemeGrayButton
            style={{ marginRight: 8 }}
            onPress={() => console.log("Report Press")}
          >
            <ThemedIcon
              IconComponent={Ionicons}
              name="flag-outline"
              size={iconSizes.xs}
            />
            <ThemedText
              style={{
                paddingLeft: 4,
                color: colors.foreground,
                fontSize: fontSizes.xs,
                fontWeight: "500",
              }}
            >
              Report
            </ThemedText>
          </ThemeGrayButton>
        </ThemedRowScrollView>

        {/*ThemedView for comments*/}
        <ThemedView style={{ marginBottom: 8, backgroundColor: colors.gray }}>
          <ThemedView
            style={{
              backgroundColor: colors.gray,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ThemedText style={{ paddingRight: 6, fontWeight: "500" }}>
              Comments
            </ThemedText>
            <ThemedText size={fontSizes.sm}>5.1k</ThemedText>
          </ThemedView>
          <ThemedView
            style={{
              paddingHorizontal: 8,
              backgroundColor: colors.gray,
              flexDirection: "row",
            }}
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

export function ThemeGrayButton({ style, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <ThemedButton
      style={[
        {
          backgroundColor: colors.gray,
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </ThemedButton>
  );
}
