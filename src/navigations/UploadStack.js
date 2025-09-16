import { createStackNavigator } from "@react-navigation/stack";
import UploadScreen from "../screens/UploadScreen";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();

export default function UploadStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.foreground,
      }}
    >
      <Stack.Screen name="Upload" component={UploadScreen} />
    </Stack.Navigator>
  );
}
