import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";
import { BaseText } from "./TextComponents";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function BasePressable({ style, children, ...rest }) {
  const { colors } = useTheme();
  const sharedValue = useSharedValue(0);
  const { backgroundColor, ...restStyle } = StyleSheet.flatten(style) || {};
  const animatedBackgroundColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      sharedValue.value,
      [0, 1],
      [backgroundColor ?? colors.bg, colors.bgInteractive]
    ),
  }));

  return (
    <AnimatedPressable
      style={[animatedBackgroundColor, restStyle]}
      onPressIn={() => {
        sharedValue.value = withTiming(1, { duration: 0 });
      }}
      onPressOut={() => {
        sharedValue.value = withTiming(0, { duration: 400 });
      }}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}

export function RippleButton({ style, roundSize = 10, children, ...rest }) {
  const { colors } = useTheme();
  const sharedValue = useSharedValue(0);
  const { backgroundColor, ...restStyle } = StyleSheet.flatten(style) || {};
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      sharedValue.value,
      [0, 1],
      [backgroundColor ?? colors.bg, colors.bgInteractive]
    ),
    transform: [{ scale: sharedValue.value }],
  }));

  return (
    <Pressable
      style={[{ justifyContent: "center", alignItems: "center" }, restStyle]}
      onPressIn={() => {
        sharedValue.value = withTiming(1, { duration: 100 });
      }}
      onPressOut={() => {
        sharedValue.value = withTiming(0, { duration: 400 });
      }}
      {...rest}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            //If Pressable has padding: roundSize, then -roundSize / 10,
            left: -roundSize,
            right: -roundSize,
            top: -roundSize,
            bottom: -roundSize,
            borderRadius: 99,
          },
          animatedStyle,
        ]}
      />
      {children}
    </Pressable>
  );
}

export function SmallIconTextButton({ style, Icon, text, ...rest }) {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.iconTextButton,
        {
          transform: [{ scale: pressed ? 0.95 : 1 }],
          backgroundColor: colors.bgSecondary,
        },
        style,
      ]}
      {...rest}
    >
      <Icon size={iconSizes.xs2} />
      <BaseText
        style={{
          paddingLeft: 4,
          fontSize: fontSizes.xs,
          fontWeight: "medium",
        }}
      >
        {text}
      </BaseText>
    </Pressable>
  );
}

export function TabButton({ style, selected, children, ...rest }) {
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
      <BaseText
        style={{ color: selected ? colors.textContrast : colors.textPrimary }}
      >
        {children}
      </BaseText>
    </Pressable>
  );
}
