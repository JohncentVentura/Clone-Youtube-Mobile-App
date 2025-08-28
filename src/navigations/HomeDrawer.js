import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import HomeTopTabs from "./HomeTopTabs";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      id="HomeDrawer"
      initialRouteName="HomeTopTabs"
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => {
          // Show back button only when not on initialRoute
          if (route.name !== "HomeTopTabs") {
            return (
              <MaterialIcons
                name="arrow-back"
                size={24}
                onPress={() => navigation.goBack()}
              />
            );
          }
          return null; // no button on HomeTopTabs
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
