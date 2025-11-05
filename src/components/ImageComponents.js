import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useThemeContext } from "../context/ThemeContext";
import { screenWidth, styles } from "../styles/styles";
import { imagePaths } from "../utils/constants";
import { shortenText } from "../utils/utils";

export function ChannelCoverImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ borderRadius: 8, width: "100%", height: 100 }]}
        resizeMode={"cover"}
        source={source}
        alt="ChannelCoverImage"
      />
    </Pressable>
  );
}

export function ChannelProfileImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ borderRadius: 99, width: 60, height: 60 }]}
        resizeMode={"stretch"}
        source={source}
        alt="ChannelProfileImage"
      />
    </Pressable>
  );
}

export function CommentsProfileLargeImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ borderRadius: 99, width: 60, height: 60 }]}
        resizeMode={"stretch"}
        source={source}
        alt="CommentsProfileLargeImage"
      />
    </Pressable>
  );
}

export function CommentsProfileSmallImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ borderRadius: 99, width: 30, height: 30 }]}
        resizeMode={"stretch"}
        source={source}
        alt="CommentsProfileSmallImage"
      />
    </Pressable>
  );
}

export function HeaderYoutubeLogoImage({ style, ...rest }) {
  const { ctxColorScheme } = useThemeContext();

  return (
    <Image
      style={[{ width: 95, height: 25 }, style]}
      resizeMode={"stretch"}
      alt="HeaderYoutubeLogoImage"
      source={
        ctxColorScheme === "light"
          ? imagePaths.youtubeLogoLightMode
          : imagePaths.youtubeLogoDarkMode
      }
      {...rest}
    />
  );
}

export function MainVideoChannelImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ borderRadius: 99, width: 40, height: 40 }]}
        resizeMode={"stretch"}
        source={source}
        alt="MainVideoChannelImage"
      />
    </Pressable>
  );
}

export function MainVideoThumbnailImage({ source, ...rest }) {
  return (
    <Image
      style={styles.mainVideo}
      resizeMode={"stretch"}
      source={source}
      alt="MainVideoThumbnailImage"
    />
  );
}

export function NotifProfileImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ borderRadius: 99, width: 36, height: 36 }]}
        resizeMode={"stretch"}
        source={source}
        alt="NotifProfileImage"
      />
    </Pressable>
  );
}

export function NotifThumbnailImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ borderRadius: 8, width: 120, height: 70 }]}
        resizeMode={"stretch"}
        source={source}
        alt="NotifThumbnailImage"
      />
    </Pressable>
  );
}

export function SearchHistoryThumbnailImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ width: 65, height: 40 }]}
        resizeMode={"stretch"}
        source={source}
        alt="SearchHistoryThumbnailImage"
      />
    </Pressable>
  );
}

export function SubscribedChannelImage({ style, source, ...rest }) {
  return (
    <Image
      style={[{ borderRadius: 99, width: 45, height: 45 }, style]}
      resizeMode={"stretch"}
      source={source}
      alt="SubscribedChannelImage"
      {...rest}
    />
  );
}

export function SubscribedPostImage({ style, source, ...rest }) {
  return (
    <Image
      style={[{ borderRadius: 8 }, style]}
      resizeMode={"stretch"}
      source={source}
      alt="SubscribedPostImage"
      {...rest}
    />
  );
}

export function SubscribedShortsImage({ style, data, source, ...rest }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();

  return (
    <Pressable style={[{ marginBottom: 12, width: 175, height: 300 }, style]} {...rest}>
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
        <Text
          style={{
            fontSize: ctxFontSizes.base,
            fontWeight: "medium",
            color: ctxColors.white,
          }}
        >
          {shortenText(data.title, 30)}
        </Text>
        <Text
          style={{
            marginTop: 4,
            fontSize: ctxFontSizes.xs,
            color: ctxColors.white,
          }}
        >
          {data.views} Views
        </Text>
      </View>
    </Pressable>
  );
}
