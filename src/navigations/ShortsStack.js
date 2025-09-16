import { createStackNavigator } from "@react-navigation/stack";
import ShortsScreen from "../screens/ShortsScreen";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();

export default function ShortsStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.foreground,
      }}
    >
      <Stack.Screen name="Shorts" component={ShortsScreen} />
    </Stack.Navigator>
  );
}
