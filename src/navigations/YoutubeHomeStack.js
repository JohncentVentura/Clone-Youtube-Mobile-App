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
import {
  ThView,
  ThTextInput,
  ThHeaderContainer,
  ThTextInputCloseButton,
} from "../components/ThemedComponents";
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
  const [searchInput, setSearchInput] = useState("");
  const [
    isChannelScreenHeaderDotVerticalModalVisible,
    setIsChannelScreenHeaderDotVerticalModalVisible,
  ] = useState(false);
  const [
    isNotificationsScreenHeaderDotVerticalModalVisible,
    setIsNotificationsScreenHeaderDotVerticalModalVisible,
  ] = useState(false);
  const [isShareScreenModalVisible, setIsShareScreenModalVisible] =
    useState(false);

  return (
    <>
      <ChannelScreenHeaderDotVerticalModal
        isModalVisible={isChannelScreenHeaderDotVerticalModalVisible}
        setIsModalVisible={setIsChannelScreenHeaderDotVerticalModalVisible}
      />

      <NotificationsScreenHeaderDotVerticalModal
        isModalVisible={isNotificationsScreenHeaderDotVerticalModalVisible}
        setIsModalVisible={
          setIsNotificationsScreenHeaderDotVerticalModalVisible
        }
      />

      <ShareScreenModal
        isModalVisible={isShareScreenModalVisible}
        setIsModalVisible={setIsShareScreenModalVisible}
      />

      <Stack.Navigator id="YoutubeHomeStack">
        <Stack.Screen
          name="YoutubeHomeScreen"
          component={YoutubeHomeScreen}
          options={({ navigation, route }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderYouTubeLogoImage />
                  <ThView style={styles.headerRightContainer}>
                    <HeaderShareScreenIcon
                      onPress={() => setIsShareScreenModalVisible(true)}
                    />
                    <HeaderNotificationsIcon navigation={navigation} />
                    <HeaderSearchIcon
                      navigation={navigation}
                      search={searchInput}
                    />
                  </ThView>
                </ThHeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name="MainVideoScreen"
          component={MainVideoScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderArrowBackIcon onPress={() => navigation.pop()} />
                </ThHeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name="ChannelScreen"
          component={ChannelScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                  <ThView style={styles.headerRightContainer}>
                    <HeaderShareScreenIcon
                      onPress={() => setIsShareScreenModalVisible(true)}
                    />
                    <HeaderSearchIcon
                      navigation={navigation}
                      search={searchInput}
                    />
                    <HeaderDotVerticalIcon
                      onPress={() =>
                        setIsChannelScreenHeaderDotVerticalModalVisible(true)
                      }
                    />
                  </ThView>
                </ThHeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                  <HeaderTitleText>Notifications</HeaderTitleText>
                  <ThView style={styles.headerRightContainer}>
                    <HeaderShareScreenIcon
                      onPress={() => setIsShareScreenModalVisible(true)}
                    />
                    <HeaderSearchIcon
                      navigation={navigation}
                      search={searchInput}
                    />
                    <HeaderDotVerticalIcon
                      onPress={() =>
                        setIsNotificationsScreenHeaderDotVerticalModalVisible(
                          true
                        )
                      }
                    />
                  </ThView>
                </ThHeaderContainer>
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
          options={({ navigation }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                </ThHeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name="YouTubePlayerScreen"
          component={YouTubePlayerScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                </ThHeaderContainer>
              ),
            };
          }}
        />
      </Stack.Navigator>
    </>
  );
}
