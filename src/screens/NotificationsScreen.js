import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { fetchPexelsData } from "../api/pexelsAPI";
import { AnimFadeRoundButton } from "../components/AnimatedComponents";
import { DotVerticalIcon } from "../components/IconComponents";
import {
  NotificationsScreenPreviewImage,
  NotificationsScreenProfileImage,
} from "../components/ImageComponents";
import { ThText } from "../components/ThemedComponents";
import { ColumnScrollView } from "components/UtilComponents";
import { useModal } from "../context/ModalContext";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export default function NotificationsScreen({ navigation }) {
  const { setIsNotificationsItemVisible } = useModal();
  const { colors, fontSizes } = useTheme();

  const [newVideoQuery, setNewVideoQuery] = useState("food");
  const [newVideos, setNewVideos] = useState([]);
  const [oldVideoQuery, setOldVideoQuery] = useState("sweets");
  const [oldVideos, setOldVideos] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    (async function () {
      const data = await fetchPexelsData(
        newVideoQuery,
        4,
        abortController.signal
      );
      if (isMounted) {
        setNewVideos(data);
      }
    })();

    (async function () {
      const data = await fetchPexelsData(oldVideoQuery, 4);
      if (isMounted) {
        setOldVideos(data);
      }
    })();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return (
    <>
      <ColumnScrollView
        style={[styles.screenContainer, { backgroundColor: colors.bg }]}
      >
        <ThText
          style={[
            styles.paddedHorizontalContainer,
            {
              marginBottom: 6,
              fontSize: fontSizes.sm,
              color: colors.textSecondary,
            },
          ]}
        >
          Foods
        </ThText>
        {newVideos.map((video) => (
          <NotificationItem
            key={video.id}
            navigation={navigation}
            video={video}
            query={newVideoQuery}
            setVisible={setIsNotificationsItemVisible}
          />
        ))}
        <ThText
          style={[
            styles.paddedHorizontalContainer,
            {
              marginVertical: 6,
              fontSize: fontSizes.sm,
              color: colors.textSecondary,
            },
          ]}
        >
          Desserts
        </ThText>
        {oldVideos.map((video) => (
          <NotificationItem
            key={video.id}
            navigation={navigation}
            video={video}
            query={oldVideoQuery}
            setVisible={setIsNotificationsItemVisible}
          />
        ))}
      </ColumnScrollView>
    </>
  );
}

function NotificationItem({ navigation, video, query, setVisible }) {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <Pressable
      key={video.id}
      style={({ pressed }) => {
        return {
          paddingVertical: 10,
          backgroundColor: pressed ? colors.bgInteractive : colors.bg,
        };
      }}
      onPress={() => {
        navigation.push("MainVideoScreen", {
          video: video,
          query: query,
        });
      }}
    >
      <View
        style={[
          styles.paddedHorizontalContainer,
          {
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "flex-start",
          },
        ]}
      >
        <Pressable
          style={{
            marginLeft: 4,
            backgroundColor: "transparent",
          }}
          onPress={() => {
            navigation.navigate("ChannelScreen", {
              video: video,
              query: query,
            });
          }}
        >
          <NotificationsScreenProfileImage
            source={{
              uri: video.picture,
            }}
          />
        </Pressable>

        <View
          style={{
            marginLeft: 16,
            backgroundColor: "transparent",
            flexShrink: 1,
          }}
        >
          <ThText style={{ fontSize: fontSizes.sm, fontWeight: "bold" }}>
            {video.channelName}
          </ThText>
          <ThText style={{ fontSize: fontSizes.sm }}>
            {video.description}
          </ThText>
          <ThText
            style={{ fontSize: fontSizes.xs, color: colors.textSecondary }}
          >
            {video.uploadedDate}
          </ThText>
        </View>

        <NotificationsScreenPreviewImage
          style={{ marginLeft: 12 }}
          source={{
            uri: video.picture,
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
