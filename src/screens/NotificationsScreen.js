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
              color: colors.textGray,
            },
          ]}
        >
          This week
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
              marginBottom: 6,
              fontSize: fontSizes.sm,
              color: colors.textGray,
            },
          ]}
        >
          Old
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
          backgroundColor: pressed ? colors.bgGray : colors.bg,
          opacity: 1,
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
          },
        ]}
      >
        <NotificationsScreenProfileImage
          style={{ marginTop: 4, marginLeft: 4 }}
          source={{
            uri: video.video_pictures[0].picture,
          }}
        />
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
          <ThText style={{ fontSize: fontSizes.xs, color: colors.textGray }}>
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
        <ThPressable
          style={{ backgroundColor: "transparent" }}
          onPress={() => {
            setVisible(true);
          }}
        >
          <DotVerticalIcon style={{ marginLeft: 4 }} size={iconSizes.sm} />
        </ThPressable>
      </ThView>
    </ThPressable>
  );
}
