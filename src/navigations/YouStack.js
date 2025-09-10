import { createStackNavigator } from "@react-navigation/stack";
import { useThemeColor } from "../hooks/useThemeColor";
import YouScreen from "../screens/YouScreen";

const Stack = createStackNavigator();

export default function YouStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: useThemeColor("background") },
        headerTintColor: useThemeColor("foreground"),
      }}
    >
      <Stack.Screen name="You" component={YouScreen} />
    </Stack.Navigator>
  );
}
