import { useState, useRef } from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenContainer } from "../components/ContainerComponents";
import { ShortsVideoView } from "../components/VideoComponents";
import { useSetShortsVideoData } from "../hooks/useSetVideoData";
import { screenHeight } from "../styles/styles";

export default function ShortsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("Road");
  const [shortsVideos, setShortsVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [autoPlayVideoId, setAutoPlayVideoId] = useState(null);
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setAutoPlayVideoId(viewableItems[0].item.id);
    }
  });
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  useSetShortsVideoData({
    query,
    queryResults: 5,
    setVideos: setShortsVideos,
    setIsLoading,
    dependecies: [query],
  });

  return (
    <ScreenContainer isLoading={isLoading}>
      <FlatList
        data={shortsVideos}
        keyExtractor={(item, index) => "ShortsScreen_" + index + item.id}
        renderItem={({ item }) => (
          <ShortsVideoView
            setQuery={setQuery}
            navigation={navigation}
            videoData={item}
            autoPlayVideoId={item.id === autoPlayVideoId}
          />
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={screenHeight}
        decelerationRate="normal"
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
      />
    </ScreenContainer>
  );
}
