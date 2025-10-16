import { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { TabButton } from "../components/PressableComponents";
import { CompassIcon } from "../components/IconComponents";
import {
  AutoPlayVideoFlatList,
  RowScrollView,
  ScreenContainer
} from "../components/ContainerComponents";
import { useTheme } from "../context/ThemeContext";
import { useSetPexelsDataVideos } from "../hooks/usePexelsData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

const defaultQuery = "Humans";

export default function YoutubeHomeScreen({ navigation }) {
  const { colors } = useTheme();
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
        navigation={navigation}
        query={query}
        data={homeVideos}
        ref={scrollToTopRef}
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

  const handleSelectedQuery = (query) => {
    if (selected === query) {
      if (query !== defaultQuery) {
        setSelected(defaultQuery);
        setQuery(defaultQuery);
      }
    } else {
      setSelected(query);
      setQuery(query);
    }
  };

  return (
    <RowScrollView style={[styles.screenPadHorizontal, { marginBottom: 10 }]}>
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
      <TabButton
        style={{ marginLeft: 16 }}
        selected={selected === defaultQuery}
        onPress={() => handleSelectedQuery(defaultQuery)}
      >
        All
      </TabButton>
      <TabButton
        selected={selected === "Music"}
        onPress={() => handleSelectedQuery("Music")}
      >
        Music
      </TabButton>
      <TabButton
        selected={selected === "Nature"}
        onPress={() => handleSelectedQuery("Nature")}
      >
        Nature
      </TabButton>
      <TabButton
        selected={selected === "City"}
        onPress={() => handleSelectedQuery("City")}
      >
        City
      </TabButton>
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
