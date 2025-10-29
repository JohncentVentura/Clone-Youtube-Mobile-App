import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useThemeContext } from "../../context/ThemeContext";
import { useUIContext } from "../../context/UIContext";
import { useSetVideoData } from "../../hooks/useSetVideoData";
import { navigate } from "../../navigations/NavigationConfig";
import { styles } from "../../styles/styles";
import { ColumnScrollView, RowScrollView } from "../ContainerComponents";
import {
  ArrowBackIcon,
  CloseIcon,
  DislikeIcon,
  DotVerticalIcon,
  LikeIcon,
  MessageTextIcon,
} from "../IconComponents";
import {
  CommentsProfileSmallImage,
  CommentsProfileLargeImage,
} from "../ImageComponents";
import { RippleButton, BasePressable, TabButton } from "../PressableComponents";
import { BaseText } from "../TextComponents";
import { SwipeDownModal } from "./SwipeDownModals";

export function HomeCommentsModal() {
  const insets = useSafeAreaInsets();
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const { ctxModalVideoData, ctxSetHomeCommentsModal } = useUIContext();
  const [commentSelectedQuery, setCommentSelectedQuery] = useState(
    ctxModalVideoData.query
  );
  const [commentVideos, setCommentVideos] = useState([]);
  const [commentSelectedVideos, setCommentSelectedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isACommentSelected, setIsACommentSelected] = useState(false);
  const backdropOpacityValue = useSharedValue(0);
  const translateYValue = useSharedValue("100%");

  useSetVideoData({
    query: ctxModalVideoData.query,
    queryResults: 6,
    setVideos: setCommentVideos,
    setIsLoading,
    dependencies: [ctxModalVideoData],
  });

  useSetVideoData({
    query: commentSelectedQuery,
    queryResults: 6,
    setVideos: setCommentSelectedVideos,
    setIsLoading,
    dependencies: [commentSelectedQuery],
  });

  //Open modal
  useEffect(() => {
    backdropOpacityValue.value = withTiming(0.5, { duration: 250 });
    translateYValue.value = withTiming(0, { duration: 250 });
  }, []);

  const closeModal = () => {
    backdropOpacityValue.value = withTiming(0, { duration: 250 });
    translateYValue.value = withTiming("100%", { duration: 250 });
    setTimeout(() => {
      ctxSetHomeCommentsModal(false);
    }, 250);
  };

  //Close modal on back button press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        closeModal();
        return true; //Prevent default behavior
      }
    );

    return () => backHandler.remove(); //Cleanup when modal unmounts
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (e, gesture) => gesture.dy > 5, //Start when dragging down
    onPanResponderMove: (e, gesture) => {
      if (gesture.dy > 0) translateYValue.value = gesture.dy; //Move sheet
    },
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dy > 120 || gesture.vy > 0.6)
        closeModal(); //Close if dragged far enough or fast
      else translateYValue.value = withTiming(0, { duration: 200 }); //Snap back up
    },
  });

  const backdropOpacityStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacityValue.value,
  }));

  const translateYStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYValue.value }],
  }));

  return (
    <>
      {/*Background*/}
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "black" },
          backdropOpacityStyle,
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
            backgroundColor: ctxColors.bg,
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
            backgroundColor: ctxColors.borderSecondary,
            alignSelf: "center",
          }}
        />

        {isLoading ? (
          <ActivityIndicator style={{ flex: 1 }} size="large" />
        ) : !isACommentSelected ? (
          <>
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
              <BaseText
                style={{ fontSize: ctxFontSizes.xl, fontWeight: "bold" }}
              >
                Comments
              </BaseText>
              <CloseIcon onPress={closeModal} />
            </View>
            <SortOrderTabBar />
            <ColumnScrollView style={{ marginBottom: insets.bottom }}>
              {commentVideos.map((item, index) => (
                <HomeCommentItem
                  key={index}
                  videoData={item}
                  setIsACommentSelected={setIsACommentSelected}
                  setCommentSelectedQuery={setCommentSelectedQuery}
                />
              ))}
            </ColumnScrollView>
          </>
        ) : (
          <>
            <View
              style={[
                styles.screenPadHorizontal,
                {
                  marginTop: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: ctxColors.borderSecondary,
                  paddingBottom: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <ArrowBackIcon onPress={() => setIsACommentSelected(false)} />
              <BaseText
                style={{
                  marginLeft: 16,
                  fontSize: ctxFontSizes.xl,
                  fontWeight: "bold",
                }}
              >
                Return
              </BaseText>
              <CloseIcon style={{ marginLeft: "auto" }} onPress={closeModal} />
            </View>
            <ColumnScrollView style={{ marginBottom: insets.bottom }}>
              {commentSelectedVideos.map((item, index) => (
                <HomeCommentItem
                  key={index}
                  style={{ marginLeft: index * 12 }}
                  videoData={item}
                />
              ))}
            </ColumnScrollView>
          </>
        )}
      </Animated.View>
    </>
  );
}

export function HomeCommentsProfileModal({ isVisible, setIsVisible }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const {
    ctxModalVideoData,
    ctxSetHomeCommentsModal,
    ctxSetHomeCommentsProfileModal,
    ctxSetHomeCommentsProfileItemModal,
  } = useUIContext();

  return (
    <SwipeDownModal
      style={{ paddingHorizontal: 16, paddingBottom: 10 }}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <CommentsProfileLargeImage
          style={{ marginTop: 4 }}
          source={{ uri: ctxModalVideoData.picture }}
          onPress={() => {
            ctxSetHomeCommentsModal(false);
            ctxSetHomeCommentsProfileModal(false);
            navigate("ChannelScreen", { videoData: ctxModalVideoData });
          }}
        />
        <View style={{ marginLeft: 16, flexShrink: 1 }}>
          <BaseText
            style={{
              fontSize: ctxFontSizes.xl2,
              fontWeight: "bold",
            }}
          >
            {ctxModalVideoData.channelName}
          </BaseText>
          <BaseText
            style={{
              marginTop: 4,
              fontSize: ctxFontSizes.xs,
              fontWeight: "medium",
            }}
          >
            {ctxModalVideoData.channelTag}
          </BaseText>
          <BaseText
            style={{
              marginTop: 4,
              fontSize: ctxFontSizes.xs,
              color: ctxColors.textSecondary,
            }}
          >
            Joined {ctxModalVideoData.channelJoinedDate} •{" "}
            {ctxModalVideoData.channelSubscribers} subscribers
          </BaseText>
        </View>
        <RippleButton
          style={{ marginLeft: "auto" }}
          onPress={() => ctxSetHomeCommentsProfileItemModal(true)}
        >
          <DotVerticalIcon />
        </RippleButton>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.wideButton,
          {
            marginTop: 12,
            backgroundColor: ctxColors.bgSecondary,
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={() => {
          ctxSetHomeCommentsModal(false);
          ctxSetHomeCommentsProfileModal(false);
          navigate("ChannelScreen", { videoData: ctxModalVideoData });
        }}
      >
        <BaseText style={{ fontWeight: "medium" }}>View Channel</BaseText>
      </Pressable>
    </SwipeDownModal>
  );
}

function SortOrderTabBar() {
  const { ctxColors } = useThemeContext();
  const defaultQuery = "all";
  const [selected, setSelected] = useState(defaultQuery);
  const selectableTabs = [
    { label: "Top", query: defaultQuery },
    { label: "New", query: "New" },
  ];

  const handleSelected = (query) =>
    setSelected((prev) =>
      prev === query && query !== defaultQuery ? defaultQuery : query
    );

  return (
    <RowScrollView
      style={[
        styles.screenPadHorizontal,
        {
          marginTop: 16,
          borderBottomWidth: 1,
          borderBottomColor: ctxColors.borderSecondary,
          paddingBottom: 8,
          width: "100%",
          height: 60,
        },
      ]}
    >
      {selectableTabs.map((item, index) => {
        return (
          <TabButton
            key={index}
            isFirstTab={index === 0}
            selected={selected === item.query}
            onPress={() => handleSelected(item.query)}
          >
            {item.label}
          </TabButton>
        );
      })}
    </RowScrollView>
  );
}

function HomeCommentItem({
  style,
  videoData,
  setIsACommentSelected,
  setCommentSelectedQuery,
}) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const {
    ctxSetModalVideoData,
    ctxSetHomeCommentsProfileModal,
    ctxSetHomeCommentsItemModal,
  } = useUIContext();

  return (
    <BasePressable
      style={[
        styles.screenPadHorizontal,
        {
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        },
        style,
      ]}
      onPress={() => {
        setCommentSelectedQuery?.(videoData.title);
        setIsACommentSelected?.(true);
      }}
    >
      <CommentsProfileSmallImage
        style={{ marginTop: 10 }}
        source={{ uri: videoData.picture }}
        onPress={() => {
          ctxSetModalVideoData(videoData);
          ctxSetHomeCommentsProfileModal(true);
        }}
      />
      <View style={{ marginLeft: 14, marginTop: 8, flexShrink: 1 }}>
        <BaseText
          style={{ fontSize: ctxFontSizes.xs, color: ctxColors.textSecondary }}
        >
          {videoData.channelTag} • {videoData.uploadedDate}
        </BaseText>
        <BaseText style={{ marginTop: 2, fontSize: ctxFontSizes.xs }}>
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
            rippleSize={6}
            onPress={() => console.log("Comment Like Press")}
          >
            <LikeIcon size={ctxIconSizes.xs2} />
          </RippleButton>
          <BaseText style={{ marginLeft: 8, fontSize: ctxFontSizes.xs }}>
            {videoData.likes}
          </BaseText>
          <RippleButton
            style={{ marginLeft: 20 }}
            rippleSize={6}
            onPress={() => console.log("Comment Dislike Press")}
          >
            <DislikeIcon size={ctxIconSizes.xs2} />
          </RippleButton>
          <RippleButton
            style={{ marginLeft: 24 }}
            rippleSize={6}
            onPress={() => console.log("Comment Messages Press")}
          >
            <MessageTextIcon size={ctxIconSizes.xs} />
          </RippleButton>
        </View>
      </View>
      <RippleButton
        style={{ marginLeft: "auto", marginTop: 6 }}
        rippleSize={4}
        onPress={() => ctxSetHomeCommentsItemModal(true)}
      >
        <DotVerticalIcon size={ctxIconSizes.xs} />
      </RippleButton>
    </BasePressable>
  );
}
