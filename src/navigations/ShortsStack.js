import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { createStackNavigator } from "@react-navigation/stack";
import ShortsScreen from "../screens/ShortsScreen";
import { useTheme } from "../styles/ThemeContext";
import { ThIcon, ThText, ThView } from "../components/ThemedComponents";
import { styles } from "../styles/styles";

const Stack = createStackNavigator();

export default function ShortsStack() {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerRight: () => {
          return (
            <ThView style={styles.headerRightIconsContainer}>
              <ThIcon
                style={styles.headerRightIcon}
                IconComponent={Ionicons}
                name="search"
                onPress={() => console.log("Search pressed")}
              />
              <ThIcon
                style={styles.headerRightIcon}
                IconComponent={MaterialCommunityIcons}
                name="dots-vertical"
                onPress={() => {
                  console.log("Dots-vertical Pressed");
                }}
              />
            </ThView>
          );
        },
        headerTitle: () => (
          <ThText
            style={[
              styles.headerTitleIcon,
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
      <Stack.Screen name="Shorts" component={ShortsScreen} />
    </Stack.Navigator>
  );
}
