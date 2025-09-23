import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { fetchPexelsData } from "../api/pexelsAPI";
import {
  ThFlatList,
  ThIcon,
  ThPressable,
  ThRowScrollView,
  ThView,
  ThTopTabButton,
} from "../components/ThemedComponents";
import { VideoFlatListItem } from "../components/VideoComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

const defaultQuery = "Humans";

export default function HomeScreen({ navigation }) {
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

function HomeTopTabs({ setQuery }) {
const {colors} = useTheme();  
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
          backgroundColor: colors.bgGray
        }}
        onPress={() => navigation.getParent("HomeDrawer")?.openDrawer()}
      >
        <ThIcon IconComponent={Ionicons} name="compass-outline" />
      </ThPressable>
      <ThTopTabButton
        style={{ marginLeft: 14 }}
        selected={selectedQuery === "Humans"}
        onPress={() => handleSelectedQuery("Humans")}
      >
        All
      </ThTopTabButton>
      <ThTopTabButton
        style={{ marginLeft: 8 }}
        selected={selectedQuery === "Music"}
        onPress={() => handleSelectedQuery("Music")}
      >
        Music
      </ThTopTabButton>
      <ThTopTabButton
        style={{ marginLeft: 8 }}
        selected={selectedQuery === "Nature"}
        onPress={() => handleSelectedQuery("Nature")}
      >
        Nature
      </ThTopTabButton>
      <ThTopTabButton
        style={{ marginLeft: 8 }}
        selected={selectedQuery === "City"}
        onPress={() => handleSelectedQuery("City")}
      >
        City
      </ThTopTabButton>
      <ThTopTabButton
        style={{ marginLeft: 8, marginRight: 32 }}
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
