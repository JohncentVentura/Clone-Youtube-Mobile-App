import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { fetchPexelsData } from "../api/pexelsAPI";
import {
  ThIcon,
  ThPressable,
  ThRowScrollView,
  ThView,
  TopTabButton,
  ThFlatList,
} from "../components/ThemedComponents";
import { VideoFlatListItem } from "../components/VideoComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

const defaultQuery = "Humans";

export default function HomeScreen({ navigation }) {
  const { colors, fontSizes, iconSizes } = useTheme();
  const [query, setQuery] = useState(defaultQuery);
  const [pages, setPages] = useState(3);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      const data = await fetchPexelsData(query, pages);
      setVideos(data);
    }
    loadVideos();
  }, [query, pages]);

  return (
    <ThView style={styles.screenContainer}>
      <ThFlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<HomeTopTabs setQuery={setQuery} />}
        renderItem={({ item }) => {
          return (
            <VideoFlatListItem
              navigation={navigation}
              video={item}
              query={query}
            />
          );
        }}
      />
    </ThView>
  );
}

function HomeTopTabs({ style, setQuery, children, ...rest }) {
  const { colors, fontSizes, iconSizes } = useTheme();
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
      style={[styles.paddingHorizontalContainer, { marginBottom: 8 }]}
    >
      <ThPressable
        style={{
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 6,
        }}
        onPress={() => navigation.getParent("HomeDrawer")?.openDrawer()}
      >
        <ThIcon IconComponent={Ionicons} name="compass-outline" />
      </ThPressable>
      <TopTabButton
        style={{ marginLeft: 16 }}
        selected={selectedQuery === "Humans"}
        onPress={() => handleSelectedQuery("Humans")}
      >
        All
      </TopTabButton>
      <TopTabButton
        style={{ marginLeft: 8 }}
        selected={selectedQuery === "Music"}
        onPress={() => handleSelectedQuery("Music")}
      >
        Music
      </TopTabButton>
      <TopTabButton
        style={{ marginLeft: 8 }}
        selected={selectedQuery === "Nature"}
        onPress={() => handleSelectedQuery("Nature")}
      >
        Nature
      </TopTabButton>
      <TopTabButton
        style={{ marginLeft: 8 }}
        selected={selectedQuery === "City"}
        onPress={() => handleSelectedQuery("City")}
      >
        City
      </TopTabButton>
      <TopTabButton
        style={{ marginLeft: 8, marginRight: 32 }}
        selected={selectedQuery === "Youtube"}
        onPress={() => {
          navigation.navigate("YouTubeFlatListScreen");
        }}
      >
        (Testing YouTube API)
      </TopTabButton>
    </ThRowScrollView>
  );
}
