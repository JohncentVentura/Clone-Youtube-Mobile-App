import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { CompassIcon } from "../components/IconComponents";
import { ThTopQueryTab } from "../components/ThemedComponents";
import { RowScrollView } from "../components/UtilComponents";
import { AutoPlayFlatList } from "../components/VideoComponents";
import { useTheme } from "../context/ThemeContext";
import { useSetPexelsDataVideos } from "../hooks/usePexelsData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

const defaultQuery = "Humans";

export default function YoutubeHomeScreen({ navigation }) {
  const { colors } = useTheme();
  const scrollToTopRef = useRef(null);
  const [query, setQuery] = useState(defaultQuery);
  const [videos, setVideos] = useState([]);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetPexelsDataVideos({
    query,
    videosCount: 5,
    setVideos: setVideos,
    dependecies: [query],
  });

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
      <AutoPlayFlatList
        ref={scrollToTopRef}
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
