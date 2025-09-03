import { FlatList, Text, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { styles } from "../styles/styles";

export function ThemedText({ style, type = "default", children, ...rest }) {
  return (
    <Text
      style={[
        { color: useThemeColor("foreground") },
        type === "default" ? styles.defaultTextSize : undefined,
        type === "title" ? styles.titleTextSize : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBoldTextSize : undefined,
        type === "subtitle" ? styles.subtitleTextSize : undefined,
        type === "link" ? styles.linkTextSize : undefined,
        type === "small" ? styles.smallTextSize : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

//Requires IconComponent and name
export function ThemedIcon({
  style,
  IconComponent,
  name,
  size,
  color,
  ...rest
}) {
  return (
    <IconComponent
      style={style}
      name={name}
      size={size || 24}
      color={color || useThemeColor("foreground")}
      {...rest}
    />
  );
}

export function ThemedView({ style, children, ...otherProps }) {
  return (
    <View
      style={[{ backgroundColor: useThemeColor("background") }, style]}
      {...otherProps}
    >
      {children}
    </View>
  );
}

export function ThemedFlatList({ style, children, ...otherProps }) {
  return (
    <FlatList
      style={[{ backgroundColor: useThemeColor("background") }, style]}
      {...otherProps}
    >
      {children}
    </FlatList>
  );
}
