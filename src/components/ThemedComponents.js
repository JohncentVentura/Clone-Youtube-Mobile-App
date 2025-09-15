import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { styles, colors, textSizes } from "../styles/styles";

/******************************Basics******************************/
export function ThemedFlatList({
  style,
  backgroundColor,
  children,
  ...otherProps
}) {
  return (
    <FlatList
      style={[
        {
          backgroundColor:
            useThemeColor(backgroundColor) || useThemeColor(colors.background),
        },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </FlatList>
  );
}

/*
 *
 *
 * TODO: Use textSize for the sizes of the ThemedIcon
 *
 */

//Requires IconComponent and name
export function ThemedIcon({
  style,
  color,
  IconComponent,
  name,
  size,
  ...rest
}) {
  return (
    <IconComponent
      style={style}
      color={useThemeColor(color) || useThemeColor(colors.foreground)}
      name={name}
      size={size || 24}
      {...rest}
    />
  );
}

export function ThemedPressable({
  style,
  backgroundColor,
  borderRadius,
  paddingVertical,
  paddingHorizontal,
  onPress,
  children,
  ...rest
}) {
  return (
    <Pressable
      style={[
        {
          backgroundColor:
            useThemeColor(backgroundColor) || useThemeColor(colors.foreground),
          borderRadius: borderRadius || 50,
          paddingVertical: paddingVertical || 8,
          paddingHorizontal: paddingHorizontal || 12,
        },
        style,
      ]}
      onPress={onPress}
      {...rest}
    >
      {children}
    </Pressable>
  );
}

export function ThemedScrollView({
  style,
  backgroundColor,
  children,
  ...otherProps
}) {
  return (
    <ScrollView
      style={[
        {
          backgroundColor:
            useThemeColor(backgroundColor) || useThemeColor(colors.background),
        },
        style,
      ]}
      contentContainerStyle={StyleSheet.create({
        flexDirection: "row",
        alignItems: "center",
      })}
      scrollEnabled={true}
      {...otherProps}
    >
      {children}
    </ScrollView>
  );
}

export function ThemedText({
  style,
  color,
  size = textSizes.base,
  children,
  ...rest
}) {
  return (
    <Text
      style={[
        { color: useThemeColor(color) || useThemeColor(colors.foreground) },
        size === textSizes.xs2 ? styles.xs2TextSize : undefined,
        size === textSizes.xs ? styles.xsTextSize : undefined,
        size === textSizes.sm ? styles.smTextSize : undefined,
        size === textSizes.base ? styles.baseTextSize : undefined,
        size === textSizes.lg ? styles.lgTextSize : undefined,
        size === textSizes.xl ? styles.xlTextSize : undefined,
        size === textSizes.xl2 ? styles.xl2TextSize : undefined,
        size === textSizes.xl3 ? styles.xl3TextSize : undefined,
        size === textSizes.xl4 ? styles.xl4TextSize : undefined,
        size === textSizes.xl5 ? styles.xl5TextSize : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function ThemedTouchableOpacity({
  style,
  backgroundColor,
  children,
  ...otherProps
}) {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor:
            useThemeColor(backgroundColor) || useThemeColor(colors.background),
        },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </TouchableOpacity>
  );
}

export function ThemedView({
  style,
  backgroundColor,
  children,
  ...otherProps
}) {
  return (
    <View
      style={[
        {
          backgroundColor:
            useThemeColor(backgroundColor) || useThemeColor(colors.background),
        },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </View>
  );
}

/******************************Headers******************************/
export function HeaderRightIconsContainer({ style, children, ...otherProps }) {
  return (
    <View
      style={[
        { backgroundColor: useThemeColor(colors.background) },
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
      style={style}
      color={useThemeColor(colors.foreground)}
      name="notifications-outline"
      size={size || 24}
      onPress={onPress}
      {...otherProps}
    />
  );
}

export function HeaderScreenShareIcon({ style, size, onPress, ...otherProps }) {
  return (
    <MaterialIcons
      style={style}
      color={useThemeColor(colors.foreground)}
      name="screen-share"
      size={size || 24}
      onPress={onPress}
      {...otherProps}
    />
  );
}

export function HeaderSearchIcon({ style, size, onPress, ...otherProps }) {
  return (
    <Ionicons
      style={style}
      color={useThemeColor(colors.foreground)}
      name="search"
      size={size || 24}
      onPress={onPress}
      {...otherProps}
    />
  );
}

export function HeaderCaptionIcon({ style, size, onPress, ...otherProps }) {
  return (
    <MaterialCommunityIcons
      style={style}
      color={useThemeColor(colors.foreground)}
      name="closed-caption-outline" //closed-caption when pressed
      size={size || 24}
      onPress={onPress}
      {...otherProps}
    />
  );
}

export function HeaderSettingIcon({ style, size, onPress, ...otherProps }) {
  return (
    <Ionicons
      style={style}
      color={useThemeColor(colors.foreground)}
      name="settings-outline"
      size={size || 24}
      onPress={onPress}
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
      style={style}
      color={useThemeColor(colors.foreground)}
      name="dots-vertical"
      size={size || 24}
      onPress={onPress}
      {...otherProps}
    />
  );
}
