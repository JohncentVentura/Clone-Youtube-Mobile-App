import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedIcon } from "../components/ThemedComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import HomeTopTabs from "./HomeTopTabs";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      id="HomeDrawer"
      initialRouteName="HomeTopTabs"
      screenOptions={({ route, navigation }) => ({
        drawerIndicatorStyle: { backgroundColor: useThemeColor("primary") },
        drawerActiveTintColor: useThemeColor("foreground"),
        drawerInactiveTintColor: useThemeColor("gray"),
        drawerStyle: {
          backgroundColor: useThemeColor("background"),
        },
        headerStyle: {
          backgroundColor: useThemeColor("background"),
        },
        headerTintColor: useThemeColor("foreground"),
        headerLeft: ({ initialRouteName }) => {
          //Show arrow-back button when not on initialRoute
          if (route.name !== initialRouteName) {
            return (
              <Ionicons
                name="arrow-back"
                size={24}
                onPress={() => navigation.goBack()}
              />
            );
          }
          return null; //No arrow-back button on initialRoute
        },
        headerRight: () => {
          return (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: 120,
                }}
              >
                <ThemedIcon
                  IconComponent={MaterialIcons}
                  name="screen-share"
                  onPress={() => {}}
                />
                <ThemedIcon
                  IconComponent={MaterialIcons}
                  name="notifications-none"
                  onPress={() => {}}
                />
                <ThemedIcon
                  IconComponent={MaterialIcons}
                  name="search"
                  onPress={() => {}}
                />
              </View>
            </>
          );
        },
      })}
    >
      <Drawer.Screen
        name="HomeTopTabs"
        component={HomeTopTabs}
        options={{ headerLeft: false, title: "Youtube" }}
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
