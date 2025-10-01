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
import { styles } from "../styles/styles";

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
          paddingHorizontal: 16,
          paddingVertical: 8,
          fontSize: fontSizes.base,
          fontWeight: "medium",
          backgroundColor: colors.bgMuted,
        },
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
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

export function ThIconButtonText({ style, children, ...rest }) {
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
      //{ scale: withTiming(pressed.value ? 1 : 0, { duration: 150 }) },
    ],
  }));

  return (
    <Pressable
      style={style}
      onPressIn={() => (pressed.value = withTiming(1, { duration: 150 }))}
      onPressOut={() => (pressed.value = withTiming(0, { duration: 450 }))}
      {...rest}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            //Expand background outward
            top: -roundSize,
            bottom: -roundSize,
            left: -roundSize,
            right: -roundSize,
            borderRadius: 9999,
          },
          animatedStyle,
        ]}
      />
      {children}
    </Pressable>
  );
}
