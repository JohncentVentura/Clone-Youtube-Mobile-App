import { View } from "react-native";
import { ScreenContainer } from "../components/ContainerComponents";
import { BaseText } from "../components/TextComponents";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export default function SubscriptionsScreen() {
  const { colors } = useTheme();

  return (
    <ScreenContainer>
      <BaseText>SubscriptionsScreen Body</BaseText>
    </ScreenContainer>
  );
}
