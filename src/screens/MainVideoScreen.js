import { useEffect, useState } from "react";
import { fetchPexelsData } from "../api/pexelsAPI";
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
  MainVideoScreenChannelImage,
  MainVideoScreenCommentImage,
} from "../components/ImageComponents";
import CommentsModal from "../components/CommentsModal";
import {
  ThFlatList,
  ThPressable,
  ThScrollViewRow,
  ThText,
  ThView,
  ThSmallIconButton,
  ThSmallIconButtonText,
} from "../components/ThemedComponents";
import {
  FlatListVideoItem,
  MainVideoView,
} from "../components/VideoComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../context/ThemeContext";
import { hideMainBottomTabBar } from "../utils/utils";

export default function MainVideoScreen({ navigation, route }) {
  const { colors, fontSizes, iconSizes } = useTheme();
  const { video, query } = route.params;
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    (async function () {
      const data = await fetchPexelsData(query, 5, abortController.signal);
      if (isMounted) {
        setRelatedVideos(data);
      }
    })();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [video]);

  hideMainBottomTabBar(navigation);

  return (
    <>
      <ThView style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
        <ThFlatList
          data={relatedVideos}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <>
              <MainVideoView style={{ marginBottom: 8 }} video={video} />
              <ThView style={styles.paddedHorizontalContainer}>
                <ThText
                  style={{
                    marginBottom: 4,
                    fontSize: fontSizes.xl,
                    fontWeight: "bold",
                  }}
                >
                  {video.title}
                </ThText>

                {/*Total views, Uploaded Date, & ...more link section*/}
                <ThView style={{ marginBottom: 14, flexDirection: "row" }}>
                  <ThText
                    style={{
                      color: colors.textSecondary,
                      fontSize: fontSizes.xs,
                    }}
                  >
                    {video.views} views
                  </ThText>
                  <ThText
                    style={{
                      marginLeft: 8,
                      color: colors.textSecondary,
                      fontSize: fontSizes.xs,
                    }}
                  >
                    {video.uploadedDate}
                  </ThText>
                  <ThText
                    style={{
                      marginLeft: 8,
                      fontWeight: "medium",
                      fontSize: fontSizes.xs,
                    }}
                    onPress={() => {
                      console.log("...more press");
                    }}
                  >
                    ...more
                  </ThText>
                </ThView>

                {/*Channel image, Channel Name, Subscribers, & Subscribe Button section*/}
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
                        navigation.navigate("ChannelScreen", {
                          video: video,
                          query: query,
                        });
                      }}
                    >
                      <MainVideoScreenChannelImage
                        source={{ uri: video.picture }}
                      />
                    </ThPressable>
                    <ThText
                      style={{
                        marginLeft: 8,
                        fontSize: fontSizes.sm,
                        fontWeight: "medium",
                      }}
                    >
                      {video.channelName}
                    </ThText>
                    <ThText
                      style={{
                        marginLeft: 8,
                        color: colors.textSecondary,
                        fontSize: fontSizes.xs,
                      }}
                    >
                      {video.channelSubscribers}
                    </ThText>
                  </ThView>
                  <ThPressable
                    style={[
                      styles.baseButton,
                      { backgroundColor: colors.bgContrast },
                    ]}
                  >
                    <ThText
                      style={{
                        color: colors.textContrast,
                        fontSize: fontSizes.xs,
                        fontWeight: "medium",
                      }}
                      onPress={() => console.log("Subscribe Press")}
                    >
                      Subscribe
                    </ThText>
                  </ThPressable>
                </ThView>

                {/*Likes/Dislikes, share, & other buttons section*/}
                <ThScrollViewRow style={{ marginBottom: 16 }}>
                  <ThView
                    style={[
                      {
                        borderRadius: 9999,
                        backgroundColor: colors.bgSecondary,
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <ThPressable
                      style={({ pressed }) => [
                        styles.iconTextButton,
                        {
                          backgroundColor: pressed
                            ? colors.bgInteractive
                            : colors.bgSecondary,
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
                        {video.likes}
                      </ThText>
                    </ThPressable>
                    {/*Divider of like & dislike buttons*/}
                    <ThText
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: colors.borderPrimary,
                        fontSize: fontSizes.xs,
                      }}
                    />
                    <ThPressable
                      style={({ pressed }) => [
                        styles.iconTextButton,
                        {
                          backgroundColor: pressed
                            ? colors.bgInteractive
                            : colors.bgSecondary,
                        },
                      ]}
                      onPress={() => console.log("Disliked Press")}
                    >
                      <DislikeIcon size={iconSizes.xs} />
                    </ThPressable>
                  </ThView>

                  <ThSmallIconButton
                    style={{ marginLeft: 8 }}
                    onPress={() => console.log("Share Press")}
                  >
                    <ShareIcon size={iconSizes.xs2} />
                    <ThSmallIconButtonText>Share</ThSmallIconButtonText>
                  </ThSmallIconButton>
                  <ThSmallIconButton
                    style={{ marginLeft: 8 }}
                    onPress={() => console.log("Remix Press")}
                  >
                    <RemixIcon size={iconSizes.xs2} />
                    <ThSmallIconButtonText>Remix</ThSmallIconButtonText>
                  </ThSmallIconButton>
                  <ThSmallIconButton
                    style={{ marginLeft: 8 }}
                    onPress={() => console.log("Download Press")}
                  >
                    <DownloadIcon size={iconSizes.xs2} />
                    <ThSmallIconButtonText>Download</ThSmallIconButtonText>
                  </ThSmallIconButton>
                  <ThSmallIconButton
                    style={{ marginLeft: 8 }}
                    onPress={() => console.log("Report Press")}
                  >
                    <ReportIcon size={iconSizes.xs2} />
                    <ThSmallIconButtonText>Report</ThSmallIconButtonText>
                  </ThSmallIconButton>
                  <ThSmallIconButton
                    style={{ marginLeft: 8 }}
                    onPress={() => console.log("Save Press")}
                  >
                    <SaveIcon size={iconSizes.xs2} />
                    <ThSmallIconButtonText>Save</ThSmallIconButtonText>
                  </ThSmallIconButton>
                </ThScrollViewRow>

                {/*Comments section*/}
                <ThPressable
                  style={({ pressed }) => [
                    {
                      marginBottom: 16,
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      paddingTop: 8,
                      backgroundColor: pressed
                        ? colors.bgInteractive
                        : colors.bgSecondary,
                    },
                  ]}
                  onPress={() => setShowComments(true)}
                >
                  <ThView
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
                        color: colors.textSecondary,
                        fontSize: fontSizes.xs,
                      }}
                    >
                      {video.commentsCount}
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
                      style={{ backgroundColor: "transparent" }}
                      onPress={() => {
                        navigation.navigate("ChannelScreen", {
                          video: video,
                          query: query,
                        });
                      }}
                    >
                      <MainVideoScreenCommentImage
                        source={{ uri: video.picture }}
                      />
                    </ThPressable>
                    <ThText
                      style={{
                        marginLeft: 10,
                        flex: 1,
                        fontSize: fontSizes.xs,
                      }}
                    >
                      {video.commentsDescription}
                    </ThText>
                  </ThView>
                </ThPressable>
              </ThView>
            </>
          }
          renderItem={({ item }) => (
            <FlatListVideoItem
              navigation={navigation}
              video={item}
              query={query}
            />
          )}
        />
      </ThView>

      {showComments && <CommentsModal setShowComments={setShowComments} />}
    </>
  );
}
