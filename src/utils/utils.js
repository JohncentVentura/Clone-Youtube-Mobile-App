import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useUIState } from "../context/UIStateContext";

export function getPexelsTagUserName(url) {
  // Remove trailing slash if it exists
  const cleanUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  // Split the URL into parts
  const parts = cleanUrl.split("@");
  // Return the part after "@"
  return parts.length > 1 ? parts[1] : null;
}

export function getPexelsUrlToTitle(url) {
  const videoUrl = url;
  const splitUrl = videoUrl.split("/");
  const slug = splitUrl[splitUrl.length - 2];
  const videoTitle = slug.replace(/\d+/g, "").replace(/-+$/, ""); //remove all digits & last hyphen
  return videoTitle;
}

export function getShortenText(text, maxLength = 50) {
  return text.length > maxLength
    ? text.slice(0, maxLength).trim() + "..."
    : text;
}

export function randomTimeAgo(num) {
  const firstDigit = Number(String(Math.abs(num))[0]);
  const units = ["hour", "day", "week", "month", "year"];
  const randomUnit = units[Math.floor(Math.random() * units.length)];
  const pluralUnit = firstDigit === 1 ? randomUnit : randomUnit + "s";
  return `${firstDigit} ${pluralUnit} ago`;
}

export function roundOffNumber(num) {
  num = Math.abs(num);

  if (num < 1000) {
    return num;
  } else if (num < 1_000_000) {
    const thousands = num / 1000;

    const display =
      num < 10_000
        ? thousands.toFixed(1).replace(/\.0$/, "") //Keep one decimal if < 10k
        : Math.round(thousands); //Keep whole number if ≥ 10k

    return display + "K";
  } else if (num < 1_000_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num < 1_000_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
}

export function useHideTabBarOnFocus() {
  const { setIsTabBarVisible } = useUIState();

  useFocusEffect(
    useCallback(() => {
      setIsTabBarVisible(false);
      return () => setIsTabBarVisible(true);
    }, [])
  );
}

export function useScrollToTopOnFocus(ref) {
  useFocusEffect(
    useCallback(() => {
      ref.current?.scrollToOffset?.({ offset: 0, animated: false });
      ref.current?.scrollTo?.({ y: 0, animated: false });
    }, [])
  );
}
