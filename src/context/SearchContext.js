import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useContext, useState } from "react";
import { fetchPexelsData } from "../api/pexelsAPI";

const SearchContext = createContext();
const SEARCH_HISTORY_KEY = "SearchHistoryKey";

export function SearchProvider({ children }) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [removingSearchItem, setRemovingSearchItem] = useState("");

  //Load search history
  useEffect(() => {
    (async () => {
      try {
        const loadedSearchHistory = await AsyncStorage.getItem(
          SEARCH_HISTORY_KEY
        );

        if (loadedSearchHistory) {
          setSearchHistory(JSON.parse(loadedSearchHistory));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  async function handleSearch({ navigation, searchInput }) {
    if (!searchInput?.trim()) {
      console.log("SearchContext.js search is empty");
      return;
    }

    let searchedItem = {};

    try {
      const data = await fetchPexelsData(searchInput, 1);
      searchedItem = { text: searchInput, picture: data[0].picture };
    } catch (e) {
      console.log("SearchContext.js failed to fetch pexels data: ", e);
    }

    if (!searchHistory.some((item) => item.text === searchInput)) {
      const updatedSearchHistory = [searchedItem, ...searchHistory];
      setSearchHistory(updatedSearchHistory);

      try {
        await AsyncStorage.setItem(
          SEARCH_HISTORY_KEY,
          JSON.stringify(updatedSearchHistory)
        );
      } catch (e) {
        console.log("SearchContext.js failed to save search history: ", e);
      }
    }

    navigation.push("SearchResultScreen", { search: searchInput });
  }

  async function removeSearchFromHistory(itemText) {
    try {
      const updatedSearchHistory = searchHistory.filter(
        (item) => item.text !== itemText
      );

      setSearchHistory(updatedSearchHistory);
      await AsyncStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(updatedSearchHistory)
      );
    } catch (e) {
      console.log("SearchContext.js failed to remove search from history: ", e);
    }
  }

  async function clearSearchHistory() {
    try {
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
      setSearchHistory([]);
    } catch (e) {
      console.log("SearchContext.js failed to clear search history: ", e);
    }
  }

  return (
    <SearchContext.Provider
      value={{
        //search,
        //setSearch,
        searchHistory,
        handleSearch,
        removeSearchFromHistory,
        clearSearchHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
