import { createStackNavigator } from "@react-navigation/stack";
import { HeaderTitleText } from "../components/TextComponents";
import { HeaderArrowBackIcon } from "../components/IconComponents";
import { useTheme } from "../context/ThemeContext";
import UploadScreen from "../screens/UploadScreen";

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
