import { useRef, useState } from "react";
import {
  MainVideoFlatList,
  ScreenContainer,
} from "../components/ContainerComponents";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { useSetVideoData } from "../hooks/useSetVideoData";

export default function SearchResultScreen({ navigation, route }) {
  const scrollToTopRef = useRef(null);
  const { search } = route.params;
  const [searchInput, setSearchInput] = useState(search);
  const [searchVideos, setSearchVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query: searchInput,
    queryResults: 6,
    setVideos: setSearchVideos,
    setIsLoading,
    dependencies: [searchInput],
  });

  return (
    <ScreenContainer isLoading={isLoading}>
      <MainVideoFlatList
        navigation={navigation}
        query={searchInput}
        data={searchVideos}
        ref={scrollToTopRef}
      />
    </ScreenContainer>
  );
}
