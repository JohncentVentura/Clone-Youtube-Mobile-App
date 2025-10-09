import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { fetchPexelsData } from "../api/pexelsAPI";
import {
  HeaderArrowBackIcon,
  HeaderDotVerticalIcon,
  HeaderMicIcon,
  HeaderShareScreenIcon,
} from "../components/HeaderComponents";
import {
  ThTextInputView,
  ThHeaderContainer,
} from "../components/ThemedComponents";
import { AutoPlayFlatList } from "../components/VideoComponents";
import { useModal } from "../context/ModalContext";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";
import { showMainBottomTabBar } from "../utils/utils";

export default function SearchResultScreen({ navigation, route }) {
  const {
    setIsShareScreenVisible,
    setIsSearchResultHeaderVisible,
  } = useModal();
  const { colors } = useTheme();

  const { search } = route.params;
  const [searchInput, setSearchInput] = useState(search);
  const [searchVideos, setSearchVideos] = useState([]);
  const [autoPlayVideoId, setAutoPlayVideoId] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    (async () => {
      const data = await fetchPexelsData(
        searchInput,
        6,
        abortController.signal
      );
      if (isMounted) {
        setSearchVideos(data);
      }
    })();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [searchInput]);

  showMainBottomTabBar(navigation, colors);

  return (
    <>
      <View style={styles.screenContainer}>
        <ThHeaderContainer>
          <HeaderArrowBackIcon onPress={() => navigation.pop(2)} />
          <ThTextInputView
            style={{ marginLeft: 12 }}
            value={searchInput}
            onChangeText={setSearchInput}
            onPress={() => {
              navigation.navigate("SearchScreen", { search: searchInput });
            }}
            setClearButton={() => {
              setSearchInput("");
              navigation.navigate("SearchScreen", { search: "" });
            }}
          />
          <View style={styles.headerRightContainer}>
            <HeaderMicIcon />
            <HeaderShareScreenIcon
              onPress={() => {
                setIsShareScreenVisible(true);
              }}
            />
            <HeaderDotVerticalIcon
              onPress={() => {
                setIsSearchResultHeaderVisible(true);
              }}
            />
          </View>
        </ThHeaderContainer>

        <AutoPlayFlatList
          data={searchVideos}
          navigation={navigation}
          query={searchInput}
        />
      </View>
    </>
  );
}
