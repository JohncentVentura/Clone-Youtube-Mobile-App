import { createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { View } from "react-native";
import { HeaderContainer } from "../components/ContainerComponents";
import {
  HeaderArrowBackIcon,
  HeaderDotVerticalIcon,
  HeaderMicIcon,
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
} from "../components/IconComponents";
import {
  BaseText,
  HeaderTitleText,
  TextInputView,
} from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useSearchContext } from "../context/SearchContext";
import { useUIContext } from "../context/UIContext";
import MoviesScreen from "../screens/drawers/MoviesScreen";
import MusicScreen from "../screens/drawers/MusicScreen";
import YoutubePremiumScreen from "../screens/drawers/YoutubePremiumScreen";
import ChannelScreen from "../screens/ChannelScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import ShortsScreen from "../screens/ShortsScreen";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";

const Stack = createStackNavigator();

//#region Navigate & Ref
export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
//#endregion
//#region Main Screens
export function ChannelStackScreen() {
  const { ctxSetChannelHeaderModal } = useUIContext();

  return (
    <Stack.Screen
      name={navPaths.channelScreen}
      component={ChannelScreen}
      options={({ navigation }) => ({
        header: () => (
          <HeaderContainer>
            <HeaderArrowBackIcon navigation={navigation} />
            <View style={styles.headerRightIconsContainer}>
              <HeaderShareScreenIcon />
              <HeaderSearchIcon navigation={navigation} />
              <HeaderDotVerticalIcon
                onPress={() => ctxSetChannelHeaderModal(true)}
              />
            </View>
          </HeaderContainer>
        ),
      })}
    />
  );
}

export function MainVideoStackScreen() {
  return (
    <Stack.Screen
      name={navPaths.mainVideoScreen}
      component={MainVideoScreen}
      options={({ navigation }) => ({
        header: () => (
          <HeaderContainer>
            <HeaderArrowBackIcon onPress={() => navigation.pop()} />
          </HeaderContainer>
        ),
      })}
    />
  );
}

export function NotificationsStackScreen() {
  const { ctxSetNotifHeaderModal } = useUIContext();

  return (
    <Stack.Screen
      name={navPaths.notificationsScreen}
      component={NotificationsScreen}
      options={({ navigation }) => ({
        header: () => (
          <HeaderContainer>
            <HeaderArrowBackIcon navigation={navigation} />
            <HeaderTitleText>Notifications</HeaderTitleText>
            <View style={styles.headerRightIconsContainer}>
              <HeaderShareScreenIcon />
              <HeaderSearchIcon navigation={navigation} />
              <HeaderDotVerticalIcon
                onPress={() => ctxSetNotifHeaderModal(true)}
              />
            </View>
          </HeaderContainer>
        ),
      })}
    />
  );
}

export function SearchStackScreen() {
  const { ctxSearchInput, ctxSetSearchInput, ctxHandleSearch } =
    useSearchContext();

  return (
    <Stack.Screen
      name={navPaths.searchScreen}
      component={SearchScreen}
      options={({ navigation, route }) => ({
        header: () => {
          const [searchInput, setSearchInput] = useState(route.params.search);

          return (
            <HeaderContainer>
              <HeaderArrowBackIcon navigation={navigation} />
              <TextInputView
                autoFocus={true}
                value={ctxSearchInput ? ctxSearchInput : searchInput}
                onChangeText={
                  ctxSearchInput ? ctxSetSearchInput : setSearchInput
                }
                onSubmitEditing={() => {
                  ctxHandleSearch({
                    navigation,
                    searchInput: ctxSearchInput ? ctxSearchInput : searchInput,
                  });
                  ctxSetSearchInput("");
                }}
                setClearButton={() => {
                  ctxSetSearchInput("");
                  setSearchInput("");
                }}
              />
              <HeaderMicIcon />
            </HeaderContainer>
          );
        },
      })}
    />
  );
}

export function SearchResultStackScreen() {
  const { ctxSetSearchResultHeaderModal } = useUIContext();

  return (
    <Stack.Screen
      name={navPaths.searchResultScreen}
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
              <TextInputView
                value={searchInput}
                onPress={() =>
                  navigation.navigate(navPaths.searchScreen, {
                    search: searchInput,
                  })
                }
                setClearButton={() => {
                  navigation.navigate(navPaths.searchScreen, {
                    search: "",
                  });
                }}
              />
              <View style={styles.headerRightIconsContainer}>
                <HeaderMicIcon style={{ marginLeft: 16 }} />
                <HeaderShareScreenIcon />
                <HeaderDotVerticalIcon
                  onPress={() => ctxSetSearchResultHeaderModal(true)}
                />
              </View>
            </HeaderContainer>
          );
        },
      })}
    />
  );
}

export function ShortsStackScreen() {
  const { ctxIsShortsVideoPlaying } = useUIContext();
  const { ctxColors, ctxFontSizes } = useThemeContext();

  return (
    <Stack.Screen
      name={navPaths.shortsScreen}
      component={ShortsScreen}
      options={() => ({
        header: ({ navigation }) => (
          <HeaderContainer
            style={{
              position: "absolute",
              top: 12,
              left: 0,
              backgroundColor: "transparent",
            }}
          >
            {!ctxIsShortsVideoPlaying && (
              <BaseText
                style={{
                  fontSize: ctxFontSizes.xl2,
                  fontWeight: "bold",
                  color: ctxColors.white,
                }}
              >
                Shorts
              </BaseText>
            )}
            <View style={[styles.headerRightIconsContainer]}>
              <HeaderShareScreenIcon color={ctxColors.white} />
              <HeaderSearchIcon
                color={ctxColors.white}
                navigation={navigation}
              />
              <HeaderDotVerticalIcon
                style={[styles.headerRightIcon]}
                color={ctxColors.white}
              />
            </View>
          </HeaderContainer>
        ),
      })}
    />
  );
}
//#endregion
//#region Drawer Screens
export function MoviesStackScreen() {
  return (
    <Stack.Screen
      name={navPaths.moviesScreen}
      component={MoviesScreen}
      options={({ navigation }) => ({
        header: () => (
          <HeaderContainer>
            <HeaderArrowBackIcon navigation={navigation} />
            <HeaderTitleText>Movies</HeaderTitleText>
            <View style={styles.headerRightIconsContainer}>
              <HeaderShareScreenIcon />
              <HeaderSearchIcon navigation={navigation} />
              <HeaderDotVerticalIcon />
            </View>
          </HeaderContainer>
        ),
      })}
    />
  );
}

export function MusicStackScreen() {
  return (
    <Stack.Screen
      name={navPaths.moviesScreen}
      component={MusicScreen}
      options={({ navigation }) => ({
        header: () => (
          <HeaderContainer>
            <HeaderArrowBackIcon navigation={navigation} />
            <HeaderTitleText>Music</HeaderTitleText>
            <View style={styles.headerRightIconsContainer}>
              <HeaderSearchIcon navigation={navigation} />
              <HeaderDotVerticalIcon />
            </View>
          </HeaderContainer>
        ),
      })}
    />
  );
}

export function YoutubePremiumStackScreen() {
  return (
    <Stack.Screen
      name={navPaths.youtubePremiumScreen}
      component={YoutubePremiumScreen}
      options={({ navigation }) => ({
        header: () => (
          <HeaderContainer>
            <HeaderArrowBackIcon navigation={navigation} />
            <HeaderTitleText>Get YouTube Premi...</HeaderTitleText>
            <View style={styles.headerRightIconsContainer}>
              <HeaderShareScreenIcon />
              <HeaderSearchIcon navigation={navigation} />
              <HeaderDotVerticalIcon />
            </View>
          </HeaderContainer>
        ),
      })}
    />
  );
}
//#endregion
