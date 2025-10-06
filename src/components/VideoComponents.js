import { useIsFocused } from "@react-navigation/native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import { DotVerticalIcon } from "./IconComponents";
import { MainVideoScreenChannelImage } from "../components/ImageComponents";
import { FlatListVideoItemModal } from "./ModalComponents";
import {
  ThPressable,
  ThText,
  ThView,
  AnimFadeRoundButton,
} from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

export function FlatListVideoItem({
  style,
  navigation,
  video,
  query,
  autoPlayVideoId,
}) {
  const { colors, fontSizes } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <FlatListVideoItemModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />

      <ThView style={[{ marginBottom: 28 }, { width: "100%" }, style]}>
        <ThPressable
          style={{ marginBottom: 10, width: "100%" }}
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
            onPress={() => {
              navigation.navigate("ChannelScreen", {
                video: video,
                query: query,
              });
            }}
          >
            <MainVideoScreenChannelImage source={{ uri: video.picture }} />
          </ThPressable>
          <ThView style={{ flexShrink: 1, marginLeft: 12 }}>
            <ThText
              style={{
                marginBottom: 4,
                fontSize: fontSizes.lg,
                fontWeight: "bold",
              }}
            >
              {video.title}
            </ThText>
            <ThText style={{ color: colors.textMuted, fontSize: fontSizes.xs }}>
              {video.channelName} • {video.views} views • {video.uploadedDate}
            </ThText>
          </ThView>
          <AnimFadeRoundButton
            style={{ marginLeft: "auto" }}
            roundSize={4}
            onPress={() => setIsModalVisible(true)}
          >
            <DotVerticalIcon />
          </AnimFadeRoundButton>
        </ThView>
      </ThView>
    </>
  );
}

export function FlatListVideoView({ style, video, autoPlayVideoId, ...rest }) {
  const isFocused = useIsFocused();

  const player = useVideoPlayer(video.video, (player) => {
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

    return () => {
      try {
        player.dispose?.();
      } catch (e) {
        console.log("Player already released:", e.message);
      }
    };
  }, [isFocused, autoPlayVideoId]);

  return (
    <VideoView
      style={[styles.videoView, style]}
      resizeMode="cover"
      nativeControls={false}
      player={player}
      {...rest}
    />
  );
}

export function MainVideoView({ style, video, ...rest }) {
  const isFocused = useIsFocused();

  const player = useVideoPlayer(video.video, (player) => {
    player.loop = false;
  });

  useEffect(() => {
    if (isFocused) {
      player.play();
    } else {
      player.pause();
    }

    return () => {
      try {
        player.dispose?.();
      } catch (e) {
        console.log("Player already released:", e.message);
      }
    };
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
