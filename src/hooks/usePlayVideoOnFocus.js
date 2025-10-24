import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { useUI } from "../context/UIContext";

export function usePlayMainVideoOnFocus({ videoPlayer, autoPlayVideoId }) {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused && !autoPlayVideoId) {
      videoPlayer.pause();
    } else if (isFocused && autoPlayVideoId) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }

    return () => {
      try {
        videoPlayer.dispose?.();
      } catch (e) {
        console.log("usePlayMainVideoOnFocus error:", e.message);
      }
    };
  }, [isFocused, autoPlayVideoId]);
}

export function usePlayShortsVideoOnFocus({
  videoPlayer,
  autoPlayVideoId,
  setIsPlaying,
}) {
  const isFocused = useIsFocused();
  const { setIsShortsVideoPlaying } = useUI();

  useEffect(() => {
    if (isFocused && autoPlayVideoId) {
      videoPlayer.play();
      setIsPlaying(true);
      //setIsShortsVideoPlaying(true);
    } else {
      videoPlayer.pause();
      setIsPlaying(false);
      //setIsShortsVideoPlaying(false);
    }

    return () => {
      try {
        videoPlayer.dispose?.();
      } catch (e) {
        console.log("usePlayShortsVideoOnFocus error:", e.message);
      }
    };
  }, [isFocused, autoPlayVideoId]);
}
