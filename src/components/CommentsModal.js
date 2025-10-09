import { useEffect } from "react";
import { PanResponder, Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { ThText } from "./ThemedComponents";
import { screenHeight, styles } from "../styles/styles";
import { useTheme } from "../context/ThemeContext";

export default function CommentsModal({ setShowComments }) {
  const { colors } = useTheme();

  // Animated values for position and background fade
  const translateY = useSharedValue(screenHeight);
  const backdropOpacity = useSharedValue(0);

  // Open animation when component mounts
  useEffect(() => {
    translateY.value = withTiming(0, { duration: 250 });
    backdropOpacity.value = withTiming(0.5, { duration: 250 });
  }, []);

  // Close animation with smooth fade and slide down
  const close = () => {
    translateY.value = withTiming(screenHeight, { duration: 250 });
    backdropOpacity.value = withTiming(0, { duration: 250 }, (finished) => {
      if (finished) runOnJS(setShowComments)(false);
    });
  };

  // Style for fading backdrop
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  // Style for sliding sheet
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Detect and handle drag gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 5, // start when dragging down
    onPanResponderMove: (_, gesture) => {
      if (gesture.dy > 0) translateY.value = gesture.dy; // move sheet
    },
    onPanResponderRelease: (_, gesture) => {
      // close if dragged far enough or fast
      if (gesture.dy > 120 || gesture.vy > 0.6) close();
      else translateY.value = withTiming(0, { duration: 200 }); // snap back up
    },
  });

  return (
    <>
      {/* Background overlay */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
          },
          backdropStyle,
        ]}
      />

      {/* Tap outside to close */}
      <Pressable
        onPress={close}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "transparent",
        }}
      />

      {/* Slide-up comment panel */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "70%",
            backgroundColor: colors.bg,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
          },
          sheetStyle,
        ]}
      >
        {/* Handle bar */}
        <Pressable
          onPress={close}
          style={{
            alignSelf: "center",
            width: 50,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: colors.textSecondary,
            marginBottom: 10,
          }}
        />

        {/* Title */}
        <ThText
          style={[styles.fontMedium, styles.fontSizeLG, { marginBottom: 8 }]}
        >
          Comments Section
        </ThText>

        {/* Placeholder text */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThText style={{ color: colors.textSecondary }}>
            No comments yet... Be the first one!
          </ThText>
        </View>
      </Animated.View>
    </>
  );
}
