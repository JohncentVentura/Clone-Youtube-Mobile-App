import { useRef, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  IconTextButton,
  SubscribeButton,
} from "../components/ButtonComponents";
import {
  RowScrollView,
  ScreenContainer,
} from "../components/ContainerComponents";
import { MainVideoFlatList } from "../components/FlatListComponents";
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
  MainVideoChannelImage,
  CommentsProfileSmallImage,
} from "../components/ImageComponents";
import { BasePressable } from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { MainVideoView } from "../components/VideoComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { useHideBottomTabBarOnFocus } from "../hooks/useHideBottomTabBarOnFocus";
import { useSetVideoData } from "../hooks/useSetVideoData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import { shortenText } from "../utils/utils";

export default function MainVideoScreen({ navigation, route }) {
  const inset = useSafeAreaInsets();
  const { query, videoData } = route.params;
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const { ctxSetModalVideoData, ctxSetHomeCommentsModal } = useUIContext();
  const scrollToTopRef = useRef(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useHideBottomTabBarOnFocus();
  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query,
    queryResults: 5,
    setVideos: setRelatedVideos,
    setIsLoading,
    dependencies: [query],
  });

  return (
    <ScreenContainer isLoading={isLoading}>
      <MainVideoFlatList
        contentContainerStyle={{ paddingBottom: inset.bottom }}
        isAutoPlayingVideo={false}
        data={relatedVideos}
        navigation={navigation}
        query={query}
        ref={scrollToTopRef}
        ListHeaderComponent={
          <>
            <MainVideoView
              videoData={videoData}
              autoPlayVideoId={videoData.id}
              nativeControls={true}
            />
            <View style={[styles.screenPadHorizontal, { marginBottom: 16 }]}>
              <BaseText
                style={{
                  marginTop: 4,
                  fontSize: ctxFontSizes.xl,
                  fontWeight: "bold",
                }}
              >
                {videoData.title}
              </BaseText>

              {/*Total views, Uploaded Date, & ...more link section*/}
              <View style={{ marginTop: 4, flexDirection: "row" }}>
                <BaseText
                  style={{
                    fontSize: ctxFontSizes.xs,
                    color: ctxColors.textSecondary,
                  }}
                >
                  {videoData.views} views
                </BaseText>
                <BaseText
                  style={{
                    marginLeft: 8,
                    fontSize: ctxFontSizes.xs,
                    color: ctxColors.textSecondary,
                  }}
                >
                  {videoData.uploadedDate}
                </BaseText>
                <BaseText
                  style={{
                    marginLeft: 8,
                    fontSize: ctxFontSizes.xs,
                    fontWeight: "medium",
                  }}
                  onPress={() => {
                    console.log("...more press");
                  }}
                >
                  ...more
                </BaseText>
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
                  <MainVideoChannelImage
                    source={{ uri: videoData.picture }}
                    onPress={() => {
                      console.log("Channel Image Pressed");
                      navigation.navigate(navPaths.channelScreen, {
                        videoData: videoData,
                      });
                    }}
                  />
                  <BaseText
                    style={{
                      marginLeft: 8,
                      fontSize: ctxFontSizes.sm,
                      fontWeight: "medium",
                    }}
                  >
                    {shortenText(videoData.channelName, 20)}
                  </BaseText>
                  <BaseText
                    style={{
                      marginLeft: 8,
                      fontSize: ctxFontSizes.xs,
                      color: ctxColors.textSecondary,
                    }}
                  >
                    {videoData.channelSubscribers}
                  </BaseText>
                </View>
                <SubscribeButton style={styles.baseButton} />
              </View>

              {/*Likes/Dislikes, share, & other buttons section*/}
              <RowScrollView style={{ marginTop: 10 }}>
                <View
                  style={{
                    borderRadius: 99,
                    height: 30,
                    backgroundColor: ctxColors.bgSecondary,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <BasePressable
                    style={[
                      styles.smallButton,
                      { backgroundColor: ctxColors.bgSecondary },
                    ]}
                    onPress={() => console.log("Liked Press")}
                  >
                    <LikeIcon size={ctxIconSizes.xs2} />
                    <BaseText
                      style={{
                        paddingLeft: 8,
                        fontSize: ctxFontSizes.xs,
                        fontWeight: "medium",
                      }}
                    >
                      {videoData.likes}
                    </BaseText>
                  </BasePressable>
                  {/*Divider of like & dislike buttons*/}
                  <View
                    style={{
                      width: 1,
                      height: "50%",
                      backgroundColor: ctxColors.borderPrimary,
                    }}
                  />
                  <BasePressable
                    style={[
                      styles.smallButton,
                      { backgroundColor: ctxColors.bgSecondary },
                    ]}
                    onPress={() => console.log("Disliked Press")}
                  >
                    <DislikeIcon size={ctxIconSizes.xs2} />
                  </BasePressable>
                </View>

                <IconTextButton
                  style={[{ marginLeft: 8 }, styles.smallButton]}
                  Icon={ShareIcon}
                  text="Share"
                  onPress={() => console.log("Share Press")}
                />
                <IconTextButton
                  style={[{ marginLeft: 8 }, styles.smallButton]}
                  Icon={RemixIcon}
                  text="Remix"
                  onPress={() => console.log("Remix Press")}
                />
                <IconTextButton
                  style={[{ marginLeft: 8 }, styles.smallButton]}
                  Icon={DownloadIcon}
                  text="Download"
                  onPress={() => console.log("Download Press")}
                />
                <IconTextButton
                  style={[{ marginLeft: 8 }, styles.smallButton]}
                  Icon={ReportIcon}
                  text="Report"
                  onPress={() => console.log("Report Press")}
                />
                <IconTextButton
                  style={[{ marginLeft: 8 }, styles.smallButton]}
                  Icon={SaveIcon}
                  text="Save"
                  onPress={() => console.log("Save Press")}
                />
              </RowScrollView>

              {/*Comments section*/}
              <BasePressable
                style={{
                  marginTop: 16,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingTop: 8,
                  backgroundColor: ctxColors.bgSecondary,
                }}
                onPress={() => {
                  ctxSetModalVideoData(videoData);
                  ctxSetHomeCommentsModal(true);
                }}
              >
                <View
                  style={{
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <BaseText
                    style={{
                      fontSize: ctxFontSizes.sm,
                      fontWeight: "medium",
                    }}
                  >
                    Comments
                  </BaseText>
                  <BaseText
                    style={{
                      marginLeft: 10,
                      fontSize: ctxFontSizes.xs,
                      color: ctxColors.textSecondary,
                    }}
                  >
                    {videoData.commentsCount}
                  </BaseText>
                </View>
                <View
                  style={{
                    paddingVertical: 14,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <CommentsProfileSmallImage
                    source={{ uri: videoData.picture }}
                    onPress={() => {
                      ctxSetModalVideoData(videoData);
                      ctxSetHomeCommentsModal(true);
                    }}
                  />
                  <BaseText
                    style={{
                      marginLeft: 10,
                      fontSize: ctxFontSizes.xs,
                      flex: 1,
                    }}
                  >
                    {videoData.commentsDescription}
                  </BaseText>
                </View>
              </BasePressable>
            </View>
          </>
        }
      />
    </ScreenContainer>
  );
}
