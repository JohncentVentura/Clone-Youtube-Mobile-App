import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

export function usePlayVideoOnFocus({ videoPlayer, autoPlayVideoId }) {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused || !autoPlayVideoId) {
      videoPlayer.pause();
    } else if (isFocused || autoPlayVideoId) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }

    return () => {
      try {
        videoPlayer.dispose?.();
      } catch (e) {
        console.log("useVideoPlayerOnFocus error:", e.message);
      }
    };
  }, [isFocused, autoPlayVideoId]);
}
