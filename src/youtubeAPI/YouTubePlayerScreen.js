import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function YouTubePlayerScreen({ route }) {
  const isFocused = useIsFocused();
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(true);
  const { videoId } = route.params;

  // Pause when unfocused
  useEffect(() => {
    setPlaying(isFocused); // true when screen focused, false otherwise
  }, [isFocused]);

  // Detect finish
  const onChangeState = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false); // stop playing at end
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator size="large" />}
      <YoutubePlayer
        height={250}
        play={playing}
        ref={playerRef}
        videoId={videoId}
        onChangeState={onChangeState}
        onReady={() => setLoading(false)}
      />
    </View>
  );
}
