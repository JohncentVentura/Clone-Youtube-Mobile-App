import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { useThemeColor } from "../hooks/useThemeColor";
import HomeScreen from "../screens/HomeScreen";

const TopTab = createMaterialTopTabNavigator();

export default function HomeTopTabs() {
  const navigation = useNavigation();

  return (
    <TopTab.Navigator
      initialRouteName="All"
      screenOptions={{
        tabBarScrollEnabled: true, // Enables horizontal scrolling
        tabBarItemStyle: { width: "auto" }, // Set width for each tab
        tabBarIndicatorStyle: { backgroundColor: useThemeColor("primary") },
        tabBarActiveTintColor: useThemeColor("foreground"),
        tabBarInactiveTintColor: useThemeColor("gray"),
        tabBarStyle: {
          backgroundColor: useThemeColor("background"),
        },
      }}
    >
      <TopTab.Screen
        name="@"
        component={TestScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Stop default navigation
            navigation.getParent("HomeDrawer")?.openDrawer(); // Access the drawer and open it
          },
        }}
      />
      <TopTab.Screen name="All" component={HomeScreen} />
      <TopTab.Screen name="New to you" component={TestScreen} />
      <TopTab.Screen name="Live" component={TestScreen} />
      <TopTab.Screen name="Music" component={TestScreen} />
      <TopTab.Screen name="Gaming" component={TestScreen} />
      <TopTab.Screen name="Podcasts" component={TestScreen} />
    </TopTab.Navigator>
  );
}

function TestScreen() {
  return (
    <View>
      <Text>Test Screen</Text>
    </View>
  );
}
