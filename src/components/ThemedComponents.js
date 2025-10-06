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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

import { useTheme } from "../styles/ThemeContext";

/******************************Base Components******************************/
export function ThFlatList({ style, ...rest }) {
  const { colors } = useTheme();

  return <FlatList style={[{ backgroundColor: colors.bg }, style]} {...rest} />;
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
          },
          style(state),
        ]
      : (state) => [
          {
            backgroundColor: colors.bg,
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
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[{ backgroundColor: colors.bg }, style]}
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
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[{ backgroundColor: colors.bg }, style]}
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
  const weight = flattenedStyle.fontWeight;
  let fontFamily;

  if (weight === "bold") fontFamily = "roboto-bold";
  else if (weight === "medium") fontFamily = "roboto-medium";
  else fontFamily = "roboto-regular";

  //Remove fontWeight from the flattened style so it doesn't override fontFamily
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

export function ThTextInput({
  style,
  placeholder = "Search Youtube",
  returnKeyType = "search",
  ...rest
}) {
  const { colors, fontSizes } = useTheme();

  return (
    <TextInput
      style={[
        {
          borderRadius: 9999,
          paddingLeft: 16,
          paddingRight: 8,
          paddingVertical: 8,
          backgroundColor: colors.bgMuted,
          color: colors.textMuted,
          fontSize: fontSizes.base,
          fontWeight: "medium",
        },
        style,
      ]}
      placeholderTextColor={colors.textMuted}
      placeholder={placeholder}
      returnKeyType={returnKeyType}
      {...rest}
    />
  );
}

export function ThView({ style, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <View style={[{ backgroundColor: colors.bg }, style]} {...rest}>
      {children}
    </View>
  );
}

/******************************Extended Components******************************/
export function ThTopQueryTab({ style, selected, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <ThPressable
      style={[
        {
          marginLeft: 8,
          borderRadius: 4,
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: selected ? colors.bgAccent : colors.bgMuted,
        },
        style,
      ]}
      {...rest}
    >
      <ThText style={{ color: selected ? colors.textAccent : colors.text }}>
        {children}
      </ThText>
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

  return (
    <ThPressable
      style={[
        {
          position: "absolute",
          top: 0,
          right: 0,
          padding: 6,
          backgroundColor: "transparent",
        },
        style,
      ]}
      {...rest}
    >
      <ThIcon IconComponent={Ionicons} name="close" color={colors.iconMuted} />
    </ThPressable>
  );
}

/******************************Animated Components******************************/
export function AnimFadeRoundButton({
  style,
  roundSize = 10,
  children,
  ...rest
}) {
  const { colors } = useTheme();
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      pressed.value,
      [0, 1],
      ["transparent", colors.borderMuted]
    ),
    transform: [
      { scale: withTiming(pressed.value ? 1 : 0, { duration: 150 }) },
    ],
  }));

  return (
    <Pressable
      style={style}
      onPressIn={() => (pressed.value = withTiming(1, { duration: 200 }))}
      onPressOut={() => (pressed.value = withTiming(0, { duration: 400 }))}
      {...rest}
    >
      <Animated.View
        style={[
          {
            //Expand background outward
            position: "absolute",
            left: -roundSize,
            right: -roundSize,
            top: -roundSize,
            bottom: -roundSize,
            borderRadius: 9999,
          },
          animatedStyle,
        ]}
      />
      {children}
    </Pressable>
  );
}
