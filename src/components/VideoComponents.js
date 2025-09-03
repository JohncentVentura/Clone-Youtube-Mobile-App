import { useCallback, useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { styles, screenWidth, screenHeight } from "../styles/styles";
import {
  ThemedView,
  ThemedFlatList,
  ThemedText,
  ThemedIcon,
} from "../components/ThemedComponents";

import { Video } from "expo-av";
import YoutubePlayer from "react-native-youtube-iframe";

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
          style={{ width: "100%", height: "100%",  }}
          source={{ uri: thumbnail }}
          resizeMode="cover"
        />
      ) : (
        <Video
          style={{ width: "100%", height: "100%",  }}
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

  export function RNYIYoutubePlayer({ style, data }) {
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
          videoId={data?.items[0].id}
          onChangeState={onStateChange}
        />
      </ThemedView>
    );
  }
