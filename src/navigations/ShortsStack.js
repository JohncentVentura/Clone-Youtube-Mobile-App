import { createStackNavigator } from "@react-navigation/stack";
import { ArrowBackIcon } from "../components/IconComponents";
import { ThText } from "../components/ThemedComponents";
import ShortsScreen from "../screens/ShortsScreen";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();

export default function ShortsStack({ navigation }) {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerLeft: () => (
          //TODO: ArrowBackIcon is for testing if it can return back
          <ArrowBackIcon
            style={styles.headerLeftIcon}
            navigation={navigation}
          />
        ),
        headerTitle: () => (
          <ThText
            style={[
              styles.headerTitle,
              {
                fontSize: fontSizes.xl,
                fontWeight: "bold",
              },
            ]}
          >
            Shorts
          </ThText>
        ),
      }}
    >
      <Stack.Screen name="ShortsScreen" component={ShortsScreen} />
    </Stack.Navigator>
  );
}
