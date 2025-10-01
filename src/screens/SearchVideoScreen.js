import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchPexelsData } from "../api/pexelsAPI";
import {
  ArrowBackIcon,
  DotVerticalIcon,
  MicIcon,
  ShareScreenIcon,
} from "../components/IconComponents";
import {
  ThFlatList,
  ThTextInput,
  ThView,
  AnimFadeRoundButton,
} from "../components/ThemedComponents";
import { FlatListVideoItem } from "../components/VideoComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import { showMainBottomTabBar } from "../utils/utils";
import { ScreenShareModal } from "../components/ModalComponents";

export default function SearchVideoScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { search } = route.params;
  const [searchVideos, setSearchVideos] = useState([]);
  const [autoPlayVideoId, setAutoPlayVideoId] = useState(null);

  useEffect(() => {
    (async function () {
      const data = await fetchPexelsData(search, 4);
      setSearchVideos(data);
    })();
  }, [search]);

  showMainBottomTabBar(navigation, colors);

  return (
    <ThView style={styles.screenContainer}>
      <ThFlatList
        data={searchVideos}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <SearchVideoScreenHeader
            style={{ marginBottom: 16 }}
            navigation={navigation}
            search={search}
          />
        }
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
        <AnimFadeRoundButton
          style={styles.headerLeftIcon}
          onPress={() => navigation.pop(2)}
        >
          <ArrowBackIcon />
        </AnimFadeRoundButton>

        <ThTextInput
          style={{ marginLeft: 12, flex: 1 }}
          value={newSearch}
          onChangeText={setNewSearch}
          onPress={() => {
            navigation.push("SearchScreen", { search: newSearch });
          }}
        />
        
        <ThView style={styles.headerRightIconsContainer}>
          <AnimFadeRoundButton style={styles.headerRightIcon}>
            <MicIcon />
          </AnimFadeRoundButton>
          <AnimFadeRoundButton
            style={styles.headerRightIcon}
            onPress={() => setVisible(true)}
          >
            <ShareScreenIcon />
          </AnimFadeRoundButton>
          <AnimFadeRoundButton style={styles.headerRightIcon}>
            <DotVerticalIcon />
          </AnimFadeRoundButton>
        </ThView>
      </ThView>
    </>
  );
}
