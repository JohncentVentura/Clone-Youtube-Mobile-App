import { Image } from "react-native";
import { styles } from "../styles/styles";

export function HomeChannelImage({ style, resizeMode, source, ...otherProps }) {
  return (
    <Image
      style={[styles.homeChannelImage, style]}
      resizeMode={resizeMode || "stretch"}
      source={source}
      alt="Channel logo"
      {...otherProps}
    />
  );
}
