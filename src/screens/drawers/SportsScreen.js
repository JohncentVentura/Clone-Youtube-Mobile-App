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
  SportsVideoCard,
} from "../../components/CardsComponents";
import {
  DrawerDivider,
  ColumnScrollView,
  LinearGradientView,
  RowScrollView,
  ScreenScrollView,
  MainVideoViewRenderItem,
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

export default function SportsScreen({ navigation }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const scrollToTopRef = useRef(null);
  const [carouselSportsVideos, setCarouselSportsVideos] = useState([]);
  const [trendingSportsVideos, setTrendingSportsVideos] = useState([]);
  const [highlightsSportsVideos, setHighlightsSportsVideos] = useState([]);
  const [mainSportsVideos, setMainSportsVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query: "Sports Today",
    queryResults: 5,
    setVideos: setCarouselSportsVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Trending Sports",
    queryResults: 5,
    setVideos: setTrendingSportsVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Highlights",
    queryResults: 5,
    setVideos: setHighlightsSportsVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Main Sports",
    queryResults: 3,
    setVideos: setMainSportsVideos,
    setIsLoading,
  });

  return (
    <ScreenScrollView isLoading={isLoading} ref={scrollToTopRef}>
      <SportsCarousel
        carouselSportsVideos={carouselSportsVideos}
        navigation={navigation}
      />
      <View
        style={[
          {
            marginVertical: 12,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <View>
          <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
            Trending
          </BaseText>
        </View>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.sm }}>View All</BaseText>
        </OutlinedButton>
      </View>
      <RowScrollView>
        {trendingSportsVideos.map((videoData, index) => (
          <SportsVideoCard
            key={index + videoData.id}
            style={{
              marginLeft: 8,
              marginRight: index === trendingSportsVideos.length - 1 ? 8 : 0,
            }}
            videoData={videoData}
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData,
              })
            }
          />
        ))}
      </RowScrollView>
      <DrawerDivider />
      <View
        style={[
          {
            marginVertical: 12,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <View>
          <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
            Highlights
          </BaseText>
        </View>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.sm }}>View All</BaseText>
        </OutlinedButton>
      </View>
      <RowScrollView style={{ marginBottom: 12 }}>
        {highlightsSportsVideos.map((videoData, index) => (
          <SportsVideoCard
            key={index + videoData.id}
            style={{
              marginLeft: 8,
              marginRight: index === highlightsSportsVideos.length - 1 ? 8 : 0,
            }}
            videoData={videoData}
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData,
              })
            }
          />
        ))}
      </RowScrollView>
      {mainSportsVideos.map((videoData, index) => (
        <MainVideoViewRenderItem
          key={index + videoData.id}
          style={{width: "100%"}}
          item={videoData}
          navigation={navigation}
          query={videoData.title}
          isAutoPlayingVideo={false}
        />
      ))}
    </ScreenScrollView>
  );
}

function SportsCarousel({ style, carouselSportsVideos, navigation }) {
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
        data={carouselSportsVideos}
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
                {shortenText(item.title, 34)}
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
        {carouselSportsVideos.map((_, index) => (
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
