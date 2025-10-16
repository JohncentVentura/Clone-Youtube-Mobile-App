import { useRef, useState } from "react";
import {
  AutoPlayVideoFlatList,
  ScreenContainer,
} from "../components/ContainerComponents";
import { useTheme } from "../context/ThemeContext";
import { useSetPexelsDataVideos } from "../hooks/usePexelsData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";

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
    <ScreenContainer>
      <AutoPlayVideoFlatList
        navigation={navigation}
        query={searchInput}
        data={searchVideos}
        ref={scrollToTopRef}
      />
    </ScreenContainer>
  );
}
