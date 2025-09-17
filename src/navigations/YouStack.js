import { createStackNavigator } from "@react-navigation/stack";
import YouScreen from "../screens/YouScreen";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();

export default function YouStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen name="You" component={YouScreen} />
    </Stack.Navigator>
  );
}
