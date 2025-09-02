import { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Video } from "expo-av";
import { styles } from "../styles/styles";

export function AutoPlayVideo({ style, source, thumbnail }) {
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
    <View style={[styles.autoPlayVideo, style]}>
      {showThumbnail ? (
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          source={{ uri: thumbnail }}
        />
      ) : (
        <Video
          style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
          source={{ uri: source }}
          ref={videoRef}
          resizeMode="cover"
          shouldPlay={isFocused}
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      )}
    </View>
  );
}
