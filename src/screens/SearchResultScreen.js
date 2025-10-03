import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchPexelsData } from "../api/pexelsAPI";
import {
  HeaderArrowBack,
  HeaderDotVertical,
  HeaderMic,
  HeaderShareScreen,
} from "../components/HeaderComponents";
import {
  ThFlatList,
  ThTextInput,
  ThView,
} from "../components/ThemedComponents";
import { FlatListVideoItem } from "../components/VideoComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import { showMainBottomTabBar } from "../utils/utils";
import { ScreenShareModal } from "../components/ModalComponents";

export default function SearchResultScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { search } = route.params;
  const [searchVideos, setSearchVideos] = useState([]);
  const [autoPlayVideoId, setAutoPlayVideoId] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    (async () => {
      const data = await fetchPexelsData(search, 6, abortController.signal);
      if (isMounted) {
        setSearchVideos(data);
      }
    })();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [search]);

  showMainBottomTabBar(navigation, colors);

  return (
    <ThView style={styles.screenContainer}>
      <SearchVideoScreenHeader
        style={{ marginBottom: 16 }}
        navigation={navigation}
        search={search}
      />
      <ThFlatList
        data={searchVideos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <FlatListVideoItem
              navigation={navigation}
              video={item}
              query={search}
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
  );
}

function SearchVideoScreenHeader({ style, navigation, search }) {
  const insets = useSafeAreaInsets();
  const [newSearch, setNewSearch] = useState(search);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ScreenShareModal visible={visible} setVisible={setVisible} />

      <ThView
        style={[
          {
            marginTop: insets.top + 12,
            flexDirection: "row",
            alignItems: "center",
          },
          style,
        ]}
      >
        <HeaderArrowBack
          style={styles.headerLeftIcon}
          onPress={() => navigation.pop(2)}
        />

        <ThTextInput
          style={{ marginLeft: 12, flex: 1 }}
          value={newSearch}
          onChangeText={setNewSearch}
          onPress={() => {
            navigation.navigate("SearchScreen", { search: newSearch });
          }}
        />

        <ThView style={styles.headerRightIconsContainer}>
          <HeaderMic />
          <HeaderShareScreen setVisible={setVisible} />
          <HeaderDotVertical />
        </ThView>
      </ThView>
    </>
  );
}
