import { useIsFocused } from "@react-navigation/native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import { DotVerticalIcon } from "./IconComponents";
import { MainVideoScreenChannelImage } from "../components/ImageComponents";
import { FlatListVideoItemModal } from "./ModalComponents";
import { ThPressable, ThText, ThView } from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import {
  getPexelsUrlToTitle,
  getShortenText,
  randomTimeAgo,
  roundOffNumber,
} from "../utils/utils";

export function FlatListVideoItem({
  style,
  navigation,
  video,
  query,
  autoPlayVideoId,
}) {
  const { colors, fontSizes } = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <FlatListVideoItemModal visible={visible} setVisible={setVisible} />

      <ThView style={[{ marginBottom: 28 }, { width: "100%" }, style]}>
        <ThPressable
          style={{ marginBottom: 8, width: "100%" }}
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
            {
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            },
          ]}
        >
          <ThPressable
            style={{
              marginTop: 4,
            }}
            onPress={() => {
              navigation.push("ChannelScreen", { video: video, query: query });
            }}
          >
            <MainVideoScreenChannelImage
              source={{ uri: video.video_pictures[0].picture }}
            />
          </ThPressable>
          <ThView style={{ flexShrink: 1, marginLeft: 12 }}>
            <ThText
              style={{
                marginBottom: 4,
                fontSize: fontSizes.lg,
                fontWeight: "bold",
              }}
            >
              {/*Video Title*/}
              {getPexelsUrlToTitle(video.url)}
            </ThText>
            <ThText style={{ color: colors.textGray, fontSize: fontSizes.xs }}>
              {/*Channel Name • Number of Views • Uploaded Date*/}
              {video.user.name} • {roundOffNumber(video.id)} Views •{" "}
              {randomTimeAgo(video.video_pictures[0].id)}
            </ThText>
          </ThView>
          <DotVerticalIcon
            style={{ marginTop: 4, marginLeft: "auto" }}
            onPress={() => setVisible(true)}
          />
        </ThView>
      </ThView>
    </>
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
      style={[styles.videoView, { backgroundColor: colors.bg }, style]}
      resizeMode="cover"
      nativeControls={false}
      player={player}
      {...rest}
    />
  );
}

export function MainVideoView({ style, video, ...rest }) {
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
      style={[styles.videoView, style]}
      resizeMode="stretch"
      nativeControls={true}
      player={player}
      {...rest}
    />
  );
}
