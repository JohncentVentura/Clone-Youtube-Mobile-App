import { createStackNavigator } from "@react-navigation/stack";
import { useThemeColor } from "../hooks/useThemeColor";
import ShortsScreen from "../screens/ShortsScreen";

const Stack = createStackNavigator();

export default function ShortsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: useThemeColor("background") },
        headerTintColor: useThemeColor("foreground"),
      }}
    >
      <Stack.Screen name="Shorts" component={ShortsScreen} />
    </Stack.Navigator>
  );
}
