import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useThemeContext } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export function BaseText({ style, children, ...rest }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
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
        {
          fontSize: ctxFontSizes.base,
          fontFamily,
          color: ctxColors.textPrimary,
        },
        restStyle,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function DrawerFooterText({ style, children, ...rest }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();

  return (
    <BaseText
      style={[
        { fontSize: ctxFontSizes.xs, color: ctxColors.textSecondary },
        style,
      ]}
      {...rest}
    >
      {children}
    </BaseText>
  );
}

export function HeaderTitleText({ style, children, ...rest }) {
  const { ctxFontSizes } = useThemeContext();

  return (
    <BaseText
      style={[
        styles.headerCenter,
        {
          marginLeft: 12,
          fontSize: ctxFontSizes.xl,
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
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();

  return (
    <View style={[styles.headerCenter, { flex: 1 }, style]}>
      <TextInput
        style={{
          borderRadius: 99,
          paddingLeft: 14,
          fontSize: ctxFontSizes.base,
          fontWeight: "medium",
          backgroundColor: ctxColors.bgSecondary,
          color: ctxColors.textSecondary,
        }}
        placeholder={placeholder}
        placeholderTextColor={ctxColors.textSecondary}
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
          size={ctxIconSizes.base}
          color={ctxColors.iconSecondary}
        />
      </Pressable>
    </View>
  );
}

export function CommentTextInput({
  style,
  placeholder = "Add a comment or @mention",
  returnKeyType = "go",
  ...rest
}) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();

  return (
    <TextInput
      style={[
        {
          borderRadius: 99,
          paddingHorizontal: 8,
          fontSize: ctxFontSizes.xs,
          fontWeight: "medium",
          backgroundColor: ctxColors.bgSecondary,
          color: ctxColors.textSecondary,
        },
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor={ctxColors.textSecondary}
      returnKeyType={returnKeyType}
      {...rest}
    />
  );
}
