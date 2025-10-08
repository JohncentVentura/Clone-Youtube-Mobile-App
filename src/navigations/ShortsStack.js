import { createStackNavigator } from "@react-navigation/stack";
import {
  HeaderArrowBackIcon,
  HeaderTitleText,
} from "../components/HeaderComponents";
import ShortsScreen from "../screens/ShortsScreen";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();

export default function ShortsStack({ navigation }) {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerLeft: () => <HeaderArrowBackIcon navigation={navigation} />,
        headerTitle: () => <HeaderTitleText>Shorts</HeaderTitleText>,
      }}
    >
      <Stack.Screen name="ShortsScreen" component={ShortsScreen} />
    </Stack.Navigator>
  );
}
