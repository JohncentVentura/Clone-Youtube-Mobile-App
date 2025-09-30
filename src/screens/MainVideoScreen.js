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
import {
  ThFlatList,
  ThPressable,
  ThScrollViewRow,
  ThText,
  ThView,
  ThIconButtonText,
} from "../components/ThemedComponents";
import {
  FlatListVideoItem,
  MainVideoView,
} from "../components/VideoComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import {
  hideMainBottomTabBar,
  getPexelsUrlToTitle,
  getShortenText,
  randomTimeAgo,
  roundOffNumber,
} from "../utils/utils";

export default function MainVideoScreen({ navigation, route }) {
  const { colors, fontSizes, iconSizes } = useTheme();
  const { video, query } = route.params;
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    (async function () {
      const data = await fetchPexelsData(query, 5);
      setRelatedVideos(data);
    })();
  }, [video]);

  hideMainBottomTabBar(navigation);

  return (
    <ThView style={[styles.screenContainer]}>
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
                {/*Title*/}
                {getPexelsUrlToTitle(video.url)}
              </ThText>

              {/*Total views, Uploaded Date, & ...more link section*/}
              <ThView style={{ marginBottom: 14, flexDirection: "row" }}>
                <ThText
                  style={{ color: colors.textGray, fontSize: fontSizes.xs }}
                >
                  {/*Total Views*/}
                  {roundOffNumber(video.id)} views
                </ThText>
                <ThText
                  style={{
                    marginLeft: 8,
                    color: colors.textGray,
                    fontSize: fontSizes.xs,
                  }}
                  color={colors.textGray}
                >
                  {/*Uploaded Date*/}
                  {randomTimeAgo(video.video_pictures[0].id)}
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
                      navigation.push("ChannelScreen", {
                        video: video,
                        query: query,
                      });
                    }}
                  >
                    <MainVideoScreenChannelImage
                      source={{ uri: video.video_pictures[0].picture }}
                    />
                  </ThPressable>
                  <ThText
                    style={{
                      marginLeft: 8,
                      fontSize: fontSizes.sm,
                      fontWeight: "medium",
                    }}
                  >
                    {/*Channel name*/}
                    {getShortenText(video.user.name, 15)}
                  </ThText>
                  <ThText
                    style={{
                      marginLeft: 8,
                      color: colors.textGray,
                      fontSize: fontSizes.xs,
                    }}
                  >
                    {/*Number of subscribers*/}
                    {roundOffNumber(video.user.id)} subscribers
                  </ThText>
                </ThView>
                <ThPressable
                  style={[styles.baseButton, { backgroundColor: colors.text }]}
                >
                  <ThText
                    style={{
                      color: colors.bg,
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
                <ThPressable
                  style={[
                    styles.baseButton,
                    {
                      backgroundColor: colors.bgGray,
                      flexDirection: "row",
                      alignItems: "center",
                    },
                  ]}
                >
                  <LikeIcon
                    style={{ paddingRight: 12 }}
                    size={iconSizes.xs}
                    onPress={() => console.log("Liked Press")}
                  />
                  <ThText
                    style={{
                      borderRightWidth: 1,
                      borderRightColor: colors.border,
                      paddingRight: 8,
                      fontSize: fontSizes.xs,
                      fontWeight: "medium",
                    }}
                  >
                    {/*Placeholder for count of likes */}
                    {video.duration}
                  </ThText>
                  <DislikeIcon
                    style={{ paddingLeft: 12 }}
                    size={iconSizes.xs}
                    onPress={() => console.log("Disliked Press")}
                  />
                </ThPressable>

                <ThPressable
                  style={[
                    styles.iconTextButton,
                    { marginLeft: 8, backgroundColor: colors.bgGray },
                  ]}
                  onPress={() => console.log("Share Press")}
                >
                  <ShareIcon size={iconSizes.xs} />
                  <ThIconButtonText>Share</ThIconButtonText>
                </ThPressable>
                <ThPressable
                  style={[
                    styles.iconTextButton,
                    { marginLeft: 8, backgroundColor: colors.bgGray },
                  ]}
                  onPress={() => console.log("Remix Press")}
                >
                  <RemixIcon size={iconSizes.xs} />
                  <ThIconButtonText>Remix</ThIconButtonText>
                </ThPressable>
                <ThPressable
                  style={[
                    styles.iconTextButton,
                    { marginLeft: 8, backgroundColor: colors.bgGray },
                  ]}
                  onPress={() => console.log("Download Press")}
                >
                  <DownloadIcon size={iconSizes.xs} />
                  <ThIconButtonText>Download</ThIconButtonText>
                </ThPressable>
                <ThPressable
                  style={[
                    styles.iconTextButton,
                    { marginLeft: 8, backgroundColor: colors.bgGray },
                  ]}
                  onPress={() => console.log("Report Press")}
                >
                  <ReportIcon size={iconSizes.xs} />
                  <ThIconButtonText>Report</ThIconButtonText>
                </ThPressable>
                <ThPressable
                  style={[
                    styles.iconTextButton,
                    { marginLeft: 8, backgroundColor: colors.bgGray },
                  ]}
                  onPress={() => console.log("Save Press")}
                >
                  <SaveIcon size={iconSizes.xs} />
                  <ThIconButtonText>Save</ThIconButtonText>
                </ThPressable>
              </ThScrollViewRow>

              {/*Comments section*/}
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
                      color: colors.textGray,
                      fontSize: fontSizes.xs,
                    }}
                  >
                    {/*Number of comments*/}
                    {video.duration}
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
                      backgroundColor: "transparent",
                      height: "100%",
                    }}
                    onPress={() => {
                      console.log("Comment Image Pressed");
                    }}
                  >
                    <MainVideoScreenCommentImage
                      source={{ uri: video.video_pictures[0].picture }}
                    />
                  </ThPressable>
                  <ThText
                    style={{ marginLeft: 10, flex: 1, fontSize: fontSizes.xs }}
                  >
                    {/*Comment*/}
                    {video.url}
                  </ThText>
                </ThView>
              </ThView>
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
  );
}
