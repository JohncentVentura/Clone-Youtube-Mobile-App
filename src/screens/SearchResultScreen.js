import { useRef, useState } from "react";
import {
  AutoPlayVideoFlatList,
  ScreenContainer,
} from "../components/ContainerComponents";
import { useTheme } from "../context/ThemeContext";
import { useSetMainVideoData } from "../hooks/useSetVideoData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";

export default function SearchResultScreen({ navigation, route }) {
  const scrollToTopRef = useRef(null);
  const { search } = route.params;
  const [searchInput, setSearchInput] = useState(search);
  const [searchVideos, setSearchVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetMainVideoData({
    query: searchInput,
    queryResults: 6,
    setVideos: setSearchVideos,
    setIsLoading,
    dependecies: [searchInput],
  });

  return (
    <ScreenContainer isLoading={isLoading}>
      <AutoPlayVideoFlatList
        navigation={navigation}
        query={searchInput}
        data={searchVideos}
        ref={scrollToTopRef}
      />
    </ScreenContainer>
  );
}
