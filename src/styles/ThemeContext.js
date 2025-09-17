import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { colorThemes, fontSizes, iconSizes } from "./theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = colorThemes[colorScheme];

  const token = {
    colors,
    fontSizes,
    iconSizes,
  };

  return (
    <ThemeContext.Provider value={token}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme)
    throw new Error("useTheme must be used inside ThemeProvider component");
  return theme;
}
