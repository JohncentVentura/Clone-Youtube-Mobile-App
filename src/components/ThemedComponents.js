import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export function ThHeaderContainer({ style, children, ...rest }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.paddedHorizontalContainer,
        {
          paddingTop: insets.top + 4,
          backgroundColor: colors.bg,
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

export function ThIcon({ IconComponent, ...rest }) {
  const { colors, iconSizes } = useTheme();

  return (
    <IconComponent size={iconSizes.base} color={colors.iconPrimary} {...rest} />
  );
}

export function ThSmallIconButtonText({ style, children, ...rest }) {
  const { fontSizes } = useTheme();

  return (
    <ThText
      style={[
        { paddingLeft: 4, fontWeight: "medium", fontSize: fontSizes.xs },
        style,
      ]}
      {...rest}
    >
      {children}
    </ThText>
  );
}

export function ThText({ style, children, ...rest }) {
  const { colors, fontSizes } = useTheme();
  const { fontWeight, ...restStyle } = StyleSheet.flatten(style) || {};

  const fontFamily =
    fontWeight === "bold"
      ? "roboto-bold"
      : fontWeight === "medium"
      ? "roboto-medium"
      : "roboto-regular";

  return (
    <Text
      style={[
        { color: colors.textPrimary, fontFamily, fontSize: fontSizes.base },
        restStyle,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function ThTextInputView({
  style,
  placeholder = "Search YouTube",
  returnKeyType = "search",
  setClearButton,
  ...rest
}) {
  const { colors, fontSizes } = useTheme();

  return (
    <View style={[{ flex: 1 }, style]}>
      <TextInput
        style={{
          borderRadius: 99,
          paddingLeft: 14,
          fontSize: fontSizes.base,
          fontWeight: "medium",
          backgroundColor: colors.bgSecondary,
          color: colors.textSecondary,
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        returnKeyType={returnKeyType}
        {...rest}
      />
      <Pressable
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          padding: 8,
        }}
        onPress={setClearButton}
      >
        <ThIcon
          IconComponent={Ionicons}
          name="close"
          color={colors.iconSecondary}
        />
      </Pressable>
    </View>
  );
}

export function ThTopQueryTab({ style, selected, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        {
          marginLeft: 8,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: selected ? colors.bgContrast : colors.bgSecondary,
        },
        style,
      ]}
      {...rest}
    >
      <ThText
        style={{ color: selected ? colors.textContrast : colors.textPrimary }}
      >
        {children}
      </ThText>
    </Pressable>
  );
}

export function ThSmallIconTextButton({
  style,
  Icon,
  text,

  ...rest
}) {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.iconTextButton,
        {
          backgroundColor: colors.bgSecondary,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
        style,
      ]}
      {...rest}
    >
      <Icon size={iconSizes.xs2} />
      <ThText
        style={{
          paddingLeft: 4,
          fontSize: fontSizes.xs,
          fontWeight: "medium",
        }}
      >
        {text}
      </ThText>
    </Pressable>
  );
}
