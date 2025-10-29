import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useUIContext } from "../context/UIContext";

export function useHideBottomTabBarOnFocus() {
  const { ctxSetMainBottomTabBar } = useUIContext();

  useFocusEffect(
    useCallback(() => {
      ctxSetMainBottomTabBar(false);
      return () => ctxSetMainBottomTabBar(true);
    }, [])
  );
}
