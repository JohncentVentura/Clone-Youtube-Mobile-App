import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { styles } from "../styles/styles";

/****************************************Basics****************************************/

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

export function ThemedTouchableOpacity({ style, children, ...otherProps }) {
  return (
    <TouchableOpacity
      style={[{ backgroundColor: useThemeColor("background") }, style]}
      {...otherProps}
    >
      {children}
    </TouchableOpacity>
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

/****************************************Headers****************************************/

export function HeaderRightIconsContainer({
  style,
  backgroundColor,
  children,
  ...otherProps
}) {
  return (
    <View
      style={[
        { backgroundColor: backgroundColor || useThemeColor("background") },
        styles.headerRightIconsContainer,
        style,
      ]}
      {...otherProps}
    >
      {children}
    </View>
  );
}

export function HeaderNotificationIcon({
  style,
  size,
  onPress,
  ...otherProps
}) {
  return (
    <Ionicons
      name="notifications-outline"
      color={useThemeColor("foreground")}
      size={size || 24}
      onPress={onPress}
      style={style}
      {...otherProps}
    />
  );
}

export function HeaderScreenShareIcon({ style, size, onPress, ...otherProps }) {
  return (
    <MaterialIcons
      name="screen-share"
      color={useThemeColor("foreground")}
      size={size || 24}
      onPress={onPress}
      style={style}
      {...otherProps}
    />
  );
}

export function HeaderSearchIcon({ style, size, onPress, ...otherProps }) {
  return (
    <AntDesign
      name="search1"
      color={useThemeColor("foreground")}
      size={size || 24}
      onPress={onPress}
      style={style}
      {...otherProps}
    />
  );
}

export function HeaderCaptionIcon({ style, size, onPress, ...otherProps }) {
  return (
    <MaterialCommunityIcons
      name="closed-caption-outline" //closed-caption when pressed
      color={useThemeColor("foreground")}
      size={size || 24}
      onPress={onPress}
      style={style}
      {...otherProps}
    />
  );
}

export function HeaderSettingIcon({ style, size, onPress, ...otherProps }) {
  return (
    <Ionicons
      name="settings-outline"
      color={useThemeColor("foreground")}
      size={size || 24}
      onPress={onPress}
      style={style}
      {...otherProps}
    />
  );
}

export function HeaderVerticalDotsIcon({
  style,
  size,
  onPress,
  ...otherProps
}) {
  return (
    <MaterialCommunityIcons
      name="dots-vertical"
      color={useThemeColor("foreground")}
      size={size || 24}
      onPress={onPress}
      style={style}
      {...otherProps}
    />
  );
}
