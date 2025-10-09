import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchPexelsData } from "../api/pexelsAPI";
import {
  HeaderArrowBackIcon,
  HeaderDotVerticalIcon,
  HeaderMicIcon,
  HeaderShareScreenIcon,
} from "../components/HeaderComponents";

import {
  SearchResultScreenHeaderDotVerticalModal,
  ShareScreenModal,
} from "../components/ModalComponents";
import {
  ThFlatList,
  ThTextInput,
  ThView,
  ThHeaderContainer,
} from "../components/ThemedComponents";
import { FlatListVideoItem } from "../components/VideoComponents";

import { useModal } from "../context/ModalContext";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";
import { showMainBottomTabBar } from "../utils/utils";

export default function SearchResultScreen({ navigation, route }) {
  const {
    setIsShareScreenModalVisible,
    setIsSearchResultScreenHeaderDotVerticalModalVisible,
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
      <ThView style={styles.screenContainer}>
        <ThHeaderContainer>
          <HeaderArrowBackIcon onPress={() => navigation.pop(2)} />
          <ThTextInput
            style={{ marginLeft: 12 }}
            value={searchInput}
            onChangeText={setSearchInput}
            autoFocus={false}
            onPress={() => {
              navigation.navigate("SearchScreen", { search: searchInput });
            }}
            setClearButton={() => {
              setSearchInput("");
              navigation.navigate("SearchScreen", { search: "" });
            }}
          />
          <ThView style={styles.headerRightContainer}>
            <HeaderMicIcon />
            <HeaderShareScreenIcon
              onPress={() => {
                setIsShareScreenModalVisible(true);
              }}
            />
            <HeaderDotVerticalIcon
              onPress={() => {
                setIsSearchResultScreenHeaderDotVerticalModalVisible(true);
              }}
            />
          </ThView>
        </ThHeaderContainer>

        <ThFlatList
          data={searchVideos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <FlatListVideoItem
                navigation={navigation}
                video={item}
                query={searchInput}
                autoPlayVideoId={item.id === autoPlayVideoId}
              />
            );
          }}
          onViewableItemsChanged={
            //useRef for same reference each render, called whenever visible items changes (scrolled) & get the first visible item
            useRef(({ viewableItems }) => {
              if (viewableItems.length > 0) {
                setAutoPlayVideoId(viewableItems[0].item.id);
              }
            }).current
          }
          viewabilityConfig={
            //useRef for same reference each render, threshold of item in the screen to be count as visible
            useRef({
              viewAreaCoveragePercentThreshold: 50,
            }).current
          }
        />
      </ThView>
    </>
  );
}
