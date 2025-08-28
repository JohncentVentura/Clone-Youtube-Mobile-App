import { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Video } from "expo-av";
import { styles } from "../styles/styles";

export function AutoPlayVideo({ source, thumbnail, style }) {
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
          source={{ uri: thumbnail }}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      ) : (
        <Video
          ref={videoRef}
          source={{ uri: source }}
          style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
          resizeMode="cover"
          shouldPlay={isFocused}
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      )}
    </View>
  );
}
