import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  DislikeIcon,
  HeaderDotVerticalIcon,
  HeaderSearchIcon,
  LikeIcon,
  MessageTextIcon,
  RemixIcon,
  ShareIcon,
} from "../components/IconComponents";
import { CommentsProfileSmallImage } from "../components/ImageComponents";
import {
  RippleButton,
  SubscribeButton,
} from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useTheme } from "../context/ThemeContext";
import { usePlayVideoOnFocus } from "../hooks/usePlayVideoOnFocus";
import { styles } from "../styles/styles";

export function FlatListVideoView({
  style,
  videoData,
  autoPlayVideoId,
  ...rest
}) {
  const videoPlayer = useVideoPlayer(videoData.video, (player) => {
    player.loop = true;
  });

  usePlayVideoOnFocus({ videoPlayer, autoPlayVideoId });

  return (
    <VideoView
      style={[styles.mainVideoView, style]}
      resizeMode="stretch"
      player={videoPlayer}
      nativeControls={false}
      {...rest}
    />
  );
}

export function MainVideoView({ style, videoData, ...rest }) {
  const videoPlayer = useVideoPlayer(videoData.video, (player) => {
    player.loop = true;
  });

  usePlayVideoOnFocus({ videoPlayer, autoPlayVideoId: videoData.id });

  return (
    <VideoView
      style={[styles.mainVideoView, style]}
      resizeMode="stretch"
      player={videoPlayer}
      nativeControls={true}
      {...rest}
    />
  );
}

export function ShortsVideoView({ style, videoData, ...rest }) {
  const { colors, fontSizes, iconSizes } = useTheme();
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoPlayer = useVideoPlayer(videoData.video, (player) => {
    player.loop = true;
  });

  usePlayVideoOnFocus({ videoPlayer, autoPlayVideoId: videoData.id });

  const toggleMute = () => {
    videoPlayer.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const togglePlay = () => {
    if (isPlaying) {
      videoPlayer.pause();
    } else {
      videoPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={[{ position: "relative", flex: 1 }, style]}>
      <VideoView
        style={styles.shortsVideoView}
        resizeMode="stretch"
        player={videoPlayer}
        nativeControls={false}
        {...rest}
      />

      <View
        style={[{ justifyContent: "space-between" }, StyleSheet.absoluteFill]}
      >
        <View
          style={[
            styles.screenPadHorizontal,
            { marginTop: 32, flexDirection: "row" },
          ]}
        >
          <BaseText
            style={{
              fontSize: fontSizes.lg,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Shorts
          </BaseText>
          <View style={styles.headerRightIconsContainer}>
            <HeaderSearchIcon color={"#fff"} style={[styles.headerRightIcon]} />
            <HeaderDotVerticalIcon
              color={"#fff"}
              style={[styles.headerRightIcon]}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <View
            style={[
              styles.screenPadLeft,
              { marginBottom: 32, width: "80%", alignSelf: "flex-end" },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CommentsProfileSmallImage source={{ uri: videoData.picture }} />
              <BaseText
                style={{ marginLeft: 10, fontWeight: "bold", color: "#fff" }}
              >
                {videoData.channelTag}
              </BaseText>
              <SubscribeButton style={{ marginLeft: 10 }} />
            </View>
            <BaseText style={{ color: "#fff", flexShrink: 1 }}>
              {videoData.description}
            </BaseText>
          </View>

          <View style={{ width: "20%", alignItems: "center" }}>
            <ShortsButton
              Icon={LikeIcon}
              text={videoData.likes}
              onPress={() => console.log("Shorts Like Press")}
            />
            <ShortsButton
              Icon={DislikeIcon}
              text="Dislike"
              onPress={() => console.log("Shorts Dislike Press")}
            />
            <ShortsButton
              Icon={MessageTextIcon}
              text={videoData.commentsCount}
              onPress={() => console.log("Shorts Comments Press")}
            />
            <ShortsButton
              Icon={ShareIcon}
              text="Share"
              onPress={() => console.log("Shorts Share Press")}
            />
            <ShortsButton
              Icon={RemixIcon}
              text="Remix"
              onPress={() => console.log("Shorts Remix Press")}
            />
            <CommentsProfileSmallImage
              style={{ marginVertical: 16 }}
              source={{ uri: videoData.picture }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function ShortsButton({ style, Icon, text, ...rest }) {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <RippleButton style={[{ marginTop: 16 }, style]} {...rest}>
      <Icon style={{ color: "#fff" }} />
      <BaseText style={{ color: "#fff", fontSize: fontSizes.sm }}>
        {text}
      </BaseText>
    </RippleButton>
  );
}

/*
<View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ flex: 1 }} />
          <View style={{ alignSelf: "flex-end", alignItems: "center" }}>
            <Pressable onPress={togglePlay} style={{ marginBottom: 12 }}>
              <BaseText style={{ fontSize: 24 }}>
                {isPlaying ? "⏸️" : "▶️"}
              </BaseText>
            </Pressable>

            <Pressable onPress={toggleMute} style={{ marginBottom: 12 }}>
              <BaseText style={{ fontSize: 24 }}>
                {isMuted ? "🔇" : "🔊"}
              </BaseText>
            </Pressable>

            <Pressable onPress={() => console.log("Like")}>
              <BaseText style={{ fontSize: 24 }}>❤️</BaseText>
            </Pressable>
          </View>

          <View style={{ position: "absolute", bottom: 16, left: 16 }}>
            <BaseText style={{ color: "#fff", fontSize: 16 }}>
              @{videoData.channelName}
            </BaseText>
            <BaseText style={{ color: "#fff" }}>{videoData.title}</BaseText>
          </View>
        </View>
*/
