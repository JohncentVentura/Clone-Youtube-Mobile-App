import { useEffect } from "react";
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
const AnimatedText = Animated.createAnimatedComponent(BaseText);

//#region Main Nav
export function BottomTabBarIconTab({ style, isActiveRoute, Icon, ...rest }) {
  const { colors } = useTheme();
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const backgroundValue = useSharedValue(0);
  const foregroundValue = useSharedValue(isActiveRoute ? 1 : 0);
  const animatedPressable = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundValue.value,
      [0, 1],
      [colors.bg, colors.bgInteractive]
    ),
  }));
  const animatedBorder = useAnimatedStyle(() => ({
    borderTopColor: interpolateColor(
      foregroundValue.value,
      [0, 1],
      [colors.borderSecondary, colors.primary]
    ),
  }));
  const animatedIconWrapper = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      foregroundValue.value,
      [0, 1],
      [colors.bgSecondary, colors.primary]
    ),
  }));
  const animatedIcon = useAnimatedStyle(() => ({
    color: interpolateColor(
      foregroundValue.value,
      [0, 1],
      [colors.iconSecondary, colors.iconContrast]
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
  const { colors, fontSizes } = useTheme();
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const backgroundValue = useSharedValue(0);
  const foregroundValue = useSharedValue(isActiveRoute ? 1 : 0);
  const animatedPressable = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundValue.value,
      [0, 1],
      [colors.bg, colors.bgInteractive]
    ),
  }));
  const animatedBorder = useAnimatedStyle(() => ({
    borderTopColor: interpolateColor(
      foregroundValue.value,
      [0, 1],
      [colors.borderSecondary, colors.primary]
    ),
  }));
  const animatedIcon = useAnimatedStyle(() => ({
    color: interpolateColor(
      foregroundValue.value,
      [0, 1],
      [colors.iconSecondary, colors.primary]
    ),
  }));
  const animatedText = useAnimatedStyle(() => ({
    color: interpolateColor(
      foregroundValue.value,
      [0, 1],
      [colors.textSecondary, colors.textPrimary]
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
            fontSize: fontSizes.xs2,
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
  const { colors, iconSizes } = useTheme();
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const sharedValue = useSharedValue(0);
  const animatedPressable = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      sharedValue.value,
      [0, 1],
      [colors.bg, colors.primary]
    ),
  }));
  const animatedIcon = useAnimatedStyle(() => ({
    color: interpolateColor(
      sharedValue.value,
      [0, 1],
      [iconColor || colors.iconPrimary, colors.iconContrast]
    ),
  }));
  const animatedText = useAnimatedStyle(() => ({
    color: interpolateColor(
      sharedValue.value,
      [0, 1],
      [colors.textPrimary, colors.textContrast]
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
      <AnimatedIcon size={iconSizes.lg} style={animatedIcon} />
      <AnimatedText style={[animatedText, { marginLeft: 18 }]}>
        {label}
      </AnimatedText>
    </AnimatedPressable>
  );
}
//#endregion

//#region Pressable
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
//#endregion

//#region Buttons
export function RippleButton({ style, rippleSize = 10, children, ...rest }) {
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

export function SmallIconTextButton({ style, Icon, text, ...rest }) {
  const { colors, fontSizes, iconSizes } = useTheme();
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const sharedValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sharedValue.value }],
  }));

  return (
    <AnimatedPressable
      style={[
        styles.smallIconTextButton,
        animatedStyle,
        { backgroundColor: colors.bgSecondary },
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
      <AnimatedIcon size={iconSizes.xs2} />
      <AnimatedText
        style={{
          paddingLeft: 4,
          fontSize: fontSizes.xs,
          fontWeight: "medium",
        }}
      >
        {text}
      </AnimatedText>
    </AnimatedPressable>
  );
}

export function TabButton({ style, isFirstTab, selected, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        {
          marginLeft: isFirstTab ? 0 : 8,
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
//#endregion

/*
export function AnimatedTabButton({ style, selected, children, ...rest }) {
  const { colors } = useTheme();
  const sharedValue = useSharedValue(selected ? 1 : 0);
  const animatedBackgroundColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      sharedValue.value,
      [0, 1],
      [colors.bgSecondary, colors.bgContrast]
    ),
  }));
  const animatedForegroundColor = useAnimatedStyle(() => ({
    color: interpolateColor(
      sharedValue.value,
      [0, 1],
      [colors.textPrimary, colors.textContrast]
    ),
  }));

  useEffect(() => {
    sharedValue.value = withTiming(selected ? 1 : 0, {
      duration: selected ? 250 : 500,
    });
  }, [selected]);

  return (
    <AnimatedPressable
      style={[
        animatedBackgroundColor,
        {
          marginLeft: 8,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 6,
        },
        style,
      ]}
      {...rest}
    >
      <AnimatedText style={animatedForegroundColor}>{children}</AnimatedText>
    </AnimatedPressable>
  );
}
*/
