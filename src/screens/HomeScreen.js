import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const topTab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  return (
    <topTab.Navigator>
      <topTab.Screen name="All" component={AllScreen} />
      <topTab.Screen name="Music" component={MusicScreen} />
      <topTab.Screen name="Movies" component={MoviesScreen} />
    </topTab.Navigator>
  );
}

function AllScreen() {
  return (
    <View>
      <Text>All Screen</Text>
    </View>
  );
}

function MusicScreen() {
  return (
    <View>
      <Text>Music Screen</Text>
    </View>
  );
}

function MoviesScreen() {
  return (
    <View>
      <Text>Movies Screen</Text>
    </View>
  );
}
