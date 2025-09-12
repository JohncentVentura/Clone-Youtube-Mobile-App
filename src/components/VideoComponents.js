import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { VideoView, useVideoPlayer } from "expo-video";
import {
  styles,
  screenWidth,
  screenHeight,
  textSizes,
  colors,
} from "../styles/styles";
import {
  ThemedView,
  ThemedFlatList,
  ThemedText,
  ThemedTouchableOpacity,
  ThemedIcon,
} from "../components/ThemedComponents";

import YoutubePlayer from "react-native-youtube-iframe";
import { useThemeColor } from "../hooks/useThemeColor";
import { useNavigation } from "@react-navigation/native";
import { HomeChannelImage } from "../components/ImageComponents";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

/*
import { Video } from "expo-av";
import { ThemedTouchableOpacity } from './ThemedComponents';
export function ExpoAVVideo({ style, source, thumbnail }) {
  const [showThumbnail, setShowThumbnail] = useState(true);
  const videoRef = useRef(null);
  const isFocused = useIsFocused();

  // Handle focus change: play or pause video
  useEffect(() => {
    if (isFocused) {
      videoRef.current?.playAsync();
      setShowThumbnail(false);
    } else {
      videoRef.current?.pauseAsync();
      setShowThumbnail(true);
    }
  }, [isFocused]);

  // Handle video finish
  const handlePlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setShowThumbnail(true);
    }
  };

  return (
    <ThemedView style={[styles.largeVideo, style]}>
      {showThumbnail ? (
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{ uri: thumbnail }}
          resizeMode="cover"
        />
      ) : (
        <Video
          style={{ width: "100%", height: "100%" }}
          source={{ uri: source }}
          ref={videoRef}
          resizeMode="cover"
          shouldPlay={isFocused}
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      )}
    </ThemedView>
  );
}
*/

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
  const isFocused = useIsFocused();

  // pick first playable MP4
  const file =
    video.video_files.find((v) => v.file_type === "video/mp4") ||
    video.video_files[0];

  // create player bound to this URL
  const player = useVideoPlayer(file.link, (player) => {
    player.loop = false;
  });

  //*
  useEffect(() => {
    if (isFocused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isFocused]);
  //*/

  return (
    <VideoView
      style={[
        {
          width: screenWidth,
          height: screenHeight * 0.25,
          backgroundColor: useThemeColor("background"),
          alignSelf: "center",
        },
        style,
      ]}
      resizeMode="stretch"
      player={player}
      nativeControls={false}
    />
  );
}

export function LargeVideoFlatList({ videos, navigation, homeScreens }) {
  console.log(homeScreens);

  return (
    <ThemedFlatList
      data={videos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ThemedView style={styles.homeVideoContainer}>
          <ThemedTouchableOpacity
            onPress={() =>
              navigation.navigate(homeScreens.homeVideoScreen, { video: item })
            }
          >
            <LargeVideoView video={item} />
          </ThemedTouchableOpacity>

          <ThemedView style={styles.homeVideoInfoContainer}>
            <ThemedView style={{ flex: 1 }}>
              <HomeChannelImage
                source={{ uri: item.video_pictures[0].picture }}
              />
            </ThemedView>
            <ThemedView style={{ flex: 5 }}>
              <ThemedText size={textSizes.xl} style={{ fontWeight: "600" }}>
                Video Title
              </ThemedText>
              <ThemedText size={textSizes.xs} color={colors.gray}>
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
