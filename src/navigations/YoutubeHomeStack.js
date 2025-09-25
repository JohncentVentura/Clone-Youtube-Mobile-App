import Ionicons from "@expo/vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import YouTubeFlatListScreen from "../api/YouTubeFlatListScreen";
import YouTubePlayerScreen from "../api/YouTubePlayerScreen";
import { ThIcon } from "../components/ThemedComponents";
import YoutubeHomeScreen from "../screens/YoutubeHomeScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import ChannelScreen from "../screens/ChannelScreen";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();
const stacks = [
  {
    route: "YoutubeHomeScreen",
    component: YoutubeHomeScreen,
    options: { headerShown: false },
  },
  {
    route: "MainVideoScreen",
    component: MainVideoScreen,
    options: { headerShown: true },
  },
  {
    route: "ChannelScreen",
    component: ChannelScreen,
    options: { headerShown: true },
  },
  {
    route: "YouTubeFlatListScreen",
    component: YouTubeFlatListScreen,
    options: { headerShown: true },
  },
  {
    route: "YouTubePlayerScreen",
    component: YouTubePlayerScreen,
    options: { headerShown: true },
  },
];

export default function YoutubeHomeStack({ navigation, route }) {
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
      {stacks.map((item) => {
        return (
          <Stack.Screen
            key={item.route}
            name={item.route}
            component={item.component}
            options={item.options}
          />
        );
      })}
    </Stack.Navigator>
  );
}
