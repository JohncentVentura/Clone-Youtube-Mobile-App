import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isChannelHeaderVisible, setIsChannelHeaderVisible] = useState(false);
  const [isClearHistoryVisible, setIsClearHistoryVisible] = useState(false);
  const [isFlatListVideoItemVisible, setIsFlatListVideoItemVisible] =
    useState(false);
  const [isNotificationsHeaderVisible, setIsNotificationsHeaderVisible] =
    useState(false);
  const [isNotificationsItemVisible, setIsNotificationsItemVisible] =
    useState(false);
  const [isRemoveSearchVisible, setIsRemoveSearchVisible] = useState(false);
  const [isShareScreenVisible, setIsShareScreenVisible] = useState(false);
  const [isSearchResultHeaderVisible, setIsSearchResultHeaderVisible] =
    useState(false);

  return (
    <ModalContext.Provider
      value={{
        isChannelHeaderVisible,
        setIsChannelHeaderVisible,
        isClearHistoryVisible,
        setIsClearHistoryVisible,
        isFlatListVideoItemVisible,
        setIsFlatListVideoItemVisible,
        isNotificationsHeaderVisible,
        setIsNotificationsHeaderVisible,
        isNotificationsItemVisible,
        setIsNotificationsItemVisible,
        isRemoveSearchVisible,
        setIsRemoveSearchVisible,
        isShareScreenVisible,
        setIsShareScreenVisible,
        isSearchResultHeaderVisible,
        setIsSearchResultHeaderVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
