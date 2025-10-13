import { createContext, useContext, useState } from "react";
const UIStateContext = createContext();

export function UIStateProvider({ children }) {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  return (
    <UIStateContext.Provider
      value={{
        isTabBarVisible,
        setIsTabBarVisible,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
}

export function useUIState() {
  return useContext(UIStateContext);
}
