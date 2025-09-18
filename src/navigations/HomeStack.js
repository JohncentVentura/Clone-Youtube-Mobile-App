import Ionicons from "@expo/vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import YouTubeFlatListScreen from "../api/YoutubeFlatListScreen";
import YouTubePlayerScreen from "../api/YoutubePlayerScreen";
import { ThemedIcon } from "../components/ThemedComponents";
import HomeScreen from "../screens/HomeScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();

export default function HomeStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.bg,
          elevation: 0,
        },
        headerTintColor: colors.text,
        headerLeft: () => {
          return (
            <ThemedIcon
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
        name="HomeScreen"
        component={HomeScreen}
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
