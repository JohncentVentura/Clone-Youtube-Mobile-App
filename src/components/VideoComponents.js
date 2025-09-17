import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useCallback, useEffect, useState } from "react";
import { HomeChannelImage } from "../components/ImageComponents";
import {
  ThemedFlatList,
  ThemedIcon,
  ThemedPressable,
  ThemedText,
  ThemedView,
} from "../components/ThemedComponents";
import { styles, screenWidth, screenHeight } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

//Deprecated: imports and function for using Youtube API
import YoutubePlayer from "react-native-youtube-iframe";
export function RNYIYoutubePlayer({ style, videoId }) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <ThemedView style={[styles.largeVideo, style]}>
      <YoutubePlayer
        width={"100%"}
        height={"100%"}
        resizeMode="stretch"
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
    </ThemedView>
  );
}

export function LargeVideoView({ style, video }) {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  // pick first playable MP4
  const file =
    video.video_files.find((v) => v.file_type === "video/mp4") ||
    video.video_files[0];

  // create player bound to this URL
  const player = useVideoPlayer(file.link, (player) => {
    player.loop = false;
  });

  useEffect(() => {
    if (isFocused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isFocused]);

  return (
    <VideoView
      nativeControls={false}
      player={player}
      resizeMode="stretch"
      style={[
        {
          width: screenWidth,
          height: screenHeight * 0.25,
          backgroundColor: colors.bg,
          alignSelf: "center",
        },
        style,
      ]}
    />
  );
}

export function LargeVideoFlatList({ videos, navigation, homeScreens }) {
  const { colors, fontSizes } = useTheme();
  //console.log(homeScreens);

  return (
    <ThemedFlatList
      data={videos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ThemedView style={styles.homeVideoContainer}>
          <ThemedPressable
            onPress={() =>
              navigation.navigate(homeScreens.homeVideoScreen, { video: item })
            }
          >
            <LargeVideoView video={item} />
          </ThemedPressable>

          <ThemedView style={styles.homeVideoInfoContainer}>
            <ThemedView style={{ flex: 1 }}>
              <HomeChannelImage
                source={{ uri: item.video_pictures[0].picture }}
              />
            </ThemedView>
            <ThemedView style={{ flex: 5 }}>
              <ThemedText style={{ fontSize: fontSizes.xl, fontWeight: "600" }}>
                Video Title
              </ThemedText>
              <ThemedText
                style={{ color: colors.textGray, fontSize: fontSizes.xs }}
              >
                Channel Name * {item.id} Views * Uploaded Date
              </ThemedText>
            </ThemedView>
            <ThemedView style={{ flex: 1, alignItems: "flex-end" }}>
              <ThemedIcon
                IconComponent={MaterialCommunityIcons}
                name="dots-vertical"
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      )}
    />
  );
}
