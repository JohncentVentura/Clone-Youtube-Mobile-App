import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { screenHeight, styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import { DotVerticalIcon } from "./IconComponents";
import {
  MainVideoChannelImage,
  MainVideoThumbnailImage,
  SubscribedShortsImage,
} from "./ImageComponents";
import { RippleButton } from "./PressableComponents";
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

export function ScreenScrollView({ style, isLoading, children, ...rest }) {
  const { ctxColors } = useThemeContext();

  return isLoading ? (
    <ActivityIndicator
      style={{ backgroundColor: ctxColors.bg, flex: 1 }}
      size="large"
    />
  ) : (
    <>
      <ScrollView
        style={[
          styles.screenContainer,
          { backgroundColor: ctxColors.bg },
          style,
        ]}
        contentContainerStyle={StyleSheet.create({
          alignItems: "flex-start",
        })}
        showsVerticalScrollIndicator={false}
        {...rest}
      >
        {children}
      </ScrollView>
    </>
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

export function RowScrollView({ style, children, ...rest }) {
  return (
    <ScrollView
      style={[{ flexGrow: 0 }, style]}
      contentContainerStyle={StyleSheet.create({
        flexDirection: "row",
        alignItems: "center",
      })}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      {...rest}
    >
      {children}
    </ScrollView>
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
      renderItem={({ item, index }) => {
        return (
          <View style={[{ marginBottom: 32 }]}>
            <Pressable
              onPress={() => {
                navigation.push("MainVideoScreen", {
                  query: query,
                  videoData: item,
                });
              }}
            >
              {isAutoPlayingVideo ? (
                <MainVideoView
                  videoData={item}
                  autoPlayVideoId={autoPlayVideoId}
                />
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
                    query: query,
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
      }}
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

export function ShortsVideoGridFlatList({ data, navigation, query, ...rest }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      columnWrapperStyle={{
        marginVertical: 4,
        justifyContent: "space-between",
      }}
      renderItem={({ item }) => (
        <SubscribedShortsImage
          key={item.id}
          data={item}
          source={{ uri: item.picture }}
          onPress={() => {
            navigation.navigate(navPaths.shortsScreen, {
              routeQuery: query,
              videoData: item,
            });
          }}
        />
      )}
      {...rest}
    />
  );
}
//#endregion
