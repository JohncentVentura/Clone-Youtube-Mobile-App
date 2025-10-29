import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ScreenContainer,
  ShortsVideoFlatList,
} from "../components/ContainerComponents";
import { useSetVideoData } from "../hooks/useSetVideoData";

export default function ShortsScreen({ navigation }) {
  const [query, setQuery] = useState("Road");
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
