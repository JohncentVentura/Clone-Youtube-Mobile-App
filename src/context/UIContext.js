import { createContext, useContext, useState } from "react";
const UIContext = createContext();

export function UIProvider({ children }) {
  const [isClearSearchHistoryVisible, setIsClearSearchHistoryVisible] =
    useState(false);
  const [isRemoveSearchItemVisible, setIsRemoveSearchItemVisible] =
    useState(false);
  const [isChannelHeaderVisible, setIsChannelHeaderVisible] = useState(false);
  const [isFlatListVideoItemVisible, setIsFlatListVideoItemVisible] =
    useState(false);
  const [isMainTabBarVisible, setIsMainTabBarVisible] = useState(true);
  const [isNotificationsHeaderVisible, setIsNotificationsHeaderVisible] =
    useState(false);
  const [isNotificationsItemVisible, setIsNotificationsItemVisible] =
    useState(false);
  const [isShareScreenVisible, setIsShareScreenVisible] = useState(false);
  const [isSearchResultHeaderVisible, setIsSearchResultHeaderVisible] =
    useState(false);
  const [isVideoCommentModalVisible, setIsVideoCommentModalVisible] =
    useState(false);
  const [modalVideoData, setModalVideoData] = useState({});
  return (
    <UIContext.Provider
      value={{
        isChannelHeaderVisible,
        setIsChannelHeaderVisible,
        isClearSearchHistoryVisible,
        setIsClearSearchHistoryVisible,
        isFlatListVideoItemVisible,
        setIsFlatListVideoItemVisible,
        isMainTabBarVisible,
        setIsMainTabBarVisible,
        isNotificationsHeaderVisible,
        setIsNotificationsHeaderVisible,
        isNotificationsItemVisible,
        setIsNotificationsItemVisible,
        isRemoveSearchItemVisible,
        setIsRemoveSearchItemVisible,
        isShareScreenVisible,
        setIsShareScreenVisible,
        isSearchResultHeaderVisible,
        setIsSearchResultHeaderVisible,
        isVideoCommentModalVisible,
        setIsVideoCommentModalVisible,
        modalVideoData,
        setModalVideoData,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}
