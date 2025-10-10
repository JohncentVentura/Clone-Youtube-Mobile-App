import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { View } from "react-native";
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
  ChannelHeaderModal,
  ClearSearchHistoryModal,
  FlatListVideoItemModal,
  NotificationsHeaderModal,
  NotificationsItemModal,
  RemoveSearchItemModal,
  SearchResultHeaderModal,
  ShareScreenModal,
} from "../components/ModalComponents";
import {
  ThHeaderContainer,
  ThTextInputView,
} from "../components/ThemedComponents";
import { useModal } from "../context/ModalContext";
import { useSearch } from "../context/SearchContext";
import ChannelScreen from "../screens/ChannelScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import YoutubeHomeScreen from "../screens/YoutubeHomeScreen";
import { styles } from "../styles/styles";

const Stack = createStackNavigator();

export default function YouTubeHomeStack() {
  const {
    isChannelHeaderVisible,
    setIsChannelHeaderVisible,
    isClearSearchHistoryVisible,
    setIsClearSearchHistoryVisible,
    isFlatListVideoItemVisible,
    setIsFlatListVideoItemVisible,
    isNotificationsHeaderVisible,
    setIsNotificationsHeaderVisible,
    isNotificationsItemVisible,
    setIsNotificationsItemVisible,
    isRemoveSearchItemVisible,
    setIsRemoveSearchItemVisible,
    isShareScreenVisible,
    setIsShareScreenVisible,
    isSearchResultHeaderVisible,
    setIsSearchResultHeaderVisible,
  } = useModal();

  return (
    <>
      <ChannelHeaderModal
        isModalVisible={isChannelHeaderVisible}
        setIsModalVisible={setIsChannelHeaderVisible}
      />

      <ClearSearchHistoryModal
        isModalVisible={isClearSearchHistoryVisible}
        setIsModalVisible={setIsClearSearchHistoryVisible}
      />

      <FlatListVideoItemModal
        isModalVisible={isFlatListVideoItemVisible}
        setIsModalVisible={setIsFlatListVideoItemVisible}
      />

      <NotificationsHeaderModal
        isModalVisible={isNotificationsHeaderVisible}
        setIsModalVisible={setIsNotificationsHeaderVisible}
      />

      <NotificationsItemModal
        isModalVisible={isNotificationsItemVisible}
        setIsModalVisible={setIsNotificationsItemVisible}
      />

      <RemoveSearchItemModal
        isModalVisible={isRemoveSearchItemVisible}
        setIsModalVisible={setIsRemoveSearchItemVisible}
      />

      <ShareScreenModal
        isModalVisible={isShareScreenVisible}
        setIsModalVisible={setIsShareScreenVisible}
      />

      <SearchResultHeaderModal
        isModalVisible={isSearchResultHeaderVisible}
        setIsModalVisible={setIsSearchResultHeaderVisible}
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
                  <View style={styles.headerRightContainer}>
                    <HeaderShareScreenIcon
                      onPress={() => setIsShareScreenVisible(true)}
                    />
                    <HeaderNotificationsIcon navigation={navigation} />
                    <HeaderSearchIcon navigation={navigation} />
                  </View>
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
                  <View style={styles.headerRightContainer}>
                    <HeaderShareScreenIcon
                      onPress={() => setIsShareScreenVisible(true)}
                    />
                    <HeaderSearchIcon navigation={navigation} />
                    <HeaderDotVerticalIcon
                      onPress={() => setIsChannelHeaderVisible(true)}
                    />
                  </View>
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
                  <View style={styles.headerRightContainer}>
                    <HeaderShareScreenIcon
                      onPress={() => setIsShareScreenVisible(true)}
                    />
                    <HeaderSearchIcon navigation={navigation} />
                    <HeaderDotVerticalIcon
                      onPress={() => setIsNotificationsHeaderVisible(true)}
                    />
                  </View>
                </ThHeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={({ navigation, route }) => ({
            header: () => {
              const { globalSearch, setGlobalSearch, handleSearch } =
                useSearch();
              const [searchInput, setSearchInput] = useState(
                route.params.search
              );

              return (
                <ThHeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                  <ThTextInputView
                    style={{ marginHorizontal: 12 }}
                    autoFocus={true}
                    value={globalSearch ? globalSearch : searchInput}
                    onChangeText={setSearchInput}
                    onSubmitEditing={() => {
                      handleSearch({
                        navigation,
                        searchInput: globalSearch ? globalSearch : searchInput,
                      });
                      setGlobalSearch("");
                    }}
                    setClearButton={() => {
                      setGlobalSearch("");
                      setSearchInput("");
                    }}
                  />
                  <HeaderMicIcon />
                </ThHeaderContainer>
              );
            },
          })}
        />
        <Stack.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
          options={({ navigation, route }) => ({
            header: () => {
              const [searchInput, setSearchInput] = useState(
                route.params?.search || ""
              );

              return (
                <ThHeaderContainer>
                  <HeaderArrowBackIcon
                    onPress={() => {
                      navigation.pop(2);
                    }}
                  />
                  <ThTextInputView
                    style={{ marginLeft: 12 }}
                    value={searchInput}
                    onPress={() =>
                      navigation.navigate("SearchScreen", {
                        search: searchInput,
                      })
                    }
                    setClearButton={() => {
                      navigation.navigate("SearchScreen", { search: "" });
                    }}
                  />
                  <View style={styles.headerRightContainer}>
                    <HeaderMicIcon />
                    <HeaderShareScreenIcon
                      onPress={() => setIsShareScreenVisible(true)}
                    />
                    <HeaderDotVerticalIcon
                      onPress={() => setIsSearchResultHeaderVisible(true)}
                    />
                  </View>
                </ThHeaderContainer>
              );
            },
          })}
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
