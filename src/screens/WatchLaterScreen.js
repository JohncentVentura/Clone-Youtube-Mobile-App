import { useState } from "react";
import { View } from "react-native";
import {
  IconRoundedButton,
  IconTextButton,
} from "../components/ButtonComponents";
import { HorizontalCard } from "../components/CardsComponents";
import {
  LinearGradientContainer,
  ScreenScrollView,
} from "../components/ContainerComponents";
import {
  DotVerticalIcon,
  DownloadIcon,
  LockIcon,
  PlayIcon,
  ShuffleIcon,
} from "../components/IconComponents";
import { UserPlaylistCoverImage } from "../components/ImageComponents";
import { BaseText } from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useSetVideoData } from "../hooks/useSetVideoData";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";

export default function WatchLaterScreen({ navigation, route }) {
  const { userQuery, userWatchLaterDataCount } = route.params;
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const [likedQuery, setLikedQuery] = useState(userQuery);
  const [likedVideosCount, setLikedVideosCount] = useState(
    userWatchLaterDataCount
  );
  const [likedVideos, setLikedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useSetVideoData({
    query: likedQuery,
    queryResults: likedVideosCount,
    setVideos: setLikedVideos,
    setIsLoading,
  });

  return (
    <ScreenScrollView isLoading={isLoading}>
      <LinearGradientContainer
        colors={["rgba(176, 190, 202, 1)", "rgba(46, 134, 178, 1)"]}
        style={[{ paddingVertical: 18 }, styles.screenPadHorizontal]}
      >
        <UserPlaylistCoverImage source={{ uri: likedVideos[0]?.picture }} />
        <BaseText
          style={{
            marginTop: 12,
            fontSize: ctxFontSizes.xl2,
            fontWeight: "bold",
          }}
        >
          Watch Later
        </BaseText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <BaseText style={{ fontSize: ctxFontSizes.sm }}>
              {likedVideosCount} videos
            </BaseText>
            <LockIcon style={{ marginLeft: 12 }} size={ctxIconSizes.xs2} />
            <BaseText style={{ marginLeft: 4, fontSize: ctxFontSizes.sm }}>
              Private
            </BaseText>
          </View>
          <IconRoundedButton
            style={{ backgroundColor: ctxColors.transparentWhite }}
          >
            <DownloadIcon size={ctxIconSizes.xs} />
          </IconRoundedButton>
        </View>
        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconTextButton
            style={[{ backgroundColor: ctxColors.bg }, styles.halfWideButton]}
            Icon={PlayIcon}
            text="Play all"
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: likedVideos[0].title,
                videoData: likedVideos[0],
              })
            }
          />
          <IconTextButton
            style={[
              { backgroundColor: ctxColors.transparentWhite },
              styles.halfWideButton,
            ]}
            Icon={ShuffleIcon}
            text="Shuffle"
            onPress={() => console.log("Shuffle Press")}
          />
        </View>
      </LinearGradientContainer>

      <View style={{ paddingBottom: 8, width: "100%" }}>
        {likedVideos.map((videoData, index) => {
          return (
            <HorizontalCard
              key={videoData.id}
              videoData={videoData}
              onPress={() =>
                navigation.navigate(navPaths.mainVideoScreen, {
                  query: videoData.title,
                  videoData: videoData,
                })
              }
            />
          );
        })}
      </View>
    </ScreenScrollView>
  );
}

function getVideoScreen(videoData) {
  return videoData.videoWidth < videoData.videoHeight
    ? navPaths.shortsScreen
    : navPaths.mainVideoScreen;
}
