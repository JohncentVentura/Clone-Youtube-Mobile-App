import { Pressable, View } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "../../context/ThemeContext";
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
} from "../IconComponents";
import { BaseText } from "../TextComponents";

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
        {/*Handle Bar*/}
        <View
          style={{
            marginVertical: 8,
            borderRadius: 99,
            width: 40,
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
              <BaseText style={{ marginLeft: 24, flexShrink: 1 }}>
                {item.name}
              </BaseText>
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
      <BaseText
        style={{
          marginLeft: 12,
          marginVertical: 6,
          fontSize: fontSizes.sm,
        }}
      >
        Select a device
      </BaseText>
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
