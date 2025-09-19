import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { HomeChannelImage } from "../components/ImageComponents";
import {
  ThemedIcon,
  ThemedPressable,
  ThemedText,
  ThemedView,
} from "../components/ThemedComponents";
import { styles, screenWidth, screenHeight } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import { urlToTitleExtractor } from "../utils/utils";

export function VideoFlatListRenderItem({ style, navigation, video, query }) {
  const { colors, fontSizes } = useTheme();

  return (
    <ThemedView style={{ style }}>
      <ThemedPressable
        style={styles.homeVideoContainer}
        onPress={() => {
          navigation.push("MainVideoScreen", {
            video: video,
            query: query,
          });
        }}
      >
        <MainVideoView video={video} />
      </ThemedPressable>

      <ThemedView style={styles.homeVideoInfoContainer}>
        <ThemedView style={{ flex: 1 }}>
          <HomeChannelImage source={{ uri: video.video_pictures[0].picture }} />
        </ThemedView>
        <ThemedView style={{ flex: 5 }}>
          <ThemedText style={{ fontSize: fontSizes.xl, fontWeight: "600" }}>
            {urlToTitleExtractor(video.url)}
          </ThemedText>
          <ThemedText
            style={{ color: colors.textGray, fontSize: fontSizes.xs }}
          >
            Channel Name * {video.id} Views * Uploaded Date
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ flex: 1, alignItems: "flex-end" }}>
          <ThemedIcon
            IconComponent={MaterialCommunityIcons}
            name="dots-vertical"
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
export function MainVideoView({ style, video }) {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  // pick first playable MP4
  const file =
    video.video_files.find((v) => v.file_type === "video/mp4") ||
    video.video_files[0];

  // create player bound to this URL
  const player = useVideoPlayer(file.link, (player) => {
    player.loop = false;
  });

  useEffect(() => {
    if (isFocused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isFocused]);

  return (
    <VideoView
      nativeControls={false}
      player={player}
      resizeMode="stretch"
      style={[
        {
          width: screenWidth,
          height: screenHeight * 0.25,
          backgroundColor: colors.bg,
          alignSelf: "center",
        },
        style,
      ]}
    />
  );
}
