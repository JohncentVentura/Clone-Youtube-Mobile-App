import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { fetchPexelsData } from "../api/pexelsAPI";
import { ChannelImage, CommentImage } from "../components/ImageComponents";
import {
  ThButton,
  ThFlatList,
  ThIcon,
  ThIconTextButton,
  ThPressable,
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

  //*
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
  //*/

  /*
  useFocusEffect(
    useCallback(() => {
      navigation.getParent("MainNavigator")?.setOptions({
        tabBarStyle: { display: "none" },
      });
      navigation.getParent("HomeDrawer")?.setOptions({
        swipeEnabled: false,
        headerShown: false,
      });

      return () => {
        navigation.navigate('HomeScreen', { restoreHeaders: true });
        // 🔹 Check that we're really back to the first route before restoring
        const parentNav = navigation.getParent("MainNavigator");
        const state = parentNav?.getState();
        const currentRoute = state?.routes[state.index]?.name;

        // replace 'HomeScreen' with your actual starting screen name
        if (currentRoute === "HomeScreen") {
          parentNav?.setOptions({
            tabBarStyle: {
              borderTopColor: colors.bgGray,
              borderTopWidth: 1,
              backgroundColor: colors.bg,
              elevation: 0, //Android: removes drop shadow
              shadowOpacity: 0, //iOS: removes drop shadow
            },
          });
          navigation.getParent("HomeDrawer")?.setOptions({
            swipeEnabled: true,
            headerShown: true,
          });
        }
      };
    }, [navigation, colors])
  );
  */

  return (
    <ThView style={[styles.screenContainer, { paddingBottom: 32 }]}>
      <ThFlatList
        data={relatedVideos}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <ThView>
            <MainVideoView style={{ marginBottom: 8 }} video={video} />
            <ThView style={styles.paddedHorizontalContainer}>
              <ThText
                style={{
                  marginBottom: 10,
                  fontSize: fontSizes.xl,
                  fontWeight: "bold",
                }}
              >
                {urlToTitleExtractor(video.url)}
              </ThText>

              {/*ThemedView for total views, uploaded date, & ...more link*/}
              <ThView style={{ marginBottom: 14, flexDirection: "row" }}>
                <ThText
                  style={{ color: colors.textGray, fontSize: fontSizes.xs }}
                >
                  {video.id} views {/*placeholder for views*/}
                </ThText>
                <ThText
                  style={{ marginLeft: 8, fontSize: fontSizes.xs }}
                  color={colors.textGray}
                >
                  1y ago
                </ThText>
                <ThText
                  style={{ marginLeft: 8, fontSize: fontSizes.xs }}
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
                  marginBottom: 10,
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
                  <ThPressable
                    onPress={() => {
                      console.log("Channel Image Pressed");
                    }}
                  >
                    <ChannelImage
                      source={{ uri: video.video_pictures[0].picture }}
                    />
                  </ThPressable>
                  <ThText
                    style={{
                      marginLeft: 8,
                      fontSize: fontSizes.sm,
                      fontWeight: "500",
                    }}
                  >
                    Channel Name
                  </ThText>
                  <ThText
                    style={{
                      marginLeft: 8,
                      color: colors.textGray,
                      fontSize: fontSizes.xs,
                    }}
                  >
                    {video.video_pictures[0].id}k{" "}
                    {/*placeholder for subscribers*/}
                  </ThText>
                </ThView>
                <ThButton style={{ backgroundColor: colors.text }}>
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
              <ThRowScrollView style={{ marginBottom: 16 }}>
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
                <ThIconTextButton
                  style={{ marginLeft: 8 }}
                  iconProps={{
                    IconComponent: MaterialCommunityIcons,
                    name: "share",
                  }}
                  onPress={() => console.log("Share Press")}
                >
                  Share
                </ThIconTextButton>
                <ThIconTextButton
                  style={{ marginLeft: 8 }}
                  iconProps={{
                    IconComponent: Ionicons,
                    name: "videocam-outline",
                  }}
                  onPress={() => console.log("Remix Press")}
                >
                  Remix
                </ThIconTextButton>
                <ThIconTextButton
                  style={{ marginLeft: 8 }}
                  iconProps={{
                    IconComponent: Octicons,
                    name: "download",
                  }}
                  onPress={() => console.log("Download Press")}
                >
                  Download
                </ThIconTextButton>
                <ThIconTextButton
                  style={{ marginLeft: 8 }}
                  iconProps={{
                    IconComponent: Ionicons,
                    name: "flag-outline",
                  }}
                  onPress={() => console.log("Exp Press")}
                >
                  Report
                </ThIconTextButton>
                <ThIconTextButton
                  style={{ marginLeft: 8 }}
                  iconProps={{
                    IconComponent: Ionicons,
                    name: "bookmark-outline",
                  }}
                  onPress={() => console.log("Save Press")}
                >
                  Save
                </ThIconTextButton>
                <ThIconTextButton
                  style={{ marginLeft: 8 }}
                  iconProps={{
                    IconComponent: Ionicons,
                    name: "flag-outline",
                  }}
                  textProps={{ style: { color: colors.primary } }}
                  onPress={() => console.log("Exp Press")}
                >
                  (Testing textProps)
                </ThIconTextButton>
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
                    alignItems: "center",
                  }}
                >
                  <ThText style={{ fontSize: fontSizes.sm, fontWeight: "500" }}>
                    Comments
                  </ThText>
                  <ThText
                    style={{
                      marginLeft: 10,
                      color: colors.textGray,
                      fontSize: fontSizes.xs,
                    }}
                  >
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
                  <ThPressable
                    style={{
                      marginTop: 4,
                      backgroundColor: "transparent",
                      height: "100%",
                    }}
                    onPress={() => {
                      console.log("Comment Image Pressed");
                    }}
                  >
                    <CommentImage
                      source={{ uri: video.video_pictures[0].picture }}
                    />
                  </ThPressable>
                  <ThText
                    style={{ marginLeft: 10, flex: 1, fontSize: fontSizes.xs }}
                  >
                    {video.video_pictures[0].picture}
                    {/*placeholder for comment */}
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
