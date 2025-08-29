import { View, FlatList, Text } from "react-native";
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
    <View style={[{ backgroundColor }, style]} {...otherProps}>
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

export function ThemedIcon({ IconComponent, style, name, size, ...rest }) {
  const color = useThemeColor("foreground");
  const iconSize = 24;

  return (
    <IconComponent
      name={name}
      size={iconSize}
      color={color}
      style={style}
      {...rest}
    />
  );
}
