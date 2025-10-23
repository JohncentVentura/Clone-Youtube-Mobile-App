import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RowScrollView } from "../components/ContainerComponents";
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
  PlayShortsButton,
  ShortsIconTextButton,
  SubscribeButton,
} from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useTheme } from "../context/ThemeContext";
import { useUI } from "../context/UIContext";
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

export function ShortsVideoView({
  style,
  navigation,
  videoData,
  autoPlayVideoId,
  ...rest
}) {
  const insets = useSafeAreaInsets();
  const { colors, fontSizes } = useTheme();
  const { isShortsVideoPlaying, setIsShortsVideoPlaying } = useUI();
  const videoPlayer = useVideoPlayer(videoData.video, (player) => {
    player.loop = true;
  });

  usePlayVideoOnFocus({ videoPlayer, autoPlayVideoId });

  const togglePlay = () => {
    if (isShortsVideoPlaying) {
      videoPlayer.pause();
    } else {
      videoPlayer.play();
    }
    setIsShortsVideoPlaying(!isShortsVideoPlaying);
  };

  return (
    <View
      style={[
        styles.shortsVideoView,
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
      {...rest}
    >
      <VideoView
        style={{ width: "100%", height: "100%" }}
        resizeMode="stretch"
        player={videoPlayer}
        nativeControls={false}
        pointerEvents="none"
      />

      <PlayShortsButton onPress={() => togglePlay()} />

      <View
        style={[
          {
            marginTop: insets.top + 64,
            marginBottom: insets.bottom + 16,
            justifyContent: "space-between",
          },
          StyleSheet.absoluteFill,
        ]}
      >
        <RowScrollView
          style={[styles.screenPadHorizontal, { flexDirection: "row" }]}
        >
          {!isShortsVideoPlaying && (
            <>
              <ShortsIconTextButton Icon={MessageTextIcon} text="Movies" />
              <ShortsIconTextButton
                style={{ marginLeft: 8 }}
                Icon={MessageTextIcon}
                text="Sea"
              />
              <ShortsIconTextButton
                style={{ marginLeft: 8 }}
                Icon={MessageTextIcon}
                text="Farm"
              />
              <ShortsIconTextButton
                style={{ marginLeft: 8, marginRight: 32 }}
                Icon={MessageTextIcon}
                text="Shopping"
              />
            </>
          )}
        </RowScrollView>

        <View
          style={[
            styles.screenPadLeft,
            {
              flexDirection: "row",
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={{ width: "80%", alignSelf: "flex-end" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CommentsProfileSmallImage source={{ uri: videoData.picture }} />
              <BaseText
                style={{
                  marginLeft: 10,
                  fontWeight: "medium",
                  color: colors.white,
                }}
              >
                {videoData.channelTag}
              </BaseText>
              <SubscribeButton
                style={{ marginLeft: 10, backgroundColor: colors.white }}
              />
            </View>
            <BaseText
              style={{
                marginTop: 6,
                fontSize: fontSizes.sm,
                color: colors.white,
                flexShrink: 1,
              }}
            >
              {videoData.description}
            </BaseText>
          </View>

          <View style={{ width: "15%", alignItems: "center" }}>
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
              style={{ marginTop: 16 }}
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
    <RippleButton
      style={[{ marginTop: 16, height: 42, width: 42 }, style]}
      rippleSize={4}
      {...rest}
    >
      <Icon style={{ color: colors.white }} />
      <BaseText style={{ color: colors.white, fontSize: fontSizes.sm }}>
        {text}
      </BaseText>
    </RippleButton>
  );
}
