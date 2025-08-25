import { createStackNavigator } from "@react-navigation/stack";
import SubscriptionsScreen from "../screens/SubscriptionsScreen";

const Stack = createStackNavigator();

export default function SubscriptionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
    </Stack.Navigator>
  );
}
