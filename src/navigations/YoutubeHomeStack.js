import Ionicons from "@expo/vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import YouTubeFlatListScreen from "../api/YouTubeFlatListScreen";
import YouTubePlayerScreen from "../api/YouTubePlayerScreen";
import { ThIcon } from "../components/ThemedComponents";
import YoutubeHomeScreen from "../screens/YoutubeHomeScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();

export default function YoutubeHomeStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      id="YoutubeHomeStack"
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.bg,
          elevation: 0,
        },
        headerTintColor: colors.text,
        headerLeft: () => {
          return (
            <ThIcon
              style={styles.headerLeftIcon}
              IconComponent={Ionicons}
              name="arrow-back"
              onPress={() => navigation.goBack()}
            />
          );
        },
        headerTitle: () => {
          return null;
        },
      })}
    >
      <Stack.Screen
        name="YoutubeHomeScreen"
        component={YoutubeHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainVideoScreen"
        component={MainVideoScreen}
        options={{ headerShown: true }}
      />
      {/*Experimental*/}
      <Stack.Screen
        name="YouTubeFlatListScreen"
        component={YouTubeFlatListScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="YouTubePlayerScreen"
        component={YouTubePlayerScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
