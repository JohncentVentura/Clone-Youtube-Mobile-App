import { createStackNavigator } from "@react-navigation/stack";
import {
  HeaderArrowBackIcon,
  HeaderTitleText,
} from "../components/HeaderComponents";
import { useTheme } from "../context/ThemeContext";
import SubscriptionsScreen from "../screens/SubscriptionsScreen";

const Stack = createStackNavigator();

export default function SubscriptionsStack({ navigation }) {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerLeft: () => <HeaderArrowBackIcon navigation={navigation} />,
        headerTitle: () => <HeaderTitleText>Subscriptions</HeaderTitleText>,
      }}
    >
      <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
    </Stack.Navigator>
  );
}
