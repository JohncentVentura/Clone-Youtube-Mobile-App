import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import CommentsModal from "../components/CommentsModal";
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
import { ThSmallIconTextButton, ThText } from "../components/ThemedComponents";
import { RowScrollView } from "../components/UtilComponents";
import {
  FlatListVideoItem,
  MainVideoView,
} from "../components/VideoComponents";
import { useTheme } from "../context/ThemeContext";
import { useHideBottomTabBarOnFocus } from "../hooks/useHideBottomTabBarOnFocus";
import { useSetPexelsDataVideos } from "../hooks/usePexelsData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

export default function MainVideoScreen({ navigation, route }) {
  const { video, query } = route.params;
  const { colors, fontSizes, iconSizes } = useTheme();
  const scrollToTopRef = useRef(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useHideBottomTabBarOnFocus();
  useScrollToTopOnFocus(scrollToTopRef);
  useSetPexelsDataVideos({
    query,
    videosCount: 5,
    setVideos: setRelatedVideos,
    dependecies: [query],
  });

  return (
    <>
      <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
        <FlatList
          ref={scrollToTopRef}
          data={relatedVideos}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <>
              <MainVideoView style={{ marginBottom: 8 }} video={video} />
              <View style={styles.paddedHorizontalContainer}>
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
                <View style={{ marginBottom: 14, flexDirection: "row" }}>
                  <ThText
                    style={{
                      fontSize: fontSizes.xs,
                      color: colors.textSecondary,
                    }}
                  >
                    {video.views} views
                  </ThText>
                  <ThText
                    style={{
                      marginLeft: 8,
                      fontSize: fontSizes.xs,
                      color: colors.textSecondary,
                    }}
                  >
                    {video.uploadedDate}
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
                    marginBottom: 10,
                    width: "100%",
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
                    <Pressable
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
                    </Pressable>
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
                        fontSize: fontSizes.xs,
                        color: colors.textSecondary,
                      }}
                    >
                      {video.channelSubscribers}
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
                <RowScrollView style={{ marginBottom: 16 }}>
                  <View
                    style={[
                      {
                        borderRadius: 99,
                        height: 30,
                        backgroundColor: colors.bgSecondary,
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    ]}
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
                        {video.likes}
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
                      {video.commentsCount}
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
                    <Pressable
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
                    </Pressable>
                    <ThText
                      style={{
                        marginLeft: 10,
                        fontSize: fontSizes.xs,
                        flex: 1,
                      }}
                    >
                      {video.commentsDescription}
                    </ThText>
                  </View>
                </Pressable>
              </View>
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
      </View>

      {showComments && <CommentsModal setShowComments={setShowComments} />}
    </>
  );
}
