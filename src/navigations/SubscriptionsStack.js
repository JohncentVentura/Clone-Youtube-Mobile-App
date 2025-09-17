import { createStackNavigator } from "@react-navigation/stack";
import SubscriptionsScreen from "../screens/SubscriptionsScreen";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();

export default function SubscriptionsStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
    </Stack.Navigator>
  );
}
