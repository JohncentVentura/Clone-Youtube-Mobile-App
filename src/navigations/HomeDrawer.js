import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  ThemedIcon,
  ThemedText,
  ThemedView,
  HeaderRightIconsContainer,
  HeaderScreenShareIcon,
  HeaderNotificationIcon,
  HeaderSearchIcon,
} from "../components/ThemedComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import HomeTopTabs from "./HomeTopTabs";
import HomeScreen from "../screens/HomeScreen";
import { styles } from "../styles/styles";

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      id="HomeDrawer" //Used by HomeTopTab.js to navigate and open this drawer
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: useThemeColor("background"),
          elevation: 0,
        },
        drawerInactiveTintColor: useThemeColor("foreground"),
        drawerActiveBackgroundColor: useThemeColor("background"),
        drawerActiveTintColor: useThemeColor("foreground"),
        drawerItemStyle: { borderRadius: 0 },
        headerStyle: {
          backgroundColor: useThemeColor("background"),
          elevation: 0, // removes drop shadow
        },
        headerTintColor: useThemeColor("foreground"),
        headerLeft: () => {
          return (
            <ThemedIcon
              IconComponent={Ionicons}
              name="arrow-back"
              style={styles.headerLeftIcon}
              onPress={() => navigation.goBack()}
            />
          );
        },
        headerRight: () => {
          return (
            <HeaderRightIconsContainer>
              <HeaderScreenShareIcon
                style={styles.headerRightIcon}
                onPress={() => console.log("Screen Share Press")}
              />
              <HeaderNotificationIcon
                style={styles.headerRightIcon}
                onPress={() => console.log("Notificiation Press")}
              />
              <HeaderSearchIcon
                style={styles.headerRightIcon}
                onPress={() => console.log("Search Press")}
              />
            </HeaderRightIconsContainer>
          );
        },
      })}
    >
      <Drawer.Screen
        name="YoutubeScreen"
        component={HomeTopTabs}
        options={{
          drawerIcon: ({}) => {
            return (
              <ThemedIcon
                IconComponent={Fontisto}
                name="youtube-play"
                color={useThemeColor("primary")}
              />
            );
          },
          drawerLabel: ({}) => {
            return <ThemedText type="title">Youtube</ThemedText>;
          },
          headerLeft: () => {
            return (
              <ThemedIcon
                IconComponent={Fontisto}
                name="youtube-play"
                style={styles.headerLeftIcon}
                color={useThemeColor("primary")}
              />
            );
          },
          headerTitle: () => {
            return <ThemedText type="title">Youtube</ThemedText>;
          },
        }}
      />
      <Drawer.Screen
        name="MusicScreen"
        component={HomeScreen}
        options={{
          drawerIcon: ({}) => {
            return (
              <ThemedIcon
                IconComponent={Ionicons}
                name="musical-note-outline"
              />
            );
          },
          drawerLabel: ({}) => {
            return <ThemedText type="defaultSemiBold">Music</ThemedText>;
          },
        }}
      />
      <Drawer.Screen
        name="MoviesScreen"
        component={HomeScreen}
        options={{
          drawerIcon: ({}) => {
            return (
              <ThemedIcon
                IconComponent={MaterialCommunityIcons}
                name="movie-open-outline"
              />
            );
          },
          drawerLabel: ({}) => {
            return <ThemedText type="defaultSemiBold">Movies</ThemedText>;
          },
        }}
      />
      <Drawer.Screen
        name="LiveScreen"
        component={HomeScreen}
        options={{
          drawerIcon: ({}) => {
            return <ThemedIcon IconComponent={MaterialIcons} name="live-tv" />;
          },
          drawerLabel: ({}) => {
            return <ThemedText type="defaultSemiBold">Live</ThemedText>;
          },
        }}
      />
      <Drawer.Screen
        name="GamingScreen"
        component={HomeScreen}
        options={{
          drawerIcon: ({}) => {
            return (
              <ThemedIcon
                IconComponent={MaterialCommunityIcons}
                name="youtube-gaming"
              />
            );
          },
          drawerLabel: ({}) => {
            return <ThemedText type="defaultSemiBold">Gaming</ThemedText>;
          },
        }}
      />
      <Drawer.Screen
        name="NewsScreen"
        component={HomeScreen}
        options={{
          drawerIcon: ({}) => {
            return (
              <ThemedIcon IconComponent={Ionicons} name="newspaper-outline" />
            );
          },
          drawerLabel: ({}) => {
            return <ThemedText type="defaultSemiBold">News</ThemedText>;
          },
        }}
      />
      <Drawer.Screen
        name="SportsScreen"
        component={HomeScreen}
        options={{
          drawerIcon: ({}) => {
            return (
              <ThemedIcon IconComponent={Ionicons} name="trophy-outline" />
            );
          },
          drawerLabel: ({}) => {
            return <ThemedText type="defaultSemiBold">Sports</ThemedText>;
          },
        }}
      />
      <Drawer.Screen
        name="LearningScreen"
        component={HomeScreen}
        options={{
          drawerIcon: ({}) => {
            return (
              <ThemedIcon
                IconComponent={MaterialIcons}
                name="lightbulb-outline"
              />
            );
          },
          drawerLabel: ({}) => {
            return <ThemedText type="defaultSemiBold">Learning</ThemedText>;
          },
        }}
      />
      <Drawer.Screen
        name="FashionAndBeautyScreen"
        component={HomeScreen}
        options={{
          drawerIcon: ({}) => {
            return <ThemedIcon IconComponent={Ionicons} name="brush-outline" />;
          },
          drawerLabel: ({}) => {
            return (
              <ThemedText type="defaultSemiBold">Fashion & Beauty</ThemedText>
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}
