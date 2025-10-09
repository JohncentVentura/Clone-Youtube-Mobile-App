import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";

import YouTubeFlatListScreen from "../api/YouTubeFlatListScreen";
import YouTubePlayerScreen from "../api/YouTubePlayerScreen";
import {
  HeaderArrowBackIcon,
  HeaderDotVerticalIcon,
  HeaderMicIcon,
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
  HeaderTitleText,
  HeaderYouTubeLogoImage,
} from "../components/HeaderComponents";
import {
  ChannelScreenHeaderDotVerticalModal,
  ClearSearchHistoryModal,
  FlatListVideoItemModal,
  NotificationsScreenHeaderDotVerticalModal,
  NotificationsScreenItemDotVerticalModal,
  RemoveSearchFromHistoryModal,
  SearchResultScreenHeaderDotVerticalModal,
  ShareScreenModal,
} from "../components/ModalComponents";
import {
  ThView,
  ThTextInput,
  ThHeaderContainer,
  ThTextInputCloseButton,
} from "../components/ThemedComponents";
import { useModal } from "../context/ModalContext";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext";
import ChannelScreen from "../screens/ChannelScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import YoutubeHomeScreen from "../screens/YoutubeHomeScreen";
import { styles } from "../styles/styles";

const Stack = createStackNavigator();

export default function YoutubeHomeStack() {
  const {
    isChannelScreenHeaderDotVerticalModalVisible,
    setIsChannelScreenHeaderDotVerticalModalVisible,
  } = useModal();
  const { isClearHistoryModalVisible, setIsClearHistoryModalVisible } =
    useModal();
  const {
    isFlatListVideoItemModalVisible,
    setIsFlatListVideoItemModalVisible,
  } = useModal();
  const {
    isNotificationsScreenHeaderDotVerticalModalVisible,
    setIsNotificationsScreenHeaderDotVerticalModalVisible,
  } = useModal();
  const {
    isNotificationsScreenItemDotVerticalModalVisible,
    setIsNotificationsScreenItemDotVerticalModalVisible,
  } = useModal();
  const {
    isRemoveSearchFromHistoryModalVisible,
    setIsRemoveSearchFromHistoryModalVisible,
  } = useModal();
  const {
    isSearchResultScreenHeaderDotVerticalModalVisible,
    setIsSearchResultScreenHeaderDotVerticalModalVisible,
  } = useModal();
  const { isShareScreenModalVisible, setIsShareScreenModalVisible } =
    useModal();

    const { removingSearchItem } = useSearch();
  return (
    <>
      <ChannelScreenHeaderDotVerticalModal
        isModalVisible={isChannelScreenHeaderDotVerticalModalVisible}
        setIsModalVisible={setIsChannelScreenHeaderDotVerticalModalVisible}
      />

      <ClearSearchHistoryModal
        isModalVisible={isClearHistoryModalVisible}
        setIsModalVisible={setIsClearHistoryModalVisible}
      />

      <FlatListVideoItemModal
        isModalVisible={isFlatListVideoItemModalVisible}
        setIsModalVisible={setIsFlatListVideoItemModalVisible}
      />

      <NotificationsScreenHeaderDotVerticalModal
        isModalVisible={isNotificationsScreenHeaderDotVerticalModalVisible}
        setIsModalVisible={
          setIsNotificationsScreenHeaderDotVerticalModalVisible
        }
      />

      <NotificationsScreenItemDotVerticalModal
        isModalVisible={isNotificationsScreenItemDotVerticalModalVisible}
        setIsModalVisible={setIsNotificationsScreenItemDotVerticalModalVisible}
      />

      <RemoveSearchFromHistoryModal
        isModalVisible={isRemoveSearchFromHistoryModalVisible}
        setIsModalVisible={setIsRemoveSearchFromHistoryModalVisible}
        removingItem={removingSearchItem}
      />

      <ShareScreenModal
        isModalVisible={isShareScreenModalVisible}
        setIsModalVisible={setIsShareScreenModalVisible}
      />

      <SearchResultScreenHeaderDotVerticalModal
        isModalVisible={isSearchResultScreenHeaderDotVerticalModalVisible}
        setIsModalVisible={setIsSearchResultScreenHeaderDotVerticalModalVisible}
      />

      <Stack.Navigator id="YoutubeHomeStack">
        <Stack.Screen
          name="YoutubeHomeScreen"
          component={YoutubeHomeScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderYouTubeLogoImage />
                  <ThView style={styles.headerRightContainer}>
                    <HeaderShareScreenIcon
                      onPress={() => setIsShareScreenModalVisible(true)}
                    />
                    <HeaderNotificationsIcon navigation={navigation} />
                    <HeaderSearchIcon navigation={navigation} />
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
                    <HeaderSearchIcon navigation={navigation} />
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
                    <HeaderSearchIcon navigation={navigation} />
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
          options={({}) => {
            return {
              headerShown: false,
            };
          }}
        />
        <Stack.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
          options={({}) => {
            return {
              headerShown: false,
            };
          }}
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
