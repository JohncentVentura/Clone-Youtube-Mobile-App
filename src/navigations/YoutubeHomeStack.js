import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YouTubeFlatListScreen from "../api/YouTubeFlatListScreen";
import YouTubePlayerScreen from "../api/YouTubePlayerScreen";
import {
  HeaderArrowBackIcon,
  HeaderDotVerticalIcon,
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
  HeaderTitleText,
  HeaderYouTubeLogoImage,
} from "../components/HeaderComponents";
import {
  ChannelScreenHeaderDotVerticalModal,
  NotificationsScreenHeaderDotVerticalModal,
  ShareScreenModal,
} from "../components/ModalComponents";
import { ThView } from "../components/ThemedComponents";
import ChannelScreen from "../screens/ChannelScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import YoutubeHomeScreen from "../screens/YoutubeHomeScreen";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();

export default function YoutubeHomeStack() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [startingSearch, setStartingSearch] = useState("");
  const [isShareScreenModalVisible, setIsShareScreenModalVisible] =
    useState(false);
  const [
    isNotificationsScreenHeaderDotVerticalModalVisible,
    setIsNotificationsScreenHeaderDotVerticalModalVisible,
  ] = useState(false);
  const [
    isChannelScreenHeaderDotVerticalModalVisible,
    setIsChannelScreenHeaderDotVerticalModalVisible,
  ] = useState(false);

  return (
    <>
      <ShareScreenModal
        isModalVisible={isShareScreenModalVisible}
        setIsModalVisible={setIsShareScreenModalVisible}
      />

      <NotificationsScreenHeaderDotVerticalModal
        isModalVisible={isNotificationsScreenHeaderDotVerticalModalVisible}
        setIsModalVisible={
          setIsNotificationsScreenHeaderDotVerticalModalVisible
        }
      />

      <ChannelScreenHeaderDotVerticalModal
        isModalVisible={isChannelScreenHeaderDotVerticalModalVisible}
        setIsModalVisible={setIsChannelScreenHeaderDotVerticalModalVisible}
      />

      <Stack.Navigator
        id="YoutubeHomeStack"
        screenOptions={({ navigation }) => {
          return {
            headerStatusBarHeight: insets.top - 8,
            headerStyle: {
              backgroundColor: colors.bg,
              elevation: 0, //Android: removes drop shadow
              shadowOpacity: 0, //iOS: removes drop shadow
            },
            headerLeft: () => <HeaderArrowBackIcon navigation={navigation} />,
            headerTitle: () => null,
            headerRight: () => null,
          };
        }}
      >
        <Stack.Screen
          name="YoutubeHomeScreen"
          component={YoutubeHomeScreen}
          options={({ navigation }) => {
            return {
              headerLeft: () => <HeaderYouTubeLogoImage />,
              headerRight: () => (
                <ThView style={styles.headerRightContainer}>
                  <HeaderShareScreenIcon
                    setIsModalVisible={setIsShareScreenModalVisible}
                  />
                  <HeaderNotificationsIcon navigation={navigation} />
                  <HeaderSearchIcon
                    navigation={navigation}
                    search={startingSearch}
                  />
                </ThView>
              ),
            };
          }}
        />
        <Stack.Screen
          name="MainVideoScreen"
          component={MainVideoScreen}
          options={({ navigation }) => {
            return {
              headerLeft: () => (
                <HeaderArrowBackIcon onPress={() => navigation.pop()} />
              ),
            };
          }}
        />
        <Stack.Screen
          name="ChannelScreen"
          component={ChannelScreen}
          options={({ navigation }) => {
            return {
              headerRight: () => (
                <ThView style={styles.headerRightContainer}>
                  <HeaderShareScreenIcon
                    setIsModalVisible={setIsShareScreenModalVisible}
                  />
                  <HeaderSearchIcon
                    navigation={navigation}
                    search={startingSearch}
                  />
                  <HeaderDotVerticalIcon
                    setIsModalVisible={
                      setIsChannelScreenHeaderDotVerticalModalVisible
                    }
                  />
                </ThView>
              ),
            };
          }}
        />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={({ navigation }) => {
            return {
              headerTitle: () => (
                <HeaderTitleText>Notifications</HeaderTitleText>
              ),
              headerRight: () => (
                <ThView style={styles.headerRightContainer}>
                  <HeaderShareScreenIcon
                    setIsModalVisible={setIsShareScreenModalVisible}
                  />
                  <HeaderSearchIcon
                    navigation={navigation}
                    search={startingSearch}
                  />
                  <HeaderDotVerticalIcon
                    setIsModalVisible={
                      setIsNotificationsScreenHeaderDotVerticalModalVisible
                    }
                  />
                </ThView>
              ),
            };
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          //Header is in component
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
          //Header is in component
          options={{ headerShown: false }}
        />
        {/*Experimental*/}
        <Stack.Screen
          name="YouTubeFlatListScreen"
          component={YouTubeFlatListScreen}
        />
        <Stack.Screen
          name="YouTubePlayerScreen"
          component={YouTubePlayerScreen}
        />
      </Stack.Navigator>
    </>
  );
}
