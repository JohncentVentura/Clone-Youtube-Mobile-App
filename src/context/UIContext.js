import { createContext, useContext, useState } from "react";
const UIContext = createContext();

export function UIProvider({ children }) {
  //#region Alert
  const [showAlertClearSearchHistory, setShowAlertClearSearchHistory] =
    useState(false);
  const [showAlertRemoveSearchItem, setShowAlertRemoveSearchItem] =
    useState(false);
  //#endregion

  //#region Main
  const [showMainTabBarModal, setShowMainTabBarModal] = useState(true);
  //#endregion

  //#region Modals
  const [modalVideoData, setModalVideoData] = useState({});
  const [showModalChannelHeader, setShowModalChannelHeader] = useState(false);
  const [showModalFlatListVideoItem, setShowModalFlatListVideoItem] =
    useState(false);
  const [showModalNotifHeader, setShowModalNotifHeader] = useState(false);
  const [showModalNotifItem, setShowModalNotifItem] = useState(false);
  const [showModalSearchResultHeader, setShowModalSearchResultHeader] =
    useState(false);
  const [showModalShareScreen, setShowModalShareScreen] = useState(false);
  const [showModalVideoComment, setShowModalVideoComment] = useState(false);
  //#endregion

  return (
    <UIContext.Provider
      value={{
        showMainTabBarModal,
        setShowMainTabBarModal,
        showAlertClearSearchHistory,
        setShowAlertClearSearchHistory,
        showAlertRemoveSearchItem,
        setShowAlertRemoveSearchItem,
        modalVideoData,
        setModalVideoData,
        showModalChannelHeader,
        setShowModalChannelHeader,
        showModalFlatListVideoItem,
        setShowModalFlatListVideoItem,
        showModalNotifHeader,
        setShowModalNotifHeader,
        showModalNotifItem,
        setShowModalNotifItem,
        showModalSearchResultHeader,
        setShowModalSearchResultHeader,
        showModalShareScreen,
        setShowModalShareScreen,
        showModalVideoComment,
        setShowModalVideoComment,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}
