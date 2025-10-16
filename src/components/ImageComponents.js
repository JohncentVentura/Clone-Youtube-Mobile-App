import { Image, Pressable } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { imagePaths } from "../styles/paths";

export function ChannelCoverImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ borderRadius: 8, width: "100%", height: 100 }]}
        resizeMode={"cover"}
        source={source}
        alt="ChannelScreenCoverImage"
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
        alt="ChannelScreenProfileImage"
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
        alt="MainVideoScreenChannelImage"
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

export function MainVideoCommentImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ borderRadius: 99, width: 30, height: 30 }]}
        resizeMode={"stretch"}
        source={source}
        alt="MainVideoScreenCommentImage"
      />
    </Pressable>
  );
}

export function NotificationsProfileImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ borderRadius: 99, width: 36, height: 36 }]}
        resizeMode={"stretch"}
        source={source}
        alt="NotificationsScreenProfileImage"
      />
    </Pressable>
  );
}

export function NotificationsThumbnailImage({ source, ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={[{ borderRadius: 8, width: 120, height: 70 }]}
        resizeMode={"stretch"}
        source={source}
        alt="NotificationsScreenPreviewImage"
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
        alt="SearchScreenHistoryImage"
      />
    </Pressable>
  );
}
