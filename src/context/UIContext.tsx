import React, { createContext, ReactNode, useContext, useState } from "react";

interface UIContextType {
  //Data
  ctxIsShortsVideoPlaying: boolean;
  ctxSetIsShortsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  ctxModalVideoData: Record<string, any>;
  ctxSetModalVideoData: React.Dispatch<
    React.SetStateAction<Record<string, any>>
  >;

  //Modals
  ctxChannelHeaderModal: boolean;
  ctxSetChannelHeaderModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxClearSearchHistoryModal: boolean;
  ctxSetClearSearchHistoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxCommentsItemModal: boolean;
  ctxSetCommentsItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxCommentsProfileModal: boolean;
  ctxSetCommentsProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxCommentsProfileItemModal: boolean;
  ctxSetCommentsProfileItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxHomeCommentsModal: boolean;
  ctxSetHomeCommentsModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxMainBottomTabBar: boolean;
  ctxSetMainBottomTabBar: React.Dispatch<React.SetStateAction<boolean>>;
  ctxMainVideoItemModal: boolean;
  ctxSetMainVideoItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxNotifHeaderModal: boolean;
  ctxSetNotifHeaderModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxNotifItemModal: boolean;
  ctxSetNotifItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxPostCommentsModal: boolean;
  ctxSetPostCommentsModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxRemoveSearchItemModal: boolean;
  ctxSetRemoveSearchItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxSearchResultHeaderModal: boolean;
  ctxSetSearchResultHeaderModal: React.Dispatch<React.SetStateAction<boolean>>;
  ctxShareScreenModal: boolean;
  ctxSetShareScreenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIContextProvider({ children }: { children: ReactNode }) {
  //Data
  const [ctxIsShortsVideoPlaying, ctxSetIsShortsVideoPlaying] = useState(true);
  const [ctxModalVideoData, ctxSetModalVideoData] = useState<
    Record<string, any>
  >({});

  //Modals
  const [ctxChannelHeaderModal, ctxSetChannelHeaderModal] = useState(false);
  const [ctxClearSearchHistoryModal, ctxSetClearSearchHistoryModal] =
    useState(false);
  const [ctxCommentsItemModal, ctxSetCommentsItemModal] = useState(false);
  const [ctxCommentsProfileModal, ctxSetCommentsProfileModal] = useState(false);
  const [ctxCommentsProfileItemModal, ctxSetCommentsProfileItemModal] =
    useState(false);
  const [ctxHomeCommentsModal, ctxSetHomeCommentsModal] = useState(false);
  const [ctxMainBottomTabBar, ctxSetMainBottomTabBar] = useState(true);
  const [ctxMainVideoItemModal, ctxSetMainVideoItemModal] = useState(false);
  const [ctxNotifHeaderModal, ctxSetNotifHeaderModal] = useState(false);
  const [ctxNotifItemModal, ctxSetNotifItemModal] = useState(false);
  const [ctxPostCommentsModal, ctxSetPostCommentsModal] = useState(false);
  const [ctxRemoveSearchItemModal, ctxSetRemoveSearchItemModal] =
    useState(false);
  const [ctxSearchResultHeaderModal, ctxSetSearchResultHeaderModal] =
    useState(false);
  const [ctxShareScreenModal, ctxSetShareScreenModal] = useState(false);

  return (
    <UIContext.Provider
      value={{
        //Data
        ctxIsShortsVideoPlaying,
        ctxSetIsShortsVideoPlaying,
        ctxModalVideoData,
        ctxSetModalVideoData,

        //Modals
        ctxChannelHeaderModal,
        ctxSetChannelHeaderModal,
        ctxClearSearchHistoryModal,
        ctxSetClearSearchHistoryModal,
        ctxCommentsItemModal,
        ctxSetCommentsItemModal,
        ctxCommentsProfileModal,
        ctxSetCommentsProfileModal,
        ctxCommentsProfileItemModal,
        ctxSetCommentsProfileItemModal,
        ctxHomeCommentsModal,
        ctxSetHomeCommentsModal,
        ctxMainBottomTabBar,
        ctxSetMainBottomTabBar,
        ctxMainVideoItemModal,
        ctxSetMainVideoItemModal,
        ctxNotifHeaderModal,
        ctxSetNotifHeaderModal,
        ctxNotifItemModal,
        ctxSetNotifItemModal,
        ctxRemoveSearchItemModal,
        ctxPostCommentsModal,
        ctxSetPostCommentsModal,
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
