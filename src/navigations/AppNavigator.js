import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeCommentsProfileModal } from "../components/modals/CommentsModal";
import {
  HomeCommentsItemModal,
  HomeCommentsProfileItemModal,
  MainVideoItemModal,
  NotificationsItemModal,
  ShareScreenModal,
} from "../components/modals/SwipeDownModals";
import {
  ChannelHeaderModal,
  NotificationsHeaderModal,
  SearchResultHeaderModal,
} from "../components/modals/TopRightModals";
import {
  ClearSearchHistoryModal,
  RemoveSearchItemModal,
} from "../components/modals/QuestionModals";
import { SearchContextProvider } from "../context/SearchContext";
import { ThemeContextProvider } from "../context/ThemeContext";
import { UIContextProvider, useUIContext } from "../context/UIContext";
import { fontPaths } from "../utils/constants";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { navigationRef } from "./NavigationConfig";

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isFontsLoaded] = useFonts({
    "roboto-bold": fontPaths.robotoBold,
    "roboto-medium": fontPaths.robotoMedium,
    "roboto-regular": fontPaths.robotoRegular,
  });

  if (!isFontsLoaded) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <SafeAreaProvider>
      <SearchContextProvider>
        <ThemeContextProvider>
          <UIContextProvider>
            <NavigationContainer ref={navigationRef}>
              {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
              <GlobalModals />
            </NavigationContainer>
          </UIContextProvider>
        </ThemeContextProvider>
      </SearchContextProvider>
    </SafeAreaProvider>
  );
}

function GlobalModals() {
  const {
    ctxChannelHeaderModal,
    ctxSetChannelHeaderModal,
    ctxClearSearchHistoryModal,
    ctxSetClearSearchHistoryModal,
    ctxHomeCommentsItemModal,
    ctxSetHomeCommentsItemModal,
    ctxHomeCommentsProfileModal,
    ctxSetHomeCommentsProfileModal,
    ctxHomeCommentsProfileItemModal,
    ctxSetHomeCommentsProfileItemModal,
    ctxMainVideoItemModal,
    ctxSetMainVideoItemModal,
    ctxNotifHeaderModal,
    ctxSetNotifHeaderModal,
    ctxNotifItemModal,
    ctxSetNotifItemModal,
    ctxRemoveSearchItemModal,
    ctxSetRemoveSearchItemModal,
    ctxSearchResultHeaderModal,
    ctxSetSearchResultHeaderModal,
    ctxShareScreenModal,
    ctxSetShareScreenModal,
  } = useUIContext();

  return (
    <>
      <ChannelHeaderModal
        isVisible={ctxChannelHeaderModal}
        setIsVisible={ctxSetChannelHeaderModal}
      />
      <ClearSearchHistoryModal
        isVisible={ctxClearSearchHistoryModal}
        setIsVisible={ctxSetClearSearchHistoryModal}
      />
      <HomeCommentsItemModal
        isVisible={ctxHomeCommentsItemModal}
        setIsVisible={ctxSetHomeCommentsItemModal}
      />
      <HomeCommentsProfileModal
        isVisible={ctxHomeCommentsProfileModal}
        setIsVisible={ctxSetHomeCommentsProfileModal}
      />
      <HomeCommentsProfileItemModal
        isVisible={ctxHomeCommentsProfileItemModal}
        setIsVisible={ctxSetHomeCommentsProfileItemModal}
      />
      <MainVideoItemModal
        isVisible={ctxMainVideoItemModal}
        setIsVisible={ctxSetMainVideoItemModal}
      />
      <NotificationsHeaderModal
        isVisible={ctxNotifHeaderModal}
        setIsVisible={ctxSetNotifHeaderModal}
      />
      <NotificationsItemModal
        isVisible={ctxNotifItemModal}
        setIsVisible={ctxSetNotifItemModal}
      />
      <RemoveSearchItemModal
        isVisible={ctxRemoveSearchItemModal}
        setIsVisible={ctxSetRemoveSearchItemModal}
      />
      <SearchResultHeaderModal
        isVisible={ctxSearchResultHeaderModal}
        setIsVisible={ctxSetSearchResultHeaderModal}
      />
      <ShareScreenModal
        isVisible={ctxShareScreenModal}
        setIsVisible={ctxSetShareScreenModal}
      />
    </>
  );
}
