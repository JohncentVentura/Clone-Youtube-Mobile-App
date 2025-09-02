import { FlatList, Text, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { styles } from "../styles/styles";

export function ThemedText({ style, type = "default", children, ...rest }) {
  const color = useThemeColor("foreground");

  return (
    <Text
      style={[
        { color },
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

export function ThemedView({ style, children, ...otherProps }) {
  const backgroundColor = useThemeColor("background");

  return (
    <View style={[{ backgroundColor: useThemeColor("background")}, style]} {...otherProps}>
      {children}
    </View>
  );
}

export function ThemedFlatList({ style, children, ...otherProps }) {
  const backgroundColor = useThemeColor("background");

  return (
    <FlatList style={[{ backgroundColor }, style]} {...otherProps}>
      {children}
    </FlatList>
  );
}

//Requires IconComponent and name
export function ThemedIcon({ style, IconComponent, name, size, color, ...rest }) {
  return (
    <IconComponent
      name={name}
      size={size || 24}
      color={color || useThemeColor("foreground")}
      style={style}
      {...rest}
    />
  );
}
