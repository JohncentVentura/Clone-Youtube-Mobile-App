import { View } from "react-native";
import { ThText } from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../context/ThemeContext";

export default function ShortsScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
      <ThText>ShortsScreen Body</ThText>
    </View>
  );
}
