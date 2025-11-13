import React, { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import {
  DislikeIcon,
  DotVerticalIcon,
  LikeIcon,
  MessageTextIcon,
  ShareIcon,
} from "./IconComponents";
import {
  CommentsProfileSmallImage,
  MainVideoChannelImage,
  SubscribedPostImage,
} from "./ImageComponents";
import { BaseText } from "./TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { useSetImageData } from "../hooks/useSetImageData";
import { screenWidth, styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import { shortenText } from "../utils/utils";
import { BasePressable, RippleButton } from "./PressableComponents";

export default function PostComponent({
  style,
  isLoading,
  setisLoading,
  navigation,
  videoData,
}) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const { ctxSetModalVideoData, ctxSetPostCommentsModal } = useUIContext();
  const [postedImages, setPostedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  useSetImageData({
    query: videoData.title,
    queryResults: 3,
    setData: setPostedImages,
    setisLoading,
    dependencies: [videoData.title],
  });

  const handleScroll = (event) => {
    const index =
      Math.round(event.nativeEvent.contentOffset.x / screenWidth) + 1;
    setCurrentIndex(index);
  };

  return isLoading ? (
    <ActivityIndicator style={{ flex: 1 }} size="large" />
  ) : (
    <View style={[styles.screenPadHorizontal, { paddingBottom: 16 }, style]}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MainVideoChannelImage
          source={{ uri: videoData.picture }}
          onPress={() => {
            navigation.navigate(navPaths.channelScreen, {
              videoData: videoData,
            });
          }}
        />
        <View style={{ marginLeft: 8 }}>
          <BaseText
            style={{ fontSize: ctxFontSizes.base, fontWeight: "medium" }}
          >
            {videoData.channelName}
          </BaseText>
          <BaseText style={{ marginTop: 4, fontSize: ctxFontSizes.sm }}>
            {videoData.uploadedDate}
          </BaseText>
        </View>
        <RippleButton style={{ marginLeft: "auto" }}>
          <DotVerticalIcon />
        </RippleButton>
      </View>
      <BaseText style={{ marginTop: 8 }}>
        {shortenText(videoData.description, 100)}{" "}
      </BaseText>
      <PostedImageScrollView
        style={{ marginTop: 8 }}
        currentIndex={currentIndex}
        imageData={postedImages}
        onScroll={handleScroll}
      />

      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RippleButton>
            <LikeIcon />
          </RippleButton>
          <BaseText style={{ marginLeft: 8 }}>{videoData.likes}</BaseText>
          <RippleButton style={{ marginLeft: 16 }}>
            <DislikeIcon />
          </RippleButton>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RippleButton>
            <ShareIcon size={ctxIconSizes.xl} />
          </RippleButton>
          <RippleButton
            style={{ marginLeft: 16 }}
            onPress={() => {
              ctxSetModalVideoData(videoData);
              ctxSetPostCommentsModal(true);
            }}
          >
            <MessageTextIcon size={ctxIconSizes.lg} />
          </RippleButton>
          <BaseText style={{ marginLeft: 8 }}>
            {videoData.commentsCount}
          </BaseText>
        </View>
      </View>

      <BasePressable
        style={{
          marginTop: 16,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingTop: 8,
          backgroundColor: ctxColors.bgSecondary,
        }}
        onPress={() => {
          ctxSetModalVideoData(videoData);
          ctxSetPostCommentsModal(true);
        }}
      >
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <BaseText
            style={{
              fontSize: ctxFontSizes.sm,
              fontWeight: "medium",
            }}
          >
            Comments
          </BaseText>
          <BaseText
            style={{
              marginLeft: 10,
              fontSize: ctxFontSizes.xs,
              color: ctxColors.textSecondary,
            }}
          >
            {videoData.commentsCount}
          </BaseText>
        </View>
        <View
          style={{
            paddingVertical: 14,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CommentsProfileSmallImage
            source={{ uri: videoData.picture }}
            onPress={() => {
              ctxSetModalVideoData(videoData);
              ctxSetPostCommentsModal(true);
            }}
          />
          <BaseText
            style={{
              marginLeft: 10,
              fontSize: ctxFontSizes.xs,
              flex: 1,
            }}
          >
            {videoData.commentsDescription}
          </BaseText>
        </View>
      </BasePressable>
    </View>
  );
}

export function PostedImageScrollView({
  style,
  currentIndex,
  imageData,
  onScroll,
  ...rest
}) {
  const { ctxColors, ctxFontSizes } = useThemeContext();

  return (
    <View style={[{ width: "100%", height: 400 }, style]} {...rest}>
      <ScrollView
        onScroll={onScroll}
        horizontal={true}
        pagingEnabled={true}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {imageData.map((image, index) => (
          <SubscribedPostImage
            key={index}
            style={{ width: screenWidth * 0.92, height: 400 }}
            source={{ uri: image.picture }}
          />
        ))}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 4,
          backgroundColor: ctxColors.transparentBlack,
        }}
      >
        <BaseText
          style={{
            fontSize: ctxFontSizes.xs,
            fontWeight: "medium",
            color: ctxColors.white,
          }}
        >
          {currentIndex}/{imageData.length}
        </BaseText>
      </View>
    </View>
  );
}
