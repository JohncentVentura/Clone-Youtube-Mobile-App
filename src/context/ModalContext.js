import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [
    isChannelScreenHeaderDotVerticalModalVisible,
    setIsChannelScreenHeaderDotVerticalModalVisible,
  ] = useState(false);
  const [isClearHistoryModalVisible, setIsClearHistoryModalVisible] =
    useState(false);
  const [
    isFlatListVideoItemModalVisible,
    setIsFlatListVideoItemModalVisible,
  ] = useState(false);
  const [
    isNotificationsScreenHeaderDotVerticalModalVisible,
    setIsNotificationsScreenHeaderDotVerticalModalVisible,
  ] = useState(false);
  const [
    isNotificationsScreenItemDotVerticalModalVisible,
    setIsNotificationsScreenItemDotVerticalModalVisible,
  ] = useState(false);
  const [
    isRemoveSearchFromHistoryModalVisible,
    setIsRemoveSearchFromHistoryModalVisible,
  ] = useState(false);
  const [isShareScreenModalVisible, setIsShareScreenModalVisible] =
    useState(false);
  const [
    isSearchResultScreenHeaderDotVerticalModalVisible,
    setIsSearchResultScreenHeaderDotVerticalModalVisible,
  ] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isChannelScreenHeaderDotVerticalModalVisible,
        setIsChannelScreenHeaderDotVerticalModalVisible,
        isClearHistoryModalVisible,
        setIsClearHistoryModalVisible,
        isFlatListVideoItemModalVisible,
        setIsFlatListVideoItemModalVisible,
        isNotificationsScreenHeaderDotVerticalModalVisible,
        setIsNotificationsScreenHeaderDotVerticalModalVisible,
        isNotificationsScreenItemDotVerticalModalVisible,
        setIsNotificationsScreenItemDotVerticalModalVisible,
        isRemoveSearchFromHistoryModalVisible,
        setIsRemoveSearchFromHistoryModalVisible,
        isShareScreenModalVisible,
        setIsShareScreenModalVisible,
        isSearchResultScreenHeaderDotVerticalModalVisible,
        setIsSearchResultScreenHeaderDotVerticalModalVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
