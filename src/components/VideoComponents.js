import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import {
  MainVideoScreenChannelImage,
  VideoViewImage,
} from "../components/ImageComponents";
import {
  ThIcon,
  ThPressable,
  ThText,
  ThView,
} from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import { urlToTitleExtractor } from "../utils/utils";

export function FlatListVideoItem({
  style,
  navigation,
  video,
  query,
  autoPlayVideoId,
}) {
  const { colors, fontSizes } = useTheme();

  return (
    <ThView style={[{ marginBottom: 32 }, style]}>
      <ThPressable
        style={{ marginBottom: 8 }}
        onPress={() => {
          navigation.push("MainVideoScreen", {
            video: video,
            query: query,
          });
        }}
      >
        <FlatListVideoView video={video} autoPlayVideoId={autoPlayVideoId} />
      </ThPressable>
      <ThView
        style={[
          styles.paddedHorizontalContainer,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <ThPressable
          style={{
            marginTop: 8,
            height: "100%",
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          onPress={() => {
            console.log("Channel Image Pressed");
            navigation.push("ChannelScreen", { video: video, query: query });
          }}
        >
          <MainVideoScreenChannelImage
            source={{ uri: video.video_pictures[0].picture }}
          />
        </ThPressable>
        <ThView
          style={{ flex: 6, justifyContent: "flex-start", marginLeft: 8 }}
        >
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
            Channel Name • {video.id} Views • Uploaded Date
          </ThText>
        </ThView>
        <ThView
          style={{
            marginTop: 8,
            height: "100%",
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <ThIcon
            IconComponent={MaterialCommunityIcons}
            name="dots-vertical"
            onPress={() => {
              console.log("Dots-vertical Pressed");
            }}
          />
        </ThView>
      </ThView>
    </ThView>
  );
}

export function FlatListVideoView({ style, video, autoPlayVideoId, ...rest }) {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const file =
    video.video_files.find(
      (v) => v.file_type === "video/mp4" && v.quality === "hd"
    ) ||
    video.video_files.find((v) => v.file_type === "video/mp4") ||
    video.video_files[0];

  const player = useVideoPlayer(file.link, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    if (!isFocused) {
      player.pause();
    } else if (autoPlayVideoId) {
      player.play();
    } else {
      player.pause();
    }
  }, [isFocused, autoPlayVideoId]);

  return (
    <VideoView
      style={[styles.mainVideoView, style]}
      resizeMode="cover"
      nativeControls={false}
      player={player}
      {...rest}
    />
  );
}

export function MainVideoView({ style, video, ...rest }) {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const file =
    video.video_files.find(
      (v) => v.file_type === "video/mp4" && v.quality === "hd"
    ) ||
    video.video_files.find((v) => v.file_type === "video/mp4") ||
    video.video_files[0];

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
      style={[styles.mainVideoView, style]}
      resizeMode="stretch"
      nativeControls={true}
      player={player}
      {...rest}
    />
  );
}
