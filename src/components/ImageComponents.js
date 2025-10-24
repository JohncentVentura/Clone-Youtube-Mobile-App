import { Image, Pressable } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { imagePaths } from "../utils/constants";

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
        alt="ChannelProfileImage"
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
        alt="MainVideoCommentImage"
      />
    </Pressable>
  );
}

export function FlatListChannelImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ borderRadius: 99, width: 40, height: 40 }]}
        resizeMode={"stretch"}
        source={source}
        alt="FlatListChannelImage"
      />
    </Pressable>
  );
}

export function HeaderYoutubeLogoImage({ style, ...rest }) {
  const { colorScheme } = useTheme();

  return (
    <Image
      style={[{ width: 95, height: 25 }, style]}
      resizeMode={"stretch"}
      alt="HeaderYoutubeLogoImage"
      source={
        colorScheme === "light"
          ? imagePaths.youtubeLogoLightMode
          : imagePaths.youtubeLogoDarkMode
      }
      {...rest}
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
