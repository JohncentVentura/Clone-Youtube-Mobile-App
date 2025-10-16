import { View } from "react-native";
import { ScreenContainer } from "../components/ContainerComponents";
import { BaseText } from "../components/TextComponents";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export default function YouScreen() {
  const { colors } = useTheme();

  return (
    <ScreenContainer>
      <BaseText>YouScreen Body</BaseText>
    </ScreenContainer>
  );
}
