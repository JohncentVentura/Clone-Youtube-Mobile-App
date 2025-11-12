import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect } from "react";
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
import { shortenText } from "../utils/utils";
import { SubscribedChannelImage } from "./ImageComponents";
import { BaseText } from "./TextComponents";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = Animated.createAnimatedComponent(BaseText);

//#region Main Nav
export function BottomTabBarIconTab({ style, isActiveRoute, Icon, ...rest }) {
  const { ctxColors } = useThemeContext();
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const backgroundValue = useSharedValue(0);
  const foregroundValue = useSharedValue(isActiveRoute ? 1 : 0);
  const animatedPressable = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundValue.value,
      [0, 1],
      [ctxColors.bg, ctxColors.bgInteractive]
    ),
  }));
  const animatedBorder = useAnimatedStyle(() => ({
    borderTopColor: interpolateColor(
      foregroundValue.value,
      [0, 1],
      [ctxColors.borderSecondary, ctxColors.primary]
    ),
  }));
  const animatedIconWrapper = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      foregroundValue.value,
      [0, 1],
      [ctxColors.bgSecondary, ctxColors.primary]
    ),
  }));
  const animatedIcon = useAnimatedStyle(() => ({
    color: interpolateColor(
      foregroundValue.value,
      [0, 1],
      [ctxColors.iconSecondary, ctxColors.iconContrast]
    ),
  }));

  useEffect(() => {
    if (isActiveRoute) {
      foregroundValue.value = withTiming(1, { duration: 250 });
    } else if (!isActiveRoute) {
      foregroundValue.value = withTiming(0, { duration: 500 });
    }
  }, [isActiveRoute]);

  return (
    <AnimatedPressable
      style={[styles.mainBottomTab, animatedPressable, animatedBorder, style]}
      onPressIn={() => {
        backgroundValue.value = withTiming(1, { duration: 250 });
      }}
      onPressOut={() => {
        backgroundValue.value = withTiming(0, { duration: 500 });
      }}
      {...rest}
    >
      <Animated.View
        style={[animatedIconWrapper, { borderRadius: 99, padding: 6 }]}
      >
        <AnimatedIcon style={animatedIcon} />
      </Animated.View>
    </AnimatedPressable>
  );
}

export function BottomTabBarIconTextTab({
  style,
  isActiveRoute,
  Icon,
  label,
  ...rest
}) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const backgroundValue = useSharedValue(0);
  const foregroundValue = useSharedValue(isActiveRoute ? 1 : 0);
  const animatedPressable = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundValue.value,
      [0, 1],
      [ctxColors.bg, ctxColors.bgInteractive]
    ),
  }));
  const animatedBorder = useAnimatedStyle(() => ({
    borderTopColor: interpolateColor(
      foregroundValue.value,
      [0, 1],
      [ctxColors.borderSecondary, ctxColors.primary]
    ),
  }));
  const animatedIcon = useAnimatedStyle(() => ({
    color: interpolateColor(
      foregroundValue.value,
      [0, 1],
      [ctxColors.iconSecondary, ctxColors.primary]
    ),
  }));
  const animatedText = useAnimatedStyle(() => ({
    color: interpolateColor(
      foregroundValue.value,
      [0, 1],
      [ctxColors.textSecondary, ctxColors.textPrimary]
    ),
  }));

  useEffect(() => {
    if (isActiveRoute) {
      foregroundValue.value = withTiming(1, { duration: 250 });
    } else if (!isActiveRoute) {
      foregroundValue.value = withTiming(0, { duration: 500 });
    }
  }, [isActiveRoute]);

  return (
    <AnimatedPressable
      style={[styles.mainBottomTab, animatedPressable, animatedBorder, style]}
      onPressIn={() => {
        backgroundValue.value = withTiming(1, { duration: 250 });
      }}
      onPressOut={() => {
        backgroundValue.value = withTiming(0, { duration: 500 });
      }}
      {...rest}
    >
      <AnimatedIcon style={animatedIcon} />
      <AnimatedText
        style={[
          animatedText,
          {
            fontSize: ctxFontSizes.xs2,
            fontWeight: "medium",
          },
        ]}
      >
        {label}
      </AnimatedText>
    </AnimatedPressable>
  );
}
export function DrawerPressable({ style, Icon, iconColor, label, ...rest }) {
  const { ctxColors, ctxIconSizes } = useThemeContext();
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const sharedValue = useSharedValue(0);
  const animatedPressable = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      sharedValue.value,
      [0, 1],
      [ctxColors.bg, ctxColors.primary]
    ),
  }));
  const animatedIcon = useAnimatedStyle(() => ({
    color: interpolateColor(
      sharedValue.value,
      [0, 1],
      [iconColor || ctxColors.iconPrimary, ctxColors.iconContrast]
    ),
  }));
  const animatedText = useAnimatedStyle(() => ({
    color: interpolateColor(
      sharedValue.value,
      [0, 1],
      [ctxColors.textPrimary, ctxColors.textContrast]
    ),
  }));

  return (
    <AnimatedPressable
      style={[animatedPressable, style]}
      onPressIn={() => {
        sharedValue.value = withTiming(1, { duration: 250 });
      }}
      onPressOut={() => {
        sharedValue.value = withTiming(0, { duration: 500 });
      }}
      {...rest}
    >
      <AnimatedIcon size={ctxIconSizes.lg} style={animatedIcon} />
      <AnimatedText style={[animatedText, { marginLeft: 18 }]}>
        {label}
      </AnimatedText>
    </AnimatedPressable>
  );
}
//#endregion
//#region Pressable
export function BasePressable({ style, children, ...rest }) {
  const { ctxColors } = useThemeContext();
  const sharedValue = useSharedValue(0);
  const { backgroundColor, ...restStyle } = StyleSheet.flatten(style) || {};
  const animatedBackgroundColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      sharedValue.value,
      [0, 1],
      [backgroundColor ?? ctxColors.bg, ctxColors.bgInteractive]
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
//#endregion
//#region Buttons
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

export function RippleButton({ style, rippleSize = 10, children, ...rest }) {
  const { ctxColors } = useThemeContext();
  const sharedValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);
  const { backgroundColor, ...restStyle } = StyleSheet.flatten(style) || {};
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      sharedValue.value,
      [0, 1],
      [backgroundColor ?? ctxColors.bg, ctxColors.bgInteractive]
    ),
    transform: [{ scale: sharedValue.value }],
    opacity: opacityValue.value,
  }));

  return (
    <Pressable
      style={[
        {
          //backgroundColor: ctxColors.primary,
          justifyContent: "center",
          alignItems: "center",
        },
        restStyle,
      ]}
      onPressIn={() => {
        sharedValue.value = withTiming(1, { duration: 100 });
        opacityValue.value = withTiming(0.5, { duration: 0 });
      }}
      onPressOut={() => {
        sharedValue.value = withTiming(0, { duration: 400 });
        opacityValue.value = withTiming(0, { duration: 400 });
      }}
      {...rest}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            //If Pressable has padding: rippleSize, then -rippleSize / 10,
            left: -rippleSize,
            right: -rippleSize,
            top: -rippleSize,
            bottom: -rippleSize,
            borderRadius: 99,
          },
          animatedStyle,
        ]}
      />
      {children}
    </Pressable>
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
//#endregion
//#region Tabs
export function ImageTextTabButton({
  style,
  isSelected,
  selectedTabName,
  imageSource,
  text,
  ...rest
}) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const backgroundValue = useSharedValue(0);
  const opacityValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundValue.value,
      [0, 1],
      [ctxColors.bg, ctxColors.bgInteractive]
    ),
    opacity: opacityValue.value,
  }));

  useEffect(() => {
    if (isSelected) {
      backgroundValue.value = withTiming(1, { duration: 100 });
      opacityValue.value = withTiming(1, { duration: 100 });
    } else if (!isSelected && !selectedTabName) {
      backgroundValue.value = withTiming(0, { duration: 400 });
      opacityValue.value = withTiming(1, { duration: 400 });
    } else if (!isSelected) {
      backgroundValue.value = withTiming(0, { duration: 400 });
      opacityValue.value = withTiming(0.5, { duration: 400 });
    }
  }, [selectedTabName]);

  return (
    <AnimatedPressable
      style={[
        animatedStyle,
        {
          paddingVertical: 16,
          width: 70,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
      {...rest}
    >
      <SubscribedChannelImage source={{ uri: imageSource }} />
      <AnimatedText style={{ marginTop: 6, fontSize: ctxFontSizes.xs }}>
        {shortenText(text, 8)}
      </AnimatedText>
    </AnimatedPressable>
  );
}

export function TextTabButton({
  style,
  isFirstTab,
  isSelected,
  children,
  ...rest
}) {
  const { ctxColors } = useThemeContext();

  return (
    <Pressable
      style={[
        {
          marginLeft: isFirstTab ? 0 : 8,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: isSelected
            ? ctxColors.bgContrast
            : ctxColors.bgSecondary,
        },
        style,
      ]}
      {...rest}
    >
      <BaseText
        style={{
          color: isSelected ? ctxColors.textContrast : ctxColors.textPrimary,
        }}
      >
        {children}
      </BaseText>
    </Pressable>
  );
}
//#endregion
