import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ClearSearchHistoryModal,
  RemoveSearchItemModal,
} from "../components/modals/QuestionModals";
import { HomeCommentsProfileModal } from "../components/modals/CommentsModal";
import {
  FlatListVideoItemModal,
  HomeCommentsItemModal,
  HomeCommentsProfileItemModal,
  NotificationsItemModal,
  ShareScreenModal,
} from "../components/modals/SwipeDownModals";
import {
  ChannelHeaderModal,
  NotificationsHeaderModal,
  SearchResultHeaderModal,
} from "../components/modals/TopRightModals";
import { SearchProvider } from "../context/SearchContext";
import { ThemeProvider } from "../context/ThemeContext";
import { UIProvider, useUI } from "../context/UIContext";
import { fontPaths } from "../utils/constants";
import { navigationRef } from "./NavigationConfig";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

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
      <SearchProvider>
        <ThemeProvider>
          <UIProvider>
            <NavigationContainer ref={navigationRef}>
              {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
              <GlobalModals />
            </NavigationContainer>
          </UIProvider>
        </ThemeProvider>
      </SearchProvider>
    </SafeAreaProvider>
  );
}

function GlobalModals() {
  const {
    showChannelHeaderModal,
    setShowChannelHeaderModal,
    showClearSearchHistoryModal,
    setShowClearSearchHistoryModal,
    showFlatListVideoItemModal,
    setShowFlatListVideoItemModal,
    showHomeCommentsItemModal,
    setShowHomeCommentsItemModal,
    showHomeCommentsProfileModal,
    setShowHomeCommentsProfileModal,
    showHomeCommentsProfileItemModal,
    setShowHomeCommentsProfileItemModal,
    showNotifHeaderModal,
    setShowNotifHeaderModal,
    showRemoveSearchItemModal,
    setShowRemoveSearchItemModal,
    showNotifItemModal,
    setShowNotifItemModal,
    showSearchResultHeaderModal,
    setShowSearchResultHeaderModal,
    showShareScreenModal,
    setShowShareScreenModal,
  } = useUI();

  return (
    <>
      <ClearSearchHistoryModal
        showModal={showClearSearchHistoryModal}
        setShowModal={setShowClearSearchHistoryModal}
      />

      <ChannelHeaderModal
        showModal={showChannelHeaderModal}
        setShowModal={setShowChannelHeaderModal}
      />

      <FlatListVideoItemModal
        showModal={showFlatListVideoItemModal}
        setShowModal={setShowFlatListVideoItemModal}
      />

      <HomeCommentsItemModal
        showModal={showHomeCommentsItemModal}
        setShowModal={setShowHomeCommentsItemModal}
      />

      <HomeCommentsProfileModal
        showModal={showHomeCommentsProfileModal}
        setShowModal={setShowHomeCommentsProfileModal}
      />

      <HomeCommentsProfileItemModal
        showModal={showHomeCommentsProfileItemModal}
        setShowModal={setShowHomeCommentsProfileItemModal}
      />

      <NotificationsHeaderModal
        showModal={showNotifHeaderModal}
        setShowModal={setShowNotifHeaderModal}
      />

      <NotificationsItemModal
        showModal={showNotifItemModal}
        setShowModal={setShowNotifItemModal}
      />

      <RemoveSearchItemModal
        showModal={showRemoveSearchItemModal}
        setShowModal={setShowRemoveSearchItemModal}
      />

      <SearchResultHeaderModal
        showModal={showSearchResultHeaderModal}
        setShowModal={setShowSearchResultHeaderModal}
      />

      <ShareScreenModal
        showModal={showShareScreenModal}
        setShowModal={setShowShareScreenModal}
      />
    </>
  );
}
