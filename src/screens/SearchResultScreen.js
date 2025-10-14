import { useRef, useState } from "react";
import { View } from "react-native";
import { AutoPlayVideoFlatList } from "../components/ScrollableComponents";
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
    queryResults: 6,
    setVideos: setSearchVideos,
    dependecies: [searchInput],
  });

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
      <AutoPlayVideoFlatList
        navigation={navigation}
        query={searchInput}
        data={searchVideos}
        ref={scrollToTopRef}
      />
    </View>
  );
}
