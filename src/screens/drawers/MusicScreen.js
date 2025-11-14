import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import {
  MusicTrackCard,
  VideoHorizontalPreviewCard,
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
  LearningIcon,
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
import { MainVideoView } from "../../components/VideoComponents";
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
  const [carouselMusicVideos, setCarouselMusicVideos] = useState([]);
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
  const [musicGenrePictures, setMusicGenrePictures] = useState([]);
  const [weeklyMusicVideos, setWeeklyMusicVideos] = useState([]);
  let todaysMusicVideos = [
    {
      query: "Hit Music",
      gradientColor: ["rgba(142, 213, 214, 1)", "rgba(101, 62, 120, 1)"],
      title: "The Hit List",
      description: "The home of today's biggest and hottest hits.",
      tracks: 6,
    },
    {
      query: "Popular Music",
      gradientColor: ["rgba(96, 171, 204, 1)", "rgba(99, 95, 58, 1)"],
      title: "Pop Certified",
      description: "Today's biggest and best pop songs.",
      tracks: 10,
    },
    {
      query: "Hip-hop Music",
      gradientColor: ["rgba(87, 29, 99, 1)", "rgba(111, 70, 177, 1)"],
      title: "On Everything: Today's Hip-Hop Hits",
      description:
        "The hottest hip-hop hits tracks out now... and that's on everything.",
      tracks: 8,
    },
    {
      query: "Latin Music",
      gradientColor: ["rgba(170, 215, 210, 1)", "rgba(50, 42, 32, 1)"],
      title: "Latin Now",
      description: "Today's biggest Latin hits.",
      tracks: 8,
    },
  ];
  const [todaysMusicVideoPictures, setTodaysMusicVideoPictures] = useState([]);
  const [musicChannel, setMusicChannel] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query: "Music",
    queryResults: 5,
    setVideos: setCarouselMusicVideos,
    setIsLoading,
  });
  useSetImageData({
    query: "Music Genres",
    queryResults: 4,
    setData: setMusicGenrePictures,
    setIsLoading,
  });
  useSetVideoData({
    query: "Weekly Music",
    queryResults: 6,
    setVideos: setWeeklyMusicVideos,
    setIsLoading,
  });
  useSetImageData({
    query: "Todays Music",
    queryResults: 4,
    setData: setTodaysMusicVideoPictures,
    setIsLoading,
  });

  useEffect(() => {
    if (carouselMusicVideos.length > 0 && carouselMusicVideos[0]) {
      setMusicChannel(carouselMusicVideos[carouselMusicVideos.length - 1]);
    }
  }, [carouselMusicVideos]);

  return (
    <ScreenScrollView isLoading={isLoading} ref={scrollToTopRef}>
      <MusicCarousel
        musicVideos={carouselMusicVideos}
        navigation={navigation}
      />
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
      {weeklyMusicVideos.map((videoData, index) => {
        return (
          <VideoHorizontalPreviewCard
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
          Today's Biggest Hits
        </BaseText>
      </View>
      {todaysMusicVideos.map((musicVideo, index) => {
        return (
          <MusicTrackCard
            key={index}
            source={todaysMusicVideoPictures[index]?.picture}
            musicGenre={musicVideo}
            onPress={() =>
              navigation.navigate(navPaths.musicTrackScreen, {
                query: musicVideo.query,
                gradientColor: musicVideo.gradientColor,
                title: musicVideo.title,
                description: musicVideo.description,
                tracks: musicVideo.tracks,
              })
            }
          />
        );
      })}
    </ScreenScrollView>
  );
}

function MusicCarousel({ style, musicVideos, navigation }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const offset = 12;

  return (
    <View
      style={[
        {
          width: screenWidth,
          height: 425,
        },
        style,
      ]}
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
        renderItem={({ item, index }) => (
          <>
            <Pressable
              style={{ backgroundColor: ctxColors.black }}
              onPress={() =>
                navigation.navigate(navPaths.mainVideoScreen, {
                  query: item.title,
                  videoData: item,
                })
              }
            >
              <MainVideoView
                style={{ width: screenWidth, height: "100%" }}
                videoData={item}
                autoPlayVideoId={currentIndex === index && item.id}
              />
            </Pressable>
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
