import { useColorScheme } from "react-native";

export function useThemeColor(colorName) {
  //If useColorScheme() is not null or undefined then it uses the devices theme, else it uses 'light' as the default value
  const colorTheme = useColorScheme() ?? "light";
  return colors[colorTheme][colorName];
}

const colors = {
  light: {
    foreground: "#282828ff",
    gray: "#b6b6b6ff",
    background: "#ffffffff",
    primary: "#FF0000ff",
  },
  dark: {
    foreground: "#ffffffff",
    gray: "#b6b6b6ff",
    background: "#282828ff",
    primary: "#FF0000ff",
  },
};
