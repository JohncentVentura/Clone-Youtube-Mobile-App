import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchPexelsData } from "../api/pexelsAPI";
import { HeaderArrowBack, HeaderMic } from "../components/HeaderComponents";
import {
  ArrowUpLeftIcon,
  ClockRotateLeftIcon,
} from "../components/IconComponents";
import { SearchScreenHistoryImage } from "../components/ImageComponents";
import {
  ClearSearchHistoryModal,
  RemoveSearchHistoryModal,
} from "../components/ModalComponents";
import {
  ThFlatList,
  ThPressable,
  ThText,
  ThTextInput,
  ThView,
} from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import { hideMainBottomTabBar } from "../utils/utils";

const SEARCH_HISTORY_KEY = "searchHistory";

export default function SearchScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { colors, fontSizes, iconSizes } = useTheme();
  const { search } = route.params;
  const [newSearch, setNewSearch] = useState(search);
  const [searchHistory, setSearchHistory] = useState([]); //Contains search text & search image

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);

  hideMainBottomTabBar(navigation);

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
      setSearchHistory([]);
    } catch (e) {
      console.log("Failed to clear history: ", e);
    }
  };

  const removeSearchHistoryItem = async (itemText) => {
    try {
      const updated = searchHistory.filter((item) => item.text !== itemText);
      setSearchHistory(updated);
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log("Failed to delete item: ", e);
    }
  };

  //Save history every time it changes
  useEffect(() => {
    if (searchHistory.length > 0) {
      (async () => {
        try {
          await AsyncStorage.setItem(
            SEARCH_HISTORY_KEY,
            JSON.stringify(searchHistory)
          );
        } catch (e) {
          console.log("Failed to save history: ", e);
        }
      })();
    }
  }, [searchHistory]);

  //Load history when screen mounts
  useEffect(() => {
    (async () => {
      try {
        const loadedSearchHistory = await AsyncStorage.getItem(
          SEARCH_HISTORY_KEY
        );
        if (loadedSearchHistory)
          setSearchHistory(JSON.parse(loadedSearchHistory));
      } catch (e) {
        console.log("Failed to load history: ", e);
      }
      console.log(searchHistory);
    })();
  }, []);

  const handleSearch = async (navigation, searchTextInput) => {
    if (!searchTextInput) return; //Ignores empty search input

    let searchPicture = "";
    try {
      //fetch data for the searched picture only after searching it
      const data = await fetchPexelsData(searchTextInput, 1);
      searchPicture = data[0].picture;
    } catch (e) {
      console.log("Failed to fetch on handleSearch: ", e);
      return;
    }

    const newItem = {
      text: searchTextInput,
      picture: searchPicture,
    };

    setSearchHistory((prevSearch) => {
      if (prevSearch.some((item) => item.text === searchTextInput))
        return prevSearch; //Prevents duplicate searches
      return [newItem, ...prevSearch]; //Add new searches
    });

    navigation.push("SearchResultScreen", { search: searchTextInput });
  };

  return (
    <>
      <RemoveSearchHistoryModal
        visible={modalVisible}
        setVisible={setModalVisible}
        removingItem={removingItem}
        removeSearchHistoryItem={removeSearchHistoryItem}
      />

      <ClearSearchHistoryModal
        visible={modalVisible2}
        setVisible={setModalVisible2}
        clearSearchHistory={clearSearchHistory}
      />

      <ThView style={styles.screenContainer}>
        <ThView
          style={{
            marginTop: insets.top + 12,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <HeaderArrowBack
            style={styles.headerLeftIcon}
            navigation={navigation}
          />
          <ThTextInput
            style={{ marginLeft: 12, flex: 1 }}
            value={newSearch}
            onChangeText={setNewSearch}
            autoFocus={true}
            onSubmitEditing={() => handleSearch(navigation, newSearch)}
          />
          <ThView style={styles.headerRightIconsContainer}>
            <HeaderMic style={{ marginLeft: 14 }} />
          </ThView>
        </ThView>
        <ThFlatList
          data={searchHistory}
          keyExtractor={(item, index) => item.text + index}
          renderItem={({ item }) => (
            <ThPressable
              style={({ pressed }) => ({
                paddingVertical: 12,
                backgroundColor: pressed ? colors.bgMuted : colors.bg,
              })}
              onPress={() => handleSearch(navigation, item.text)}
              onLongPress={() => {
                setRemovingItem(item);
                setModalVisible(true);
              }}
              delayLongPress={100}
            >
              <ThView
                style={[
                  styles.paddedHorizontalContainer,
                  {
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    alignItems: "center",
                  },
                ]}
              >
                <ClockRotateLeftIcon size={iconSizes.sm} />
                <ThText style={{ marginLeft: 12, flexShrink: 1 }}>
                  {item.text}
                </ThText>
                <SearchScreenHistoryImage
                  style={{ marginLeft: "auto" }}
                  source={{
                    uri: item.picture,
                  }}
                />
                <ArrowUpLeftIcon style={{ marginLeft: 12 }} />
              </ThView>
            </ThPressable>
          )}
          ListFooterComponent={
            searchHistory.length > 0 ? (
              <ThPressable
                style={styles.baseButton}
                onPress={() => setModalVisible2(true)}
              >
                <ThText
                  style={{
                    color: colors.textMuted,
                    fontSize: fontSizes.sm,
                    textAlign: "center",
                  }}
                >
                  Clear History
                </ThText>
              </ThPressable>
            ) : null
          }
        />
      </ThView>
    </>
  );
}
