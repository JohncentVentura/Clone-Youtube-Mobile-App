import { View } from "react-native";
import { ThText } from "../components/ThemedComponents";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export default function YouScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
      <ThText>YouScreen Body</ThText>
    </View>
  );
}
