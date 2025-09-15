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
import { styles, textSizes, colors } from "../styles/styles";

const Drawer = createDrawerNavigator();
const drawerItems = [
  {
    route: "YoutubeScreen",
    iconComponent: Fontisto,
    iconName: "youtube-play",
    label: "Youtube",
    component: "",
  },
  {
    route: "MusicScreen",
    iconComponent: Ionicons,
    iconName: "musical-note-outline",
    label: "Music",
    component: "",
  },
  {
    route: "MoviesScreen",
    iconComponent: MaterialCommunityIcons,
    iconName: "movie-open-outline",
    label: "Movies",
    component: "",
  },
  {
    route: "LiveScreen",
    iconComponent: MaterialIcons,
    iconName: "live-tv",
    label: "Live",
    component: "",
  },
  {
    route: "GamingScreen",
    iconComponent: MaterialCommunityIcons,
    iconName: "youtube-gaming",
    label: "Gaming",
    component: "",
  },
  {
    route: "NewsScreen",
    iconComponent: Ionicons,
    iconName: "newspaper-outline",
    label: "News",
    component: "",
  },
  {
    route: "SportsScreen",
    iconComponent: Ionicons,
    iconName: "trophy-outline",
    label: "Sports",
    component: "",
  },
  {
    route: "LearningScreen",
    iconComponent: MaterialIcons,
    iconName: "lightbulb-outline",
    label: "Learning",
    component: "",
  },
  {
    route: "FashionAndBeautyScreen",
    iconComponent: Ionicons,
    iconName: "brush-outline",
    label: "Fashion & Beauty",
    component: "",
  },
];

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      id="HomeDrawer" //Used by HomeTopTab.js to navigate and open this drawer
      screenOptions={({ navigation, route }) => ({
        drawerStyle: { backgroundColor: useThemeColor(colors.background) },
        drawerActiveBackgroundColor: useThemeColor(colors.background),
        drawerItemStyle: { borderRadius: 0 },
        headerStyle: {
          backgroundColor: useThemeColor(colors.background),
          elevation: 0, // removes drop shadow
        },
        drawerIcon: () => {
          let iconComponent,
            iconName,
            iconColor = colors.foreground;

          drawerItems.map((drawer) => {
            //drawerItems[0] is the Youtube item in the drawer
            if (route.name === drawerItems[0].route) {
              iconComponent = drawerItems[0].iconComponent;
              iconName = drawerItems[0].iconName;
              iconColor = colors.primary;
            } else if (route.name === drawer.route) {
              iconComponent = drawer.iconComponent;
              iconName = drawer.iconName;
            }
          });

          return (
            <ThemedIcon
              color={iconColor}
              IconComponent={iconComponent}
              name={iconName}
            />
          );
        },
        drawerLabel: () => {
          let label,
            fontWeight = "500",
            size = textSizes.base;

          drawerItems.map((drawer) => {
            //drawerItems[0] is the Youtube item in the drawer
            if (route.name === drawerItems[0].route) {
              label = drawerItems[0].label;
              size = textSizes.xl2;
              fontWeight = "bold";
            } else if (route.name === drawer.route) {
              label = drawer.label;
            }
          });

          return (
            <ThemedText style={{ fontWeight: fontWeight }} size={size}>
              {label}
            </ThemedText>
          );
        },
        headerLeft: () => {
          return (
            <ThemedIcon
              style={styles.headerLeftIcon}
              IconComponent={Ionicons}
              name="arrow-back"
              onPress={() => navigation.goBack()}
            />
          );
        },
        headerTitle: () => {
          return null;
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
          headerLeft: () => {
            return (
              <ThemedIcon
                style={styles.headerLeftIcon}
                color={colors.primary}
                IconComponent={Fontisto}
                name="youtube-play"
              />
            );
          },
          headerTitle: () => {
            return (
              <ThemedText size={textSizes.xl2} style={{ fontWeight: "bold" }}>
                Youtube
              </ThemedText>
            );
          },
        }}
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
