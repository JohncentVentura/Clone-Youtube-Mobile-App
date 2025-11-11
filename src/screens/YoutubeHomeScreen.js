import { useRef, useState } from "react";
import { Pressable } from "react-native";
import {MixedFeedFlatList,
  RowScrollView,
  ScreenContainer,
} from "../components/ContainerComponents";
import { CompassIcon } from "../components/IconComponents";
import { TextTabButton } from "../components/PressableComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useSetVideoData } from "../hooks/useSetVideoData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";

const defaultQuery = "Life";

export default function YoutubeHomeScreen({ navigation }) {
  const scrollToTopRef = useRef(null);
  const [query, setQuery] = useState(defaultQuery);
  const [homeMainVideos, setHomeMainVideos] = useState([]);
  const [homeShortsVideos, setHomeShortsVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query,
    queryResults: 5,
    setVideos: setHomeMainVideos,
    setIsLoading,
    dependencies: [query],
  });
  useSetVideoData({
    videoDataType: "shorts",
    query,
    queryResults: 5,
    setVideos: setHomeShortsVideos,
    setIsLoading,
    dependencies: [query],
  });

  return (
    <ScreenContainer>
      <TopQueryTabBar
        navigation={navigation}
        query={query}
        setQuery={setQuery}
      />

      <MixedFeedFlatList
        ref={scrollToTopRef}
        style={{ marginTop: 8 }}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        navigation={navigation}
        query={query}
        mixedData={[
          ...homeMainVideos.slice(0, 3).map((video) => ({
            type: "mainVideo",
            data: video,
          })),
          {
            type: "shortsVideos",
            data: homeShortsVideos,
          },
          ...homeMainVideos.slice(0, 1).map((video) => ({
            type: "posts",
            data: video,
          })),
          ...homeMainVideos.slice(3, 5).map((video) => ({
            type: "mainVideo",
            data: video,
          })),
          ...homeMainVideos.slice(1, 3).map((video) => ({
            type: "posts",
            data: video,
          })),
        ]}
      />
    </ScreenContainer>
  );
}

function TopQueryTabBar({ navigation, query, setQuery }) {
  const { ctxColors } = useThemeContext();
  const selectableTabs = [
    { label: "All", query: defaultQuery },
    { label: "Music", query: "Music" },
    { label: "Nature", query: "Nature" },
    { label: "City", query: "City" },
  ];

  const handleSelected = (newQuery) => {
    setQuery((prevQuery) =>
      prevQuery === newQuery && newQuery !== defaultQuery
        ? defaultQuery
        : newQuery
    );
  };

  return (
    <RowScrollView style={[styles.screenPadHorizontal, { minHeight: 40 }]}>
      <Pressable
        style={({ pressed }) => ({
          marginRight: 8,
          borderRadius: 4,
          paddingHorizontal: 10,
          paddingVertical: 4,
          backgroundColor: ctxColors.bgSecondary,
          opacity: pressed ? 0.5 : 1,
        })}
        onPress={() =>
          navigation.getParent(navPaths.MainNavigator)?.openDrawer()
        }
      >
        <CompassIcon />
      </Pressable>
      {selectableTabs.map((item, index) => {
        return (
          <TextTabButton
            key={index}
            isSelected={query === item.query}
            onPress={() => handleSelected(item.query)}
          >
            {item.label}
          </TextTabButton>
        );
      })}
      <TextTabButton
        style={{ marginRight: 32 }}
        onPress={() => {
          navigation.navigate("YouTubeFlatListScreen");
        }}
      >
        (YouTube API)
      </TextTabButton>
    </RowScrollView>
  );
}
