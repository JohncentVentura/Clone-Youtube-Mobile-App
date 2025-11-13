import { useState } from "react";
import { Image, View } from "react-native";
import { VideoHorizontalPreview } from "../components/CardsComponents";
import {
  LinearGradientView,
  ScreenScrollView,
} from "../components/ContainerComponents";
import {
  DotVerticalIcon,
  DownloadIcon,
  LockIcon,
  PlayIcon,
  SaveIcon,
  ShareIcon,
  ShuffleIcon,
} from "../components/IconComponents";
import {
  UserPlaylistCoverImage,
  MusicTrackImage,
} from "../components/ImageComponents";
import {
  BasePressable,
  RippleButton,
  IconRoundedButton,
  IconTextButton,
} from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useSetVideoData } from "../hooks/useSetVideoData";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";

export default function MusicTrackScreen({ navigation, route }) {
  const { query, tracks, gradientColor, title, description } = route.params;
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const [musicTracksCount, setMusicTracksCount] = useState(tracks);
  const [musicTracks, setMusicTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useSetVideoData({
    query,
    queryResults: musicTracksCount,
    setVideos: setMusicTracks,
    setIsLoading,
  });

  return (
    <ScreenScrollView isLoading={isLoading}>
      <LinearGradientView
        colors={gradientColor}
        style={[{ paddingVertical: 16 }, styles.screenPadHorizontal]}
      >
        <MusicTrackImage
          style={{ alignSelf: "center" }}
          source={{ uri: musicTracks[0]?.picture }}
        />
        <BaseText
          style={{
            marginTop: 12,
            fontSize: ctxFontSizes.xl,
            fontWeight: "bold",
            color: ctxColors.white,
          }}
        >
          {title}
        </BaseText>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <BaseText
              style={{
                fontSize: ctxFontSizes.sm,
                fontWeight: "bold",
                color: ctxColors.white,
              }}
            >
              YouTube Music
            </BaseText>
            <BaseText
              style={{
                fontSize: ctxFontSizes.xs,
                color: ctxColors.transparentWhite,
              }}
            >
              {musicTracksCount} videos
            </BaseText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconRoundedButton
              style={{ backgroundColor: ctxColors.transparentWhite }}
            >
              <SaveIcon size={ctxIconSizes.xs} />
            </IconRoundedButton>
            <IconRoundedButton
              style={{
                marginLeft: 8,
                backgroundColor: ctxColors.transparentWhite,
              }}
            >
              <DownloadIcon size={ctxIconSizes.xs} />
            </IconRoundedButton>
            <IconRoundedButton
              style={{
                marginLeft: 8,
                backgroundColor: ctxColors.transparentWhite,
              }}
            >
              <ShareIcon size={ctxIconSizes.xs} />
            </IconRoundedButton>
          </View>
        </View>

        <BaseText
          style={{
            marginTop: 12,
            fontSize: ctxFontSizes.xs,
            fontWeight: "medium",
            color: ctxColors.white,
          }}
        >
          {description}
        </BaseText>

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
                query: musicTracks[0].title,
                videoData: musicTracks[0],
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
      </LinearGradientView>

      <View style={{ marginTop: 10, paddingBottom: 8, width: "100%" }}>
        {musicTracks.map((videoData, index) => {
          return (
            <VideoHorizontalPreview
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
