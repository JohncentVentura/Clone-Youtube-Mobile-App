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
import { styles, screenHeight, screenWidth, colors } from "../styles/styles";

const TopTab = createMaterialTopTabNavigator();

export default function HomeTopTabs() {
  return (
    <TopTab.Navigator
      tabBar={(props) => <HomeDrawerButtonTab {...props} />}
      screenOptions={{
        tabBarItemStyle: { width: "auto" },
        tabBarScrollEnabled: true, // Enables horizontal scrolling
        tabBarStyle: {
          backgroundColor: useThemeColor(colors.background),
          elevation: 0, // removes drop shadow
        },
        tabBarInactiveTintColor: useThemeColor(colors.foreground),
        tabBarActiveTintColor: useThemeColor(colors.background),
        tabBarIndicatorStyle: {
          backgroundColor: useThemeColor(colors.foreground),
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
        style={styles.headerLeftIcon}
        onPress={() => navigation.getParent("HomeDrawer")?.openDrawer()}
      >
        <ThemedIcon IconComponent={Ionicons} name="compass-outline" size={24} />
      </ThemedTouchableOpacity>
      <ThemedView style={{ flex: 1, marginLeft: 12 }}>
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
