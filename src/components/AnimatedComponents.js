import { Pressable } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
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
    transform: [{ scale: pressSharedValue.value }],
  }));

  return (
    <Pressable
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
      onPressIn={() => {
        pressSharedValue.value = withTiming(1, {
          duration: 100,
          easing: Easing.out(Easing.quad),
        });
      }}
      onPressOut={() => {
        pressSharedValue.value = withTiming(0, {
          duration: 400,
          easing: Easing.out(Easing.cubic),
        });
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
