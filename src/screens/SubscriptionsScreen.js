import { useState } from "react";
import { Pressable, View } from "react-native";
import {
  ShortsVideoGridFlatList,
  MainVideoFlatList,
  RowScrollView,
  ScreenContainer,
} from "../components/ContainerComponents";
import { InactiveYouIcon } from "../components/IconComponents";
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
  const [selectedChannel, setSelectedChannel] = useState("");
  const [subscribedVideos, setSubscribedVideos] = useState([]);
  const [contentType, setContentType] = useState(CONTENT_TYPES.ALL);
  const [isLoading, setIsLoading] = useState(true);

  useSetChannelData({
    query,
    queryResults: 10,
    setData: setSubscribedChannels,
    setIsLoading,
  });

  useSetVideoData({
    query: selectedChannel || query,
    queryResults: 5,
    setVideos: setSubscribedVideos,
    setIsLoading,
    dependencies: [query, selectedChannel],
  });

  return (
    <ScreenContainer>
      <View>
        <SubscribedTabBar
          subscribedChannels={subscribedChannels}
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
        />
      </View>

      {!selectedChannel ? (
        <TopContentTypeTabBar
          style={{ marginTop: 4 }}
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
                query: selectedChannel,
                videoData: subscribedChannels.find(
                  (channel) => channel.channelName === selectedChannel
                )
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

      {selectedChannel ? (
        <MainVideoFlatList
          style={{ marginTop: 10 }}
          isLoading={isLoading}
          data={subscribedVideos}
          navigation={navigation}
          query={selectedChannel}
        />
      ) : contentType === CONTENT_TYPES.ALL ? (
        <MainVideoFlatList
          style={{ marginTop: 10 }}
          isLoading={isLoading}
          data={subscribedVideos}
          navigation={navigation}
          query={selectedChannel}
        />
      ) : contentType === CONTENT_TYPES.VIDEOS ? (
        <></>
      ) : contentType === CONTENT_TYPES.SHORTS ? (
        <ShortsVideoGridFlatList
          style={[{ marginTop: 8 }, styles.screenPadHorizontal]}
          data={subscribedVideos}
          navigation={navigation}
          query={selectedChannel}
        />
      ) : (
        contentType === CONTENT_TYPES.POSTS && <></>
      )}
    </ScreenContainer>
  );
}

function SubscribedTabBar({
  style,
  subscribedChannels,
  selectedChannel,
  setSelectedChannel,
  setSelectedChannelData,
}) {
  const handleSelected = (newChannel) => {
    setSelectedChannel((prevChannel) =>
      prevChannel === newChannel && newChannel !== "" ? "" : newChannel
    );
  };

  return (
    <RowScrollView style={[{ marginHorizontal: 8 }, style]}>
      {subscribedChannels.map((item, index) => {
        return (
          <ImageTextTabButton
            key={index}
            isSelected={selectedChannel === item.channelName}
            selectedChannel={selectedChannel}
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
