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
import { useSetPexelsDataVideos } from "../hooks/usePexelsData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

const defaultQuery = "Humans";

export default function YoutubeHomeScreen({ navigation }) {
  const scrollToTopRef = useRef(null);
  const [query, setQuery] = useState(defaultQuery);
  const [homeVideos, setHomeVideos] = useState([]);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetPexelsDataVideos({
    query,
    queryResults: 5,
    setVideos: setHomeVideos,
    dependecies: [query],
  });

  return (
    <ScreenContainer>
      <AutoPlayVideoFlatList
        ref={scrollToTopRef}
        navigation={navigation}
        query={query}
        data={homeVideos}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <TopQueryTabBar navigation={navigation} setQuery={setQuery} />
        }
      />
    </ScreenContainer>
  );
}

function TopQueryTabBar({ navigation, setQuery }) {
  const { colors } = useTheme();
  const [selected, setSelected] = useState(defaultQuery);
  const selectableTabs = [
    { label: "All", query: defaultQuery },
    { label: "Music", query: "Music" },
    { label: "Nature", query: "Nature" },
    { label: "City", query: "City" },
  ];

  const handleSelected = (query) => {
    setSelected((prev) => {
      const newQuery =
        prev === query && query !== defaultQuery ? defaultQuery : query;
      setQuery(newQuery);
      return newQuery;
    });
  };

  return (
    <RowScrollView style={[styles.screenPadHorizontal, { marginBottom: 10 }]}>
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
            selected={selected === item.query}
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
