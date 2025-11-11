import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  ShortsPlayButton,
  ShortsIconTextButton,
  SubscribeButton,
} from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import {
  usePlayMainVideoOnFocus,
  usePlayShortsVideoOnFocus,
} from "../hooks/usePlayVideoOnFocus";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";

export function MainVideoView({ style, videoData, autoPlayVideoId, ...rest }) {
  const videoPlayer = useVideoPlayer(videoData.video, (player) => {
    player.loop = true;
  });

  usePlayMainVideoOnFocus({
    videoPlayer,
    videoDataId: videoData.id,
    autoPlayVideoId: autoPlayVideoId,
  });

  return (
    <VideoView
      style={[styles.mainVideo, style]}
      resizeMode="stretch"
      player={videoPlayer}
      nativeControls={false}
      {...rest}
    />
  );
}

export function ShortsVideoView({
  style,
  setQuery,
  navigation,
  videoData,
  autoPlayVideoId,
  ...rest
}) {
  const insets = useSafeAreaInsets();
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const {
    ctxIsShortsVideoPlaying,
    ctxSetIsShortsVideoPlaying,
    ctxSetModalVideoData,
    ctxSetHomeCommentsModal,
  } = useUIContext();
  const videoPlayer = useVideoPlayer(videoData.video, (player) => {
    player.loop = true;
  });

  usePlayShortsVideoOnFocus({
    videoPlayer,
    videoDataId: videoData.id,
    autoPlayVideoId,
  });

  const togglePlay = () => {
    ctxIsShortsVideoPlaying ? videoPlayer.pause() : videoPlayer.play();
    ctxSetIsShortsVideoPlaying(!ctxIsShortsVideoPlaying);
  };

  return (
    <View
      style={[
        styles.shortsVideo,
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

      <ShortsPlayButton onPress={() => togglePlay()} />

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
        <ScrollView
          style={[styles.screenPadHorizontal, { flexGrow: 0 }]}
          contentContainerStyle={StyleSheet.create({
            flexDirection: "row",
            alignItems: "center",
          })}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {!ctxIsShortsVideoPlaying && (
            <>
              <ShortsIconTextButton
                Icon={MessageTextIcon}
                text="Movies"
                onPress={() => setQuery("Movies")}
              />
              <ShortsIconTextButton
                style={{ marginLeft: 8 }}
                Icon={MessageTextIcon}
                text="Sea"
                onPress={() => setQuery("Sea")}
              />
              <ShortsIconTextButton
                style={{ marginLeft: 8 }}
                Icon={MessageTextIcon}
                text="Farm"
                onPress={() => setQuery("Farm")}
              />
              <ShortsIconTextButton
                style={{ marginLeft: 8, marginRight: 32 }}
                Icon={MessageTextIcon}
                text="Shopping"
                onPress={() => setQuery("Shopping")}
              />
            </>
          )}
        </ScrollView>
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
              <CommentsProfileSmallImage
                source={{ uri: videoData.picture }}
                onPress={() => {
                  navigation.navigate(navPaths.channelScreen, {
                    videoData: videoData,
                  });
                }}
              />
              <BaseText
                style={{
                  marginLeft: 10,
                  fontWeight: "medium",
                  color: ctxColors.white,
                }}
              >
                {videoData.channelTag}
              </BaseText>
              <SubscribeButton
                style={[
                  { marginLeft: 10, backgroundColor: ctxColors.white },
                  styles.baseButton,
                ]}
              />
            </View>
            <BaseText
              style={{
                marginTop: 6,
                fontSize: ctxFontSizes.sm,
                color: ctxColors.white,
                flexShrink: 1,
              }}
            >
              {videoData.description}
            </BaseText>
          </View>

          <View style={{ width: "15%", alignItems: "center" }}>
            <ShortsVerticalButton
              Icon={LikeIcon}
              text={videoData.likes}
              onPress={() => console.log("Shorts Like Press")}
            />
            <ShortsVerticalButton
              Icon={DislikeIcon}
              text="Dislike"
              onPress={() => console.log("Shorts Dislike Press")}
            />
            <ShortsVerticalButton
              Icon={MessageTextIcon}
              text={videoData.commentsCount}
              onPress={() => {
                ctxSetModalVideoData(videoData);
                ctxSetHomeCommentsModal(true);
              }}
            />
            <ShortsVerticalButton
              Icon={ShareIcon}
              text="Share"
              onPress={() => console.log("Shorts Share Press")}
            />
            <ShortsVerticalButton
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

function ShortsVerticalButton({ style, Icon, text, ...rest }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();

  return (
    <RippleButton
      style={[{ marginTop: 16, height: 42, width: 42 }, style]}
      rippleSize={4}
      {...rest}
    >
      <Icon style={{ color: ctxColors.white }} />
      <BaseText style={{ color: ctxColors.white, fontSize: ctxFontSizes.sm }}>
        {text}
      </BaseText>
    </RippleButton>
  );
}
