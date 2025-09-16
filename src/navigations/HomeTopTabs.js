import Ionicons from "@expo/vector-icons/Ionicons";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import {
  ThemedIcon,
  ThemedPressable,
  ThemedText,
  ThemedView,
} from "../components/ThemedComponents";
import HomeScreen from "../screens/HomeScreen";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

const TopTab = createMaterialTopTabNavigator();

export default function HomeTopTabs() {
  const { colors } = useTheme();

  return (
    <TopTab.Navigator
      tabBar={(props) => <HomeDrawerButtonTab {...props} />}
      screenOptions={{
        tabBarItemStyle: { width: "auto" },
        tabBarScrollEnabled: true, // Enables horizontal scrolling
        tabBarStyle: {
          backgroundColor: colors.background,
          elevation: 0, // removes drop shadow
        },
        tabBarInactiveTintColor: colors.foreground,
        tabBarActiveTintColor: colors.background,
        tabBarIndicatorStyle: {
          backgroundColor: colors.foreground,
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
      <ThemedPressable
        style={[
          styles.headerLeftIcon,
          { paddingHorizontal: 0, paddingVertical: 0 },
        ]}
        onPress={() => navigation.getParent("HomeDrawer")?.openDrawer()}
      >
        <ThemedIcon IconComponent={Ionicons} name="compass-outline" />
      </ThemedPressable>
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
