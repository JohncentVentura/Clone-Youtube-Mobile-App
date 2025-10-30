import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  MainVideoFlatList,
  RowScrollView,
  ScreenContainer,
} from "../components/ContainerComponents";
import {
  ImageTextTabButton,
  TextTabButton,
} from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useSetChannelData } from "../hooks/useSetChannelData";
import { useSetVideoData } from "../hooks/useSetVideoData";
import { styles } from "../styles/styles";

export default function SubscriptionsScreen({ navigation }) {
  const { ctxColors } = useThemeContext();
  const [query, setQuery] = useState("Events");
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [subscribedVideos, setSubscribedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useSetChannelData({
    query,
    queryResults: 10,
    setData: setSubscribedChannels,
    setIsLoading,
  });

  //TODO: return videoData base from one channel
  useSetVideoData({
    query: selectedChannel || query || "Events",
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
        <TopQueryTabBar
          style={{ marginTop: 4 }}
          query={query}
          setQuery={setQuery}
        />
      ) : (
        <View>
          <Pressable>
            <BaseText>Subscribe</BaseText>
          </Pressable>
        </View>
      )}

      <MainVideoFlatList
        style={{ marginTop: 6 }}
        data={subscribedVideos}
        navigation={navigation}
        query={query}
      />
    </ScreenContainer>
  );
}

function SubscribedTabBar({
  style,
  subscribedChannels,
  selectedChannel,
  setSelectedChannel,
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

function TopQueryTabBar({ style, query, setQuery }) {
  const selectableTabs = [
    { label: "All", query: "Events" },
    { label: "Music", query: "Music" },
    { label: "Nature", query: "Nature" },
    { label: "City", query: "City" },
  ];

  const handleSelected = (newQuery) => {
    setQuery((prevQuery) =>
      prevQuery === newQuery && newQuery !== "Events" ? "Events" : newQuery
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
            isSelected={query === item.query}
            onPress={() => handleSelected(item.query)}
          >
            {item.label}
          </TextTabButton>
        );
      })}
    </RowScrollView>
  );
}
