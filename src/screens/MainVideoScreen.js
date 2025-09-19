import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useEffect, useLayoutEffect, useState } from "react";
import { fetchPexelsData } from "../api/pexelsAPI";
import { HomeChannelImage } from "../components/ImageComponents";
import {
  SmallIconButton,
  ThemedButton,
  ThemedFlatList,
  ThemedIcon,
  ThemedRowScrollView,
  ThemedText,
  ThemedView,
  ThemedPressable,
} from "../components/ThemedComponents";
import {
  MainVideoView,
  VideoFlatListRenderItem,
} from "../components/VideoComponents";
import { styles, screenWidth } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import { urlToTitleExtractor } from "../utils/utils";

export default function MainVideoScreen({ navigation, route }) {
  const { colors, fontSizes, iconSizes } = useTheme();
  const { video, query } = route.params;

  const [relatedVideos, setRelatedVideos] = useState([]);
  useEffect(() => {
    async function loadRelated() {
      const data = await fetchPexelsData(query, 5);
      setRelatedVideos(data);
    }
    loadRelated();
  }, [video]);

  useLayoutEffect(() => {
    navigation.getParent("MainNavigator")?.setOptions({
      tabBarStyle: { display: "none" },
    });

    navigation.getParent("HomeDrawer")?.setOptions({
      swipeEnabled: false,
      headerShown: false,
    });

    return () => {
      navigation.getParent("MainNavigator")?.setOptions({
        tabBarStyle: {
          borderTopColor: colors.bgGray,
          borderTopWidth: 1.4,
          backgroundColor: colors.bg,
          elevation: 0, //Android: removes drop shadow
          shadowOpacity: 0, //iOS: removes drop shadow
        },
      });

      navigation.getParent("HomeDrawer")?.setOptions({
        swipeEnabled: true,
        headerShown: true,
      });
    };
  }, [navigation]);

  return (
    <ThemedView style={styles.homeContainer}>
      <ThemedFlatList
        data={relatedVideos}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <ThemedView style={{ width: "100%" }}>
            <MainVideoView style={{ marginBottom: 8 }} video={video} />
            <ThemedView style={styles.horizontalPaddedContainer}>
              <ThemedText
                style={{
                  marginBottom: 8,
                  fontSize: fontSizes.xl,
                  fontWeight: "bold",
                }}
              >
                {urlToTitleExtractor(video.url)}
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
                  <ThemedText
                    style={{ marginHorizontal: 8, fontWeight: "500" }}
                  >
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
                      color: colors.bg,
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
              <ThemedRowScrollView style={{ marginBottom: 12 }}>
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
                      paddingRight: 8,
                      fontSize: fontSizes.xs,
                      fontWeight: "500",
                    }}
                  >
                    {video.duration} {/* placeholder for count of likes */}
                  </ThemedText>
                  <ThemedIcon
                    style={{ paddingLeft: 12 }}
                    IconComponent={Foundation}
                    name="dislike"
                    size={iconSizes.xs}
                    onPress={() => console.log("Disliked Press")}
                  />
                </ThemedButton>
                <SmallIconButton
                  style={{ marginRight: 8, backgroundColor: colors.bgGray }}
                  iconProps={{
                    IconComponent: MaterialCommunityIcons,
                    name: "share",
                  }}
                  onPress={() => console.log("Share Press")}
                >
                  Share
                </SmallIconButton>
                <SmallIconButton
                  style={{ marginRight: 8, backgroundColor: colors.bgGray }}
                  iconProps={{
                    IconComponent: Ionicons,
                    name: "videocam-outline",
                  }}
                  onPress={() => console.log("Remix Press")}
                >
                  Remix
                </SmallIconButton>
                <SmallIconButton
                  style={{ marginRight: 8, backgroundColor: colors.bgGray }}
                  iconProps={{
                    IconComponent: Octicons,
                    name: "download",
                  }}
                  onPress={() => console.log("Download Press")}
                >
                  Download
                </SmallIconButton>
                <SmallIconButton
                  style={{ marginRight: 8, backgroundColor: colors.bgGray }}
                  iconProps={{
                    IconComponent: Ionicons,
                    name: "flag-outline",
                  }}
                  onPress={() => console.log("Exp Press")}
                >
                  Report
                </SmallIconButton>
                <SmallIconButton
                  style={{ marginRight: 8, backgroundColor: colors.bgGray }}
                  iconProps={{
                    IconComponent: Ionicons,
                    name: "bookmark-outline",
                  }}
                  onPress={() => console.log("Save Press")}
                >
                  Save
                </SmallIconButton>
                <SmallIconButton
                  style={{ marginRight: 8, backgroundColor: colors.bgGray }}
                  iconProps={{
                    IconComponent: Ionicons,
                    name: "flag-outline",
                  }}
                  textProps={{ style: { color: colors.primary } }}
                  onPress={() => console.log("Exp Press")}
                >
                  (Testing textProps)
                </SmallIconButton>
              </ThemedRowScrollView>

              {/*ThemedView for comments*/}
              <ThemedView
                style={{
                  marginBottom: 16,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingTop: 8,
                  backgroundColor: colors.bgGray,
                }}
              >
                <ThemedView
                  style={{
                    backgroundColor: "transparent",
                    flexDirection: "row",
                  }}
                >
                  <ThemedText
                    style={{ marginRight: 10, fontSize: fontSizes.base }}
                  >
                    Comments
                  </ThemedText>
                  <ThemedText style={{ color: colors.textGray }}>
                    5.1k
                  </ThemedText>
                </ThemedView>
                <ThemedView
                  style={{
                    paddingVertical: 14,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <HomeChannelImage
                    style={{ marginRight: 10 }}
                    source={{ uri: video.video_pictures[0].picture }}
                  />
                  <ThemedText style={{ flex: 1, fontSize: fontSizes.xs }}>
                    {video.video_pictures[0].picture}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        }
        renderItem={({ item }) => (
          <VideoFlatListRenderItem
            navigation={navigation}
            video={item}
            query={query}
          />
        )}
      />
    </ThemedView>
  );
}
