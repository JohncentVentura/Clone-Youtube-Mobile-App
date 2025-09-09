import { createDrawerNavigator } from "@react-navigation/drawer";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedIcon, ThemedView } from "../components/ThemedComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import HomeTopTabs from "./HomeTopTabs";
import HomeScreen from "../screens/HomeScreen";
import { screenWidth } from "../styles/styles";

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      id="HomeDrawer"
      initialRouteName="YoutubeScreen"
      screenOptions={({ route, navigation }) => ({
        drawerActiveTintColor: useThemeColor("foreground"),
        drawerInactiveTintColor: useThemeColor("gray"),
        drawerIndicatorStyle: useThemeColor("primary"),
        drawerStyle: {
          backgroundColor: useThemeColor("background"),
        },
        headerTintColor: useThemeColor("foreground"),
        headerStyle: {
          backgroundColor: useThemeColor("background"),
          
        },
        headerLeft: () => {
          return (
            <ThemedIcon
              IconComponent={Ionicons}
              name="arrow-back"
              style={{marginLeft: 15}}
              onPress={() => navigation.goBack()}
            />
          );
        },
        headerRight: () => {
          return (
            <>
              <ThemedView
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <ThemedIcon
                  IconComponent={MaterialIcons}
                  name="screen-share"
                  style={{marginRight: 25}}
                  onPress={() => {}}
                />
                <ThemedIcon
                  IconComponent={MaterialIcons}
                  name="notifications-none"
                  style={{marginRight: 25}}
                  onPress={() => {}}
                />
                <ThemedIcon
                  IconComponent={MaterialIcons}
                  name="search"
                  style={{marginRight: 15}}
                  onPress={() => {}}
                />
              </ThemedView>
            </>
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
                style={{marginLeft: 15}}
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
