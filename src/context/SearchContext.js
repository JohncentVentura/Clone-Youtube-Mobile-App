import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useContext, useState } from "react";
import { fetchPexelsData } from "../hooks/usePexelsData";

const SearchContext = createContext();
const SEARCH_HISTORY_KEY = "SearchHistoryKey";

export function SearchProvider({ children }) {
  const [globalHomeSearch, setGlobalHomeSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [removingSearchItem, setRemovingSearchItem] = useState("");

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const loadedSearchHistory = await AsyncStorage.getItem(
          SEARCH_HISTORY_KEY
        );

        if (loadedSearchHistory) {
          setSearchHistory(JSON.parse(loadedSearchHistory));
        }
      } catch (e) {
        console.log("SearchContext.js failed to load search history: ", e);
      }
    };
    loadSearchHistory();
  }, []);

  async function handleSearch({ navigation, searchInput }) {
    if (!searchInput?.trim()) {
      return console.log("Search input is empty");
    }

    try {
      const data = await fetchPexelsData(searchInput, 1);
      const searchedItem = { text: searchInput, picture: data[0].picture };

      if (!searchHistory.some((item) => item.text === searchInput)) {
        const updatedSearchHistory = [searchedItem, ...searchHistory];
        setSearchHistory(updatedSearchHistory);
        await AsyncStorage.setItem(
          SEARCH_HISTORY_KEY,
          JSON.stringify(updatedSearchHistory)
        );
      }

      navigation.push("SearchResultScreen", { search: searchInput });
    } catch (e) {
      console.log("Search failed: ", e);
    }
  }

  async function removeSearchHistoryItem() {
    try {
      const updatedSearchHistory = searchHistory.filter(
        (item) => item.text !== removingSearchItem.text
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
        globalHomeSearch,
        setGlobalHomeSearch,
        searchHistory,
        removingSearchItem,
        setRemovingSearchItem,
        handleSearch,
        removeSearchHistoryItem,
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
