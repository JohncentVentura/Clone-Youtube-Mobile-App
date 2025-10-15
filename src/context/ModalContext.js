import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isChannelHeaderVisible, setIsChannelHeaderVisible] = useState(false);
  const [isClearSearchHistoryVisible, setIsClearSearchHistoryVisible] =
    useState(false);
  const [isFlatListVideoItemVisible, setIsFlatListVideoItemVisible] =
    useState(false);
  const [isNotificationsHeaderVisible, setIsNotificationsHeaderVisible] =
    useState(false);
  const [isNotificationsItemVisible, setIsNotificationsItemVisible] =
    useState(false);
  const [isRemoveSearchItemVisible, setIsRemoveSearchItemVisible] =
    useState(false);
  const [isShareScreenVisible, setIsShareScreenVisible] = useState(false);
  const [isSearchResultHeaderVisible, setIsSearchResultHeaderVisible] =
    useState(false);
  const [isVideoCommentModalVisible, setIsVideoCommentModalVisible] =
    useState(false);
  const [modalVideoData, setModalVideoData] = useState({});

  return (
    <ModalContext.Provider
      value={{
        isChannelHeaderVisible,
        setIsChannelHeaderVisible,
        isClearSearchHistoryVisible,
        setIsClearSearchHistoryVisible,
        isFlatListVideoItemVisible,
        setIsFlatListVideoItemVisible,
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
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
