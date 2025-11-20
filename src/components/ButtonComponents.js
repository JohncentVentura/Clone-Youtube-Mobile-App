import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { styles } from "../styles/styles";
import { BaseText } from "./TextComponents";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = Animated.createAnimatedComponent(BaseText);

export function IconRoundedButton({ style, children, ...rest }) {
  const { ctxColors } = useThemeContext();
  const sharedValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sharedValue.value }],
  }));

  return (
    <AnimatedPressable
      style={[
        { backgroundColor: "transparent" },
        styles.roundButton,
        animatedStyle,
        style,
      ]}
      onPressIn={() => {
        sharedValue.value = withTiming(0.9, { duration: 100 });
      }}
      onPressOut={() => {
        sharedValue.value = withTiming(1, { duration: 400 });
      }}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}

export function IconTextButton({ style, Icon, text, ...rest }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const sharedValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sharedValue.value }],
  }));

  return (
    <AnimatedPressable
      style={[animatedStyle, { backgroundColor: ctxColors.bgSecondary }, style]}
      onPressIn={() => {
        sharedValue.value = withTiming(0.9, { duration: 100 });
      }}
      onPressOut={() => {
        sharedValue.value = withTiming(1, { duration: 400 });
      }}
      {...rest}
    >
      <AnimatedIcon size={ctxIconSizes.xs2} />
      <AnimatedText
        style={{
          paddingLeft: 4,
          fontSize: ctxFontSizes.xs,
          fontWeight: "medium",
        }}
      >
        {text}
      </AnimatedText>
    </AnimatedPressable>
  );
}

export function MinimizingButton({ style, children, ...rest }) {
  const sharedValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sharedValue.value }],
  }));

  return (
    <AnimatedPressable
      style={[styles.baseButton, animatedStyle, style]}
      onPressIn={() => {
        sharedValue.value = withTiming(0.9, { duration: 100 });
      }}
      onPressOut={() => {
        sharedValue.value = withTiming(1, { duration: 400 });
      }}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}

export function OutlinedButton({ style, children, ...rest }) {
  const { ctxColors } = useThemeContext();
  const sharedValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sharedValue.value }],
  }));

  return (
    <AnimatedPressable
      style={[
        styles.smallButton,
        animatedStyle,
        {
          borderWidth: 1,
          borderColor: ctxColors.borderPrimary,
          backgroundColor: "transparent",
        },
        style,
      ]}
      onPressIn={() => {
        sharedValue.value = withTiming(0.9, { duration: 100 });
      }}
      onPressOut={() => {
        sharedValue.value = withTiming(1, { duration: 400 });
      }}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}

export function ShortsIconTextButton({ style, Icon, text, ...rest }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const sharedValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sharedValue.value }],
  }));

  return (
    <AnimatedPressable
      style={[
        styles.baseButton,
        animatedStyle,
        { backgroundColor: ctxColors.transparentBlack, flexDirection: "row" },
        style,
      ]}
      onPressIn={() => {
        sharedValue.value = withTiming(0.9, { duration: 100 });
      }}
      onPressOut={() => {
        sharedValue.value = withTiming(1, { duration: 400 });
      }}
      {...rest}
    >
      <AnimatedIcon size={ctxIconSizes.xs2} color={ctxColors.white} />
      <AnimatedText
        style={{
          marginLeft: 6,
          fontSize: ctxFontSizes.sm,
          fontWeight: "medium",
          color: ctxColors.white,
        }}
      >
        {text}
      </AnimatedText>
    </AnimatedPressable>
  );
}

export function ShortsPlayButton({ style, ...rest }) {
  const { ctxColors, ctxIconSizes } = useThemeContext();
  const { ctxIsShortsVideoPlaying } = useUIContext();
  const transformValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: transformValue.value }],
    opacity: opacityValue.value,
  }));

  return (
    <AnimatedPressable
      style={[
        { justifyContent: "center", alignItems: "center" },
        StyleSheet.absoluteFill,
        style,
      ]}
      onPressIn={() => {
        transformValue.value = withTiming(1, { duration: 100 });
        opacityValue.value = withTiming(1, { duration: 100 });
      }}
      onPressOut={() => {
        transformValue.value = withDelay(250, withTiming(0, { duration: 200 }));
        opacityValue.value = withDelay(250, withTiming(0, { duration: 200 }));
      }}
      {...rest}
    >
      <Animated.View
        style={[
          {
            borderRadius: 99,
            height: 88,
            width: 88,
            backgroundColor: ctxColors.bgSecondary,
            justifyContent: "center",
            alignItems: "center",
          },
          animatedStyle,
        ]}
      >
        <FontAwesome
          name={ctxIsShortsVideoPlaying ? "play" : "pause"}
          size={ctxIconSizes.xl2}
          color={ctxColors.iconPrimary}
        />
      </Animated.View>
    </AnimatedPressable>
  );
}

export function SubscribeButton({ style, fontSize, ...rest }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const sharedValue = useSharedValue(1);
  const { backgroundColor, ...restStyle } = StyleSheet.flatten(style) || {};
  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: sharedValue.value,
  }));

  return (
    <AnimatedPressable
      style={[
        { backgroundColor: backgroundColor || ctxColors.bgContrast },
        animatedOpacity,
        restStyle,
      ]}
      onPressIn={() => {
        sharedValue.value = withTiming(0.5, { duration: 0 });
      }}
      onPressOut={() => {
        sharedValue.value = withTiming(1, { duration: 400 });
      }}
      {...rest}
    >
      <BaseText
        style={{
          fontSize: fontSize || ctxFontSizes.xs,
          fontWeight: "medium",
          color:
            backgroundColor === ctxColors.white
              ? ctxColors.black
              : ctxColors.textContrast,
        }}
        onPress={() => console.log("Subscribe Press")}
      >
        Subscribe
      </BaseText>
    </AnimatedPressable>
  );
}
