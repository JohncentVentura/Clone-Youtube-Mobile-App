import { useState } from "react";
import { View } from "react-native";
import { MoviesCard } from "../../components/CardsComponents";
import {
  DrawerDivider,
  RowScrollView,
  ScreenScrollView,
} from "../../components/ContainerComponents";
import { MovieIcon } from "../../components/IconComponents";
import { OutlinedButton } from "../../components/PressableComponents";
import { BaseText } from "../../components/TextComponents";
import { useThemeContext } from "../../context/ThemeContext";
import { useSetVideoData } from "../../hooks/useSetVideoData";
import { styles } from "../../styles/styles";
import { navPaths } from "../../utils/constants";

export default function MoviesScreen({ navigation }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();

  const [topMovies, setTopMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useSetVideoData({
    query: "top movies",
    queryResults: 4,
    setVideos: setTopMovies,
    setIsLoading,
  });
  useSetVideoData({
    query: "action movies",
    queryResults: 4,
    setVideos: setActionMovies,
    setIsLoading,
  });
  useSetVideoData({
    query: "romance movies",
    queryResults: 4,
    setVideos: setRomanceMovies,
    setIsLoading,
  });
  useSetVideoData({
    query: "horror movies",
    queryResults: 4,
    setVideos: setHorrorMovies,
    setIsLoading,
  });

  return (
    <ScreenScrollView isLoading={isLoading}>
      <View
        style={[
          { flexDirection: "row", alignItems: "center" },
          styles.screenPadHorizontal,
        ]}
      >
        <View
          style={{
            borderRadius: 99,
            padding: 10,
            backgroundColor: ctxColors.primary,
          }}
        >
          <MovieIcon size={ctxIconSizes.xl2} color={ctxColors.white} />
        </View>
        <BaseText
          style={{
            marginLeft: 10,
            fontSize: ctxFontSizes.xl2,
            fontWeight: "bold",
          }}
        >
          Movies
        </BaseText>
      </View>

      <View
        style={[
          {
            marginTop: 10,
            width: "100%",
            fontSize: ctxFontSizes.lg,
            fontWeight: "bold",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
          Top Movies
        </BaseText>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.sm }}>View All</BaseText>
        </OutlinedButton>
      </View>
      <RowScrollView style={{ marginTop: 8, marginBottom: 10 }}>
        {topMovies.map((videoData) => (
          <MoviesCard
            key={videoData.id}
            videoData={videoData}
            genre="Top Movie"
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData: videoData,
              })
            }
          />
        ))}
      </RowScrollView>
      <DrawerDivider />
      <View
        style={[
          {
            marginTop: 10,
            width: "100%",
            fontSize: ctxFontSizes.lg,
            fontWeight: "bold",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
          Action Movies
        </BaseText>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.sm }}>View All</BaseText>
        </OutlinedButton>
      </View>
      <RowScrollView style={{ marginTop: 8, marginBottom: 10 }}>
        {actionMovies.map((videoData) => (
          <MoviesCard
            key={videoData.id}
            videoData={videoData}
            genre="Action"
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData: videoData,
              })
            }
          />
        ))}
      </RowScrollView>
      <DrawerDivider />
      <View
        style={[
          {
            marginTop: 10,
            width: "100%",
            fontSize: ctxFontSizes.lg,
            fontWeight: "bold",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
          Romance Movies
        </BaseText>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.sm }}>View All</BaseText>
        </OutlinedButton>
      </View>
      <RowScrollView style={{ marginTop: 8, marginBottom: 10 }}>
        {romanceMovies.map((videoData) => (
          <MoviesCard
            key={videoData.id}
            videoData={videoData}
            genre="Romance"
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData: videoData,
              })
            }
          />
        ))}
      </RowScrollView>
      <DrawerDivider />
      <View
        style={[
          {
            marginTop: 10,
            width: "100%",
            fontSize: ctxFontSizes.lg,
            fontWeight: "bold",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
          Horror Movies
        </BaseText>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.sm }}>View All</BaseText>
        </OutlinedButton>
      </View>
      <RowScrollView style={{ marginTop: 8, marginBottom: 24 }}>
        {horrorMovies.map((videoData) => (
          <MoviesCard
            key={videoData.id}
            videoData={videoData}
            genre="Horror"
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData: videoData,
              })
            }
          />
        ))}
      </RowScrollView>
    </ScreenScrollView>
  );
}
