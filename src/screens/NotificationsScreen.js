import { useEffect, useState } from "react";
import { fetchPexelsData } from "../api/pexelsAPI";
import { DotVerticalIcon } from "../components/IconComponents";
import {
  NotificationsScreenPreviewImage,
  NotificationsScreenProfileImage,
} from "../components/ImageComponents";
import { NotificationsScreenDotVerticalModal } from "../components/ModalComponents";
import {
  ThPressable,
  ThScrollViewColumn,
  ThText,
  ThView,
  AnimFadeRoundButton,
} from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import {
  getPexelsUrlToTitle,
  getShortenText,
  randomTimeAgo,
} from "../utils/utils";

export default function NotificationsScreen({ navigation }) {
  const { colors, fontSizes } = useTheme();
  const [newVideoQuery, setNewVideoQuery] = useState("food");
  const [newVideos, setNewVideos] = useState([]);
  const [oldVideos, setOldVideos] = useState([]);
  const [oldVideoQuery, setOldVideoQuery] = useState("sweets");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async function () {
      const data = await fetchPexelsData(newVideoQuery, 4);
      setNewVideos(data);
    })();

    (async function () {
      const data = await fetchPexelsData(oldVideoQuery, 4);
      setOldVideos(data);
    })();
  }, []);

  return (
    <>
      <NotificationsScreenDotVerticalModal
        visible={visible}
        setVisible={setVisible}
      />

      <ThScrollViewColumn style={styles.screenContainer}>
        <ThText
          style={[
            styles.paddedHorizontalContainer,
            {
              marginBottom: 6,
              fontSize: fontSizes.sm,
              color: colors.textMuted,
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
            setVisible={setVisible}
          />
        ))}
        <ThText
          style={[
            styles.paddedHorizontalContainer,
            {
              marginVertical: 6,
              fontSize: fontSizes.sm,
              color: colors.textMuted,
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
            setVisible={setVisible}
          />
        ))}
      </ThScrollViewColumn>
    </>
  );
}

function NotificationItem({ navigation, video, query, setVisible }) {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <ThPressable
      key={video.id}
      style={({ pressed }) => {
        return {
          paddingVertical: 10,
          backgroundColor: pressed ? colors.bgMuted : colors.bg,
        };
      }}
      onPress={() => {
        navigation.push("MainVideoScreen", {
          video: video,
          query: query,
        });
      }}
    >
      <ThView
        style={[
          styles.paddedHorizontalContainer,
          {
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "flex-start",
          },
        ]}
      >
        <ThPressable
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
              uri: video.video_pictures[0].picture,
            }}
          />
        </ThPressable>

        <ThView
          style={{
            marginLeft: 16,
            backgroundColor: "transparent",
            flexShrink: 1,
          }}
        >
          <ThText style={{ fontSize: fontSizes.sm, fontWeight: "bold" }}>
            {/*Channel Name*/}
            {getPexelsUrlToTitle(video.url)}
          </ThText>
          <ThText style={{ fontSize: fontSizes.sm }}>
            {/*Description*/}
            {getShortenText(video.url, 40)}
          </ThText>
          <ThText style={{ fontSize: fontSizes.xs, color: colors.textMuted }}>
            {/*Uploaded Date*/}
            {randomTimeAgo(video.video_pictures[0].id)}
          </ThText>
        </ThView>

        <NotificationsScreenPreviewImage
          style={{ marginLeft: 12 }}
          source={{
            uri: video.video_pictures[0].picture,
          }}
        />

        <AnimFadeRoundButton
          style={{ marginLeft: 4, backgroundColor: "transparent" }}
          roundSize={2}
          onPress={() => {
            setVisible(true);
          }}
        >
          <DotVerticalIcon size={iconSizes.sm} />
        </AnimFadeRoundButton>
      </ThView>
    </ThPressable>
  );
}
