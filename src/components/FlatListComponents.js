import { useRef, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { screenHeight } from "../styles/styles";
import { feedTypes } from "../utils/constants";
import { MainVideoCard } from "./CardsComponents";
import {
  GamingCardRowScrollView,
  HorizontalCardColumnScrollView,
  ShortsVideoCardScrollView,
  VerticalCardRowScrollView,
} from "./ContainerComponents";
import PostComponent from "./PostComponent";
import { ShortsVideoView } from "./VideoComponents";

export function MainVideoFlatList({
  style,
  isLoading = false,
  isAutoPlayingVideo = true,
  data,
  navigation,
  query,
  ...rest
}) {
  const inset = useSafeAreaInsets();
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const { ctxSetMainVideoItemModal } = useUIContext();
  const [autoPlayVideoId, setAutoPlayVideoId] = useState(null);
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (isAutoPlayingVideo && viewableItems.length > 0) {
      setAutoPlayVideoId(viewableItems[0].item.id);
    }
  });
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  return isLoading ? (
    <ActivityIndicator style={{ flex: 1 }} size="large" />
  ) : (
    <FlatList
      //*Testing this props
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      windowSize={2}
      //*/
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      style={style}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <MainVideoCard
          key={item.id}
          item={item}
          navigation={navigation}
          query={query}
          isAutoPlayingVideo={isAutoPlayingVideo}
          autoPlayVideoId={autoPlayVideoId}
        />
      )}
      {...rest}
    />
  );
}

export function ShortsVideoFlatList({ style, data, navigation, setQuery }) {
  const [autoPlayVideoId, setAutoPlayVideoId] = useState(null);
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setAutoPlayVideoId(viewableItems[0].item.id);
    }
  });
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  return (
    <FlatList
      //*Testing this props
      pagingEnabled
      snapToInterval={screenHeight}
      decelerationRate="normal"
      scrollEventThrottle={16}
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      removeClippedSubviews={true}
      windowSize={2}
      getItemLayout={(_, index) => ({
        length: screenHeight,
        offset: screenHeight * index,
        index,
      })}
      //*/
      showsVerticalScrollIndicator={false}
      style={style}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ShortsVideoView
          setQuery={setQuery}
          navigation={navigation}
          videoData={item}
          autoPlayVideoId={autoPlayVideoId}
        />
      )}
    />
  );
}

export function MixedFeedFlatList({
  style,
  isLoading = false,
  setIsLoading,
  isAutoPlayingVideo = true,
  mixedData,
  navigation,
  query,
  headerComponent,
  ...rest
}) {
  const [autoPlayVideoId, setAutoPlayVideoId] = useState(null);
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (isAutoPlayingVideo && viewableItems.length > 0) {
      setAutoPlayVideoId(viewableItems[0].item.data.id);
    }
  });
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  return (
    <FlatList
      //*Testing this props
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      windowSize={2}
      //*/
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      style={style}
      data={mixedData}
      keyExtractor={(item, index) => {
        if (item.feedType === feedTypes.mainVideo)
          return `${index}-${feedTypes.mainVideo}-${item.data.id}`;
        if (item.feedType === feedTypes.shortsVideos)
          return `${index}-${feedTypes.shortsVideos}`;
        if (item.feedType === feedTypes.posts)
          return `${index}-${feedTypes.posts}`;
        if (item.feedType === feedTypes.gamingCards)
          return `${index}-${feedTypes.gamingCards}`;
        if (item.feedType === feedTypes.horizontalCards)
          return `${index}-${feedTypes.horizontalCards}`;
        if (item.feedType === feedTypes.verticalCards)
          return `${index}-${feedTypes.verticalCards}`;
        return `${index}-unknown`;
      }}
      renderItem={({ item: mixedItem }) => {
        if (mixedItem.feedType === feedTypes.mainVideo) {
          return (
            <MainVideoCard
              item={mixedItem.data}
              navigation={navigation}
              query={query}
              isAutoPlayingVideo={isAutoPlayingVideo}
              autoPlayVideoId={autoPlayVideoId}
              headerComponent={mixedItem.headerComponent}
            />
          );
        }

        if (mixedItem.feedType === feedTypes.shortsVideos) {
          return (
            <ShortsVideoCardScrollView
              isLoading={isLoading}
              data={mixedItem.data}
              navigation={navigation}
              headerComponent={mixedItem.headerComponent}
            />
          );
        }

        if (mixedItem.feedType === feedTypes.posts) {
          return (
            <PostComponent
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              navigation={navigation}
              videoData={mixedItem.data}
              headerComponent={mixedItem.headerComponent}
            />
          );
        }

        if (mixedItem.feedType === feedTypes.gamingCards) {
          return (
            <GamingCardRowScrollView
              data={mixedItem.data}
              navigation={navigation}
              headerComponent={mixedItem.headerComponent}
            />
          );
        }

        if (mixedItem.feedType === feedTypes.horizontalCards) {
          return (
            <HorizontalCardColumnScrollView
              data={mixedItem.data}
              navigation={navigation}
              headerComponent={mixedItem.headerComponent}
            />
          );
        }

        if (mixedItem.feedType === feedTypes.verticalCards) {
          return (
            <VerticalCardRowScrollView
              data={mixedItem.data}
              navigation={navigation}
              headerComponent={mixedItem.headerComponent}
            />
          );
        }

        return null;
      }}
      {...rest}
    />
  );
}
