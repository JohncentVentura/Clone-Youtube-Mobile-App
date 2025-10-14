import { Pressable, View } from "react-native";
import Modal from "react-native-modal";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext";
import {
  DontRecommendChannelIcon,
  EyeInvisbleIcon,
  InformationIcon,
  NotificationsOffIcon,
  NotInterestedIcon,
  PlayNextInQueueIcon,
  ReportIcon,
  SaveIcon,
  SaveToWatchLaterIcon,
  ShareIcon,
  ShareScreenIcon,
} from "./IconComponents";
import { ThText } from "./ThemedComponents";

/******************************SwipeDownModal Components******************************/
function SwipeDownModal({ isVisible, setIsVisible, items = [], children }) {
  const { colors } = useTheme();
  const modalBorderRadius = 12;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)} //Modal backdrop area
      onRequestClose={() => setIsVisible(false)} //Android back button
      onSwipeComplete={() => setIsVisible(false)} //When swiped down
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{
        margin: 10,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderRadius: modalBorderRadius,
          width: "100%",
          backgroundColor: colors.bg,
        }}
      >
        {/*Swipe Bar*/}
        <View
          style={{
            marginVertical: 8,
            borderRadius: 12,
            width: 42,
            height: 4,
            backgroundColor: colors.borderSecondary,
            alignSelf: "center",
          }}
        />
        {children}
        {items.map((item, index) => {
          return (
            <Pressable
              key={index + item.name}
              onPress={item.onPress}
              style={({ pressed }) => [
                {
                  borderBottomLeftRadius:
                    index === items.length - 1 ? modalBorderRadius : 0,
                  borderBottomRightRadius:
                    index === items.length - 1 ? modalBorderRadius : 0,
                  //children means this modal has a header
                  paddingLeft: children ? 30 : 20,
                  paddingVertical: 12,
                  backgroundColor: pressed
                    ? colors.bgInteractive
                    : "transparent",
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              {item.icon ? <item.icon /> : null}
              <ThText style={{ marginLeft: 24, flexShrink: 1 }}>
                {item.name}
              </ThText>
            </Pressable>
          );
        })}
      </View>
    </Modal>
  );
}

export function FlatListVideoItemModal({ isVisible, setIsVisible }) {
  const modalItems = [
    {
      name: "Play Next In Queue",
      icon: PlayNextInQueueIcon,
      onPress: () => console.log("Play Next In Queue pressed"),
    },
    {
      name: "Save to Watch later",
      icon: SaveToWatchLaterIcon,
      onPress: () => console.log(this.name + " pressed"),
      onPress: () => console.log("Save to Watch later pressed"),
    },
    {
      name: "Save to playlist",
      icon: SaveIcon,
      onPress: () => console.log("Save to playlist pressed"),
    },
    {
      name: "Share",
      icon: ShareIcon,
      onPress: () => console.log("Share pressed"),
    },
    {
      name: "Not Interested",
      icon: NotInterestedIcon,
      onPress: () => console.log("Not Interested pressed"),
    },
    {
      name: "Don't recommend channel",
      icon: DontRecommendChannelIcon,
      onPress: () => console.log("Don't recommend pressed"),
    },
    {
      name: "Report",
      icon: ReportIcon,
      onPress: () => console.log("Report pressed"),
    },
  ];

  return (
    <SwipeDownModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    />
  );
}

export function ShareScreenModal({ isVisible, setIsVisible }) {
  const { fontSizes } = useTheme();
  const modalItems = [
    {
      name: "Link with TV code",
      icon: ShareScreenIcon,
      onPress: () => console.log("Link with TV code pressed"),
    },
    {
      name: "Learn More",
      icon: InformationIcon,
      onPress: () => console.log("Learn More pressed"),
    },
  ];

  return (
    <SwipeDownModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    >
      <ThText
        style={{
          marginLeft: 12,
          marginVertical: 6,
          fontSize: fontSizes.sm,
        }}
      >
        Select a device
      </ThText>
    </SwipeDownModal>
  );
}

export function NotificationsItemModal({ isVisible, setIsVisible }) {
  const modalItems = [
    {
      name: "Save to Watch later",
      icon: SaveToWatchLaterIcon,
      onPress: () => console.log("Save to Watch later pressed"),
    },
    {
      name: "Hide this notification",
      icon: EyeInvisbleIcon,
      onPress: () => console.log("Hide this notification pressed"),
    },
    {
      name: "Turn off all from this channel",
      icon: NotificationsOffIcon,
      onPress: () => console.log("Turn off all from this channel pressed"),
    },
    {
      name: "Turn off all recommendation notifications",
      icon: NotificationsOffIcon,
      onPress: () =>
        console.log("Turn off all recommendation notifications pressed"),
    },
  ];

  return (
    <SwipeDownModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    />
  );
}

/******************************TopRightModal Components******************************/
function TopRightModal({ isVisible, setIsVisible, items = [] }) {
  const { colors } = useTheme();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)} //Modal backdrop area
      onRequestClose={() => setIsVisible(false)} //Android back button
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      style={{
        margin: 10,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
      }}
    >
      <View style={{ backgroundColor: colors.bg }}>
        {items.map((item, index) => {
          return (
            <Pressable
              key={index + item.name}
              onPress={item.onPress}
              style={({ pressed }) => ({
                paddingHorizontal: 14,
                paddingVertical: 12,
                backgroundColor: pressed ? colors.bgInteractive : "transparent",
              })}
            >
              <ThText style={{ flexShrink: 1 }}>{item.name}</ThText>
            </Pressable>
          );
        })}
      </View>
    </Modal>
  );
}

export function NotificationsHeaderModal({ isVisible, setIsVisible }) {
  const modalItems = [
    {
      name: "Settings",
      onPress: () => console.log("Settings pressed"),
    },
    {
      name: "Watch on TV",
      onPress: () => console.log("Watch on TV pressed"),
    },
    {
      name: "Terms & privacy policy",
      onPress: () => console.log("Terms & privacy policy pressed"),
    },
    {
      name: "Help & feedback",
      onPress: () => console.log("Help & feedback pressed"),
    },
  ];

  return (
    <TopRightModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    />
  );
}

export function ChannelHeaderModal({ isVisible, setIsVisible }) {
  const modalItems = [
    {
      name: "Share",
      onPress: () => console.log("Share pressed"),
    },
    {
      name: "Report user",
      onPress: () => console.log("Report user pressed"),
    },
    {
      name: "Settings",
      onPress: () => console.log("Settings pressed"),
    },
    {
      name: "Watch on TV",
      onPress: () => console.log("Watch on TV pressed"),
    },
    {
      name: "Terms & privacy policy",
      onPress: () => console.log("Terms & privacy policy pressed"),
    },
    {
      name: "Help & feedback",
      onPress: () => console.log("Help & feedback pressed"),
    },
  ];

  return (
    <TopRightModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    />
  );
}

export function SearchResultHeaderModal({ isVisible, setIsVisible }) {
  const modalItems = [
    {
      name: "Search filters",
      onPress: () => console.log("Search filters pressed"),
    },
    {
      name: "Help & feedback",
      onPress: () => console.log("Help & feedback pressed"),
    },
  ];

  return (
    <TopRightModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    />
  );
}

/******************************QuestionModal Components******************************/
function QuestionModal({ isVisible, setIsVisible, children }) {
  const { colors } = useTheme();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)} //Modal backdrop area
      onRequestClose={() => setIsVisible(false)} //Android back button
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{
        margin: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          padding: 24,
          width: "80%",
          backgroundColor: colors.bg,
        }}
      >
        {children}
      </View>
    </Modal>
  );
}

export function RemoveSearchItemModal({ isVisible, setIsVisible }) {
  const { colors, fontSizes } = useTheme();
  const { removingSearchItem, setRemovingSearchItem, removeSearchHistoryItem } =
    useSearch();

  return (
    <QuestionModal isVisible={isVisible} setIsVisible={setIsVisible}>
      <ThText
        style={{
          fontSize: fontSizes.xl,
          fontWeight: "medium",
        }}
      >
        {removingSearchItem.text}
      </ThText>
      <ThText style={{ marginTop: 6 }}>Remove from search history?</ThText>
      <View
        style={{
          marginTop: 48,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => setIsVisible(false)}>
          <ThText style={{ color: colors.primary }}>Cancel</ThText>
        </Pressable>
        <Pressable
          style={{ marginLeft: 48 }}
          onPress={() => {
            removeSearchHistoryItem(removingSearchItem.text);
            setRemovingSearchItem("");
            setIsVisible(false);
          }}
        >
          <ThText style={{ color: colors.primary }}>Remove</ThText>
        </Pressable>
      </View>
    </QuestionModal>
  );
}

export function ClearSearchHistoryModal({ isVisible, setIsVisible }) {
  const { colors } = useTheme();
  const { clearSearchHistory } = useSearch();

  return (
    <QuestionModal isVisible={isVisible} setIsVisible={setIsVisible}>
      <ThText style={{ fontWeight: "medium" }}>
        Clear all search history?
      </ThText>
      <View
        style={{
          marginTop: 48,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => setIsVisible(false)}>
          <ThText style={{ color: colors.primary }}>Cancel</ThText>
        </Pressable>
        <Pressable
          style={{ marginLeft: 48 }}
          onPress={() => {
            clearSearchHistory();
            setIsVisible(false);
          }}
        >
          <ThText style={{ color: colors.primary }}>Clear</ThText>
        </Pressable>
      </View>
    </QuestionModal>
  );
}
