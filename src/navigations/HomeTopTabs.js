import { View, TouchableOpacity } from "react-native";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ThemedFlatList,
  ThemedIcon,
  ThemedText,
  ThemedTouchableOpacity,
  ThemedView,
} from "../components/ThemedComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import HomeScreen from "../screens/HomeScreen";

const TopTab = createMaterialTopTabNavigator();

export default function HomeTopTabs() {
  return (
    <TopTab.Navigator
      //initialRouteName="All"
      tabBar={(props) => <HomeDrawerButtonTab {...props} />}
      screenOptions={{
        tabBarItemStyle: { width: "auto" },
        tabBarScrollEnabled: true, // Enables horizontal scrolling
        tabBarActiveTintColor: useThemeColor("foreground"),
        tabBarInactiveTintColor: useThemeColor("gray"),
        tabBarIndicatorStyle: { backgroundColor: useThemeColor("primary") },
        tabBarStyle: {
          backgroundColor: useThemeColor("background"),
          elevation: 0,
        },
      }}
    >
      <TopTab.Screen name="All" component={HomeScreen} />
      <TopTab.Screen name="New to you" component={TestScreen} />
      <TopTab.Screen name="Live" component={TestScreen} />
      <TopTab.Screen name="Music" component={TestScreen} />
      <TopTab.Screen name="Gaming" component={TestScreen} />
      <TopTab.Screen name="Podcasts" component={TestScreen} />
    </TopTab.Navigator>
  );
}

function HomeDrawerButtonTab(props) {
  const navigation = useNavigation();

  return (
    <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
      <ThemedTouchableOpacity
        onPress={() => navigation.getParent("HomeDrawer")?.openDrawer()}
        style={{paddingHorizontal: 10}}
      >
        <ThemedIcon IconComponent={Ionicons} name="compass-outline"/>
      </ThemedTouchableOpacity>
      <ThemedView style={{ flex: 1 }}>
        <MaterialTopTabBar {...props} />
      </ThemedView>
    </ThemedView>
  );
}

function TestScreen() {
  return (
    <ThemedView>
      <ThemedText>Test Screen</ThemedText>
    </ThemedView>
  );
}
