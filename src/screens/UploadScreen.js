import { View } from "react-native";
import { ScreenContainer } from "../components/ContainerComponents";
import { BaseText } from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export default function UploadScreen() {
  const { ctxColors } = useThemeContext();

  return (
    <ScreenContainer>
      <BaseText>UploadScreen Body</BaseText>
    </ScreenContainer>
  );
}
