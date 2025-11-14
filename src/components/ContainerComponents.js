import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GamingCard, VideoHorizontalPreviewCard, VideoVerticalPreviewCard } from "./CardsComponents";
import PostComponent from "./PostComponent";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { screenHeight, styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import { ShortsVideoCard } from "./CardsComponents";
import { DotVerticalIcon } from "./IconComponents";
import {
  MainVideoChannelImage,
  MainVideoThumbnailImage,
} from "./ImageComponents";
import { BasePressable, RippleButton } from "./PressableComponents";
import { BaseText } from "./TextComponents";
import { MainVideoView, ShortsVideoView } from "./VideoComponents";

//#region Screen & Headers
export function HeaderContainer({ style, children, ...rest }) {
  const insets = useSafeAreaInsets();
  const { ctxColors } = useThemeContext();

  return (
    <View
      style={[
        styles.screenPadHorizontal,
        {
          paddingTop: insets.top,
          width: "100%",
          height:
            Platform.OS === "android"
              ? insets.top + 56 //Android header height
              : insets.top + 44, //iOS header height
          backgroundColor: ctxColors.bg,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

export function ScreenContainer({ style, isLoading, children, ...rest }) {
  const { ctxColors } = useThemeContext();

  return isLoading ? (
    <ActivityIndicator
      style={{ backgroundColor: ctxColors.bg, flex: 1 }}
      size="large"
    />
  ) : (
    <>
      <View
        style={[
          styles.screenContainer,
          { backgroundColor: ctxColors.bg },
          style,
        ]}
        {...rest}
      >
        {children}
      </View>
    </>
  );
}

export function ScreenScrollView({
  style,
  contentContainerStyle,
  isLoading,
  children,
  ...rest
}) {
  const { ctxColors } = useThemeContext();

  return isLoading ? (
    <ActivityIndicator
      style={{ backgroundColor: ctxColors.bg, flex: 1 }}
      size="large"
    />
  ) : (
    <ScrollView
      style={[styles.screenContainer, { backgroundColor: ctxColors.bg }, style]}
      contentContainerStyle={StyleSheet.flatten([
        { alignItems: "flex-start" }, // default
        contentContainerStyle, // allow override
      ])}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}
//#endregion
//#region ScrollView
export function ColumnScrollView({ children, ...rest }) {
  return (
    <ScrollView
      contentContainerStyle={StyleSheet.create({
        alignItems: "flex-start",
      })}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

export function GamingCardRowScrollView({
  style,
  isLoading,
  data,
  navigation,
  headerComponent,
  ...rest
}) {
  return isLoading ? (
    <ActivityIndicator style={{ flex: 1 }} size="large" />
  ) : (
    <>
      {headerComponent}
      <RowScrollView
        style={[{ width: "100%", marginBottom: 16 }, style]}
        {...rest}
      >
        {data.map((videoData, index) => (
          <GamingCard
            key={index + videoData.id}
            style={{
              marginRight: index === data.length - 1 ? 16 : 0,
            }}
            videoData={videoData}
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData,
              })
            }
          />
        ))}
      </RowScrollView>
    </>
  );
}

export function RowScrollView({ style, children, ...rest }) {
  return (
    <ScrollView
      style={[{ flexGrow: 0 }, style]}
      contentContainerStyle={StyleSheet.create({
        flexDirection: "row",
        alignItems: "flex-start",
      })}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

export function ShortsVideoGridScrollView({
  style,
  isLoading,
  data,
  navigation,
  headerComponent,
  ...rest
}) {
  return isLoading ? (
    <ActivityIndicator style={{ flex: 1 }} size="large" />
  ) : (
    <ScrollView
      style={[styles.screenPadHorizontal, { marginBottom: 16 }, style]}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {headerComponent}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {data.map((item) => (
          <ShortsVideoCard
            key={item.id}
            videoData={item}
            source={{ uri: item.picture }}
            onPress={() => {
              navigation.navigate(navPaths.shortsScreen, {
                videoData: item,
              });
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}

export function VideoHorizontalPreviewCardColumnScrollView({
  style,
  isLoading,
  data,
  navigation,
  headerComponent,
  ...rest
}) {
  return isLoading ? (
    <ActivityIndicator style={{ flex: 1 }} size="large" />
  ) : (
    <>
      {headerComponent}
      <ColumnScrollView
        style={[{ width: "100%", marginBottom: 16 }, style]}
        {...rest}
      >
        {data.map((videoData, index) => (
          <VideoHorizontalPreviewCard
            key={index + videoData.id}
            videoData={videoData}
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData,
              })
            }
          />
        ))}
      </ColumnScrollView>
    </>
  );
}

export function VideoVerticalPreviewCardRowScrollView({
  style,
  isLoading,
  data,
  navigation,
  headerComponent,
  ...rest
}) {
  return isLoading ? (
    <ActivityIndicator style={{ flex: 1 }} size="large" />
  ) : (
    <>
      {headerComponent}
      <RowScrollView
        style={[{ width: "100%", marginBottom: 16 }, style]}
        {...rest}
      >
        {data.map((videoData, index) => (
          <VideoVerticalPreviewCard
            key={index + videoData.id}
            videoData={videoData}
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData,
              })
            }
          />
        ))}
      </RowScrollView>
    </>
  );
}
//#endregion
//#region FlatList
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
        <MainVideoViewRenderItem
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
        if (item.type === "mainVideo") return `${index}-${item.data.id}`;
        if (item.type === "shortsVideos") return `${index}-shortsVideo`;
        if (item.type === "posts") return `${index}-posts`;
        return `${index}-unknown`;
      }}
      renderItem={({ item: mixedItem }) => {
        if (mixedItem.type === "mainVideo") {
          return (
            <MainVideoViewRenderItem
              item={mixedItem.data}
              navigation={navigation}
              query={query}
              isAutoPlayingVideo={isAutoPlayingVideo}
              autoPlayVideoId={autoPlayVideoId}
              headerComponent={mixedItem.headerComponent}
            />
          );
        }

        if (mixedItem.type === "shortsVideos") {
          return (
            <ShortsVideoGridScrollView
              isLoading={isLoading}
              data={mixedItem.data}
              navigation={navigation}
              headerComponent={mixedItem.headerComponent}
            />
          );
        }

        if (mixedItem.type === "posts") {
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

        if (mixedItem.type === "gamingCards") {
          return (
            <GamingCardRowScrollView
              data={mixedItem.data}
              navigation={navigation}
              headerComponent={mixedItem.headerComponent}
            />
          );
        }

        if (mixedItem.type === "videoHorizontalPreview") {
          return (
            <VideoHorizontalPreviewCardColumnScrollView
              data={mixedItem.data}
              navigation={navigation}
              headerComponent={mixedItem.headerComponent}
            />
          );
        }

        if (mixedItem.type === "videoVerticalPreview") {
          return (
            <VideoVerticalPreviewCardRowScrollView
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
//#endregion

//#region FlatList renderItem
export function MainVideoViewRenderItem({
  style,
  item,
  navigation,
  query,
  isAutoPlayingVideo,
  autoPlayVideoId,
}) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const { ctxSetMainVideoItemModal } = useUIContext();

  return (
    <View style={[{ marginBottom: 32 }, style]}>
      <Pressable
        onPress={() => {
          navigation.push(navPaths.mainVideoScreen, {
            query: query,
            videoData: item,
          });
        }}
      >
        {isAutoPlayingVideo ? (
          <MainVideoView videoData={item} autoPlayVideoId={autoPlayVideoId} />
        ) : (
          <MainVideoThumbnailImage source={{ uri: item.picture }} />
        )}
      </Pressable>
      <View
        style={[
          styles.screenPadHorizontal,
          {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          },
        ]}
      >
        <MainVideoChannelImage
          style={{ marginTop: 10 }}
          source={{ uri: item.picture }}
          onPress={() => {
            navigation.navigate(navPaths.channelScreen, {
              videoData: item,
            });
          }}
        />
        <View style={{ marginLeft: 14, marginTop: 8, flexShrink: 1 }}>
          <BaseText
            style={{
              fontSize: ctxFontSizes.lg,
              fontWeight: "bold",
            }}
          >
            {item.title}
          </BaseText>
          <BaseText
            style={{
              marginTop: 4,
              fontSize: ctxFontSizes.xs,
              color: ctxColors.textSecondary,
            }}
          >
            {item.channelName} • {item.views} views • {item.uploadedDate}
          </BaseText>
        </View>
        <RippleButton
          style={{ marginLeft: "auto", marginTop: 6 }}
          rippleSize={4}
          onPress={() => ctxSetMainVideoItemModal(true)}
        >
          <DotVerticalIcon />
        </RippleButton>
      </View>
    </View>
  );
}
//#endregion

//#region Others
export function DrawerDivider({ style }) {
  const { ctxColors } = useThemeContext();

  return (
    <View
      style={[
        {
          marginVertical: 8,
          width: "100%",
          height: 1,
          backgroundColor: ctxColors.borderSecondary,
        },
        style,
      ]}
    />
  );
}

export function LinearGradientView({ style, colors, children, ...rest }) {
  const { ctxColors } = useThemeContext();
  const gradientColors = colors ?? [ctxColors.primary, ctxColors.bg];

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[{ width: "100%", alignSelf: "stretch" }, style]}
      {...rest}
    >
      {children}
    </LinearGradient>
  );
}
//#endregion
