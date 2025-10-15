import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { PanResponder, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";
import { styles } from "styles/styles";
import { AnimFadeRoundButton } from "./AnimatedComponents";
import {
  CloseIcon,
  DislikeIcon,
  DotVerticalIcon,
  LikeIcon,
  MessageTextIcon,
} from "./IconComponents";
import { MainVideoCommentImage } from "./ImageComponents";
import { ThText, ThTopQueryTab } from "./ThemedComponents";
import { ColumnScrollView, RowScrollView } from "./ScrollableComponents";

export default function CommentsModal({
  videoData,
  setIsVideoCommentModalVisible,
}) {
  const navigation = useNavigation();
  const { colors, fontSizes } = useTheme();

  const translateY = useSharedValue("100%");
  const backdropOpacity = useSharedValue(0);

  //Open modal
  useEffect(() => {
    translateY.value = withTiming(0, { duration: 250 });
    backdropOpacity.value = withTiming(0.5, { duration: 250 });
  }, []);

  //Close modal
  const closeModal = () => {
    translateY.value = withTiming("100%", { duration: 250 });
    backdropOpacity.value = withTiming(0, { duration: 250 }, (finished) => {
      if (finished) runOnJS(setIsVideoCommentModalVisible)(false);
    });
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const translateYStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 5, // start when dragging down
    onPanResponderMove: (_, gesture) => {
      if (gesture.dy > 0) translateY.value = gesture.dy; // move sheet
    },
    onPanResponderRelease: (_, gesture) => {
      // close if dragged far enough or fast
      if (gesture.dy > 120 || gesture.vy > 0.6) closeModal();
      else translateY.value = withTiming(0, { duration: 200 }); // snap back up
    },
  });

  return (
    <>
      {/*Background*/}
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "black" },
          backdropStyle,
        ]}
      >
        <Pressable onPress={closeModal} style={StyleSheet.absoluteFillObject} />
      </Animated.View>

      {/*Slide-up comment panel*/}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,

            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: "67%",
            backgroundColor: colors.bg,
          },
          translateYStyle,
        ]}
      >
        {/*Handle bar*/}
        <Pressable
          onPress={closeModal}
          style={{
            marginTop: 16,
            borderRadius: 99,
            width: 50,
            height: 5,
            backgroundColor: colors.borderSecondary,
            alignSelf: "center",
          }}
        />
        <View
          style={[
            styles.screenPadHorizontal,
            {
              marginTop: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <ThText style={{ fontSize: fontSizes.xl, fontWeight: "bold" }}>
            Comments
          </ThText>
          <CloseIcon onPress={closeModal} />
        </View>
        <SortOrderTabBar />
        <View
          style={{
            marginTop: 16,
            width: "100%",
            height: 1,
            backgroundColor: colors.borderSecondary,
          }}
        />
        <ColumnScrollView style={{ marginTop: 8 }}>
          <View
            style={[
              styles.screenPadHorizontal,
              {
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              },
            ]}
          >
            <MainVideoCommentImage
              style={{ marginTop: 10 }}
              source={{ uri: videoData.picture }}
              onPress={() => {
                navigation.navigate("ChannelScreen");
              }}
            />
            <View style={{ marginLeft: 14, marginTop: 8, flexShrink: 1 }}>
              <ThText
                style={{ fontSize: fontSizes.sm, color: colors.textSecondary }}
              >
                {videoData.channelTag} • {videoData.uploadedDate} ago
              </ThText>
              <ThText style={{ marginTop: 2, fontSize: fontSizes.sm }}>
                {videoData.commentsDescription}
              </ThText>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AnimFadeRoundButton roundSize={6}>
                  <LikeIcon />
                </AnimFadeRoundButton>
                <ThText style={{ marginLeft: 8, fontSize: fontSizes.sm }}>
                  {videoData.likes}
                </ThText>
                <AnimFadeRoundButton style={{ marginLeft: 20 }} roundSize={6}>
                  <DislikeIcon />
                </AnimFadeRoundButton>
                <AnimFadeRoundButton style={{ marginLeft: 20 }} roundSize={6}>
                  <MessageTextIcon />
                </AnimFadeRoundButton>
              </View>
            </View>
            <AnimFadeRoundButton
              style={{ marginLeft: "auto", marginTop: 6 }}
              roundSize={4}
            >
              <DotVerticalIcon />
            </AnimFadeRoundButton>
          </View>
        </ColumnScrollView>
      </Animated.View>
    </>
  );
}

const defaultQuery = "all";
function SortOrderTabBar({ navigation, setQuery }) {
  const { colors } = useTheme();
  const [selected, setSelected] = useState(defaultQuery);

  const handleSelectedQuery = (query) => {
    if (selected === query) {
      if (query !== defaultQuery) {
        setSelected(defaultQuery);
      }
    } else {
      setSelected(query);
    }
  };

  return (
    <RowScrollView style={[styles.screenPadHorizontal, { marginTop: 24 }]}>
      <ThTopQueryTab
        style={{ marginLeft: 0 }}
        selected={selected === defaultQuery}
        onPress={() => handleSelectedQuery(defaultQuery)}
      >
        Top
      </ThTopQueryTab>
      <ThTopQueryTab
        selected={selected === "Music"}
        onPress={() => handleSelectedQuery("Music")}
      >
        Newest
      </ThTopQueryTab>
    </RowScrollView>
  );
}
