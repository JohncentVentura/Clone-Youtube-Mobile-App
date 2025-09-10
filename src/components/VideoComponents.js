import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { VideoView, useVideoPlayer } from "expo-video";
import { styles, screenWidth, screenHeight } from "../styles/styles";
import {
  ThemedView,
  ThemedFlatList,
  ThemedText,
  ThemedTouchableOpacity,
  ThemedIcon,
} from "../components/ThemedComponents";


import YoutubePlayer from "react-native-youtube-iframe";
import { useThemeColor } from "../hooks/useThemeColor";

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

export function PexelsVideoView({ video }) {
  const isFocused = useIsFocused();

  // pick first playable MP4
  const file = video.video_files.find(v => v.file_type === "video/mp4") || video.video_files[0];

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
        style={{
          width: screenWidth,
          height: screenHeight * 0.25,
          backgroundColor: useThemeColor("background"),
          alignSelf: "center",
        }}
        resizeMode="stretch"
        player={player}
        nativeControls={false}
      />
  );
}
