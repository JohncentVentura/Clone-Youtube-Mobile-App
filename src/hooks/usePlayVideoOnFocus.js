import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { useUIContext } from "../context/UIContext";

//Safe guard to ensure player isn't released before calling methods
function safeCall(player, method, ...args) {
  if (!player || typeof player[method] !== "function") return;
  try {
    player[method](...args);
  } catch (e) {
    if (!/released|unloaded/i.test(e.message)) {
      console.log(`VideoPlayer.${method} error:`, e.message);
    }
  }
}

export function usePlayMainVideoOnFocus({
  videoPlayer,
  videoDataId,
  autoPlayVideoId,
}) {
  const isFocused = useIsFocused();
  const mounted = useRef(true);
  const isVideoAutoPlaying = videoDataId === autoPlayVideoId;

  useEffect(() => {
    mounted.current = true;
    if (!videoPlayer) return;

    if (isFocused && isVideoAutoPlaying) {
      safeCall(videoPlayer, "play");
    } else {
      safeCall(videoPlayer, "pause");
    }

    return () => {
      mounted.current = false;
      safeCall(videoPlayer, "pause");
    };
  }, [isFocused, videoDataId, autoPlayVideoId]);
}

export function usePlayShortsVideoOnFocus({
  videoPlayer,
  videoDataId,
  autoPlayVideoId,
}) {
  const { ctxSetIsShortsVideoPlaying } = useUIContext();
  const isFocused = useIsFocused();
  const mounted = useRef(true);
  const isVideoAutoPlaying = videoDataId === autoPlayVideoId;

  useEffect(() => {
    mounted.current = true;
    if (!videoPlayer) return;

    if (isFocused && isVideoAutoPlaying) {
      ctxSetIsShortsVideoPlaying(true);
      safeCall(videoPlayer, "play");
    } else if (!isFocused) {
      ctxSetIsShortsVideoPlaying(false);
      safeCall(videoPlayer, "pause");
    }

    return () => {
      mounted.current = false;
      safeCall(videoPlayer, "pause");
    };
  }, [isFocused, videoDataId, autoPlayVideoId]);
}
