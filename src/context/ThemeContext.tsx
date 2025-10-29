import { createContext, ReactNode, useContext } from "react";
import { useColorScheme } from "react-native";
import { colorThemes, fontSizes, iconSizes } from "../styles/theme";

interface ThemeContextType {
  ctxColorScheme: "light" | "dark";
  ctxColors: typeof colorThemes.light;
  ctxFontSizes: typeof fontSizes;
  ctxIconSizes: typeof iconSizes;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const ctxColorScheme = useColorScheme() ?? "light";
  const ctxColors = colorThemes[ctxColorScheme];
  const ctxFontSizes = fontSizes;
  const ctxIconSizes = iconSizes;

  return (
    <ThemeContext.Provider
      value={{
        ctxColorScheme,
        ctxColors,
        ctxFontSizes,
        ctxIconSizes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextType {
  return useContext(ThemeContext);
}
