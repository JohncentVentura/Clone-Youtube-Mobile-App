import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenContainer } from "../components/ContainerComponents";
import { BaseText } from "../components/TextComponents";
import { ShortsVideoView } from "../components/VideoComponents";
import { useSetPexelsDataShortsVideos } from "../hooks/usePexelsData";

export default function ShortsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("Humans");
  const [homeVideos, setHomeVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useSetPexelsDataShortsVideos({
    query,
    queryResults: 5,
    setVideos: setHomeVideos,
    setIsLoading,
    dependecies: [query],
  });

  return (
    <ScreenContainer style={{ paddingTop: insets.top }} isLoading={isLoading}>
      <ShortsVideoView videoData={homeVideos[0]} />
    </ScreenContainer>
  );
}
