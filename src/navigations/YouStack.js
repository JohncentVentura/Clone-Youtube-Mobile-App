import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { HeaderContainer } from "../components/ContainerComponents";
import {
  HeaderArrowBackIcon,
  HeaderDotVerticalIcon,
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderSettingsIcon,
  HeaderShareScreenIcon,
} from "../components/IconComponents";
import LikedVideosScreen from "../screens/LikedVideosScreen";
import WatchLaterScreen from "../screens/WatchLaterScreen";
import YouScreen from "../screens/YouScreen";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import {
  ChannelStackScreen,
  MainVideoStackScreen,
  MoviesStackScreen,
  NotificationsStackScreen,
  SearchResultStackScreen,
  SearchStackScreen,
  ShortsStackScreen,
  YoutubePremiumStackScreen,
} from "./StackNavigator";

const Stack = createStackNavigator();

export default function YouStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="You"
        component={YouScreen}
        options={({ navigation }) => {
          return {
            header: () => (
              <HeaderContainer>
                <View style={styles.headerRightIconsContainer}>
                  <HeaderShareScreenIcon />
                  <HeaderNotificationsIcon navigation={navigation} />
                  <HeaderSearchIcon navigation={navigation} />
                  <HeaderSettingsIcon />
                </View>
              </HeaderContainer>
            ),
          };
        }}
      />
      <Stack.Screen
        name={navPaths.likedVideosScreen}
        component={LikedVideosScreen}
        options={({ navigation }) => {
          return {
            header: () => (
              <HeaderContainer>
                <HeaderArrowBackIcon navigation={navigation} />
                <View style={styles.headerRightIconsContainer}>
                  <HeaderShareScreenIcon />
                  <HeaderSearchIcon navigation={navigation} />
                  <HeaderDotVerticalIcon />
                </View>
              </HeaderContainer>
            ),
          };
        }}
      />
      <Stack.Screen
        name={navPaths.watchLaterScreen}
        component={WatchLaterScreen}
        options={({ navigation }) => {
          return {
            header: () => (
              <HeaderContainer>
                <HeaderArrowBackIcon navigation={navigation} />
                <View style={styles.headerRightIconsContainer}>
                  <HeaderShareScreenIcon />
                  <HeaderSearchIcon navigation={navigation} />
                  <HeaderDotVerticalIcon />
                </View>
              </HeaderContainer>
            ),
          };
        }}
      />
      {ChannelStackScreen()}
      {MainVideoStackScreen()}
      {MoviesStackScreen()}
      {NotificationsStackScreen()}
      {SearchStackScreen()}
      {SearchResultStackScreen()}
      {ShortsStackScreen()}
      {YoutubePremiumStackScreen()}
    </Stack.Navigator>
  );
}
