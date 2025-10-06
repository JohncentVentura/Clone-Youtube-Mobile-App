import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { fetchPexelsData } from "../api/pexelsAPI";
import { CompassIcon } from "../components/IconComponents";
import {
  ThFlatList,
  ThPressable,
  ThScrollViewRow,
  ThView,
  ThTopQueryTab,
} from "../components/ThemedComponents";
import { FlatListVideoItem } from "../components/VideoComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import { showMainBottomTabBar } from "../utils/utils";

const defaultQuery = "Humans";

export default function YoutubeHomeScreen({ navigation }) {
  const { colors } = useTheme();
  const [query, setQuery] = useState(defaultQuery);
  const [queryCount, setQueryCount] = useState(4);
  const [videos, setVideos] = useState([]);
  const [autoPlayVideoId, setAutoPlayVideoId] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    (async () => {
      const data = await fetchPexelsData(
        query,
        queryCount,
        abortController.signal
      );
      if (isMounted) {
        setVideos(data);
      }
    })();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [query, queryCount]);

  showMainBottomTabBar(navigation, colors);

  return (
    <ThView style={styles.screenContainer}>
      <ThFlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<TopQueryTabBar setQuery={setQuery} />}
        renderItem={({ item }) => {
          return (
            <FlatListVideoItem
              navigation={navigation}
              video={item}
              query={query}
              autoPlayVideoId={item.id === autoPlayVideoId}
            />
          );
        }}
        onViewableItemsChanged={
          //useRef for same reference each render, called whenever visible items changes (scrolled) & get the first visible item
          useRef(({ viewableItems }) => {
            if (viewableItems.length > 0) {
              setAutoPlayVideoId(viewableItems[0].item.id);
            }
          }).current
        }
        viewabilityConfig={
          //useRef for same reference each render, threshold of item in the screen to be count as visible
          useRef({
            viewAreaCoveragePercentThreshold: 50,
          }).current
        }
      />
    </ThView>
  );
}

function TopQueryTabBar({ setQuery }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selectedQuery, setSelectedQuery] = useState(defaultQuery);

  const handleSelectedQuery = (query) => {
    if (selectedQuery === query) {
      if (query !== defaultQuery) {
        setSelectedQuery(defaultQuery);
        setQuery(defaultQuery);
      }
    } else {
      setSelectedQuery(query);
      setQuery(query);
    }
  };

  return (
    <ThScrollViewRow
      style={[styles.paddedHorizontalContainer, { marginBottom: 10 }]}
    >
      <ThPressable
        style={({ pressed }) => ({
          borderRadius: 4,
          paddingHorizontal: 10,
          paddingVertical: 4,
          backgroundColor: colors.bgMuted,
          opacity: pressed ? 0.2 : 1,
        })}
        onPress={() => navigation.getParent("MainNavigator")?.openDrawer()}
      >
        <CompassIcon />
      </ThPressable>
      <ThTopQueryTab
        style={{ marginLeft: 14 }}
        selected={selectedQuery === defaultQuery}
        onPress={() => handleSelectedQuery(defaultQuery)}
      >
        All
      </ThTopQueryTab>
      <ThTopQueryTab
        selected={selectedQuery === "Music"}
        onPress={() => handleSelectedQuery("Music")}
      >
        Music
      </ThTopQueryTab>
      <ThTopQueryTab
        selected={selectedQuery === "Nature"}
        onPress={() => handleSelectedQuery("Nature")}
      >
        Nature
      </ThTopQueryTab>
      <ThTopQueryTab
        selected={selectedQuery === "City"}
        onPress={() => handleSelectedQuery("City")}
      >
        City
      </ThTopQueryTab>
      <ThTopQueryTab
        style={{ marginRight: 32 }}
        selected={selectedQuery === "Youtube"}
        onPress={() => {
          navigation.navigate("YouTubeFlatListScreen");
        }}
      >
        (Testing YouTube API)
      </ThTopQueryTab>
    </ThScrollViewRow>
  );
}
