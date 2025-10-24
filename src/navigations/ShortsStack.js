import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { View } from "react-native";
import { HeaderContainer } from "../components/ContainerComponents";
import {
  HeaderArrowBackIcon,
  HeaderDotVerticalIcon,
  HeaderMicIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
} from "../components/IconComponents";
import { HomeCommentsModal } from "../components/modals/CommentsModal";
import { BaseText, TextInputView } from "../components/TextComponents";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext";
import { useUI } from "../context/UIContext";
import ChannelScreen from "../screens/ChannelScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import ShortsScreen from "../screens/ShortsScreen";
import { styles } from "../styles/styles";

const Stack = createStackNavigator();

export default function ShortsStack() {
  const { colors, fontSizes } = useTheme();
  const {
    isShortsVideoPlaying,
    setShowChannelHeaderModal,
    setShowSearchResultHeaderModal,
    showHomeCommentsModal,
  } = useUI();

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ShortsScreen"
          component={ShortsScreen}
          options={() => {
            return {
              header: ({ navigation }) => (
                <HeaderContainer
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 0,
                    backgroundColor: "transparent",
                  }}
                >
                  {!isShortsVideoPlaying && (
                    <BaseText
                      style={{
                        fontSize: fontSizes.xl2,
                        fontWeight: "bold",
                        color: colors.white,
                      }}
                    >
                      Shorts
                    </BaseText>
                  )}
                  <View style={[styles.headerRightIconsContainer]}>
                    <HeaderShareScreenIcon color={colors.white} />
                    <HeaderSearchIcon
                      color={colors.white}
                      navigation={navigation}
                    />
                    <HeaderDotVerticalIcon
                      style={[styles.headerRightIcon]}
                      color={colors.white}
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
              const { globalHomeSearch, setGlobalHomeSearch, handleSearch } =
                useSearch();
              const [searchInput, setSearchInput] = useState(
                route.params.search
              );

              return (
                <HeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                  <TextInputView
                    autoFocus={true}
                    value={globalHomeSearch ? globalHomeSearch : searchInput}
                    onChangeText={
                      globalHomeSearch ? setGlobalHomeSearch : setSearchInput
                    }
                    onSubmitEditing={() => {
                      handleSearch({
                        navigation,
                        searchInput: globalHomeSearch
                          ? globalHomeSearch
                          : searchInput,
                      });
                      setGlobalHomeSearch("");
                    }}
                    setClearButton={() => {
                      setGlobalHomeSearch("");
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
                  <TextInputView
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
                  <View style={styles.headerRightIconsContainer}>
                    <HeaderMicIcon style={{ marginLeft: 16 }} />
                    <HeaderShareScreenIcon />
                    <HeaderDotVerticalIcon
                      onPress={() => setShowSearchResultHeaderModal(true)}
                    />
                  </View>
                </HeaderContainer>
              );
            },
          })}
        />
        <Stack.Screen
          name="ChannelScreen"
          component={ChannelScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <HeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                  <View style={styles.headerRightIconsContainer}>
                    <HeaderShareScreenIcon />
                    <HeaderSearchIcon navigation={navigation} />
                    <HeaderDotVerticalIcon
                      onPress={() => setShowChannelHeaderModal(true)}
                    />
                  </View>
                </HeaderContainer>
              ),
            };
          }}
        />
      </Stack.Navigator>

      {showHomeCommentsModal && <HomeCommentsModal />}
    </>
  );
}
