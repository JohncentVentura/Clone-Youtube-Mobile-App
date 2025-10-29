import React, { createContext, ReactNode, useContext, useState } from "react";

interface UIContextType {
  ctxIsShortsVideoPlaying: boolean;
  ctxSetIsShortsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  ctxModalVideoData: Record<string, any>;
  ctxSetModalVideoData: React.Dispatch<
    React.SetStateAction<Record<string, any>>
  >;
  ctxChannelHeaderModal: boolean;
  ctxSetChannelHeaderModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxClearSearchHistoryModal: boolean;
  ctxSetClearSearchHistoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxHomeCommentsItemModal: boolean;
  ctxSetHomeCommentsItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxHomeCommentsModal: boolean;
  ctxSetHomeCommentsModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxHomeCommentsProfileModal: boolean;
  ctxSetHomeCommentsProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxHomeCommentsProfileItemModal: boolean;
  ctxSetHomeCommentsProfileItemModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  ctxMainBottomTabBar: boolean;
  ctxSetMainBottomTabBar: React.Dispatch<React.SetStateAction<boolean>>;
  ctxMainVideoItemModal: boolean;
  ctxSetMainVideoItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxNotifHeaderModal: boolean;
  ctxSetNotifHeaderModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxNotifItemModal: boolean;
  ctxSetNotifItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxRemoveSearchItemModal: boolean;
  ctxSetRemoveSearchItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxSearchResultHeaderModal: boolean;
  ctxSetSearchResultHeaderModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxShareScreenModal: boolean;
  ctxSetShareScreenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIContextProvider({ children }: { children: ReactNode }) {
  const [ctxIsShortsVideoPlaying, ctxSetIsShortsVideoPlaying] = useState(true);
  const [ctxModalVideoData, ctxSetModalVideoData] = useState<
    Record<string, any>
  >({});
  const [ctxChannelHeaderModal, ctxSetChannelHeaderModal] = useState(false);
  const [ctxClearSearchHistoryModal, ctxSetClearSearchHistoryModal] =
    useState(false);
  const [ctxHomeCommentsItemModal, ctxSetHomeCommentsItemModal] =
    useState(false);
  const [ctxHomeCommentsModal, ctxSetHomeCommentsModal] = useState(false);
  const [ctxHomeCommentsProfileModal, ctxSetHomeCommentsProfileModal] =
    useState(false);
  const [ctxHomeCommentsProfileItemModal, ctxSetHomeCommentsProfileItemModal] =
    useState(false);
  const [ctxMainBottomTabBar, ctxSetMainBottomTabBar] = useState(true);
  const [ctxMainVideoItemModal, ctxSetMainVideoItemModal] = useState(false);
  const [ctxNotifHeaderModal, ctxSetNotifHeaderModal] = useState(false);
  const [ctxNotifItemModal, ctxSetNotifItemModal] = useState(false);
  const [ctxRemoveSearchItemModal, ctxSetRemoveSearchItemModal] =
    useState(false);
  const [ctxSearchResultHeaderModal, ctxSetSearchResultHeaderModal] =
    useState(false);
  const [ctxShareScreenModal, ctxSetShareScreenModal] = useState(false);

  return (
    <UIContext.Provider
      value={{
        ctxIsShortsVideoPlaying,
        ctxSetIsShortsVideoPlaying,
        ctxModalVideoData,
        ctxSetModalVideoData,
        ctxChannelHeaderModal,
        ctxSetChannelHeaderModal,
        ctxClearSearchHistoryModal,
        ctxSetClearSearchHistoryModal,
        ctxHomeCommentsModal,
        ctxSetHomeCommentsModal,
        ctxHomeCommentsItemModal,
        ctxSetHomeCommentsItemModal,
        ctxHomeCommentsProfileModal,
        ctxSetHomeCommentsProfileModal,
        ctxHomeCommentsProfileItemModal,
        ctxSetHomeCommentsProfileItemModal,
        ctxMainBottomTabBar,
        ctxSetMainBottomTabBar,
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
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUIContext() {
  return useContext(UIContext);
}
