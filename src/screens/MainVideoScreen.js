import { useRef, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

import {
  DislikeIcon,
  DownloadIcon,
  LikeIcon,
  RemixIcon,
  ReportIcon,
  SaveIcon,
  ShareIcon,
} from "../components/IconComponents";
import {
  FlatListChannelImage,
  MainVideoCommentImage,
} from "../components/ImageComponents";
import { ThSmallIconTextButton, ThText } from "../components/ThemedComponents";
import {
  RowScrollView,
  FlatListVideoItem,
} from "../components/ScrollableComponents";
import { MainVideoView } from "../components/VideoComponents";
import { useModal } from "../context/ModalContext";
import { useTheme } from "../context/ThemeContext";
import { useHideBottomTabBarOnFocus } from "../hooks/useHideBottomTabBarOnFocus";
import { useSetPexelsDataVideos } from "../hooks/usePexelsData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

export default function MainVideoScreen({ navigation, route }) {
  const { query, videoData } = route.params;
  const { colors, fontSizes, iconSizes } = useTheme();
  const scrollToTopRef = useRef(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { setModalQuery, setModalVideoData, setIsVideoCommentModalVisible } =
    useModal();

  useHideBottomTabBarOnFocus();
  useScrollToTopOnFocus(scrollToTopRef);
  useSetPexelsDataVideos({
    query,
    queryResults: 5,
    setVideos: setRelatedVideos,
    dependecies: [query],
  });

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
      <FlatList
        data={relatedVideos}
        keyExtractor={(item) => item.id.toString()}
        ref={scrollToTopRef}
        ListHeaderComponent={
          <>
            <MainVideoView videoData={videoData} />
            <View style={styles.screenPadHorizontal}>
              <ThText
                style={{
                  marginTop: 4,

                  fontSize: fontSizes.xl,
                  fontWeight: "bold",
                }}
              >
                {videoData.title}
              </ThText>

              {/*Total views, Uploaded Date, & ...more link section*/}
              <View style={{ marginTop: 4, flexDirection: "row" }}>
                <ThText
                  style={{
                    fontSize: fontSizes.xs,
                    color: colors.textSecondary,
                  }}
                >
                  {videoData.views} views
                </ThText>
                <ThText
                  style={{
                    marginLeft: 8,
                    fontSize: fontSizes.xs,
                    color: colors.textSecondary,
                  }}
                >
                  {videoData.uploadedDate}
                </ThText>
                <ThText
                  style={{
                    marginLeft: 8,
                    fontSize: fontSizes.xs,
                    fontWeight: "medium",
                  }}
                  onPress={() => {
                    console.log("...more press");
                  }}
                >
                  ...more
                </ThText>
              </View>

              {/*Channel image, Channel Name, Subscribers, & Subscribe Button section*/}
              <View
                style={{
                  marginTop: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FlatListChannelImage
                    source={{ uri: videoData.picture }}
                    onPress={() => {
                      console.log("Channel Image Pressed");
                      navigation.navigate("ChannelScreen", {
                        videoData: videoData,
                      });
                    }}
                  />
                  <ThText
                    style={{
                      marginLeft: 8,
                      fontSize: fontSizes.sm,
                      fontWeight: "medium",
                    }}
                  >
                    {videoData.channelName}
                  </ThText>
                  <ThText
                    style={{
                      marginLeft: 8,
                      fontSize: fontSizes.xs,
                      color: colors.textSecondary,
                    }}
                  >
                    {videoData.channelSubscribers}
                  </ThText>
                </View>
                <Pressable
                  style={[
                    styles.baseButton,
                    { backgroundColor: colors.bgContrast },
                  ]}
                >
                  <ThText
                    style={{
                      fontSize: fontSizes.xs,
                      fontWeight: "medium",
                      color: colors.textContrast,
                    }}
                    onPress={() => console.log("Subscribe Press")}
                  >
                    Subscribe
                  </ThText>
                </Pressable>
              </View>

              {/*Likes/Dislikes, share, & other buttons section*/}
              <RowScrollView style={{ marginTop: 10 }}>
                <View
                  style={{
                    borderRadius: 99,
                    height: 30,
                    backgroundColor: colors.bgSecondary,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    style={({ pressed }) => [
                      styles.iconTextButton,
                      {
                        backgroundColor: pressed
                          ? colors.bgInteractive
                          : "transparent",
                      },
                    ]}
                    onPress={() => console.log("Liked Press")}
                  >
                    <LikeIcon size={iconSizes.xs} />
                    <ThText
                      style={{
                        paddingLeft: 8,
                        fontSize: fontSizes.xs,
                        fontWeight: "medium",
                      }}
                    >
                      {videoData.likes}
                    </ThText>
                  </Pressable>
                  {/*Divider of like & dislike buttons*/}
                  <View
                    style={{
                      width: 1,
                      height: "50%",
                      backgroundColor: colors.borderPrimary,
                    }}
                  />
                  <Pressable
                    style={({ pressed }) => [
                      styles.iconTextButton,
                      {
                        backgroundColor: pressed
                          ? colors.bgInteractive
                          : "transparent",
                      },
                    ]}
                    onPress={() => console.log("Disliked Press")}
                  >
                    <DislikeIcon size={iconSizes.xs} />
                  </Pressable>
                </View>

                <ThSmallIconTextButton
                  style={{ marginLeft: 8 }}
                  Icon={ShareIcon}
                  text="Share"
                  onPress={() => console.log("Share Press")}
                />
                <ThSmallIconTextButton
                  style={{ marginLeft: 8 }}
                  Icon={RemixIcon}
                  text="Remix"
                  onPress={() => console.log("Remix Press")}
                />
                <ThSmallIconTextButton
                  style={{ marginLeft: 8 }}
                  Icon={DownloadIcon}
                  text="Download"
                  onPress={() => console.log("Download Press")}
                />
                <ThSmallIconTextButton
                  style={{ marginLeft: 8 }}
                  Icon={ReportIcon}
                  text="Report"
                  onPress={() => console.log("Report Press")}
                />
                <ThSmallIconTextButton
                  style={{ marginLeft: 8 }}
                  Icon={SaveIcon}
                  text="Save"
                  onPress={() => console.log("Save Press")}
                />
              </RowScrollView>

              {/*Comments section*/}
              <Pressable
                style={({ pressed }) => [
                  {
                    marginVertical: 16,
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingTop: 8,
                    backgroundColor: pressed
                      ? colors.bgInteractive
                      : colors.bgSecondary,
                  },
                ]}
                onPress={() => {
                  setModalVideoData(videoData);
                  setIsVideoCommentModalVisible(true);
                }}
              >
                <View
                  style={{
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <ThText
                    style={{
                      fontSize: fontSizes.sm,
                      fontWeight: "medium",
                    }}
                  >
                    Comments
                  </ThText>
                  <ThText
                    style={{
                      marginLeft: 10,
                      fontSize: fontSizes.xs,
                      color: colors.textSecondary,
                    }}
                  >
                    {videoData.commentsCount}
                  </ThText>
                </View>
                <View
                  style={{
                    paddingVertical: 14,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MainVideoCommentImage
                    style={{ backgroundColor: "transparent" }}
                    source={{ uri: videoData.picture }}
                    onPress={() => {
                      navigation.navigate("ChannelScreen", {
                        videoData: videoData,
                      });
                    }}
                  />
                  <ThText
                    style={{
                      marginLeft: 10,
                      fontSize: fontSizes.xs,
                      flex: 1,
                    }}
                  >
                    {videoData.commentsDescription}
                  </ThText>
                </View>
              </Pressable>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <FlatListVideoItem
            navigation={navigation}
            query={query}
            videoData={item}
          />
        )}
      />
    </View>
  );
}
