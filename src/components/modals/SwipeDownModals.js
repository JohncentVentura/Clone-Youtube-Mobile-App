import { View } from "react-native";
import Modal from "react-native-modal";
import { useThemeContext } from "../../context/ThemeContext";
import {
  DontRecommendChannelIcon,
  ExclamationCircleIcon,
  EyeInvisbleIcon,
  InformationIcon,
  NotificationsOffIcon,
  NotInterestedIcon,
  PlayNextInQueueIcon,
  QuestionCircleIcon,
  ReportIcon,
  SaveIcon,
  SaveToWatchLaterIcon,
  ShareIcon,
  ShareScreenIcon,
} from "../IconComponents";
import { BasePressable } from "../PressableComponents";
import { BaseText } from "../TextComponents";

export function SwipeDownModal({ style, isVisible, setIsVisible, children }) {
  const { ctxColors } = useThemeContext();
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
        style={[
          {
            borderRadius: modalBorderRadius,
            width: "100%",
            backgroundColor: ctxColors.bg,
          },
          style,
        ]}
      >
        {/*Handle Bar*/}
        <View
          style={{
            marginVertical: 8,
            borderRadius: 99,
            width: 40,
            height: 4,
            backgroundColor: ctxColors.borderSecondary,
            alignSelf: "center",
          }}
        />
        {children}
      </View>
    </Modal>
  );
}

function SwipeDownListModal({ isVisible, setIsVisible, items = [], children }) {
  const modalBorderRadius = 12;

  return (
    <SwipeDownModal isVisible={isVisible} setIsVisible={setIsVisible}>
      {children}
      {items.map((item, index) => {
        return (
          <BasePressable
            key={index + item.name}
            onPress={item.onPress}
            style={[
              {
                borderBottomLeftRadius:
                  index === items.length - 1 ? modalBorderRadius : 0,
                borderBottomRightRadius:
                  index === items.length - 1 ? modalBorderRadius : 0,
                //children means this modal has a header
                paddingLeft: children ? 30 : 20,
                paddingVertical: 12,
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            {item.icon ? <item.icon /> : null}
            <BaseText style={{ marginLeft: 24, flexShrink: 1 }}>
              {item.name}
            </BaseText>
          </BasePressable>
        );
      })}
    </SwipeDownModal>
  );
}

export function MainVideoItemModal({ isVisible, setIsVisible }) {
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
    <SwipeDownListModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    />
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
    <SwipeDownListModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    />
  );
}

export function ShareScreenModal({ isVisible, setIsVisible }) {
  const { ctxFontSizes } = useThemeContext();
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
    <SwipeDownListModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    >
      <BaseText
        style={{
          marginLeft: 12,
          marginVertical: 6,
          fontSize: ctxFontSizes.sm,
        }}
      >
        Select a device
      </BaseText>
    </SwipeDownListModal>
  );
}

export function HomeCommentsItemModal({ isVisible, setIsVisible }) {
  const modalItems = [
    {
      name: "Share",
      icon: ShareIcon,
      onPress: () => console.log("Share pressed"),
    },
    {
      name: "Report",
      icon: ReportIcon,
      onPress: () => console.log("Report pressed"),
    },
  ];

  return (
    <SwipeDownListModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    />
  );
}

export function HomeCommentsProfileItemModal({ isVisible, setIsVisible }) {
  const modalItems = [
    {
      name: "Learn more about this feature",
      icon: QuestionCircleIcon,
      onPress: () => console.log("Learn more about this feature pressed"),
    },
    {
      name: "Send feedback",
      icon: ExclamationCircleIcon,
      onPress: () => console.log("Send feedback pressed"),
    },
  ];

  return (
    <SwipeDownListModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    />
  );
}