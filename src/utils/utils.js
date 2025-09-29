import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export function hideMainBottomTabs(navigation) {
  useFocusEffect(
    useCallback(() => {
      const mainBottomTab = navigation.getParent("MainBottomTabs");

      mainBottomTab?.setOptions({
        tabBarStyle: { display: "none" },
      });
    }, [navigation])
  );
}

export function parseUrlTitle(url) {
  const videoUrl = url;
  const splitUrl = videoUrl.split("/");
  const slug = splitUrl[splitUrl.length - 2];
  const videoTitle = slug.replace(/\d+/g, "").replace(/-+$/, ""); //remove all digits & last hyphen
  //console.log(videoTitle);
  return videoTitle;
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
