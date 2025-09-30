import {
  ChannelScreenCoverImage,
  ChannelScreenProfileImage,
} from "../components/ImageComponents";
import { ThPressable, ThText, ThView } from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import {
  getPexelsAtUserName,
  getPexelsUrlToTitle,
  roundOffNumber,
} from "../utils/utils";

export default function ChannelScreen({ route }) {
  const { colors, fontSizes } = useTheme();
  const { video, query } = route.params;

  return (
    <ThView style={styles.screenContainer}>
      <ThView style={styles.paddedHorizontalContainer}>
        <ChannelScreenCoverImage
          style={{ marginBottom: 16 }}
          source={{ uri: video.video_pictures[0].picture }}
        />
        <ThView
          style={{
            marginBottom: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ThPressable
            style={{
              height: "100%",
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
            onPress={() => {
              console.log("ChannelScreenProfileImage pressed");
            }}
          >
            <ChannelScreenProfileImage
              source={{ uri: video.video_pictures[0].picture }}
            />
          </ThPressable>
          <ThView style={{ flex: 4, marginLeft: 8, marginBottom: 6 }}>
            <ThText
              style={{
                marginBottom: 4,
                fontSize: fontSizes.xl2,
                fontWeight: "bold",
              }}
            >
              {/*Channel Name*/}
              {video.user.name}
            </ThText>
            <ThText
              style={{
                marginBottom: 4,
                fontSize: fontSizes.xs,
                fontWeight: "medium",
              }}
            >
              {/*Channel Name Tag*/}@{getPexelsAtUserName(video.user.url)}
            </ThText>
            <ThText
              style={{
                color: colors.textMuted,
                fontSize: fontSizes.xs,
              }}
            >
              {/*Number of subscribers • Number of uploaded videos*/}
              {roundOffNumber(video.user.id)} subscribers • {video.duration}{" "}
              videos
            </ThText>
          </ThView>
        </ThView>
        <ThText
          style={{
            marginBottom: 12,
            color: colors.textMuted,
            fontSize: fontSizes.xs,
          }}
        >
          {/*Channel description*/}
          {getPexelsUrlToTitle(video.url)}
          {getPexelsUrlToTitle(video.url)}
          {getPexelsUrlToTitle(video.url)}
          <ThText
            style={{
              fontWeight: "medium",
              fontSize: fontSizes.xs,
            }}
            onPress={() => {
              console.log("...more press");
            }}
          >
            ...more
          </ThText>
        </ThText>
        <ThPressable
          style={[styles.wideButton, { backgroundColor: colors.bgAccent }]}
          onPress={() => console.log("Subscribe pressed")}
        >
          <ThText style={{ color: colors.textAccent, fontWeight: "medium" }}>
            Subscribe
          </ThText>
        </ThPressable>
      </ThView>
    </ThView>
  );
}
