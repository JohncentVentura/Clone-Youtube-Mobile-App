import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "../context/ThemeContext";

export function AnimFadeRoundButton({
  style,
  roundSize = 10,
  children,
  ...rest
}) {
  const { colors } = useTheme();
  const pressSharedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      pressSharedValue.value,
      [0, 1],
      ["transparent", colors.bgInteractive]
    ),
    transform: [
      {
        scale: withTiming(pressSharedValue.value ? 1 : 0, { duration: 150 }),
      },
    ],
  }));

  return (
    <Pressable
      style={style}
      onPressIn={() =>
        (pressSharedValue.value = withTiming(1, { duration: 200 }))
      }
      onPressOut={() =>
        (pressSharedValue.value = withTiming(0, { duration: 400 }))
      }
      {...rest}
    >
      <Animated.View
        style={[
          {
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
