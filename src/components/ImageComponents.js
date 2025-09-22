import { Image } from "react-native";
import { styles } from "../styles/styles";

export function ChannelImage({ style, ...otherProps }) {
  return (
    <Image
      alt="Youtube Channel Image"
      resizeMode={"stretch"}
      style={[{ borderRadius: 100, width: 50, height: 50 }, style]}
      {...otherProps}
    />
  );
}

export function CommentImage({ style, ...otherProps }) {
  return (
    <Image
      alt="Youtube Channel Image"
      resizeMode={"stretch"}
      style={[{ borderRadius: 100, width: 35, height: 35 }, style]}
      {...otherProps}
    />
  );
}
