import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPexelsData } from "../api/pexelsAPI";
import { CompassIcon } from "../components/IconComponents";
import {
  ThFlatList,
  ThPressable,
  ThRowScrollView,
  ThView,
  ThTopTabButton,
} from "../components/ThemedComponents";
import { FlatListVideoItem } from "../components/VideoComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

const defaultQuery = "Humans";

export default function YoutubeHomeScreen({ navigation, route }) {
  const { colors } = useTheme();
  const [query, setQuery] = useState(defaultQuery);
  const [queryCount, setQueryCount] = useState(4);
  const [videos, setVideos] = useState([]);
  const [autoPlayVideoId, setAutoPlayVideoId] = useState(null);

  useEffect(() => {
    (async function () {
      const data = await fetchPexelsData(query, queryCount);
      setVideos(data);
    })();
  }, [query, queryCount]);

  useFocusEffect(
    useCallback(() => {
      const mainBottomTabs = navigation.getParent("MainBottomTabs");

      mainBottomTabs?.setOptions({
        tabBarStyle: {
          borderTopColor: colors.bgGray,
          borderTopWidth: 1.4,
          backgroundColor: colors.bg,
          elevation: 0, //Android: removes drop shadow
          shadowOpacity: 0, //iOS: removes drop shadow
        },
        swipeEnabled: true,
        headerShown: true,
      });
    }, [navigation])
  );

  return (
    <ThView style={styles.screenContainer}>
      <ThFlatList
        style={{ width: "100%" }}
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<TopQueryTabs setQuery={setQuery} />}
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

function TopQueryTabs({ setQuery }) {
  const { colors } = useTheme();
  const [selectedQuery, setSelectedQuery] = useState(defaultQuery);
  const navigation = useNavigation();

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
    <ThRowScrollView
      style={[styles.paddedHorizontalContainer, { marginBottom: 10 }]}
    >
      <ThPressable
        style={{
          borderRadius: 4,
          paddingHorizontal: 10,
          paddingVertical: 4,
          backgroundColor: colors.bgGray,
        }}
        onPress={() => navigation.getParent("MainNavigator")?.openDrawer()}
      >
        <CompassIcon />
      </ThPressable>
      <ThTopTabButton
        style={{ marginLeft: 14 }}
        selected={selectedQuery === "Humans"}
        onPress={() => handleSelectedQuery("Humans")}
      >
        All
      </ThTopTabButton>
      <ThTopTabButton
        selected={selectedQuery === "Music"}
        onPress={() => handleSelectedQuery("Music")}
      >
        Music
      </ThTopTabButton>
      <ThTopTabButton
        selected={selectedQuery === "Nature"}
        onPress={() => handleSelectedQuery("Nature")}
      >
        Nature
      </ThTopTabButton>
      <ThTopTabButton
        selected={selectedQuery === "City"}
        onPress={() => handleSelectedQuery("City")}
      >
        City
      </ThTopTabButton>
      <ThTopTabButton
        style={{ marginRight: 32 }}
        selected={selectedQuery === "Youtube"}
        onPress={() => {
          navigation.navigate("YouTubeFlatListScreen");
        }}
      >
        (Testing YouTube API)
      </ThTopTabButton>
    </ThRowScrollView>
  );
}
