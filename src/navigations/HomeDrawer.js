import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  HeaderRightIconsContainer,
  HeaderNotificationIcon,
  HeaderScreenShareIcon,
  HeaderSearchIcon,
  ThemedIcon,
  ThemedText,
  ThemedView,
} from "../components/ThemedComponents";
import HomeScreen from "../screens/HomeScreen";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import HomeTopTabs from "./HomeTopTabs";

const Drawer = createDrawerNavigator();
const drawerItems = [
  {
    route: "YoutubeScreen",
    iconComponent: Fontisto,
    iconName: "youtube-play",
    label: "Youtube",
    component: HomeScreen,
  },
  {
    route: "MusicScreen",
    iconComponent: Ionicons,
    iconName: "musical-note-outline",
    label: "Music",
    component: HomeScreen,
  },
  {
    route: "MoviesScreen",
    iconComponent: MaterialCommunityIcons,
    iconName: "movie-open-outline",
    label: "Movies",
    component: HomeScreen,
  },
  {
    route: "LiveScreen",
    iconComponent: MaterialIcons,
    iconName: "live-tv",
    label: "Live",
    component: HomeScreen,
  },
  {
    route: "GamingScreen",
    iconComponent: MaterialCommunityIcons,
    iconName: "youtube-gaming",
    label: "Gaming",
    component: HomeScreen,
  },
  {
    route: "NewsScreen",
    iconComponent: Ionicons,
    iconName: "newspaper-outline",
    label: "News",
    component: HomeScreen,
  },
  {
    route: "SportsScreen",
    iconComponent: Ionicons,
    iconName: "trophy-outline",
    label: "Sports",
    component: HomeScreen,
  },
  {
    route: "LearningScreen",
    iconComponent: MaterialIcons,
    iconName: "lightbulb-outline",
    label: "Learning",
    component: HomeScreen,
  },
  {
    route: "FashionAndBeautyScreen",
    iconComponent: Ionicons,
    iconName: "brush-outline",
    label: "Fashion & Beauty",
    component: HomeScreen,
  },
];

export default function HomeDrawer() {
  const { colors, fontSizes } = useTheme();

  return (
    <Drawer.Navigator
      id="HomeDrawer" //Used by HomeTopTab.js to navigate and open this drawer
      screenOptions={({ navigation, route }) => ({
        drawerStyle: { backgroundColor: colors.bg },
        drawerActiveBackgroundColor: colors.bg,
        drawerItemStyle: { borderRadius: 0 },
        headerStyle: {
          backgroundColor: colors.bg,
          elevation: 0, // removes drop shadow
        },
        drawerIcon: () => {
          let iconComponent,
            iconName,
            iconColor = colors.icon;

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
              IconComponent={iconComponent}
              name={iconName}
              color={iconColor}
            />
          );
        },
        drawerLabel: () => {
          let label,
            fontSize = fontSizes.base,
            fontWeight = "500";

          drawerItems.map((drawer) => {
            //drawerItems[0] is the Youtube item in the drawer
            if (route.name === drawerItems[0].route) {
              label = drawerItems[0].label;
              fontSize = fontSizes.xl2;
              fontWeight = "bold";
            } else if (route.name === drawer.route) {
              label = drawer.label;
            }
          });

          return (
            <ThemedText style={{ fontSize: fontSize, fontWeight: fontWeight }}>
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
        name={drawerItems[0].route}
        component={drawerItems[0].component}
        options={{
          headerLeft: () => {
            return (
              <ThemedIcon
                style={styles.headerLeftIcon}
                IconComponent={Fontisto}
                name="youtube-play"
                color={colors.primary}
              />
            );
          },
          headerTitle: () => {
            return (
              <ThemedText
                style={{ fontSize: fontSizes.xl2, fontWeight: "bold" }}
              >
                Youtube
              </ThemedText>
            );
          },
        }}
      />
      <Drawer.Screen
        name={drawerItems[1].route}
        component={drawerItems[1].component}
      />
      <Drawer.Screen
        name={drawerItems[2].route}
        component={drawerItems[2].component}
      />
      <Drawer.Screen
        name={drawerItems[3].route}
        component={drawerItems[3].component}
      />
      <Drawer.Screen
        name={drawerItems[4].route}
        component={drawerItems[4].component}
      />
      <Drawer.Screen
        name={drawerItems[5].route}
        component={drawerItems[5].component}
      />
      <Drawer.Screen
        name={drawerItems[6].route}
        component={drawerItems[6].component}
      />
      <Drawer.Screen
        name={drawerItems[7].route}
        component={drawerItems[7].component}
      />
      <Drawer.Screen
        name={drawerItems[8].route}
        component={drawerItems[8].component}
      />
    </Drawer.Navigator>
  );
}
