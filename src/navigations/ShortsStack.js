import { createStackNavigator } from "@react-navigation/stack";
import ShortsScreen from "../screens/ShortsScreen";

const Stack = createStackNavigator();

export default function ShortsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Shorts" component={ShortsScreen} />
    </Stack.Navigator>
  );
}
