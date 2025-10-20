import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export function BaseText({ style, children, ...rest }) {
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
        { fontSize: fontSizes.base, fontFamily, color: colors.textPrimary },
        restStyle,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function DrawerFooterText({ style, children, ...rest }) {
  const { colors, fontSizes } = useTheme();

  return (
    <BaseText
      style={[{ fontSize: fontSizes.xs, color: colors.textSecondary }, style]}
      {...rest}
    >
      {children}
    </BaseText>
  );
}

export function HeaderTitleText({ style, children, ...rest }) {
  const { fontSizes } = useTheme();

  return (
    <BaseText
      style={[
        styles.headerCenter,
        {
          marginLeft: 12,
          fontSize: fontSizes.xl,
          fontWeight: "medium",
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </BaseText>
  );
}

export function TextInputView({
  style,
  placeholder = "Search YouTube",
  returnKeyType = "search",
  setClearButton,
  ...rest
}) {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <View style={[styles.headerCenter, { flex: 1 }, style]}>
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
        <Ionicons
          name="close"
          size={iconSizes.base}
          color={colors.iconSecondary}
        />
      </Pressable>
    </View>
  );
}
