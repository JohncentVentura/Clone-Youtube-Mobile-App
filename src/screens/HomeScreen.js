import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { pexelsAPIfetchVideos } from "../api/pexelsAPI";
import {
  ThemedIcon,
  ThemedPressable,
  ThemedRowScrollView,
  ThemedView,
  TopTabButton,
} from "../components/ThemedComponents";
import { VideoFlatList } from "../components/VideoComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState("All");
  const [pages, setPages] = useState(3);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      const data = await pexelsAPIfetchVideos(query, pages);
      setVideos(data);
    }
    loadVideos();
  }, [query, pages]);

  return (
    <ThemedView style={styles.homeContainer}>
      <HomeTopTabs setQuery={setQuery} />
      <VideoFlatList videos={videos} navigation={navigation} />
    </ThemedView>
  );
}

function HomeTopTabs({ style, setQuery, children, ...rest }) {
  const { colors, fontSizes, iconSizes } = useTheme();
  const defaultKey = "All"; // id of default button
  const [selectedKey, setSelectedKey] = useState(defaultKey);
  const navigation = useNavigation();

  const handleSelect = (key) => {
    // if the same button is pressed again
    if (selectedKey === key) {
      // revert to default if it’s not already the default
      if (key !== defaultKey) {
        setSelectedKey(defaultKey);
        setQuery(defaultKey);
      }
      // else do nothing, stays default
    } else {
      // select new one
      setSelectedKey(key);
      setQuery(key);
    }
  };

  return (
    <ThemedRowScrollView
      style={[styles.horizontalPaddedContainer, { marginBottom: 12 }]}
    >
      <ThemedPressable
        style={{
          marginRight: 14,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 6,
        }}
        onPress={() => navigation.getParent("HomeDrawer")?.openDrawer()}
      >
        <ThemedIcon IconComponent={Ionicons} name="compass-outline" />
      </ThemedPressable>
      <TopTabButton
        style={{ marginRight: 8 }}
        selected={selectedKey === "All"}
        onPress={() => handleSelect("All")}
      >
        All
      </TopTabButton>
      <TopTabButton
        style={{ marginRight: 8 }}
        selected={selectedKey === "Music"}
        onPress={() => handleSelect("Music")}
      >
        Music
      </TopTabButton>
      <TopTabButton
        style={{ marginRight: 8 }}
        selected={selectedKey === "Nature"}
        onPress={() => handleSelect("Nature")}
      >
        Nature
      </TopTabButton>
      <TopTabButton
        style={{ marginRight: 8 }}
        selected={selectedKey === "City"}
        onPress={() => handleSelect("City")}
      >
        City
      </TopTabButton>
      <TopTabButton
        style={{ marginRight: 32 }}
        selected={selectedKey === "Youtube"}
        onPress={() => {
          navigation.navigate("YouTubeFlatListScreen");
        }}
      >
        (Testing YouTube API)
      </TopTabButton>
    </ThemedRowScrollView>
  );
}
