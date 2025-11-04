import { useState } from "react";
import { Pressable, View } from "react-native";
import {
  ShortsVideoGridFlatList,
  MainVideoFlatList,
  RowScrollView,
  ScreenContainer,
  ColumnScrollView,
} from "../components/ContainerComponents";
import { InactiveYouIcon } from "../components/IconComponents";
import PostComponent from "../components/PostComponent";
import {
  ImageTextTabButton,
  TextTabButton,
} from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useSetChannelData } from "../hooks/useSetChannelData";
import { useSetVideoData } from "../hooks/useSetVideoData";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";

const CONTENT_TYPES = {
  ALL: "All",
  VIDEOS: "Videos",
  SHORTS: "Shorts",
  POSTS: "Posts",
};

export default function SubscriptionsScreen({ navigation }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const [query, setQuery] = useState("Events");
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [selectedChannelName, setSelectedChannelName] = useState("");
  const [subscribedMainVideos, setSubscribedMainVideos] = useState([]);
  const [subscribedShortsVideos, setSubscribedShortsVideos] = useState([]);
  const [contentType, setContentType] = useState(CONTENT_TYPES.ALL);
  const [isLoading, setIsLoading] = useState(true);

  useSetChannelData({
    query,
    queryResults: 10,
    setData: setSubscribedChannels,
    setIsLoading,
  });

  useSetVideoData({
    query: selectedChannelName || query,
    queryResults: 5,
    setVideos: setSubscribedMainVideos,
    setIsLoading,
    dependencies: [selectedChannelName, query],
  });

  useSetVideoData({
    videoDataType: "shorts",
    query: selectedChannelName || query,
    queryResults: 6,
    setVideos: setSubscribedShortsVideos,
    setIsLoading,
    dependencies: [selectedChannelName, query],
  });

  return (
    <ScreenContainer>
      <View>
        <SubscribedTabBar
          subscribedChannels={subscribedChannels}
          selectedChannelName={selectedChannelName}
          setSelectedChannelName={setSelectedChannelName}
        />
      </View>

      {!selectedChannelName ? (
        <TopContentTypeTabBar
          style={{ marginTop: 4, marginBottom: 10 }}
          contentType={contentType}
          setContentType={setContentType}
        />
      ) : (
        <View
          style={[
            {
              marginTop: 4,
              minHeight: 40,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            },
            styles.screenPadHorizontal,
          ]}
        >
          <Pressable
            style={[
              {
                backgroundColor: ctxColors.bgSecondary,
                flexDirection: "row",
              },
              styles.baseButton,
            ]}
            onPress={() => {
              navigation.navigate(navPaths.channelScreen, {
                videoData: subscribedChannels.find(
                  (channel) => channel.channelName === selectedChannelName
                ),
              });
            }}
          >
            <InactiveYouIcon size={ctxIconSizes.sm} />
            <BaseText
              style={{
                marginLeft: 4,
                fontWeight: "medium",
                fontSize: ctxFontSizes.sm,
              }}
            >
              Visit Channel
            </BaseText>
          </Pressable>
        </View>
      )}

      {selectedChannelName ? (
        <MainVideoFlatList
          style={{ marginTop: 10 }}
          isLoading={isLoading}
          data={subscribedMainVideos}
          navigation={navigation}
          query={selectedChannelName}
        />
      ) : contentType === CONTENT_TYPES.ALL ? (
        <></>
      ) : contentType === CONTENT_TYPES.VIDEOS ? (
        <MainVideoFlatList
          style={{ marginTop: 10 }}
          isLoading={isLoading}
          data={subscribedMainVideos}
          navigation={navigation}
          query={query}
        />
      ) : contentType === CONTENT_TYPES.SHORTS ? (
        <ShortsVideoGridFlatList
          style={[{ marginTop: 8 }, styles.screenPadHorizontal]}
          isLoading={isLoading}
          data={subscribedShortsVideos}
          navigation={navigation}
        />
      ) : (
        contentType === CONTENT_TYPES.POSTS && (
          <ColumnScrollView>
            {subscribedMainVideos.map((item, index) => (
              <PostComponent
                key={index}
                style={[{ marginTop: 8 }, styles.screenPadHorizontal]}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                navigation={navigation}
                videoData={item}
              />
            ))}
          </ColumnScrollView>
        )
      )}
    </ScreenContainer>
  );
}

function SubscribedTabBar({
  style,
  subscribedChannels,
  selectedChannelName,
  setSelectedChannelName,
}) {
  const handleSelected = (newChannel) => {
    setSelectedChannelName((prevChannel) =>
      prevChannel === newChannel && newChannel !== "" ? "" : newChannel
    );
  };

  return (
    <RowScrollView style={[{ marginHorizontal: 8 }, style]}>
      {subscribedChannels.map((item, index) => {
        return (
          <ImageTextTabButton
            key={index}
            isSelected={selectedChannelName === item.channelName}
            selectedTabName={selectedChannelName}
            imageSource={item.picture}
            text={item.channelName}
            onPress={() => handleSelected(item.channelName)}
          />
        );
      })}
    </RowScrollView>
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
    <RowScrollView
      style={[styles.screenPadHorizontal, { minHeight: 40 }, style]}
    >
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
