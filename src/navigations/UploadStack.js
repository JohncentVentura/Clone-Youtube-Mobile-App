import { createStackNavigator } from "@react-navigation/stack";
import { useThemeColor } from "../hooks/useThemeColor";
import UploadScreen from "../screens/UploadScreen";

const Stack = createStackNavigator();

export default function UploadStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: useThemeColor("background") },
        headerTintColor: useThemeColor("foreground"),
      }}
    >
      <Stack.Screen name="Upload" component={UploadScreen} />
    </Stack.Navigator>
  );
}
