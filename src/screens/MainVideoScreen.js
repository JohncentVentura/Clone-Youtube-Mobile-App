import { useRef, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FlatListVideoItem,
  RowScrollView,
  ScreenContainer,
} from "../components/ContainerComponents";
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
  CommentsProfileSmallImage,
} from "../components/ImageComponents";
import {
  BasePressable,
  SmallIconTextButton,
  SubscribeButton,
} from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { MainVideoView } from "../components/VideoComponents";
import { useTheme } from "../context/ThemeContext";
import { useUI } from "../context/UIContext";
import { useHideBottomTabBarOnFocus } from "../hooks/useHideBottomTabBarOnFocus";
import { useSetPexelsDataVideos } from "../hooks/usePexelsData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

export default function MainVideoScreen({ navigation, route }) {
  
  const insets = useSafeAreaInsets();
  const { colors, fontSizes, iconSizes } = useTheme();
  const { setModalVideoData, setShowHomeCommentsModal } = useUI();
  const scrollToTopRef = useRef(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { query, videoData } = route.params;

  useHideBottomTabBarOnFocus();
  useScrollToTopOnFocus(scrollToTopRef);
  useSetPexelsDataVideos({
    query,
    queryResults: 5,
    setVideos: setRelatedVideos,
    setIsLoading,
    dependecies: [query],
  });

  return (
    <ScreenContainer isLoading={isLoading}>
      <FlatList
        ref={scrollToTopRef}
        data={relatedVideos}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <MainVideoView videoData={videoData} />
            <View style={[styles.screenPadHorizontal, { marginBottom: 16 }]}>
              <BaseText
                style={{
                  marginTop: 4,
                  fontSize: fontSizes.xl,
                  fontWeight: "bold",
                }}
              >
                {videoData.title}
              </BaseText>

              {/*Total views, Uploaded Date, & ...more link section*/}
              <View style={{ marginTop: 4, flexDirection: "row" }}>
                <BaseText
                  style={{
                    fontSize: fontSizes.xs,
                    color: colors.textSecondary,
                  }}
                >
                  {videoData.views} views
                </BaseText>
                <BaseText
                  style={{
                    marginLeft: 8,
                    fontSize: fontSizes.xs,
                    color: colors.textSecondary,
                  }}
                >
                  {videoData.uploadedDate}
                </BaseText>
                <BaseText
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
                  <FlatListChannelImage
                    source={{ uri: videoData.picture }}
                    onPress={() => {
                      console.log("Channel Image Pressed");
                      navigation.navigate("ChannelScreen", {
                        videoData: videoData,
                      });
                    }}
                  />
                  <BaseText
                    style={{
                      marginLeft: 8,
                      fontSize: fontSizes.sm,
                      fontWeight: "medium",
                    }}
                  >
                    {videoData.channelName}
                  </BaseText>
                  <BaseText
                    style={{
                      marginLeft: 8,
                      fontSize: fontSizes.xs,
                      color: colors.textSecondary,
                    }}
                  >
                    {videoData.channelSubscribers}
                  </BaseText>
                </View>
                <SubscribeButton/>
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
                  <BasePressable
                    style={[
                      styles.smallIconTextButton,
                      { backgroundColor: colors.bgSecondary },
                    ]}
                    onPress={() => console.log("Liked Press")}
                  >
                    <LikeIcon size={iconSizes.xs2} />
                    <BaseText
                      style={{
                        paddingLeft: 8,
                        fontSize: fontSizes.xs,
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
                      backgroundColor: colors.borderPrimary,
                    }}
                  />
                  <BasePressable
                    style={[
                      styles.smallIconTextButton,
                      { backgroundColor: colors.bgSecondary },
                    ]}
                    onPress={() => console.log("Disliked Press")}
                  >
                    <DislikeIcon size={iconSizes.xs2} />
                  </BasePressable>
                </View>

                <SmallIconTextButton
                  style={{ marginLeft: 8 }}
                  Icon={ShareIcon}
                  text="Share"
                  onPress={() => console.log("Share Press")}
                />
                <SmallIconTextButton
                  style={{ marginLeft: 8 }}
                  Icon={RemixIcon}
                  text="Remix"
                  onPress={() => console.log("Remix Press")}
                />
                <SmallIconTextButton
                  style={{ marginLeft: 8 }}
                  Icon={DownloadIcon}
                  text="Download"
                  onPress={() => console.log("Download Press")}
                />
                <SmallIconTextButton
                  style={{ marginLeft: 8 }}
                  Icon={ReportIcon}
                  text="Report"
                  onPress={() => console.log("Report Press")}
                />
                <SmallIconTextButton
                  style={{ marginLeft: 8 }}
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
                  backgroundColor: colors.bgSecondary,
                }}
                onPress={() => {
                  setModalVideoData(videoData);
                  setShowHomeCommentsModal(true);
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
                      fontSize: fontSizes.sm,
                      fontWeight: "medium",
                    }}
                  >
                    Comments
                  </BaseText>
                  <BaseText
                    style={{
                      marginLeft: 10,
                      fontSize: fontSizes.xs,
                      color: colors.textSecondary,
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
                      setModalVideoData(videoData);
                      setShowHomeCommentsModal(true);
                    }}
                  />
                  <BaseText
                    style={{
                      marginLeft: 10,
                      fontSize: fontSizes.xs,
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
        renderItem={({ item, index }) => (
          <FlatListVideoItem
            style={{
              paddingBottom:
                index === relatedVideos.length - 1 && insets.bottom,
            }}
            navigation={navigation}
            query={query}
            videoData={item}
          />
        )}
      />
    </ScreenContainer>
  );
}
