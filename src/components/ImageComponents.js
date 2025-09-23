import { Image } from "react-native";

export function ChannelImage({ style, ...otherProps }) {
  return (
    <Image
      style={[{ borderRadius: 100, width: 40, height: 40 }, style]}
      resizeMode={"stretch"}
      alt="Channel Image"
      {...otherProps}
    />
  );
}

export function CommentImage({ style, ...otherProps }) {
  return (
    <Image
      style={[{ borderRadius: 100, width: 30, height: 30 }, style]}
      resizeMode={"stretch"}
      alt="Comment Image"
      {...otherProps}
    />
  );
}
