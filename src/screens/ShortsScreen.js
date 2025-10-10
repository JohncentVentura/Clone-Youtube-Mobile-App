import { View } from "react-native";
import { ThText } from "../components/ThemedComponents";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export default function ShortsScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
      <ThText>ShortsScreen Body</ThText>
    </View>
  );
}
