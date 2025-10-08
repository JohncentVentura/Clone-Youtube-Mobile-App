import { createStackNavigator } from "@react-navigation/stack";
import {
  HeaderArrowBackIcon,
  HeaderTitleText,
} from "../components/HeaderComponents";
import YouScreen from "../screens/YouScreen";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();

export default function YouStack({ navigation }) {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerLeft: () => <HeaderArrowBackIcon navigation={navigation} />,
        headerTitle: () => <HeaderTitleText>You</HeaderTitleText>,
      }}
    >
      <Stack.Screen name="You" component={YouScreen} />
    </Stack.Navigator>
  );
}
