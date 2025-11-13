import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import {
  MusicTrackCard,
  VideoHorizontalPreview,
} from "../../components/CardsComponents";
import {
  DrawerDivider,
  ColumnScrollView,
  LinearGradientView,
  RowScrollView,
  ScreenScrollView,
} from "../../components/ContainerComponents";
import {
  ActiveSubscriptionIcon,
  CourseIcon,
  MembershipIndividualIcon,
  MembershipFamilyIcon,
  PhoneSpeakerIcon,
  PhoneTextIcon,
  VideoIcon,
  YoutubeMusicIcon,
} from "../../components/IconComponents";
import {
  ChannelProfileImage,
  YoutubePremiumLogoImage,
} from "../../components/ImageComponents";
import {
  MinimizingButton,
  OutlinedButton,
  SubscribeButton,
} from "../../components/PressableComponents";
import { BaseText } from "../../components/TextComponents";
import { useThemeContext } from "../../context/ThemeContext";
import { useScrollToTopOnFocus } from "../../hooks/useScrollToTopOnFocus";
import { useSetImageData } from "../../hooks/useSetImageData";
import { useSetVideoData } from "../../hooks/useSetVideoData";
import { screenWidth, styles } from "../../styles/styles";
import { navPaths } from "../../utils/constants";
import { shortenText } from "../../utils/utils";

export default function MusicScreen({ navigation }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const scrollToTopRef = useRef(null);
  const [musicVideos, setMusicVideos] = useState([]);
  const [latestMusicVideos, setLatestMusicVideos] = useState([]);
  const [musicGenrePictures, setMusicGenrePictures] = useState([]);
  const [musicChannel, setMusicChannel] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let musicGenres = [
    {
      query: "Pop Music",
      gradientColor: ["rgba(104, 164, 204, 1)", "rgba(150, 136, 115, 1)"],
      title: "RELEASED",
      description:
        "The hottest new songs this week, served up fresh to you every friday",
      tracks: 12,
    },
    {
      query: "R&B Music",
      gradientColor: ["rgba(148, 112, 168, 1)", "rgba(146, 113, 69, 1)"],
      title: "The Short List",
      description: "Check out the biggest trending tracks on YouTube Shorts.",
      tracks: 9,
    },
    {
      query: "Country Music",
      gradientColor: ["rgba(67, 80, 91, 1)", "rgba(143, 104, 72, 1)"],
      title: "Pop Before It Breaks",
      description: "An essential preview of tomorrow's pop hits.",
      tracks: 10,
    },
    {
      query: "Rock Music",
      gradientColor: ["rgba(63, 84, 177, 1)", "rgba(49, 50, 66, 1)"],
      title: "Hashtag Hits",
      description:
        "Check out all the tracks that are buzzing right now on socials",
      tracks: 8,
    },
  ];

  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query: "Music",
    queryResults: 5,
    setVideos: setMusicVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Latest Music",
    queryResults: 6,
    setVideos: setLatestMusicVideos,
    setIsLoading,
  });
  useSetImageData({
    query: "Music Genres",
    queryResults: 4,
    setData: setMusicGenrePictures,
    setIsLoading,
  });

  useEffect(() => {
    if (musicVideos.length > 0 && musicVideos[0]) {
      setMusicChannel(musicVideos[musicVideos.length - 1]);
    }
  }, [musicVideos]);

  return (
    <ScreenScrollView isLoading={isLoading} ref={scrollToTopRef}>
      <MusicCarousel musicVideos={musicVideos} />
      <View style={styles.screenPadHorizontal}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ChannelProfileImage
            style={{ marginTop: 12 }}
            source={{ uri: musicChannel.picture }}
          />
          <View style={{ marginLeft: 12, fontWeight: "bold" }}>
            <BaseText style={{ fontSize: ctxFontSizes.xl, fontWeight: "bold" }}>
              Music
            </BaseText>
            <BaseText
              style={{
                marginTop: 2,
                fontSize: ctxFontSizes.xs,
                color: ctxColors.textSecondary,
              }}
            >
              {musicChannel.channelSubscribers} subscribers
            </BaseText>
          </View>
        </View>
        <View
          style={{ marginTop: 12, flexDirection: "row", alignItems: "center" }}
        >
          <SubscribeButton
            style={[{}, styles.halfWideButton]}
            fontSize={ctxFontSizes.base}
          />
          <OutlinedButton style={[{ marginLeft: 8 }, styles.halfWideButton]}>
            <YoutubeMusicIcon
              size={ctxIconSizes.sm}
              color={ctxColors.primary}
            />
            <BaseText style={{ marginLeft: 4, fontWeight: "medium" }}>
              YouTube Music
            </BaseText>
          </OutlinedButton>
        </View>
        <BaseText
          style={{
            marginTop: 32,
            marginBottom: 16,
            fontSize: ctxFontSizes.lg,
            fontWeight: "bold",
          }}
        >
          New & Trending Songs
        </BaseText>
      </View>
      {musicGenres.map((genre, index) => {
        return (
          <MusicTrackCard
            key={index}
            source={musicGenrePictures[index]?.picture}
            musicGenre={genre}
            onPress={() =>
              navigation.navigate(navPaths.musicTrackScreen, {
                query: genre.query,
                gradientColor: genre.gradientColor,
                title: genre.title,
                description: genre.description,
                tracks: genre.tracks,
              })
            }
          />
        );
      })}
      <View
        style={[
          { marginTop: 32, marginBottom: 16 },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText
          style={{
            fontSize: ctxFontSizes.lg,
            fontWeight: "bold",
          }}
        >
          New This Week
        </BaseText>
        <BaseText
          style={{ fontSize: ctxFontSizes.sm, color: ctxColors.textSecondary }}
        >
          The hottest videos of this week
        </BaseText>
      </View>
      {latestMusicVideos.map((videoData, index) => {
        return (
          <VideoHorizontalPreview
            key={index}
            videoData={videoData}
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData: videoData,
              })
            }
          />
        );
      })}
    </ScreenScrollView>
  );
}

function MusicCarousel({ musicVideos }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const offset = 12;

  return (
    <View
      style={{
        width: screenWidth,
        height: 425,
      }}
    >
      <FlatList
        horizontal
        pagingEnabled
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        windowSize={2}
        data={musicVideos}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(index);
        }}
        keyExtractor={(item, index) =>
          item.id ? String(item.id) : String(index)
        }
        renderItem={({ item }) => (
          <>
            <Image
              style={{ width: screenWidth, height: "100%" }}
              resizeMode="stretch"
              source={{ uri: item.picture }}
            />
            <View
              style={{
                position: "absolute",
                left: offset,
                bottom: offset + offset,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <BaseText
                  style={{
                    fontSize: ctxFontSizes.sm,
                    color: ctxColors.white,
                  }}
                >
                  {item.channelName} • {item.views} views • {item.uploadedDate}
                </BaseText>
              </View>
              <BaseText
                style={{
                  fontSize: ctxFontSizes.xl2,
                  fontWeight: "bold",
                  color: ctxColors.white,
                }}
              >
                {shortenText(item.title, 36)}
              </BaseText>
            </View>
          </>
        )}
      />

      {/*Dot indicator */}
      <View
        style={{
          position: "absolute",
          bottom: offset,
          right: offset,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {musicVideos.map((_, index) => (
          <View
            key={index}
            style={{
              marginHorizontal: 2,
              borderRadius: 99,
              width: 4,
              height: 4,
              backgroundColor:
                currentIndex === index
                  ? ctxColors.white
                  : ctxColors.transparentWhite,
            }}
          />
        ))}
      </View>
    </View>
  );
}
