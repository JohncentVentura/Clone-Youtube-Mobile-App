import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchMainVideoData } from "../api/mainVideoApi";
import { searchHistoryKey } from "../utils/constants";

interface HandleSearchProps {
  navigation: any;
  searchInput: string;
}

interface SearchHistoryItem {
  text: string;
  picture: string;
}

interface SearchContextType {
  ctxClearSearchHistory: () => Promise<void>;
  ctxHandleSearch: ({
    navigation,
    searchInput,
  }: HandleSearchProps) => Promise<void>;
  ctxIsSearchHistoryLoading: boolean;
  ctxSetIsSearchHistoryLoading: React.Dispatch<React.SetStateAction<boolean>>;
  ctxRemoveSearch: () => Promise<void>;
  ctxRemoveSearchText: string;
  ctxSetRemoveSearchText: React.Dispatch<React.SetStateAction<string>>;
  ctxSearchHistory: SearchHistoryItem[];
  ctxSearchInput: string;
  ctxSetSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [ctxIsSearchHistoryLoading, ctxSetIsSearchHistoryLoading] =
    useState<boolean>(true);
  const [ctxRemoveSearchText, ctxSetRemoveSearchText] = useState<string>("");
  const [ctxSearchHistory, ctxSetSearchHistory] = useState<SearchHistoryItem[]>(
    []
  );
  const [ctxSearchInput, ctxSetSearchInput] = useState<string>("");

  //Load search history from AsyncStorage
  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const loadedSearchHistory = await AsyncStorage.getItem(
          searchHistoryKey
        );

        if (loadedSearchHistory)
          ctxSetSearchHistory(JSON.parse(loadedSearchHistory));

        ctxSetIsSearchHistoryLoading(false);
      } catch (e) {
        console.log("SearchContext.tsx failed to load search history: ", e);
      }
    };
    loadSearchHistory();
  }, []);

  async function ctxClearSearchHistory() {
    try {
      await AsyncStorage.removeItem(searchHistoryKey);
      ctxSetSearchHistory([]);
    } catch (e) {
      console.log("SearchContext.tsx failed to clear search history: ", e);
    }
  }

  async function ctxRemoveSearch() {
    if (!ctxRemoveSearchText) return;

    try {
      const updatedSearchHistory = ctxSearchHistory.filter(
        (item) => item.text !== ctxRemoveSearchText
      );
      ctxSetSearchHistory(updatedSearchHistory);
      await AsyncStorage.setItem(
        searchHistoryKey,
        JSON.stringify(updatedSearchHistory)
      );
    } catch (e) {
      console.log(
        "SearchContext.tsx failed to remove search from history: ",
        e
      );
    }
  }

  async function ctxHandleSearch({
    navigation,
    searchInput,
  }: HandleSearchProps) {
    if (!searchInput?.trim())
      return console.log("SearchContext.tsx search input is empty");

    const controller = new AbortController();
    const { signal } = controller;

    try {
      const data = await fetchMainVideoData({
        query: searchInput,
        queryResults: 1,
        signal,
      });
      const searchedItem: SearchHistoryItem = {
        text: searchInput,
        picture: data[0].picture,
      };

      if (!ctxSearchHistory.some((item) => item.text === searchInput)) {
        const updatedSearchHistory = [searchedItem, ...ctxSearchHistory];
        ctxSetSearchHistory(updatedSearchHistory);
        await AsyncStorage.setItem(
          searchHistoryKey,
          JSON.stringify(updatedSearchHistory)
        );
      }

      navigation.push("SearchResultScreen", { search: searchInput });
    } catch (e) {
      console.log("SearchContext.tsx search failed: ", e);
    }
  }

  return (
    <SearchContext.Provider
      value={{
        ctxClearSearchHistory,
        ctxHandleSearch,
        ctxIsSearchHistoryLoading,
        ctxSetIsSearchHistoryLoading,
        ctxSearchInput,
        ctxSetSearchInput,
        ctxSearchHistory,
        ctxRemoveSearch,
        ctxRemoveSearchText,
        ctxSetRemoveSearchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  return useContext(SearchContext);
}
