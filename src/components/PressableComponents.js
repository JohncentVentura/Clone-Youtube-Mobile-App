import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useThemeContext } from "../context/ThemeContext";
import { styles } from "../styles/styles";
import { shortenText } from "../utils/utils";
import { SubscribedChannelImage } from "./ImageComponents";
import { BaseText } from "./TextComponents";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = Animated.createAnimatedComponent(BaseText);

//#region Pressables
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

export function RippleFXPressable({
  style,
  rippleSize = 10,
  children,
  ...rest
}) {
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
//#endregion
//#region Tabs
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

export function ImageTextTab({
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

export function TextTab({ style, isFirstTab, isSelected, children, ...rest }) {
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
