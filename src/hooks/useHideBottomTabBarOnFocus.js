import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useUIState } from "../context/UIStateContext";

export function useHideBottomTabBarOnFocus() {
  const { setIsTabBarVisible } = useUIState();

  useFocusEffect(
    useCallback(() => {
      setIsTabBarVisible(false);
      return () => setIsTabBarVisible(true);
    }, [])
  );
}
