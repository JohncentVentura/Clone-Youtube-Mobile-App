import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { colorThemes, fontSizes, iconSizes } from "../styles/theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = colorThemes[colorScheme];

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        colors,
        fontSizes,
        iconSizes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
