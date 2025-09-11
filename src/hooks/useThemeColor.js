import { useColorScheme } from "react-native";
import { colors } from "../styles/styles";

export function useThemeColor(colorName) {
  //If useColorScheme() is not null or undefined then it uses the devices theme, else it uses 'light' as the default value
  const colorTheme = useColorScheme() ?? "light";
  return colors[colorTheme][colorName];
}