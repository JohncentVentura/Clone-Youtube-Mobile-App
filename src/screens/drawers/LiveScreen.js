import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
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
  LiveIcon,
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
  CommentsProfileSmallImage,
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

export default function LiveScreen({ navigation }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const scrollToTopRef = useRef(null);
  const [carouselLiveVideos, setCarouselLiveVideos] = useState([]);
  const [liveNowVideos, setLiveNowVideos] = useState([]);
  const [liveNewsVideos, setLiveNewsVideos] = useState([]);
  const [liveGamingVideos, setLiveGamingVideos] = useState([]);
  const [liveSportsVideos, setLiveSportsVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query: "Shows",
    queryResults: 8,
    setVideos: setCarouselLiveVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Live",
    queryResults: 4,
    setVideos: setLiveNowVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Live News",
    queryResults: 4,
    setVideos: setLiveNewsVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Live Gaming",
    queryResults: 4,
    setVideos: setLiveGamingVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Live Sports",
    queryResults: 4,
    setVideos: setLiveSportsVideos,
    setIsLoading,
  });

  return (
    <ScreenScrollView isLoading={isLoading} ref={scrollToTopRef}>
      <View
        style={[
          { flexDirection: "row", alignItems: "center" },
          styles.screenPadHorizontal,
        ]}
      >
        <View
          style={{
            borderRadius: 99,
            padding: 10,
            backgroundColor: ctxColors.primary,
          }}
        >
          <LiveIcon size={ctxIconSizes.xl2} color={ctxColors.white} />
        </View>
        <BaseText
          style={{
            marginLeft: 10,
            fontSize: ctxFontSizes.xl2,
            fontWeight: "bold",
          }}
        >
          Live
        </BaseText>
      </View>
      <LiveCarousel
        style={{ marginTop: 8 }}
        carouselLiveVideos={carouselLiveVideos}
        navigation={navigation}
      />

      <View
        style={[
          {
            marginTop: 32,
            marginBottom: 4,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText
          style={{
            fontSize: ctxFontSizes.lg,
            fontWeight: "bold",
          }}
        >
          Live Now
        </BaseText>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.xs }}>View All</BaseText>
        </OutlinedButton>
      </View>
      {liveNowVideos.map((videoData, index) => {
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
          {
            marginTop: 32,
            marginBottom: 4,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText
          style={{
            fontSize: ctxFontSizes.lg,
            fontWeight: "bold",
          }}
        >
          Live Now - News
        </BaseText>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.xs }}>View All</BaseText>
        </OutlinedButton>
      </View>
      {liveNewsVideos.map((videoData, index) => {
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
          {
            marginTop: 32,
            marginBottom: 4,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText
          style={{
            fontSize: ctxFontSizes.lg,
            fontWeight: "bold",
          }}
        >
          Live Now - Gaming
        </BaseText>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.xs }}>View All</BaseText>
        </OutlinedButton>
      </View>
      {liveGamingVideos.map((videoData, index) => {
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
          {
            marginTop: 32,
            marginBottom: 4,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText
          style={{
            fontSize: ctxFontSizes.lg,
            fontWeight: "bold",
          }}
        >
          Live Now - Sports
        </BaseText>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.xs }}>View All</BaseText>
        </OutlinedButton>
      </View>
      {liveSportsVideos.map((videoData, index) => {
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
    </ScreenScrollView>
  );
}

function LiveCarousel({ style, carouselLiveVideos, navigation }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const offset = "25%";

  return (
    <View
      style={[
        {
          width: screenWidth,
          height: 400,
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
        data={carouselLiveVideos}
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
              style={{ borderRadius: 8, width: screenWidth, height: "100%" }}
              resizeMode="stretch"
              source={{ uri: item.picture }}
            />
            <View
              style={{
                position: "absolute",
                top: "20%",
                left: offset,
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BaseText
                style={{
                  fontSize: ctxFontSizes.xl2,
                  fontWeight: "bold",
                  color: ctxColors.white,
                  textAlign: "center",
                }}
              >
                {item.title}
              </BaseText>
              <View
                style={{
                  marginTop: 16,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CommentsProfileSmallImage
                  style={{
                    borderWidth: 1,
                    borderRadius: 99,
                    borderColor: ctxColors.white,
                  }}
                  source={{ uri: item.picture }}
                />
                <BaseText
                  style={{
                    marginLeft: 8,
                    fontSize: ctxFontSizes.sm,
                    color: ctxColors.white,
                  }}
                >
                  {item.channelName}
                </BaseText>
                <IconLive style={{ marginLeft: 8 }} />
              </View>
              <BaseText
                style={{
                  marginTop: 8,
                  fontSize: ctxFontSizes.sm,
                  color: ctxColors.white,
                }}
              >
                {item.channelSubscribers} Watching
              </BaseText>
              <MinimizingButton
                style={[
                  { marginTop: 16, backgroundColor: ctxColors.white },
                  styles.baseButton,
                ]}
                onPress={() =>
                  navigation.navigate(navPaths.mainVideoScreen, {
                    query: item.title,
                    videoData: item,
                  })
                }
              >
                <BaseText
                  style={{
                    fontWeight: "medium",
                    color: ctxColors.black,
                  }}
                >
                  Watch Live
                </BaseText>
              </MinimizingButton>
            </View>
          </>
        )}
      />

      {/*Dot indicator */}
      <View
        style={{
          position: "absolute",
          left: "32.5%",
          bottom: "5%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {carouselLiveVideos.map((_, index) => (
          <View
            key={index}
            style={{
              marginHorizontal: 2,
              borderRadius: 99,
              width: 12,
              height: 12,
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

function IconLive({ style }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  return (
    <View
      style={[
        {
          borderRadius: 4,
          padding: 2,
          backgroundColor: ctxColors.primary,
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
    >
      <LiveIcon size={ctxIconSizes.xs2} color={ctxColors.white} />
      <BaseText
        style={{
          marginLeft: 4,
          fontSize: ctxFontSizes.xs,
          color: ctxColors.white,
        }}
      >
        Live
      </BaseText>
    </View>
  );
}
