import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  ThemedIcon,
  ThemedView,
  HeaderRightIconsContainer,
  HeaderNotificationIcon,
  HeaderSearchIcon,
  HeaderScreenShareIcon,
} from "../components/ThemedComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import HomeTopTabs from "./HomeTopTabs";
import HomeScreen from "../screens/HomeScreen";
import { styles, screenWidth } from "../styles/styles";

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      id="HomeDrawer" //Used by HomeTopTab.js to navigate and open this drawer
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: useThemeColor("background"),
        },
        drawerActiveTintColor: useThemeColor("foreground"),
        drawerInactiveTintColor: useThemeColor("gray"),
        headerStyle: {
          backgroundColor: useThemeColor("background"),
        },
        headerTintColor: useThemeColor("foreground"),
        headerLeft: () => {
          return (
            <ThemedIcon
              IconComponent={Ionicons}
              name="arrow-back"
              style={styles.headerLeftIcon}
              onPress={() => navigation.goBack()}
            />
          );
        },
        headerRight: () => {
          return (
            <HeaderRightIconsContainer>
              <HeaderScreenShareIcon
                style={styles.headerRightIcon}
                onPress={() => console.log("Screen Share Press")}
              />
              <HeaderNotificationIcon
                style={styles.headerRightIcon}
                onPress={() => console.log("Notificiation Press")}
              />
              <HeaderSearchIcon
                style={styles.headerRightIcon}
                onPress={() => console.log("Search Press")}
              />
            </HeaderRightIconsContainer>
          );
        },
      })}
    >
      <Drawer.Screen
        name="YoutubeScreen"
        component={HomeTopTabs}
        options={{
          headerLeft: () => {
            return (
              <ThemedIcon
                IconComponent={Fontisto}
                name="youtube-play"
                style={styles.headerLeftIcon}
                color={useThemeColor("primary")}
              />
            );
          },
          title: "Youtube",
        }}
      />
      <Drawer.Screen
        name="MusicScreen"
        component={HomeScreen}
        options={{ title: "Music" }}
      />
      <Drawer.Screen
        name="MoviesScreen"
        component={HomeScreen}
        options={{ title: "Movies" }}
      />
      <Drawer.Screen
        name="LiveScreen"
        component={HomeScreen}
        options={{ title: "Live" }}
      />
      <Drawer.Screen
        name="GamingScreen"
        component={HomeScreen}
        options={{ title: "Gaming" }}
      />
      <Drawer.Screen
        name="NewsScreen"
        component={HomeScreen}
        options={{ title: "News" }}
      />
      <Drawer.Screen
        name="SportsScreen"
        component={HomeScreen}
        options={{ title: "Sports" }}
      />
      <Drawer.Screen
        name="LearningScreen"
        component={HomeScreen}
        options={{ title: "Learning" }}
      />
      <Drawer.Screen
        name="FashionAndBeautyScreen"
        component={HomeScreen}
        options={{ title: "Fashion & Beauty" }}
      />
    </Drawer.Navigator>
  );
}
