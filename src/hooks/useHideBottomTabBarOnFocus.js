import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useUI } from "../context/UIContext";

export function useHideBottomTabBarOnFocus() {
  const { setShowMainTabBarModal } = useUI();

  useFocusEffect(
    useCallback(() => {
      setShowMainTabBarModal(false);
      return () => setShowMainTabBarModal(true);
    }, [])
  );
}
