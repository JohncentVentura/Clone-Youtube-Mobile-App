import { Image } from "react-native";
import { styles } from "../styles/styles";

export function HomeVideoImage({ style, source, ...otherProps }) {
  return (
    <Image
      style={[styles.homeVideoImage, style]}
      source={source}
      alt="Video thumbnail"
      {...otherProps}
    />
  );
}

export function HomeChannelImage({ style, source, ...otherProps }) {
  return (
    <Image
      style={[styles.homeChannelImage, style]}
      source={source}
      alt="Channel logo"
      {...otherProps}
    />
  );
}
