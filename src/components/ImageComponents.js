import { Image } from "react-native";
import { styles } from "../styles/styles";

export function HomeVideoImage({ source, style }) {
  return (
    <Image
      source={source}
      alt="Video thumbnail"
      style={[styles.homeVideoImage, style]}
    />
  );
}

export function HomeChannelImage({ source, style }) {
  return (
    <Image
      source={source}
      alt="Channel logo"
      style={[styles.homeChannelImage, style]}
    />
  );
}
