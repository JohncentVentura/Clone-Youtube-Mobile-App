import { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { AnimFadeRoundButton } from "../components/AnimatedComponents";
import { DotVerticalIcon } from "../components/IconComponents";
import {
  NotificationsThumbnailImage,
  NotificationsProfileImage,
} from "../components/ImageComponents";
import { ColumnScrollView } from "../components/ScrollableComponents";
import { ThText } from "../components/ThemedComponents";
import { useModal } from "../context/ModalContext";
import { useTheme } from "../context/ThemeContext";
import { useSetPexelsDataVideos } from "../hooks/usePexelsData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

export default function NotificationsScreen({ navigation }) {
  const { setIsNotificationsItemVisible } = useModal();
  const { colors, fontSizes } = useTheme();
  const scrollToTopRef = useRef(null);
  const [newQuery, setNewQuery] = useState("food");
  const [newVideos, setNewVideos] = useState([]);
  const [oldQuery, setOldQuery] = useState("sweets");
  const [oldVideos, setOldVideos] = useState([]);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetPexelsDataVideos({
    query: newQuery,
    queryResults: 4,
    setVideos: setNewVideos,
  });
  useSetPexelsDataVideos({
    query: oldQuery,
    queryResults: 4,
    setVideos: setOldVideos,
  });

  return (
    <ColumnScrollView
      style={[styles.screenContainer, { backgroundColor: colors.bg }]}
      ref={scrollToTopRef}
    >
      <ThText
        style={[
          styles.screenPadLeft,
          {
            marginBottom: 6,
            fontSize: fontSizes.sm,
            color: colors.textSecondary,
          },
        ]}
      >
        New
      </ThText>
      {newVideos.map((item) => (
        <NotificationItem
          key={item.id}
          navigation={navigation}
          query={newQuery}
          videoData={item}
          setVisible={setIsNotificationsItemVisible}
        />
      ))}
      <ThText
        style={[
          styles.screenPadLeft,
          {
            marginVertical: 6,
            fontSize: fontSizes.sm,
            color: colors.textSecondary,
          },
        ]}
      >
        Old
      </ThText>
      {oldVideos.map((item) => (
        <NotificationItem
          key={item.id}
          navigation={navigation}
          query={oldQuery}
          videoData={item}
          setVisible={setIsNotificationsItemVisible}
        />
      ))}
    </ColumnScrollView>
  );
}

function NotificationItem({ navigation, query, videoData, setVisible }) {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => {
        return {
          paddingVertical: 10,
          backgroundColor: pressed ? colors.bgInteractive : "transparent",
        };
      }}
      onPress={() => {
        navigation.push("MainVideoScreen", {
          query: query,
          videoData: videoData,
        });
      }}
    >
      <View
        style={[
          styles.screenPadHorizontal,
          {
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
          },
        ]}
      >
        <NotificationsProfileImage
          style={{
            marginLeft: 4,
          }}
          source={{ uri: videoData.picture }}
          onPress={() => {
            navigation.navigate("ChannelScreen", {
              videoData: videoData,
              query: query,
            });
          }}
        />

        <View
          style={{
            marginLeft: 16,
            flexShrink: 1,
          }}
        >
          <ThText style={{ fontSize: fontSizes.sm, fontWeight: "bold" }}>
            {videoData.channelName}
          </ThText>
          <ThText style={{ fontSize: fontSizes.sm }}>
            {videoData.description}
          </ThText>
          <ThText
            style={{ fontSize: fontSizes.xs, color: colors.textSecondary }}
          >
            {videoData.uploadedDate}
          </ThText>
        </View>

        <NotificationsThumbnailImage
          style={{ marginLeft: 12 }}
          source={{ uri: videoData.picture }}
          onPress={() => {
            navigation.push("MainVideoScreen", {
              query: query,
              videoData: videoData,
            });
          }}
        />

        <AnimFadeRoundButton
          style={{ marginLeft: 4 }}
          roundSize={2}
          onPress={() => {
            setVisible(true);
          }}
        >
          <DotVerticalIcon size={iconSizes.sm} />
        </AnimFadeRoundButton>
      </View>
    </Pressable>
  );
}
