import { useIsFocused } from "@react-navigation/native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { AnimFadeRoundButton } from "./AnimatedComponents";
import { DotVerticalIcon } from "./IconComponents";
import { MainVideoScreenChannelImage } from "../components/ImageComponents";
import { ThText } from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { useModal } from "../context/ModalContext";
import { useTheme } from "../context/ThemeContext";

export function AutoPlayFlatList({ style, data, navigation, query, ...rest }) {
  const [autoPlayVideoId, setAutoPlayVideoId] = useState(null);

  return (
    <FlatList
      style={style}
      data={data}
      keyExtractor={(item, index) => index.toString() + item.id}
      renderItem={({ item }) => {
        return (
          <FlatListVideoItem
            navigation={navigation}
            video={item}
            query={query}
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
      {...rest}
    />
  );
}

export function FlatListVideoItem({
  style,
  navigation,
  video,
  query,
  autoPlayVideoId,
}) {
  const { setIsFlatListVideoItemVisible } = useModal();
  const { colors, fontSizes } = useTheme();

  return (
    <>
      <View style={[{ marginBottom: 28 }, { width: "100%" }, style]}>
        <Pressable
          style={{ marginBottom: 10, width: "100%" }}
          onPress={() => {
            navigation.push("MainVideoScreen", {
              video: video,
              query: query,
            });
          }}
        >
          <FlatListVideoView video={video} autoPlayVideoId={autoPlayVideoId} />
        </Pressable>
        <View
          style={[
            styles.paddedHorizontalContainer,
            {
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            },
          ]}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("ChannelScreen", {
                video: video,
                query: query,
              });
            }}
          >
            <MainVideoScreenChannelImage source={{ uri: video.picture }} />
          </Pressable>
          <View style={{ flexShrink: 1, marginLeft: 12 }}>
            <ThText
              style={{
                marginBottom: 4,
                fontSize: fontSizes.lg,
                fontWeight: "bold",
              }}
            >
              {video.title}
            </ThText>
            <ThText
              style={{ color: colors.textSecondary, fontSize: fontSizes.xs }}
            >
              {video.channelName} • {video.views} views • {video.uploadedDate}
            </ThText>
          </View>
          <AnimFadeRoundButton
            style={{ marginLeft: "auto" }}
            roundSize={4}
            onPress={() => setIsFlatListVideoItemVisible(true)}
          >
            <DotVerticalIcon />
          </AnimFadeRoundButton>
        </View>
      </View>
    </>
  );
}

export function FlatListVideoView({ style, video, autoPlayVideoId, ...rest }) {
  const isFocused = useIsFocused();

  const player = useVideoPlayer(video.video, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    if (!isFocused) {
      player.pause();
    } else if (autoPlayVideoId) {
      player.play();
    } else {
      player.pause();
    }

    return () => {
      try {
        player.dispose?.();
      } catch (e) {
        console.log("Player already released:", e.message);
      }
    };
  }, [isFocused, autoPlayVideoId]);

  return (
    <VideoView
      style={[styles.videoView, style]}
      resizeMode="cover"
      nativeControls={false}
      player={player}
      {...rest}
    />
  );
}

export function MainVideoView({ style, video, ...rest }) {
  const isFocused = useIsFocused();

  const player = useVideoPlayer(video.video, (player) => {
    player.loop = false;
  });

  useEffect(() => {
    if (isFocused) {
      player.play();
    } else {
      player.pause();
    }

    return () => {
      try {
        player.dispose?.();
      } catch (e) {
        console.log("Player already released:", e.message);
      }
    };
  }, [isFocused]);

  return (
    <VideoView
      style={[styles.videoView, style]}
      resizeMode="stretch"
      nativeControls={true}
      player={player}
      {...rest}
    />
  );
}
