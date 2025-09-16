import { Image } from "react-native";
import { styles } from "../styles/styles";

export function HomeChannelImage({ style, ...otherProps }) {
  return (
    <Image
      alt="Youtube Channel Image"
      resizeMode={"stretch"}
      style={[styles.homeChannelImage, style]}
      {...otherProps}
    />
  );
}
