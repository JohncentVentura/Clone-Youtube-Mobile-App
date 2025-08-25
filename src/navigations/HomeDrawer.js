import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Music" component={HomeScreen} />
      <Drawer.Screen name="Movies" component={HomeScreen} />
      <Drawer.Screen name="Live" component={HomeScreen} />
      <Drawer.Screen name="Gaming" component={HomeScreen} />
      <Drawer.Screen name="News" component={HomeScreen} />
      <Drawer.Screen name="Sports" component={HomeScreen} />
      <Drawer.Screen name="Learning" component={HomeScreen} />
      <Drawer.Screen name="Fashion & Beauty" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
