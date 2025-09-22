import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useEffect, useLayoutEffect, useState } from "react";
import { fetchPexelsData } from "../api/pexelsAPI";
import { ChannelImage, CommentImage } from "../components/ImageComponents";
import {
  ThSmallIconButton,
  ThButton,
  ThFlatList,
  ThIcon,
  ThRowScrollView,
  ThText,
  ThView,
} from "../components/ThemedComponents";
import {
  MainVideoView,
  VideoFlatListItem,
} from "../components/VideoComponents";
import { styles } from "../styles/styles";
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
    <ThView style={styles.screenContainer}>
      <ThFlatList
        data={relatedVideos}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <ThView style={{ width: "100%" }}>
            <MainVideoView style={{ marginBottom: 8 }} video={video} />
            <ThView style={styles.paddingHorizontalContainer}>
              <ThText
                style={{
                  marginBottom: 8,
                  fontSize: fontSizes.xl,
                  fontWeight: "bold",
                }}
              >
                {urlToTitleExtractor(video.url)}
              </ThText>

              {/*ThemedView for total views, uploaded date, & ...more link*/}
              <ThView style={{ marginBottom: 10, flexDirection: "row" }}>
                <ThText
                  style={{ color: colors.textGray, fontSize: fontSizes.sm }}
                >
                  {video.id} views
                </ThText>
                <ThText
                  style={{ marginLeft: 8, fontSize: fontSizes.sm }}
                  color={colors.textGray}
                >
                  1y ago
                </ThText>
                <ThText
                  style={{ marginLeft: 8, fontSize: fontSizes.sm }}
                  onPress={() => {
                    console.log("...more press");
                  }}
                >
                  ...more
                </ThText>
              </ThView>

              {/*ThemedView for Channel image, channel name, subscribers, & subscribe button*/}
              <ThView
                style={{
                  marginBottom: 12,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <ThView
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <ChannelImage
                    source={{ uri: video.video_pictures[0].picture }}
                  />
                  <ThText style={{ marginLeft: 8, fontWeight: "500" }}>
                    Channel Name
                  </ThText>
                  <ThText
                    style={{
                      marginLeft: 8,
                      color: colors.textGray,
                      fontSize: fontSizes.sm,
                    }}
                  >
                    {video.video_pictures[0].id}k
                  </ThText>
                </ThView>
                <ThButton>
                  <ThText
                    style={{
                      color: colors.bg,
                      fontSize: fontSizes.xs,
                      fontWeight: "500",
                    }}
                    onPress={() => console.log("Subscribe Press")}
                  >
                    Subscribe
                  </ThText>
                </ThButton>
              </ThView>

              {/*ThemedScrollView for likes, shares, & other buttons */}
              <ThRowScrollView style={{ marginBottom: 12 }}>
                <ThButton
                  style={{
                    backgroundColor: colors.bgGray,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <ThIcon
                    style={{ paddingRight: 12 }}
                    IconComponent={Foundation}
                    name="like"
                    size={iconSizes.xs}
                    onPress={() => console.log("Liked Press")}
                  />
                  <ThText
                    style={{
                      borderRightWidth: 1,
                      borderRightColor: colors.text,
                      paddingRight: 8,
                      fontSize: fontSizes.xs,
                      fontWeight: "500",
                    }}
                  >
                    {video.duration} {/* placeholder for count of likes */}
                  </ThText>
                  <ThIcon
                    style={{ paddingLeft: 12 }}
                    IconComponent={Foundation}
                    name="dislike"
                    size={iconSizes.xs}
                    onPress={() => console.log("Disliked Press")}
                  />
                </ThButton>
                <ThSmallIconButton
                  style={{ marginLeft: 8, backgroundColor: colors.bgGray }}
                  iconProps={{
                    IconComponent: MaterialCommunityIcons,
                    name: "share",
                  }}
                  onPress={() => console.log("Share Press")}
                >
                  Share
                </ThSmallIconButton>
                <ThSmallIconButton
                  style={{ marginLeft: 8, backgroundColor: colors.bgGray }}
                  iconProps={{
                    IconComponent: Ionicons,
                    name: "videocam-outline",
                  }}
                  onPress={() => console.log("Remix Press")}
                >
                  Remix
                </ThSmallIconButton>
                <ThSmallIconButton
                  style={{ marginLeft: 8, backgroundColor: colors.bgGray }}
                  iconProps={{
                    IconComponent: Octicons,
                    name: "download",
                  }}
                  onPress={() => console.log("Download Press")}
                >
                  Download
                </ThSmallIconButton>
                <ThSmallIconButton
                  style={{ marginLeft: 8, backgroundColor: colors.bgGray }}
                  iconProps={{
                    IconComponent: Ionicons,
                    name: "flag-outline",
                  }}
                  onPress={() => console.log("Exp Press")}
                >
                  Report
                </ThSmallIconButton>
                <ThSmallIconButton
                  style={{ marginLeft: 8, backgroundColor: colors.bgGray }}
                  iconProps={{
                    IconComponent: Ionicons,
                    name: "bookmark-outline",
                  }}
                  onPress={() => console.log("Save Press")}
                >
                  Save
                </ThSmallIconButton>
                <ThSmallIconButton
                  style={{ marginLeft: 8, backgroundColor: colors.bgGray }}
                  iconProps={{
                    IconComponent: Ionicons,
                    name: "flag-outline",
                  }}
                  textProps={{ style: { color: colors.primary } }}
                  onPress={() => console.log("Exp Press")}
                >
                  (Testing textProps)
                </ThSmallIconButton>
              </ThRowScrollView>

              {/*ThemedView for comments*/}
              <ThView
                style={{
                  marginBottom: 16,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingTop: 8,
                  backgroundColor: colors.bgGray,
                }}
              >
                <ThView
                  style={{
                    backgroundColor: "transparent",
                    flexDirection: "row",
                  }}
                >
                  <ThText style={{ fontSize: fontSizes.base }}>Comments</ThText>
                  <ThText style={{ marginLeft: 10, color: colors.textGray }}>
                    5.1k
                  </ThText>
                </ThView>
                <ThView
                  style={{
                    paddingVertical: 14,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <CommentImage
                    source={{ uri: video.video_pictures[0].picture }}
                  />
                  <ThText
                    style={{ marginLeft: 10, flex: 1, fontSize: fontSizes.xs }}
                  >
                    {video.video_pictures[0].picture}
                  </ThText>
                </ThView>
              </ThView>
            </ThView>
          </ThView>
        }
        renderItem={({ item }) => (
          <VideoFlatListItem
            navigation={navigation}
            video={item}
            query={query}
          />
        )}
      />
    </ThView>
  );
}
