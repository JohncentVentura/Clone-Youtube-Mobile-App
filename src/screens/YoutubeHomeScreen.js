import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { fetchPexelsData } from "../api/pexelsAPI";
import { CompassIcon } from "../components/IconComponents";
import { ThTopQueryTab } from "../components/ThemedComponents";
import { RowScrollView } from "../components/UtilComponents";
import { AutoPlayFlatList } from "../components/VideoComponents";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";
import { showMainBottomTabBar } from "../utils/utils";

const defaultQuery = "Humans";

export default function YoutubeHomeScreen({ navigation }) {
  const { colors } = useTheme();
  const [query, setQuery] = useState(defaultQuery);
  const [queryCount, setQueryCount] = useState(4);
  const [videos, setVideos] = useState([]);

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
    <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
      <AutoPlayFlatList
        data={videos}
        navigation={navigation}
        query={query}
        ListHeaderComponent={<TopQueryTabBar setQuery={setQuery} />}
      />
    </View>
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
    <RowScrollView
      style={[styles.paddedHorizontalContainer, { marginBottom: 10 }]}
    >
      <Pressable
        style={({ pressed }) => ({
          borderRadius: 4,
          paddingHorizontal: 10,
          paddingVertical: 4,
          backgroundColor: colors.bgSecondary,
          opacity: pressed ? 0.2 : 1,
        })}
        onPress={() => navigation.getParent("MainNavigator")?.openDrawer()}
      >
        <CompassIcon />
      </Pressable>
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
        (YouTube API)
      </ThTopQueryTab>
    </RowScrollView>
  );
}
