import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useUI } from "../context/UIContext";

export function useHideBottomTabBarOnFocus() {
  const { setIsMainTabBarVisible } = useUI();

  useFocusEffect(
    useCallback(() => {
      setIsMainTabBarVisible(false);
      return () => setIsMainTabBarVisible(true);
    }, [])
  );
}
