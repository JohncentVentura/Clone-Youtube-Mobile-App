import Modal from "react-native-modal";
import { ThPressable, ThText, ThView } from "./ThemedComponents";
import {
  DontRecommendChannelIcon,
  EyeInvisbleIcon,
  InformationIcon,
  NotificationOffIcon,
  NotInterestedIcon,
  PlayNextInQueueIcon,
  ReportIcon,
  SaveIcon,
  SaveToWatchLaterIcon,
  ShareIcon,
  ShareScreenIcon,
} from "./IconComponents";
import { useTheme } from "../styles/ThemeContext";

/******************************SwipeDownModal Components******************************/
function SwipeDownModal({
  isModalVisible,
  setIsModalVisible,
  items = [],
  children,
}) {
  const { colors } = useTheme();

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)} //Modal backdrop area
      onRequestClose={() => setIsModalVisible(false)} //Android back button
      onSwipeComplete={() => setIsModalVisible(false)} //When swiped down
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
      <ThView
        style={{
          borderRadius: 12,
          width: "100%",
          backgroundColor: colors.bg,
        }}
      >
        {/*Swipe Bar*/}
        <ThView
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
            <ThPressable
              key={index + item.name}
              style={({ pressed }) => [
                {
                  borderBottomLeftRadius: index === items.length - 1 ? 12 : 0,
                  borderBottomRightRadius: index === items.length - 1 ? 12 : 0,
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
              onPress={item.onPress}
            >
              {item.icon ? <item.icon /> : null}
              <ThText style={{ marginLeft: 24, flexShrink: 1 }}>
                {item.name}
              </ThText>
            </ThPressable>
          );
        })}
      </ThView>
    </Modal>
  );
}

export function FlatListVideoItemModal({ isModalVisible, setIsModalVisible }) {
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
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      items={modalItems}
    />
  );
}

export function ShareScreenModal({ isModalVisible, setIsModalVisible }) {
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
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      items={modalItems}
    >
      <ThText
        style={{
          marginLeft: 12,
          marginTop: 6,
          marginBottom: 10,
          fontSize: fontSizes.sm,
        }}
      >
        Select a device
      </ThText>
    </SwipeDownModal>
  );
}

export function NotificationsScreenItemDotVerticalModal({
  isModalVisible,
  setIsModalVisible,
}) {
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
      icon: NotificationOffIcon,
      onPress: () => console.log("Turn off all from this channel pressed"),
    },
    {
      name: "Turn off all recommendation notifications",
      icon: NotificationOffIcon,
      onPress: () =>
        console.log("Turn off all recommendation notifications pressed"),
    },
  ];

  return (
    <SwipeDownModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      items={modalItems}
    />
  );
}

/******************************TopRightModal Components******************************/
function TopRightModal({ isModalVisible, setIsModalVisible, items = [] }) {
  const { colors } = useTheme();

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)} //Modal backdrop area
      onRequestClose={() => setIsModalVisible(false)} //Android back button
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      style={{
        margin: 10,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
      }}
    >
      <ThView style={{ backgroundColor: colors.bg }}>
        {items.map((item, index) => {
          return (
            <ThPressable
              key={index + item.name}
              style={({ pressed }) => ({
                paddingHorizontal: 14,
                paddingVertical: 12,
                backgroundColor: pressed ? colors.bgInteractive : "transparent",
              })}
              onPress={item.onPress}
            >
              <ThText style={{ flexShrink: 1 }}>{item.name}</ThText>
            </ThPressable>
          );
        })}
      </ThView>
    </Modal>
  );
}

export function NotificationsScreenHeaderDotVerticalModal({
  isModalVisible,
  setIsModalVisible,
}) {
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
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      items={modalItems}
    />
  );
}

export function ChannelScreenHeaderDotVerticalModal({
  isModalVisible,
  setIsModalVisible,
}) {
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
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      items={modalItems}
    />
  );
}

export function SearchResultScreenHeaderDotVerticalModal({
  isModalVisible,
  setIsModalVisible,
}) {
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
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      items={modalItems}
    />
  );
}

/******************************QuestionModal Components******************************/
function QuestionModal({ isModalVisible, setIsModalVisible, children }) {
  const { colors } = useTheme();

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)} //Modal backdrop area
      onRequestClose={() => setIsModalVisible(false)} //Android back button
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{
        margin: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThView
        style={{
          padding: 24,
          width: "80%",
          backgroundColor: colors.bg,
        }}
      >
        {children}
      </ThView>
    </Modal>
  );
}

export function RemoveSearchHistoryModal({
  isModalVisible,
  setIsModalVisible,
  removingItem,
  removeSearchHistoryItem,
}) {
  const { colors, fontSizes } = useTheme();

  if (!removingItem) return null;

  return (
    <QuestionModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
    >
      <ThText
        style={{
          marginBottom: 6,
          fontSize: fontSizes.xl,
          fontWeight: "medium",
        }}
      >
        {removingItem.text}
      </ThText>
      <ThText style={{ marginBottom: 46 }}>Remove from search history?</ThText>
      <ThView
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <ThPressable onPress={() => setIsModalVisible(false)}>
          <ThText style={{ color: colors.primary }}>Cancel</ThText>
        </ThPressable>
        <ThPressable
          style={{ marginLeft: 20 }}
          onPress={() => {
            removeSearchHistoryItem(removingItem.text);
            setIsModalVisible(false);
          }}
        >
          <ThText style={{ marginLeft: 22, color: colors.primary }}>
            Remove
          </ThText>
        </ThPressable>
      </ThView>
    </QuestionModal>
  );
}

export function ClearSearchHistoryModal({
  isModalVisible,
  setIsModalVisible,
  clearSearchHistory,
}) {
  const { colors } = useTheme();

  return (
    <QuestionModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
    >
      <ThText style={{ marginBottom: 46 }}>Clear all search history?</ThText>
      <ThView
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <ThPressable onPress={() => setIsModalVisible(false)}>
          <ThText style={{ color: colors.primary }}>Cancel</ThText>
        </ThPressable>
        <ThPressable
          style={{ marginLeft: 20, color: colors.primary }}
          onPress={() => {
            clearSearchHistory();
            setIsModalVisible(false);
          }}
        >
          <ThText style={{ marginLeft: 22, color: colors.primary }}>
            Clear
          </ThText>
        </ThPressable>
      </ThView>
    </QuestionModal>
  );
}
