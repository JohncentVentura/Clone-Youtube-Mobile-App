import { Text, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { styles } from "../styles/styles";

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  children,
  ...rest
}) {
  //useThemeColor() 1st parameter assings value to props.light & props.dark, 2nd parameter assigns value to colorName. list of can be used colorName is in Colors.js
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

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

export function ThemedView({
  style,
  lightColor,
  darkColor,
  children,
  ...otherProps
}) {
  //useThemeColor() 1st parameter assings value to props.light & props.dark, 2nd parameter assigns value to colorName. list of can be used colorName is in Colors.js
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View style={[{ backgroundColor }, style]} {...otherProps}>
      {children}
    </View>
  );
}
