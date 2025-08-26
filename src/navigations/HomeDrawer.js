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
        options={{ headerLeft: false }}
      />
      <Drawer.Screen name="MusicScreen" component={HomeScreen} />
      <Drawer.Screen name="MoviesScreen" component={HomeScreen} />
      <Drawer.Screen name="LiveScreen" component={HomeScreen} />
      <Drawer.Screen name="GamingScreen" component={HomeScreen} />
      <Drawer.Screen name="NewsScreen" component={HomeScreen} />
      <Drawer.Screen name="SportsScreen" component={HomeScreen} />
      <Drawer.Screen name="LearningScreen" component={HomeScreen} />
      <Drawer.Screen name="FashionAndBeautyScreen" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
