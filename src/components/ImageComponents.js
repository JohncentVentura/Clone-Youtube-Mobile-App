import { Image } from "react-native";
import { styles } from "../styles/styles";

//TODO: Maybe wrap images with pressable

export function MainVideoScreenChannelImage({ style, ...rest }) {
  return (
    <Image
      style={[{ borderRadius: 100, width: 40, height: 40 }, style]}
      resizeMode={"stretch"}
      alt="Channel Image"
      {...rest}
    />
  );
}

export function MainVideoScreenCommentImage({ style, ...rest }) {
  return (
    <Image
      style={[{ borderRadius: 100, width: 30, height: 30 }, style]}
      resizeMode={"stretch"}
      alt="Comment Image"
      {...rest}
    />
  );
}

export function ChannelScreenCoverImage({ style, ...rest }) {
  return (
    <Image
      style={[styles.coverImages, style]}
      resizeMode={"cover"}
      alt="Channel Image"
      {...rest}
    />
  );
}

export function ChannelScreenProfileImage({ style, ...rest }) {
  return (
    <Image
      style={[{ borderRadius: 100, width: 60, height: 60 }, style]}
      resizeMode={"stretch"}
      alt="Channel Image"
      {...rest}
    />
  );
}

//MainVideoScreenCommentImage same style
export function NotificationsScreenProfileImage({ style, ...rest }) {
  return (
    <Image
      style={[{ borderRadius: 100, width: 32, height: 32 }, style]}
      resizeMode={"stretch"}
      alt="Channel Image"
      {...rest}
    />
  );
}

export function NotificationsScreenPreviewImage({ style, ...rest }) {
  return (
    <Image
      style={[{ borderRadius: 8, width: 120, height: 70 }, style]}
      resizeMode={"cover"}
      alt="Channel Image"
      {...rest}
    />
  );
}

export function SearchScreenHistoryImage({ style, ...rest }) {
  return (
    <Image
      style={[{ width: 65, height: 40 }, style]}
      resizeMode={"cover"}
      alt="Channel Image"
      {...rest}
    />
  );
}
