import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { colorThemes, fontSizes, iconSizes } from "./theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = colorThemes[colorScheme];

  const theme = {
    colors,
    fontSizes,
    iconSizes,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useTheme must be used inside ThemeProvider component");
  return ctx;
}
