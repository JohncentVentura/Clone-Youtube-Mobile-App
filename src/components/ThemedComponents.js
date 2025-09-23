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
export function ThFlatList({ style, ...otherProps }) {
  const { colors } = useTheme();

  return (
    <FlatList style={[{ backgroundColor: colors.bg }, style]} {...otherProps} />
  );
}

export function ThIcon({ IconComponent, ...rest }) {
  const { colors, iconSizes } = useTheme();

  return <IconComponent size={iconSizes.base} color={colors.icon} {...rest} />;
}

export function ThPressable({ style, children, ...rest }) {
  const { colors } = useTheme();

  /*To use ThemedPressable style as functions when used
  const functionStyle =
    typeof style === "function"
      ? (state) => [
          {
            backgroundColor: colors.bg,
            opacity: state.pressed ? 0.5 : 1,
          },
          style(state),
        ]
      : (state) => [
          {
            backgroundColor: colors.bg,
            opacity: state.pressed ? 0.5 : 1,
          },
          style,
        ];
  */

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

export function ThRowScrollView({ style, children, ...otherProps }) {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[{ backgroundColor: colors.bg }, style]}
      contentContainerStyle={StyleSheet.create({
        flexDirection: "row",
        alignItems: "center",
      })}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      {...otherProps}
    >
      {children}
    </ScrollView>
  );
}

export function ThText({ style, children, ...rest }) {
  const { colors, fontSizes } = useTheme();

  const flattenedStyle = StyleSheet.flatten(style) || {};
  const weight = flattenedStyle.fontWeight;
  let fontFamily;

  if (weight === "bold") fontFamily = "roboto-bold";
  else if (weight === "medium") fontFamily = "roboto-medium";
  else fontFamily = "roboto-regular";

  // Remove fontWeight from the flattened style so it doesn't override your fontFamily
  const { fontWeight, ...restStyle } = flattenedStyle;

  return (
    <Text
      style={[
        {
          color: colors.text,
          fontFamily,
          fontSize: fontSizes.base,
        },
        restStyle, // all other style props except fontWeight
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export function ThView({ style, children, ...otherProps }) {
  const { colors } = useTheme();

  return (
    <View style={[{ backgroundColor: colors.bg }, style]} {...otherProps}>
      {children}
    </View>
  );
}

/******************************Buttons******************************/
export function ThButton({ style, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: colors.bgGray,
          opacity: pressed ? 0.5 : 1, //fade effect
        },
        styles.baseButton,
        style,
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
}

export function ThIconTextButton({
  style,
  iconProps,
  textProps = {},
  children,
  ...rest
}) {
  const { colors, fontSizes, iconSizes } = useTheme();
  const { style: textStyle, ...otherTextProps } = textProps;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: colors.bgGray,
          flexDirection: "row",
          alignItems: "center",
          opacity: pressed ? 0.5 : 1, //fade effect
        },
        styles.baseButton,
        style,
      ]}
      {...rest}
    >
      <ThIcon size={iconSizes.xs} {...iconProps} />
      <ThText
        style={[{ paddingLeft: 4, fontWeight: "medium", fontSize: fontSizes.xs }, textStyle]}
        {...otherTextProps}
      >
        {children}
      </ThText>
    </Pressable>
  );
}

export function ThTopTabButton({ style, selected, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        {
          borderRadius: 4,
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: selected ? colors.text : colors.bgGray,
        },
        style,
      ]}
      {...rest}
    >
      <ThText style={{ color: selected ? colors.bg : colors.text }}>
        {children}
      </ThText>
    </Pressable>
  );
}
