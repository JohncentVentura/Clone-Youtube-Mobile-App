import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { AutoPlayFlatList } from "../components/VideoComponents";
import { useTheme } from "../context/ThemeContext";
import { useSetPexelsDataVideos } from "../hooks/usePexelsData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

export default function SearchResultScreen({ navigation, route }) {
  const { search } = route.params;
  const { colors } = useTheme();
  const scrollToTopRef = useRef(null);
  const [searchInput, setSearchInput] = useState(search);
  const [searchVideos, setSearchVideos] = useState([]);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetPexelsDataVideos({
    query: searchInput,
    videosCount: 6,
    setVideos: setSearchVideos,
    dependecies: [searchInput],
  });

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
      <AutoPlayFlatList
        ref={scrollToTopRef}
        data={searchVideos}
        navigation={navigation}
        query={searchInput}
      />
    </View>
  );
}
