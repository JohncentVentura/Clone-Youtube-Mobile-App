import { Colors } from "../styles/Colors";
import { useColorScheme } from "./useColorScheme";

export function useThemeColor(props, colorName) {
  //If useColorScheme() is not null or undefined then it uses the devices theme, else it uses 'light' as the default value
  const theme = useColorScheme() ?? "light";
  //props.light or props.dark
  const colorFromProps = props[theme];

  //console.log("theme:", theme);

  //If props.light or props.dark exists → use that, Else → use default color theme and colorName from Colors.js
  return colorFromProps ? colorFromProps : Colors[theme][colorName];
}
