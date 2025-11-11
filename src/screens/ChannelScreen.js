import { useState } from "react";
import { Pressable, View } from "react-native";
import {
  MainVideoFlatList,
  MixedFeedFlatList,
  ScreenContainer,
  RowScrollView,
  ShortsVideoGridScrollView,
  ColumnScrollView,
} from "../components/ContainerComponents";
import {
  ChannelCoverImage,
  ChannelProfileImage,
} from "../components/ImageComponents";
import PostComponent from "../components/PostComponent";
import {
  SubscribeButton,
  TextTabButton,
} from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useSetVideoData } from "../hooks/useSetVideoData";
import { styles } from "../styles/styles";

const CONTENT_TYPES = {
  ALL: "All",
  VIDEOS: "Videos",
  SHORTS: "Shorts",
  POSTS: "Posts",
};

export default function ChannelScreen({ navigation, route }) {
  const { videoData } = route.params;
  const [channelMainVideos, setChannelMainVideos] = useState([]);
  const [channelShortsVideos, setChannelShortsVideos] = useState([]);
  const [contentType, setContentType] = useState(CONTENT_TYPES.ALL);
  const [isLoading, setIsLoading] = useState(true);

  useSetVideoData({
    query: videoData.channelName,
    queryResults: 5,
    setVideos: setChannelMainVideos,
    setIsLoading,
    dependencies: [videoData.channelName],
  });

  useSetVideoData({
    videoDataType: "shorts",
    query: videoData.channelName,
    queryResults: 8,
    setVideos: setChannelShortsVideos,
    setIsLoading,
    dependencies: [videoData.channelName],
  });

  return (
    <ScreenContainer>
      {contentType === CONTENT_TYPES.ALL ? (
        <MixedFeedFlatList
          style={{ marginTop: 8 }}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          navigation={navigation}
          query={videoData.channelName}
          ListHeaderComponent={
            <ChannelHeader
              style={styles.screenPadHorizontal}
              videoData={videoData}
              contentType={contentType}
              setContentType={setContentType}
            />
          }
          mixedData={[
            ...channelMainVideos.slice(0, 3).map((video) => ({
              type: "mainVideo",
              data: video,
            })),
            ...channelMainVideos.slice(0, 3).map((video) => ({
              type: "posts",
              data: video,
            })),
            {
              type: "shortsVideos",
              data: channelShortsVideos,
            },
            ...channelMainVideos.slice(3, 5).map((video) => ({
              type: "mainVideo",
              data: video,
            })),
            ...channelMainVideos.slice(3, 5).map((video) => ({
              type: "posts",
              data: video,
            })),
          ]}
        />
      ) : contentType === CONTENT_TYPES.VIDEOS ? (
        <MainVideoFlatList
          style={{ marginTop: 8 }}
          isLoading={isLoading}
          data={channelMainVideos}
          navigation={navigation}
          query={videoData.channelName}
          ListHeaderComponent={
            <ChannelHeader
              style={styles.screenPadHorizontal}
              videoData={videoData}
              contentType={contentType}
              setContentType={setContentType}
            />
          }
        />
      ) : contentType === CONTENT_TYPES.SHORTS ? (
        <>
          <ShortsVideoGridScrollView
            style={[{ marginTop: 8 }]}
            isLoading={isLoading}
            data={channelShortsVideos}
            navigation={navigation}
            headerComponent={
              <ChannelHeader
                videoData={videoData}
                contentType={contentType}
                setContentType={setContentType}
              />
            }
          />
        </>
      ) : (
        contentType === CONTENT_TYPES.POSTS && (
          <>
            <ColumnScrollView style={{ marginTop: 8 }}>
              <ChannelHeader
                style={[styles.screenPadHorizontal, { width: "100%" }]}
                videoData={videoData}
                contentType={contentType}
                setContentType={setContentType}
              />
              {channelMainVideos.map((item, index) => (
                <PostComponent
                  key={index}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  navigation={navigation}
                  videoData={item}
                />
              ))}
            </ColumnScrollView>
          </>
        )
      )}
    </ScreenContainer>
  );
}

function TopContentTypeTabBar({ style, contentType, setContentType }) {
  const selectableTabs = [
    { label: CONTENT_TYPES.ALL, type: CONTENT_TYPES.ALL },
    { label: CONTENT_TYPES.VIDEOS, type: CONTENT_TYPES.VIDEOS },
    { label: CONTENT_TYPES.SHORTS, type: CONTENT_TYPES.SHORTS },
    { label: CONTENT_TYPES.POSTS, type: CONTENT_TYPES.POSTS },
  ];

  const handleSelected = (newContent) => {
    setContentType((prevContent) =>
      prevContent === newContent && newContent !== CONTENT_TYPES.ALL
        ? CONTENT_TYPES.ALL
        : newContent
    );
  };

  return (
    <RowScrollView style={[{ minHeight: 40 }, style]}>
      {selectableTabs.map((item, index) => {
        return (
          <TextTabButton
            key={index}
            isFirstTab={index === 0}
            isSelected={contentType === item.type}
            onPress={() => handleSelected(item.type)}
          >
            {item.label}
          </TextTabButton>
        );
      })}
    </RowScrollView>
  );
}

function ChannelHeader({ style, videoData, contentType, setContentType }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();

  return (
    <View style={style}>
      <ChannelCoverImage source={{ uri: videoData.picture }} />
      <View
        style={{
          marginTop: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ChannelProfileImage
          style={{
            height: "100%",
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          source={{ uri: videoData.picture }}
          onPress={() => {
            console.log("ChannelProfileImage pressed");
          }}
        />
        <View style={{ flex: 4, marginLeft: 8 }}>
          <BaseText
            style={{
              fontSize: ctxFontSizes.xl2,
              fontWeight: "bold",
            }}
          >
            {videoData.channelName}
          </BaseText>
          <BaseText
            style={{
              marginTop: 4,
              fontSize: ctxFontSizes.xs,
              fontWeight: "medium",
            }}
          >
            {videoData.channelTag}
          </BaseText>
          <BaseText
            style={{
              marginTop: 4,
              fontSize: ctxFontSizes.xs,
              color: ctxColors.textSecondary,
            }}
          >
            {videoData.channelSubscribers} subscribers •{" "}
            {videoData.channelVideos} videos
          </BaseText>
        </View>
      </View>
      <BaseText
        style={{
          marginTop: 12,
          fontSize: ctxFontSizes.xs,
          color: ctxColors.textSecondary,
        }}
      >
        {videoData.channelDescription}
        {videoData.channelDescription}
        {videoData.channelDescription}
        <BaseText
          style={{
            fontWeight: "medium",
            fontSize: ctxFontSizes.xs,
          }}
          onPress={() => {
            console.log("...more press");
          }}
        >
          ...more
        </BaseText>
      </BaseText>
      <SubscribeButton
        style={[{ marginTop: 12 }, styles.wideButton]}
        fontSize={ctxFontSizes.sm}
        onPress={() => console.log("Subscribe pressed")}
      />
      <TopContentTypeTabBar
        style={{ marginVertical: 8 }}
        contentType={contentType}
        setContentType={setContentType}
      />
    </View>
  );
}
