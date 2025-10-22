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
import { useTheme } from "../context/ThemeContext";
import { useUI } from "../context/UIContext";
import { styles } from "../styles/styles";
import { DotVerticalIcon } from "./IconComponents";
import { FlatListChannelImage } from "./ImageComponents";
import { RippleButton } from "./PressableComponents";
import { BaseText } from "./TextComponents";
import { FlatListVideoView } from "./VideoComponents";

//#region Screen & Headers
export function HeaderContainer({ style, children, ...rest }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.screenPadHorizontal,
        {
          paddingTop: insets.top,
          height:
            Platform.OS === "android"
              ? insets.top + 56 //Android header height
              : insets.top + 44, //iOS header height
          backgroundColor: colors.bg,
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
  const { colors } = useTheme();

  return isLoading ? (
    <ActivityIndicator
      style={{ backgroundColor: colors.bg, flex: 1 }}
      size="large"
    />
  ) : (
    <>
      <View
        style={[styles.screenContainer, { backgroundColor: colors.bg }, style]}
        {...rest}
      >
        {children}
      </View>
    </>
  );
}

export function ScreenScrollView({ style, isLoading, children, ...rest }) {
  const { colors } = useTheme();

  return isLoading ? (
    <ActivityIndicator
      style={{ backgroundColor: colors.bg, flex: 1 }}
      size="large"
    />
  ) : (
    <>
      <ScrollView
        style={[styles.screenContainer, { backgroundColor: colors.bg }, style]}
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

//#region FlatList & Item
export function AutoPlayVideoFlatList({
  isLoading,
  navigation,
  query,
  data,
  ...rest
}) {
  const { colors } = useTheme();
  const [autoPlayVideoId, setAutoPlayVideoId] = useState(null);
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setAutoPlayVideoId(viewableItems[0].item.id);
    }
  });
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  return isLoading ? (
    <ActivityIndicator
      style={{ backgroundColor: colors.bg, flex: 1 }}
      size="large"
    />
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index + item.id}
      renderItem={({ item }) => {
        return (
          <FlatListVideoItem
            navigation={navigation}
            query={query}
            videoData={item}
            autoPlayVideoId={item.id === autoPlayVideoId}
          />
        );
      }}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      {...rest}
    />
  );
}

export function FlatListVideoItem({
  style,
  navigation,
  query,
  videoData,
  autoPlayVideoId,
}) {
  const { setShowFlatListVideoItemModal } = useUI();
  const { colors, fontSizes } = useTheme();

  return (
    <View style={[{ marginBottom: 32 }, style]}>
      <Pressable
        onPress={() => {
          navigation.push("MainVideoScreen", {
            query: query,
            videoData: videoData,
          });
        }}
      >
        <FlatListVideoView
          videoData={videoData}
          autoPlayVideoId={autoPlayVideoId}
        />
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
        <FlatListChannelImage
          style={{ marginTop: 10 }}
          source={{ uri: videoData.picture }}
          onPress={() => {
            navigation.navigate("ChannelScreen", {
              query: query,
              videoData: videoData,
            });
          }}
        />
        <View style={{ marginLeft: 14, marginTop: 8, flexShrink: 1 }}>
          <BaseText
            style={{
              fontSize: fontSizes.lg,
              fontWeight: "bold",
            }}
          >
            {videoData.title}
          </BaseText>
          <BaseText
            style={{
              marginTop: 4,
              fontSize: fontSizes.xs,
              color: colors.textSecondary,
            }}
          >
            {videoData.channelName} • {videoData.views} views •{" "}
            {videoData.uploadedDate}
          </BaseText>
        </View>
        <RippleButton
          style={{ marginLeft: "auto", marginTop: 6 }}
          rippleSize={4}
          onPress={() => setShowFlatListVideoItemModal(true)}
        >
          <DotVerticalIcon />
        </RippleButton>
      </View>
    </View>
  );
}
//#endregion
