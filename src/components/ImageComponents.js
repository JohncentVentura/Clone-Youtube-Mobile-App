import { Image } from "react-native";
import { styles } from "../styles/styles";

export function MainVideoScreenChannelImage({ style, ...otherProps }) {
  return (
    <Image
      style={[{ borderRadius: 100, width: 40, height: 40 }, style]}
      resizeMode={"stretch"}
      alt="Channel Image"
      {...otherProps}
    />
  );
}

export function MainVideoScreenCommentImage({ style, ...otherProps }) {
  return (
    <Image
      style={[{ borderRadius: 100, width: 30, height: 30 }, style]}
      resizeMode={"stretch"}
      alt="Comment Image"
      {...otherProps}
    />
  );
}

export function ChannelScreenCoverImage({ style, ...otherProps }) {
  return (
    <Image
      style={[styles.coverImages, style]}
      resizeMode={"cover"}
      alt="Channel Image"
      {...otherProps}
    />
  );
}

export function ChannelScreenProfileImage({ style, ...otherProps }) {
  return (
    <Image
      style={[{ borderRadius: 100, width: 60, height: 60 }, style]}
      resizeMode={"stretch"}
      alt="Channel Image"
      {...otherProps}
    />
  );
}