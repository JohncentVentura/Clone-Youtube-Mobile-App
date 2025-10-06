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
  ThFlatList,
  ThTextInput,
  ThView,
  ThTextInputCloseButton,
} from "../components/ThemedComponents";
import { FlatListVideoItem } from "../components/VideoComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import { showMainBottomTabBar } from "../utils/utils";
import { ShareScreenModal } from "../components/ModalComponents";

export default function SearchResultScreen({ navigation, route }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { search } = route.params;
  const [searchInput, setSearchInput] = useState(search);
  const [searchVideos, setSearchVideos] = useState([]);
  const [autoPlayVideoId, setAutoPlayVideoId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      <ShareScreenModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />

      <ThView style={styles.screenContainer}>
        {/*Header*/}
        <ThView
          style={{
            marginTop: insets.top + 12,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <HeaderArrowBackIcon onPress={() => navigation.pop(2)} />
          <ThView style={{ marginLeft: 14, flex: 1 }}>
            <ThTextInput
              value={searchInput}
              onChangeText={setSearchInput}
              onPress={() => {
                navigation.navigate("SearchScreen", { search: searchInput });
              }}
            />
            <ThTextInputCloseButton
              onPress={() =>
                navigation.navigate("SearchScreen", { search: "" })
              }
            />
          </ThView>
          <ThView style={styles.headerRightIconsContainer}>
            <HeaderMicIcon />
            <HeaderShareScreenIcon setIsModalVisible={setIsModalVisible} />
            <HeaderDotVerticalIcon />
          </ThView>
        </ThView>

        {/*Searched Videos*/}
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
