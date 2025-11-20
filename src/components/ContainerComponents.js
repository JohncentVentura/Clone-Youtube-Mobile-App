import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeContext } from "../context/ThemeContext";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import {
  GamingCard,
  HorizontalCard,
  ShortsVideoCard,
  VerticalCard,
} from "./CardsComponents";


export function DividerView({ style }) {
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

//#region Flexible / Children-Assigned Containers
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

export function LinearGradientContainer({ style, colors, children, ...rest }) {
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
//#endregion
//#region Fixed / Data-Assigned Containers
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

export function HorizontalCardColumnScrollView({
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
          <HorizontalCard
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

export function ShortsVideoCardScrollView({
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

export function VerticalCardRowScrollView({
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
          <VerticalCard
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
