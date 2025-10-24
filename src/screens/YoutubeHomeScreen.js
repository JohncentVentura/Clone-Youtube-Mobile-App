import { useRef, useState } from "react";
import { Pressable } from "react-native";
import {
  AutoPlayVideoFlatList,
  RowScrollView,
  ScreenContainer,
} from "../components/ContainerComponents";
import { CompassIcon } from "../components/IconComponents";
import { TabButton } from "../components/PressableComponents";
import { useTheme } from "../context/ThemeContext";
import { useSetMainVideoData } from "../hooks/useSetVideoData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

export default function YoutubeHomeScreen({ navigation }) {
  const scrollToTopRef = useRef(null);
  const [query, setQuery] = useState("Humans");
  const [homeVideos, setHomeVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetMainVideoData({
    query,
    queryResults: 5,
    setVideos: setHomeVideos,
    setIsLoading,
    dependecies: [query],
  });

  return (
    <ScreenContainer>
      <TopQueryTabBar
        navigation={navigation}
        query={query}
        setQuery={setQuery}
      />
      <AutoPlayVideoFlatList
        style={{ marginTop: 6 }}
        ref={scrollToTopRef}
        isLoading={isLoading}
        navigation={navigation}
        query={query}
        data={homeVideos}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

function TopQueryTabBar({ navigation, query, setQuery }) {
  const { colors } = useTheme();
  const selectableTabs = [
    { label: "All", query: "Humans" },
    { label: "Music", query: "Music" },
    { label: "Nature", query: "Nature" },
    { label: "City", query: "City" },
  ];

  const handleSelected = (newQuery) => {
    setQuery((prevQuery) =>
      prevQuery === newQuery && newQuery !== "Humans" ? "Humans" : newQuery
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
          backgroundColor: colors.bgSecondary,
          opacity: pressed ? 0.5 : 1,
        })}
        onPress={() => navigation.getParent("MainNavigator")?.openDrawer()}
      >
        <CompassIcon />
      </Pressable>
      {selectableTabs.map((item, index) => {
        return (
          <TabButton
            key={index}
            selected={query === item.query}
            onPress={() => handleSelected(item.query)}
          >
            {item.label}
          </TabButton>
        );
      })}
      <TabButton
        style={{ marginRight: 32 }}
        onPress={() => {
          navigation.navigate("YouTubeFlatListScreen");
        }}
      >
        (YouTube API)
      </TabButton>
    </RowScrollView>
  );
}
