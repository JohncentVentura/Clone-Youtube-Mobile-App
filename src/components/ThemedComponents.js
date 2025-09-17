import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

/******************************Basics******************************/
export function ThemedFlatList({ style, children, ...otherProps }) {
  const { colors } = useTheme();

  return (
    <FlatList style={[{ backgroundColor: colors.bg }, style]} {...otherProps}>
      {children}
    </FlatList>
  );
}

export function ThemedIcon({ IconComponent, ...rest }) {
  const { colors, iconSizes } = useTheme();

  return <IconComponent size={iconSizes.base} color={colors.icon} {...rest} />;
}

export function ThemedPressable({ style, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: colors.bg,
          opacity: pressed ? 0.5 : 1, //fade effect
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
}

export function ThemedRowScrollView({ style, children, ...otherProps }) {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[{ backgroundColor: colors.bg }, style]}
      contentContainerStyle={StyleSheet.create({
        flexDirection: "row",
        alignItems: "center",
      })}
      horizontal={true}
      scrollEnabled={true}
      {...otherProps}
    >
      {children}
    </ScrollView>
  );
}

export function ThemedText({ style, children, ...rest }) {
  const { colors, fontSizes } = useTheme();

  return (
    <Text
      style={[
        { color: colors.text, fontSize: fontSizes.base },
        style, //Putting style last in [defaultStyle, style] lets user overrides take precedence.
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function ThemedView({ style, children, ...otherProps }) {
  const { colors } = useTheme();

  return (
    <View style={[{ backgroundColor: colors.bg }, style]} {...otherProps}>
      {children}
    </View>
  );
}

/******************************Buttons******************************/
export function ThemedButton({ style, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          borderRadius: 50,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: colors.btnBg,
          opacity: pressed ? 0.5 : 1, //fade effect
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
}

export function ThemedTabButton({ style, selected, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <ThemedButton
      style={[
        {
          backgroundColor: selected ? colors.primary : colors.bgGray,
          opacity: 1,
        },
        style,
      ]}
      {...rest}
    >
      <ThemedText style={{ color: selected ? colors.bg : colors.text }}>
        {children}
      </ThemedText>
    </ThemedButton>
  );
}


export function ThemedSmallIconButton({
  style,
  iconProps,
  textProps = {},
  children,
  ...rest
}) {
  const { colors, fontSizes, iconSizes } = useTheme();
  const { style: textStyle, ...otherTextProps } = textProps;

  return (
    <ThemedButton
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
      {...rest}
    >
      <ThemedIcon size={iconSizes.xs} {...iconProps} />
      <ThemedText
        style={[
          { paddingLeft: 4, fontSize: fontSizes.xs, fontWeight: "500" },
          textStyle,
        ]}
        {...otherTextProps}
      >
        {children}
      </ThemedText>
    </ThemedButton>
  );
}

/******************************Headers******************************/
export function HeaderRightIconsContainer({ style, children, ...otherProps }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        { backgroundColor: colors.bg },
        styles.headerRightIconsContainer,
        style,
      ]}
      {...otherProps}
    >
      {children}
    </View>
  );
}

export function HeaderCaptionIcon({ ...otherProps }) {
  const { colors, iconSizes } = useTheme();

  return (
    <MaterialCommunityIcons
      name="closed-caption-outline" //closed-caption when pressed
      size={iconSizes.base}
      color={colors.icon}
      {...otherProps}
    />
  );
}

export function HeaderNotificationIcon({ ...otherProps }) {
  const { colors, iconSizes } = useTheme();

  return (
    <Ionicons
      name="notifications-outline"
      size={iconSizes.base}
      color={colors.icon}
      {...otherProps}
    />
  );
}

export function HeaderScreenShareIcon({ ...otherProps }) {
  const { colors, iconSizes } = useTheme();

  return (
    <MaterialIcons
      name="screen-share"
      size={iconSizes.base}
      color={colors.icon}
      {...otherProps}
    />
  );
}

export function HeaderSearchIcon({ ...otherProps }) {
  const { colors, iconSizes } = useTheme();

  return (
    <Ionicons
      name="search"
      size={iconSizes.base}
      color={colors.icon}
      {...otherProps}
    />
  );
}

export function HeaderSettingIcon({ ...otherProps }) {
  const { colors, iconSizes } = useTheme();

  return (
    <Ionicons
      name="settings-outline"
      size={iconSizes.base}
      color={colors.icon}
      {...otherProps}
    />
  );
}

export function HeaderVerticalDotsIcon({ ...otherProps }) {
  const { colors, iconSizes } = useTheme();

  return (
    <MaterialCommunityIcons
      name="dots-vertical"
      size={iconSizes.base}
      color={colors.icon}
      {...otherProps}
    />
  );
}
