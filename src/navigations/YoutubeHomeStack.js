import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { View } from "react-native";
import YouTubeFlatListScreen from "../youtubeAPI/YouTubeFlatListScreen";
import YouTubePlayerScreen from "../youtubeAPI/YouTubePlayerScreen";
import {
  HeaderArrowBackIcon,
  HeaderContainer,
  HeaderDotVerticalIcon,
  HeaderMicIcon,
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
  HeaderTitleText,
  HeaderYoutubeLogoImage,
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
import { ThTextInputView } from "../components/ThemedComponents";
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

export default function YoutubeHomeStack() {
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
        isVisible={isChannelHeaderVisible}
        setIsVisible={setIsChannelHeaderVisible}
      />

      <ClearSearchHistoryModal
        isVisible={isClearSearchHistoryVisible}
        setIsVisible={setIsClearSearchHistoryVisible}
      />

      <FlatListVideoItemModal
        isVisible={isFlatListVideoItemVisible}
        setIsVisible={setIsFlatListVideoItemVisible}
      />

      <NotificationsHeaderModal
        isVisible={isNotificationsHeaderVisible}
        setIsVisible={setIsNotificationsHeaderVisible}
      />

      <NotificationsItemModal
        isVisible={isNotificationsItemVisible}
        setIsVisible={setIsNotificationsItemVisible}
      />

      <RemoveSearchItemModal
        isVisible={isRemoveSearchItemVisible}
        setIsVisible={setIsRemoveSearchItemVisible}
      />

      <ShareScreenModal
        isVisible={isShareScreenVisible}
        setIsVisible={setIsShareScreenVisible}
      />

      <SearchResultHeaderModal
        isVisible={isSearchResultHeaderVisible}
        setIsVisible={setIsSearchResultHeaderVisible}
      />

      <Stack.Navigator id="YoutubeHomeStack">
        <Stack.Screen
          name="YoutubeHomeScreen"
          component={YoutubeHomeScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <HeaderContainer>
                  <HeaderYoutubeLogoImage />
                  <View style={styles.headerRightContainer}>
                    <HeaderShareScreenIcon
                      onPress={() => setIsShareScreenVisible(true)}
                    />
                    <HeaderNotificationsIcon navigation={navigation} />
                    <HeaderSearchIcon navigation={navigation} />
                  </View>
                </HeaderContainer>
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
                <HeaderContainer>
                  <HeaderArrowBackIcon onPress={() => navigation.pop()} />
                </HeaderContainer>
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
                <HeaderContainer>
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
                </HeaderContainer>
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
                <HeaderContainer>
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
                </HeaderContainer>
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
                <HeaderContainer>
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
                </HeaderContainer>
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
                <HeaderContainer>
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
                </HeaderContainer>
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
                <HeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                </HeaderContainer>
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
                <HeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                </HeaderContainer>
              ),
            };
          }}
        />
      </Stack.Navigator>
    </>
  );
}
