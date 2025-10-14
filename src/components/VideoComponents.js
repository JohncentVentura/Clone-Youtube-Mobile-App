import { useIsFocused } from "@react-navigation/native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { styles } from "../styles/styles";

export function FlatListVideoView({
  style,
  videoData,
  autoPlayVideoId,
  ...rest
}) {
  const isFocused = useIsFocused();

  const player = useVideoPlayer(videoData.video, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    if (!isFocused) {
      player.pause();
    } else if (autoPlayVideoId) {
      player.play();
    } else {
      player.pause();
    }

    return () => {
      try {
        player.dispose?.();
      } catch (e) {
        console.log("Player already released:", e.message);
      }
    };
  }, [isFocused, autoPlayVideoId]);

  return (
    <VideoView
      style={[styles.videoView, style]}
      resizeMode="stretch"
      player={player}
      nativeControls={false}
      {...rest}
    />
  );
}

export function MainVideoView({ style, videoData, ...rest }) {
  const isFocused = useIsFocused();

  const player = useVideoPlayer(videoData.video, (player) => {
    player.loop = false;
  });

  useEffect(() => {
    if (isFocused) {
      player.play();
    } else {
      player.pause();
    }

    return () => {
      try {
        player.dispose?.();
      } catch (e) {
        console.log("Player already released:", e.message);
      }
    };
  }, [isFocused]);

  return (
    <VideoView
      style={[styles.videoView, style]}
      resizeMode="stretch"
      player={player}
      nativeControls={true}
      {...rest}
    />
  );
}
