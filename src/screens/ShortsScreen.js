import { useState } from "react";
import { ScreenContainer } from "../components/ContainerComponents";
import { ShortsVideoFlatList } from "../components/FlatListComponents";
import { useSetVideoData } from "../hooks/useSetVideoData";

export default function ShortsScreen({ navigation, route }) {
  const videoData = route.params?.videoData;
  const [query, setQuery] = useState(videoData?.title || "Road");
  const [shortsVideos, setShortsVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useSetVideoData({
    videoDataType: "shorts",
    query,
    queryResults: 5,
    setVideos: setShortsVideos,
    setIsLoading,
    dependencies: [query],
  });

  return (
    <ScreenContainer isLoading={isLoading}>
      <ShortsVideoFlatList
        data={shortsVideos}
        navigation={navigation}
        setQuery={setQuery}
      />
    </ScreenContainer>
  );
}
