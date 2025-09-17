import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useLayoutEffect, useState } from "react";
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
  ThemedSmallIconButton,
  ThemedTabButton,
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
          backgroundColor: colors.bg,
          elevation: 0,
        },
        headerTintColor: colors.text,
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
  }, [query]);

  return (
    <ThemedView style={styles.homeContainer}>
      <HomeTopTabs setQuery={setQuery} />
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
  const splitUrl = videoUrl.split("/");
  const slug = splitUrl[splitUrl.length - 2];
  const videoTitle = slug.replace(/\d+/g, ""); //remove all digits
  //console.log(videoTitle);

  const navigation = useNavigation();
  useLayoutEffect(() => {
  navigation.getParent('HomeDrawer')?.setOptions({
    swipeEnabled: false,
    headerShown: false,
  });

  return () => {
    navigation.getParent('HomeDrawer')?.setOptions({
      swipeEnabled: true,
      headerShown: true,
    });
  };
}, [navigation]);

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
          <ThemedText
            style={{ color: colors.textGray, fontSize: fontSizes.sm }}
          >
            {video.id} views
          </ThemedText>
          <ThemedText
            style={{ fontSize: fontSizes.sm, marginHorizontal: 8 }}
            color={colors.textGray}
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
            <ThemedText
              style={{ color: colors.textGray, fontSize: fontSizes.sm }}
            >
              {video.video_pictures[0].id}k
            </ThemedText>
          </ThemedView>
          <ThemedButton>
            <ThemedText
              style={{
                color: colors.btnText,
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
          <ThemedButton
            style={{
              marginRight: 8,
              backgroundColor: colors.bgGray,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ThemedIcon
              style={{ paddingRight: 12 }}
              IconComponent={Foundation}
              name="like"
              size={iconSizes.xs}
              onPress={() => console.log("Liked Press")}
            />
            <ThemedText
              style={{
                borderRightWidth: 1,
                borderRightColor: colors.text,
                paddingRight: 6,
                fontSize: fontSizes.xs,
                fontWeight: "500",
              }}
            >
              {video.duration} {/* likes */}
            </ThemedText>
            <ThemedIcon
              style={{ paddingLeft: 12 }}
              IconComponent={Foundation}
              name="dislike"
              size={iconSizes.xs}
              onPress={() => console.log("Disliked Press")}
            />
          </ThemedButton>
          <ThemedSmallIconButton
            style={{ marginRight: 8, backgroundColor: colors.bgGray }}
            iconProps={{
              IconComponent: MaterialCommunityIcons,
              name: "share",
            }}
            onPress={() => console.log("Share Press")}
          >
            Share
          </ThemedSmallIconButton>
          <ThemedSmallIconButton
            style={{ marginRight: 8, backgroundColor: colors.bgGray }}
            iconProps={{
              IconComponent: Ionicons,
              name: "videocam-outline",
            }}
            onPress={() => console.log("Remix Press")}
          >
            Remix
          </ThemedSmallIconButton>
          <ThemedSmallIconButton
            style={{ marginRight: 8, backgroundColor: colors.bgGray }}
            iconProps={{
              IconComponent: Octicons,
              name: "download",
            }}
            onPress={() => console.log("Download Press")}
          >
            Download
          </ThemedSmallIconButton>
          <ThemedSmallIconButton
            style={{ marginRight: 8, backgroundColor: colors.bgGray }}
            iconProps={{
              IconComponent: Ionicons,
              name: "flag-outline",
            }}
            onPress={() => console.log("Exp Press")}
          >
            Experimental
          </ThemedSmallIconButton>
          <ThemedSmallIconButton
            style={{ marginRight: 8, backgroundColor: colors.bgGray }}
            iconProps={{
              IconComponent: Ionicons,
              name: "bookmark-outline",
            }}
            onPress={() => console.log("Save Press")}
          >
            Save
          </ThemedSmallIconButton>
          <ThemedSmallIconButton
            style={{ marginRight: 8, backgroundColor: colors.bgGray }}
            iconProps={{
              IconComponent: Ionicons,
              name: "flag-outline",
            }}
            textProps={{ style: { color: colors.primary } }}
            onPress={() => console.log("Exp Press")}
          >
            Experimental
          </ThemedSmallIconButton>
        </ThemedRowScrollView>

        {/*ThemedView for comments*/}
        <ThemedView
          style={{ marginBottom: 8, backgroundColor: colors.textGray }}
        >
          <ThemedView
            style={{
              backgroundColor: colors.bgGray,
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
              backgroundColor: colors.bgGray,
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

export function HomeTopTabs({ style, setQuery, children, ...rest }) {
  const { colors, fontSizes, iconSizes } = useTheme();

  const defaultKey = "All"; // id of your default button
  const [selectedKey, setSelectedKey] = useState(defaultKey);
  const navigation = useNavigation();

  const handleSelect = (key) => {
    // if the same button is pressed again
    if (selectedKey === key) {
      // revert to default if it’s not already the default
      if (key !== defaultKey) {
        setSelectedKey(defaultKey);
        setQuery(defaultKey);
      }
      // else do nothing, stays default
    } else {
      // select new one
      setSelectedKey(key);
      setQuery(key);
    }
  };

  return (
    <ThemedRowScrollView style={{ marginBottom: 12 }}>
      <ThemedPressable
        style={[styles.headerLeftIcon, { marginRight: 8 }]}
        onPress={() => navigation.getParent("HomeDrawer")?.openDrawer()}
      >
        <ThemedIcon IconComponent={Ionicons} name="compass-outline" />
      </ThemedPressable>
      <ThemedTabButton
        style={{ marginRight: 8 }}
        selected={selectedKey === "All"}
        onPress={() => handleSelect("All")}
      >
        All
      </ThemedTabButton>
      <ThemedTabButton
        style={{ marginRight: 8 }}
        selected={selectedKey === "Music"}
        onPress={() => handleSelect("Music")}
      >
        Music
      </ThemedTabButton>
      <ThemedTabButton
        style={{ marginRight: 8 }}
        selected={selectedKey === "Fantasy"}
        onPress={() => handleSelect("Fantasy")}
      >
        Fantasy
      </ThemedTabButton>
    </ThemedRowScrollView>
  );
}

