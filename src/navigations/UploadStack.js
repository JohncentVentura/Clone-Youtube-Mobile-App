import { createStackNavigator } from "@react-navigation/stack";import {
  HeaderArrowBackIcon,
  HeaderTitleText,
} from "../components/HeaderComponents";
import UploadScreen from "../screens/UploadScreen";
import { useTheme } from "../context/ThemeContext";

const Stack = createStackNavigator();

export default function UploadStack({ navigation }) {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerLeft: () => <HeaderArrowBackIcon navigation={navigation} />,
        headerTitle: () => <HeaderTitleText>Upload</HeaderTitleText>,
      }}
    >
      <Stack.Screen name="Upload" component={UploadScreen} />
    </Stack.Navigator>
  );
}
