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

export function PlayShortsButton({ style, isPlaying, ...rest }) {
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
        transformValue.value = withDelay(250, withTiming(0, { duration: 300 }));
        opacityValue.value = withDelay(250, withTiming(0, { duration: 300 }));
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
        {ctxIsShortsVideoPlaying ? (
          <FontAwesome
            name="play"
            size={ctxIconSizes.xl2}
            color={ctxColors.iconPrimary}
          />
        ) : (
          <FontAwesome
            name="pause"
            size={ctxIconSizes.xl2}
            color={ctxColors.iconPrimary}
          />
        )}
      </Animated.View>
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
      <AnimatedIcon size={ctxIconSizes.xs2} color={ctxColors.white}/>
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

export function SmallIconTextButton({ style, Icon, text, ...rest }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
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
        { backgroundColor: ctxColors.bgSecondary },
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

export function SubscribeButton({ style, ...rest }) {
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
        styles.baseButton,
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
          fontSize: ctxFontSizes.xs,
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

export function TabButton({ style, isFirstTab, selected, children, ...rest }) {
  const { ctxColors } = useThemeContext();

  return (
    <Pressable
      style={[
        {
          marginLeft: isFirstTab ? 0 : 8,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: selected ? ctxColors.bgContrast : ctxColors.bgSecondary,
        },
        style,
      ]}
      {...rest}
    >
      <BaseText
        style={{ color: selected ? ctxColors.textContrast : ctxColors.textPrimary }}
      >
        {children}
      </BaseText>
    </Pressable>
  );
}
//#endregion

/*
export function AnimatedTabButton({ style, selected, children, ...rest }) {
  const { ctxColors } = useTheme();
  const sharedValue = useSharedValue(selected ? 1 : 0);
  const animatedBackgroundColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      sharedValue.value,
      [0, 1],
      [ctxColors.bgSecondary, ctxColors.bgContrast]
    ),
  }));
  const animatedForegroundColor = useAnimatedStyle(() => ({
    color: interpolateColor(
      sharedValue.value,
      [0, 1],
      [ctxColors.textPrimary, ctxColors.textContrast]
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
