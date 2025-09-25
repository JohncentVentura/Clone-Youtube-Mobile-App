import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export function urlToTitleExtractor(url) {
  const videoUrl = url;
  const splitUrl = videoUrl.split("/");
  const slug = splitUrl[splitUrl.length - 2];
  const videoTitle = slug.replace(/\d+/g, "").replace(/-+$/, ""); //remove all digits & last hyphen
  //console.log(videoTitle);
  return videoTitle;
}

export function hideMainHeaderAndBottomTabs(navigation) {
  useFocusEffect(
    useCallback(() => {
      const mainBottomTab = navigation.getParent("MainBottomTabs");

      mainBottomTab?.setOptions({
        tabBarStyle: { display: "none" },
        swipeEnabled: false,
        headerShown: false,
      });
    }, [navigation])
  );
}

export function hideMainHeader(navigation) {
  useFocusEffect(
    useCallback(() => {
      const mainBottomTab = navigation.getParent("MainBottomTabs");

      mainBottomTab?.setOptions({
        swipeEnabled: false,
        headerShown: false,
      });
    }, [navigation])
  );
}