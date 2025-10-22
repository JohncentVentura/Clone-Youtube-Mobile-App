import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export function UIProvider({ children }) {
  const [modalVideoData, setModalVideoData] = useState({});
  const [showChannelHeaderModal, setShowChannelHeaderModal] = useState(false);
  const [showClearSearchHistoryModal, setShowClearSearchHistoryModal] =
    useState(false);
  const [showFlatListVideoItemModal, setShowFlatListVideoItemModal] =
    useState(false);
  const [showHomeCommentsItemModal, setShowHomeCommentsItemModal] =
    useState(false);
  const [showHomeCommentsModal, setShowHomeCommentsModal] = useState(false);
  const [showHomeCommentsProfileModal, setShowHomeCommentsProfileModal] =
    useState(false);
  const [
    showHomeCommentsProfileItemModal,
    setShowHomeCommentsProfileItemModal,
  ] = useState(false);
  const [showMainTabBarModal, setShowMainTabBarModal] = useState(true);
  const [showNotifHeaderModal, setShowNotifHeaderModal] = useState(false);
  const [showNotifItemModal, setShowNotifItemModal] = useState(false);
  const [showRemoveSearchItemModal, setShowRemoveSearchItemModal] =
    useState(false);
  const [showSearchResultHeaderModal, setShowSearchResultHeaderModal] =
    useState(false);
  const [showShareScreenModal, setShowShareScreenModal] = useState(false);

  return (
    <UIContext.Provider
      value={{
        modalVideoData,
        setModalVideoData,
        showChannelHeaderModal,
        setShowChannelHeaderModal,
        showClearSearchHistoryModal,
        setShowClearSearchHistoryModal,
        showFlatListVideoItemModal,
        setShowFlatListVideoItemModal,
        showHomeCommentsModal,
        setShowHomeCommentsModal,
        showHomeCommentsItemModal,
        setShowHomeCommentsItemModal,
        showHomeCommentsProfileModal,
        setShowHomeCommentsProfileModal,
        showHomeCommentsProfileItemModal,
        setShowHomeCommentsProfileItemModal,
        showMainTabBarModal,
        setShowMainTabBarModal,
        showNotifHeaderModal,
        setShowNotifHeaderModal,
        showNotifItemModal,
        setShowNotifItemModal,
        showRemoveSearchItemModal,
        setShowRemoveSearchItemModal,
        showSearchResultHeaderModal,
        setShowSearchResultHeaderModal,
        showShareScreenModal,
        setShowShareScreenModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}
