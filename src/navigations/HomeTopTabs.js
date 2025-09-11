import Ionicons from "@expo/vector-icons/Ionicons";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import {
  ThemedFlatList,
  ThemedIcon,
  ThemedText,
  ThemedTouchableOpacity,
  ThemedView,
} from "../components/ThemedComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import HomeScreen from "../screens/HomeScreen";
import { styles, screenHeight, screenWidth } from "../styles/styles";

const TopTab = createMaterialTopTabNavigator();

export default function HomeTopTabs() {
  return (
    <TopTab.Navigator
      tabBar={(props) => <HomeDrawerButtonTab {...props} />}
      screenOptions={{
        tabBarScrollEnabled: true, // Enables horizontal scrolling
        tabBarItemStyle: { width: "auto" },
        tabBarStyle: {
          backgroundColor: useThemeColor("background"),
          elevation: 0, // removes drop shadow
        },
        tabBarInactiveTintColor: useThemeColor("foreground"),
        tabBarActiveTintColor: useThemeColor("background"),
        tabBarIndicatorStyle: {
          backgroundColor: useThemeColor("foreground"),
          height: "100%",
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
    <ThemedView style={styles.headerRightIconsContainer}>
      <ThemedTouchableOpacity
        onPress={() => navigation.getParent("HomeDrawer")?.openDrawer()}
        style={styles.headerLeftIcon}
      >
        <ThemedIcon IconComponent={Ionicons} name="compass-outline" size={24} />
      </ThemedTouchableOpacity> 
      <ThemedView style={{ flex: 1, marginLeft: screenWidth * 0.04 }}>
        <MaterialTopTabBar {...props} />
      </ThemedView>
    </ThemedView>
  );
}

function TestScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText>Test Screen</ThemedText>
    </ThemedView>
  );
}
