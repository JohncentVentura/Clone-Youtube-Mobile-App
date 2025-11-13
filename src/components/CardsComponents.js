import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostComponent from "./PostComponent";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { screenHeight, styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import { shortenText } from "../utils/utils";
import { DotVerticalIcon } from "./IconComponents";
import {
  MainVideoChannelImage,
  MainVideoThumbnailImage,
} from "./ImageComponents";
import { BasePressable, RippleButton } from "./PressableComponents";
import { BaseText } from "./TextComponents";
import { MainVideoView, ShortsVideoView } from "./VideoComponents";

export function GamingCard({ style, videoData, ...rest }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  return (
    <BasePressable style={[{ paddingHorizontal: 12, paddingBottom:8 }, style]} {...rest}>
      <Image
        style={{ borderRadius: 8, width: 140, height: 210 }}
        resizeMode={"stretch"}
        source={{ uri: videoData?.picture }}
        alt="GamingCard"
      />
      <View style={{ width: 140, flexShrink: 1 }}>
        <BaseText style={{ marginTop: 4, fontWeight: "medium" }}>
          {shortenText(videoData?.title, 14)}
        </BaseText>
        <BaseText
          style={{
            marginTop: 4,
            fontSize: ctxFontSizes.xs,
            color: ctxColors.textSecondary,
          }}
        >
          {videoData?.channelSubscribers} watching worldwide
        </BaseText>
      </View>
    </BasePressable>
  );
}

export function MusicTrackCard({ style, source, musicGenre, ...rest }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  return (
    <BasePressable
      style={[
        { paddingVertical: 12, flexDirection: "row", alignItems: "center" },
        styles.screenPadHorizontal,
        style,
      ]}
      {...rest}
    >
      <Image
        style={{ borderRadius: 8, width: 150, height: 150 }}
        resizeMode={"stretch"}
        source={{ uri: source }}
        alt="MoviesCard"
      />
      <View style={{ marginLeft: 16, flexShrink: 1 }}>
        <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "medium" }}>
          {musicGenre.title}
        </BaseText>
        <BaseText
          style={{
            marginTop: 4,
            fontSize: ctxFontSizes.sm,
            color: ctxColors.textSecondary,
          }}
        >
          {musicGenre.description}
        </BaseText>
        <BaseText
          style={{
            marginTop: 4,
            fontSize: ctxFontSizes.sm,
            color: ctxColors.textSecondary,
          }}
        >
          {musicGenre.tracks} tracks
        </BaseText>
      </View>
    </BasePressable>
  );
}

export function MoviesCard({ style, videoData, genre, ...rest }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  return (
    <BasePressable style={[{ paddingHorizontal: 12 }, style]} {...rest}>
      <Image
        style={{ borderRadius: 8, width: 140, height: 210 }}
        resizeMode={"stretch"}
        source={{ uri: videoData?.picture }}
        alt="MoviesCard"
      />
      <View style={{ width: 140, flexShrink: 1 }}>
        <BaseText style={{ marginTop: 4, fontWeight: "medium" }}>
          {shortenText(videoData?.title, 14)}
        </BaseText>
        <BaseText
          style={{
            marginTop: 4,
            fontSize: ctxFontSizes.xs,
            color: ctxColors.textSecondary,
          }}
        >
          {genre} • {videoData?.uploadedDate}
        </BaseText>
        <BaseText
          style={{
            marginTop: 2,
            fontSize: ctxFontSizes.xs,
            color: ctxColors.green,
          }}
        >
          Buy or rent
        </BaseText>
      </View>
    </BasePressable>
  );
}

export function ShortsVideoCard({ style, videoData, source, ...rest }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();

  return (
    <Pressable
      style={[{ marginBottom: 12, width: 175, height: 300 }, style]}
      {...rest}
    >
      <Image
        style={{ borderRadius: 6, width: "100%", height: "100%" }}
        resizeMode={"stretch"}
        source={source}
        alt="SubscribedShortsImage"
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: 8,
          flexShrink: 1,
        }}
      >
        <BaseText
          style={{
            fontWeight: "medium",
            color: ctxColors.white,
          }}
        >
          {shortenText(videoData.title, 30)}
        </BaseText>
        <BaseText
          style={{
            marginTop: 4,
            fontSize: ctxFontSizes.xs,
            color: ctxColors.white,
          }}
        >
          {videoData.views} Views
        </BaseText>
      </View>
    </Pressable>
  );
}

export function VideoHorizontalPreview({ style, videoData, ...rest }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();

  return (
    <BasePressable
      style={[
        {
          width: "100%", 
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "transparent",
        },
        styles.screenPadHorizontal,
        style,
      ]}
      {...rest}
    >
      <Image
        style={[{ borderRadius: 8, width: 140, height: 80 }]}
        resizeMode={"stretch"}
        source={{ uri: videoData?.picture }}
        alt="UserPlaylistImage"
      />
      <View style={{ marginLeft: 12, flexShrink: 1 }}>
        <BaseText style={{ fontWeight: "medium" }}>{videoData?.title}</BaseText>
        <BaseText
          style={{
            marginTop: 4,
            fontSize: ctxFontSizes.xs,
            olors: ctxColors.textSecondary,
          }}
        >
          {videoData?.channelName}
        </BaseText>
        <BaseText
          style={{
            marginTop: 2,
            fontSize: ctxFontSizes.xs,
            colors: ctxColors.textSecondary,
          }}
        >
          {videoData?.views} views • {videoData?.uploadedDate}{" "}
        </BaseText>
      </View>
      <RippleButton style={{ marginLeft: "auto", marginTop: 4 }} rippleSize={6}>
        <DotVerticalIcon size={ctxIconSizes.xs2} />
      </RippleButton>
    </BasePressable>
  );
}
