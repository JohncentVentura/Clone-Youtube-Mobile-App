import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { ChannelImage } from "../components/ImageComponents";
import {
  ThIcon,
  ThPressable,
  ThText,
  ThView,
} from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import { urlToTitleExtractor } from "../utils/utils";

export function VideoFlatListItem({ style, navigation, video, query }) {
  const { colors, fontSizes } = useTheme();

  return (
    <ThView style={[{ marginBottom: 32 }, style]}>
      <ThPressable
        style={{ backgroundColor: colors.bg, marginBottom: 8 }}
        onPress={() => {
          navigation.push("MainVideoScreen", {
            video: video,
            query: query,
          });
        }}
      >
        <MainVideoView video={video} />
      </ThPressable>

      <ThView style={styles.videoFlatListItemInfoContainer}>
        <ThView
          style={{
            height: "100%",
            flex: 1,
            paddingTop: 8,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <ChannelImage source={{ uri: video.video_pictures[0].picture }} />
        </ThView>
        <ThView style={{ flex: 5, marginLeft: 12 }}>
          <ThText
            style={{
              marginBottom: 4,
              fontSize: fontSizes.xl,
              fontWeight: "bold",
            }}
          >
            {urlToTitleExtractor(video.url)}
          </ThText>
          <ThText style={{ color: colors.textGray, fontSize: fontSizes.xs }}>
            Channel Name * {video.id} Views * Uploaded Date
          </ThText>
        </ThView>
        <ThView
          style={{
            flex: 1,
            height: "100%",
            flex: 1,
            paddingTop: 8,
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <ThIcon IconComponent={MaterialCommunityIcons} name="dots-vertical" />
        </ThView>
      </ThView>
    </ThView>
  );
}

export function MainVideoView({ style, video, ...rest }) {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  // pick first playable MP4
  const file =
    video.video_files.find(
      (v) => v.file_type === "video/mp4" && v.quality === "hd"
    ) ||
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
      style={[styles.mainVideoView, style]}
      {...rest}
    />
  );
}
