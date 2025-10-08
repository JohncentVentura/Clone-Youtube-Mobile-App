import Ionicons from "@expo/vector-icons/Ionicons";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

/******************************Base Components******************************/
export function ThFlatList({ style, ...rest }) {
  return (
    <FlatList style={[{ backgroundColor: "transparent" }, style]} {...rest} />
  );
}

export function ThIcon({ IconComponent, ...rest }) {
  const { colors, iconSizes } = useTheme();

  return (
    <IconComponent size={iconSizes.base} color={colors.iconPrimary} {...rest} />
  );
}

export function ThPressable({ style, children, ...rest }) {
  //Allows style to be static (normal) or functional (access props, like pressed)
  const functionStyle =
    typeof style === "function"
      ? (state) => [
          {
            backgroundColor: "transparent",
          },
          style(state),
        ]
      : () => [
          {
            backgroundColor: "transparent",
          },
          style,
        ];

  return (
    <Pressable style={functionStyle} {...rest}>
      {children}
    </Pressable>
  );
}

export function ThScrollViewColumn({ style, children, ...rest }) {
  return (
    <ScrollView
      style={[{ backgroundColor: "transparent" }, style]}
      contentContainerStyle={StyleSheet.create({
        alignItems: "center",
      })}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

export function ThScrollViewRow({ style, children, ...rest }) {
  return (
    <ScrollView
      style={[{ backgroundColor: "transparent" }, style]}
      contentContainerStyle={StyleSheet.create({
        flexDirection: "row",
        alignItems: "center",
      })}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

export function ThText({ style, children, ...rest }) {
  const { colors, fontSizes } = useTheme();

  const flattenedStyle = StyleSheet.flatten(style) || {};
  const flattenedFontWeight = flattenedStyle.fontWeight;
  let fontFamily;

  if (flattenedFontWeight === "bold") fontFamily = "roboto-bold";
  else if (flattenedFontWeight === "medium") fontFamily = "roboto-medium";
  else fontFamily = "roboto-regular";

  //Remove fontWeight from flattenedStyle so it doesn't override fontFamily
  const { fontWeight, ...restStyle } = flattenedStyle;

  return (
    <Text
      style={[
        {
          color: colors.textPrimary,
          fontFamily: fontFamily,
          fontSize: fontSizes.base,
        },
        restStyle, //All other style props except fontWeight
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function ThTextInput({
  style,
  placeholder = "Search Youtube",
  returnKeyType = "search",
  setClearButton,
  ...rest
}) {
  const { colors, fontSizes } = useTheme();

  return (
    <ThView style={[{ flex: 1 }, style]}>
      <TextInput
        style={[
          {
            borderRadius: 9999,
            paddingLeft: 14,
            paddingVertical: 8,
            backgroundColor: colors.bgSecondary,
            color: colors.textSecondary,
            fontSize: fontSizes.base,
            fontWeight: "medium",
          },
        ]}
        placeholderTextColor={colors.textSecondary}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        {...rest}
      />
      <ThPressable
        onPress={setClearButton}
        style={[
          {
            position: "absolute",
            top: 0,
            right: 0,
            padding: 6,
          },
        ]}
      >
        <ThIcon
          IconComponent={Ionicons}
          name="close"
          color={colors.iconSecondary}
        />
      </ThPressable>
    </ThView>
  );
}

export function ThView({ style, children, ...rest }) {
  return (
    <View style={[{ backgroundColor: "transparent" }, style]} {...rest}>
      {children}
    </View>
  );
}

/******************************Extended Themed Components******************************/
export function ThHeaderContainer({ style, children, ...rest }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ThView
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
    </ThView>
  );
}

export function ThTopQueryTab({ style, selected, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <ThPressable
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
    </ThPressable>
  );
}

export function ThSmallIconButton({ style, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <ThPressable
      style={({ pressed }) => [
        styles.iconTextButton,
        {
          backgroundColor: colors.bgSecondary,
          transform: [{ scale: pressed ? 0.94 : 1 }],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </ThPressable>
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

export function ThTextInputCloseButton({ style, ...rest }) {
  const { colors } = useTheme();
}
