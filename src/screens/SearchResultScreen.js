import { useEffect, useState } from "react";
import { View } from "react-native";
import { fetchPexelsData } from "../api/pexelsAPI";
import { AutoPlayFlatList } from "../components/VideoComponents";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";
import { showMainBottomTabBar } from "../utils/utils";

export default function SearchResultScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { search } = route.params;
  const [searchInput, setSearchInput] = useState(search);
  const [searchVideos, setSearchVideos] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    (async () => {
      if (!searchInput?.trim()) return console.log("Search input is empty");

      const data = await fetchPexelsData(
        searchInput,
        6,
        abortController.signal
      );

      if (isMounted) {
        setSearchVideos(data);
      }
    })();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [searchInput]);

  showMainBottomTabBar(navigation, colors);

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
      <AutoPlayFlatList
        data={searchVideos}
        navigation={navigation}
        query={searchInput}
      />
    </View>
  );
}
