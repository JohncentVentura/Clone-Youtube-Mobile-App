import { createStackNavigator } from "@react-navigation/stack";
import YouScreen from "../screens/YouScreen";

const Stack = createStackNavigator();

export default function YouStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="You" component={YouScreen} />
    </Stack.Navigator>
  );
}
