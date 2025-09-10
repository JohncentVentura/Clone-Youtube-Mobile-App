import { createStackNavigator } from "@react-navigation/stack";
import { useThemeColor } from "../hooks/useThemeColor";
import SubscriptionsScreen from "../screens/SubscriptionsScreen";

const Stack = createStackNavigator();

export default function SubscriptionsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: useThemeColor("background") },
        headerTintColor: useThemeColor("foreground"),
      }}
    >
      <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
    </Stack.Navigator>
  );
}
