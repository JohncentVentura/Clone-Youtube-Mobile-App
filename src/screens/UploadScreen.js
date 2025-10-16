import { View } from "react-native";
import { ScreenContainer } from "../components/ContainerComponents";
import { BaseText } from "../components/TextComponents";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export default function UploadScreen() {
  const { colors } = useTheme();

  return (
    <ScreenContainer>
      <BaseText>UploadScreen Body</BaseText>
    </ScreenContainer>
  );
}
