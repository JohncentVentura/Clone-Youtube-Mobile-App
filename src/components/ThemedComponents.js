import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { icons } from "../styles/icons";
import { useTheme } from "../styles/ThemeContext";

/******************************Base Components******************************/
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

  //Allows style to be static (normal) or functional (access props)
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

  return (
    <Pressable style={functionStyle} {...rest}>
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

  //Remove fontWeight from the flattened style so it doesn't override your fontFamily
  const { fontWeight, ...restStyle } = flattenedStyle;

  return (
    <Text
      style={[
        {
          color: colors.text,
          fontFamily,
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

export function ThView({ style, children, ...otherProps }) {
  const { colors } = useTheme();

  return (
    <View style={[{ backgroundColor: colors.bg }, style]} {...otherProps}>
      {children}
    </View>
  );
}

/******************************Extended Components******************************/
export function ThTopTabButton({ style, selected, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <ThPressable
      style={[
        {
          marginLeft: 8,
          borderRadius: 4,
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: selected ? colors.text : colors.bgGray,
          opacity: 1,
        },
        style,
      ]}
      {...rest}
    >
      <ThText style={{ color: selected ? colors.bg : colors.text }}>
        {children}
      </ThText>
    </ThPressable>
  );
}

export function ThIconButtonText({ style, children, ...otherProps }) {
  const { fontSizes } = useTheme();

  return (
    <ThText
      style={[
        { paddingLeft: 4, fontWeight: "medium", fontSize: fontSizes.xs },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </ThText>
  );
}
