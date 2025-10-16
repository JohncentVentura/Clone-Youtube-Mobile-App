import { useEffect, useState } from "react";
import { PanResponder, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../../context/ThemeContext";
import { navigate } from "../../navigations/NavigationService";
import { styles } from "../../styles/styles";
import { ColumnScrollView, RowScrollView } from "../ContainerComponents";
import {
  CloseIcon,
  DislikeIcon,
  DotVerticalIcon,
  LikeIcon,
  MessageTextIcon,
} from "../IconComponents";
import { MainVideoCommentImage } from "../ImageComponents";
import { RippleButton, BasePressable, TabButton } from "../PressableComponents";
import { BaseText } from "../TextComponents";

export default function CommentsModal({
  videoData,
  setIsVideoCommentModalVisible,
}) {
  const { colors, fontSizes, iconSizes } = useTheme();

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
          <BaseText style={{ fontSize: fontSizes.xl, fontWeight: "bold" }}>
            Comments
          </BaseText>
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
          <BasePressable
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
                navigate("ChannelScreen", { videoData: videoData });
                closeModal();
              }}
            />
            <View style={{ marginLeft: 14, marginTop: 8, flexShrink: 1 }}>
              <BaseText
                style={{ fontSize: fontSizes.xs, color: colors.textSecondary }}
              >
                {videoData.channelTag} • {videoData.uploadedDate} ago
              </BaseText>
              <BaseText style={{ marginTop: 2, fontSize: fontSizes.xs }}>
                {videoData.commentsDescription}
              </BaseText>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RippleButton
                  roundSize={6}
                  onPress={() => console.log("Comment Like Press")}
                >
                  <LikeIcon size={iconSizes.xs2} />
                </RippleButton>
                <BaseText style={{ marginLeft: 8, fontSize: fontSizes.xs }}>
                  {videoData.likes}
                </BaseText>
                <RippleButton
                  style={{ marginLeft: 20 }}
                  roundSize={6}
                  onPress={() => console.log("Comment Dislike Press")}
                >
                  <DislikeIcon size={iconSizes.xs2} />
                </RippleButton>
                <RippleButton
                  style={{ marginLeft: 24 }}
                  roundSize={6}
                  onPress={() => console.log("Comment Messages Press")}
                >
                  <MessageTextIcon size={iconSizes.xs} />
                </RippleButton>
              </View>
            </View>
            <RippleButton
              style={{ marginLeft: "auto", marginTop: 6 }}
              roundSize={4}
            >
              <DotVerticalIcon size={iconSizes.sm} />
            </RippleButton>
          </BasePressable>
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
      <TabButton
        style={{ marginLeft: 0 }}
        selected={selected === defaultQuery}
        onPress={() => handleSelectedQuery(defaultQuery)}
      >
        Top
      </TabButton>
      <TabButton
        selected={selected === "Music"}
        onPress={() => handleSelectedQuery("Music")}
      >
        Newest
      </TabButton>
    </RowScrollView>
  );
}
