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
  VideoVerticalPreviewCard,
} from "../../components/CardsComponents";
import {
  DrawerDivider,
  ColumnScrollView,
  LinearGradientView,
  RowScrollView,
  ScreenScrollView,
  MainVideoFlatList,
  MainVideoViewRenderItem,
} from "../../components/ContainerComponents";
import {
  ActiveSubscriptionIcon,
  LearningIcon,
  LiveIcon,
  MembershipIndividualIcon,
  MembershipFamilyIcon,
  NewsIcon,
  PhoneSpeakerIcon,
  PhoneTextIcon,
  VideoIcon,
  YoutubeMusicIcon,
  LikeIcon,
  DislikeIcon,
  ShareIcon,
  MessageTextIcon,
  DotVerticalIcon,
} from "../../components/IconComponents";
import {
  ChannelProfileImage,
  YoutubePremiumLogoImage,
  CommentsProfileSmallImage,
  NewsPostImage,
} from "../../components/ImageComponents";
import {
  BasePressable,
  MinimizingButton,
  OutlinedButton,
  RippleButton,
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

export default function NewsScreen({ navigation }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const scrollToTopRef = useRef(null);
  const [carouselNewsVideos, setCarouselNewsVideos] = useState([]);
  const [newsPosts, setNewsPosts] = useState([]);
  const [liveNewsVideos, setLiveNewsVideos] = useState([]);
  const [personalNewsVideos, setPersonalNewsVideos] = useState([]);
  const [carousel2NewsVideos, setCarousel2NewsVideos] = useState([]);
  const [oldNewsVideos, setOldNewsVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query: "News",
    queryResults: 4,
    setVideos: setCarouselNewsVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "News Posts",
    queryResults: 5,
    setVideos: setNewsPosts,
    setIsLoading,
  });
  useSetVideoData({
    query: "Live News",
    queryResults: 5,
    setVideos: setLiveNewsVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Personal News",
    queryResults: 5,
    setVideos: setPersonalNewsVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Weather News",
    queryResults: 4,
    setVideos: setCarousel2NewsVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Old News",
    queryResults: 5,
    setVideos: setOldNewsVideos,
    setIsLoading,
  });

  return (
    <ScreenScrollView isLoading={isLoading} ref={scrollToTopRef}>
      <LiveCarousel
        carouselNewsVideos={carouselNewsVideos}
        navigation={navigation}
      />
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
          <NewsIcon size={ctxIconSizes.xl2} color={ctxColors.white} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <BaseText style={{ fontWeight: "bold" }}>News about today</BaseText>
          <BaseText
            style={{
              fontSize: ctxFontSizes.xs,
              color: ctxColors.textSecondary,
            }}
          >
            {carouselNewsVideos[0]?.channelName} and {carouselNewsVideos.length}{" "}
            more • Updated {carouselNewsVideos[0]?.uploadedDate}
          </BaseText>
        </View>
      </View>
      <DrawerDivider style={{ marginVertical: 16, height: 6 }} />
      <View style={styles.screenPadHorizontal}>
        <BaseText style={{ fontSize: ctxFontSizes.xl, fontWeight: "bold" }}>
          Latest news post
        </BaseText>
        <RowScrollView style={{ marginTop: 8 }}>
          {newsPosts.map((videoData, index) => (
            <NewsPost
              key={index + videoData.id}
              style={{
                marginRight: index === newsPosts.length - 1 ? 0 : 12,
              }}
              navigation={navigation}
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
      </View>
      <DrawerDivider style={{ marginVertical: 16, height: 6 }} />
      <View>
        <BaseText
          style={[
            { fontSize: ctxFontSizes.xl, fontWeight: "bold" },
            styles.screenPadLeft,
          ]}
        >
          Live Now News
        </BaseText>
        <RowScrollView style={{ marginTop: 8 }}>
          {liveNewsVideos.map((videoData, index) => (
            <VideoVerticalPreviewCard
              key={index + videoData.id}
              style={{ marginLeft: 12 }}
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
      </View>
      <DrawerDivider style={{ marginVertical: 16, height: 6 }} />
      <View>
        <BaseText
          style={[
            { fontSize: ctxFontSizes.xl, fontWeight: "bold" },
            styles.screenPadLeft,
          ]}
        >
          For You
        </BaseText>
        <RowScrollView style={{ marginTop: 8 }}>
          {personalNewsVideos.map((videoData, index) => (
            <VideoVerticalPreviewCard
              key={index + videoData.id}
              style={{ marginLeft: 12 }}
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
      </View>
      <DrawerDivider style={{ marginVertical: 16, height: 6 }} />
      <LiveCarousel
        carouselNewsVideos={carousel2NewsVideos}
        navigation={navigation}
      />
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
          <NewsIcon size={ctxIconSizes.xl2} color={ctxColors.white} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <BaseText style={{ fontWeight: "bold" }}>News about weather</BaseText>
          <BaseText
            style={{
              fontSize: ctxFontSizes.xs,
              color: ctxColors.textSecondary,
            }}
          >
            {carousel2NewsVideos[0]?.channelName} and{" "}
            {carousel2NewsVideos.length} more • Updated{" "}
            {carousel2NewsVideos[0]?.uploadedDate}
          </BaseText>
        </View>
      </View>
      <DrawerDivider style={{ marginVertical: 16, height: 6 }} />
      {oldNewsVideos.map((videoData, index) => (
        <MainVideoViewRenderItem
          key={index + videoData.id}
          item={videoData}
          navigation={navigation}
          query="Old News"
          isAutoPlayingVideo={false}
        />
      ))}
    </ScreenScrollView>
  );
}

function LiveCarousel({ style, carouselNewsVideos, navigation }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const offset = 10;

  return (
    <View
      style={[
        {
          width: screenWidth,
          height: 250,
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
        data={carouselNewsVideos}
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
                top: offset * 2,
                left: offset,
                width: "90%",
                alignItems: "flex-start",
              }}
            >
              <BaseText
                style={{
                  fontSize: ctxFontSizes.sm,
                  fontWeight: "bold",
                  color: ctxColors.white,
                }}
              >
                {item.title}
              </BaseText>
            </View>
          </>
        )}
      />

      {/*Dot indicator */}
      <View
        style={{
          position: "absolute",
          right: offset * 2,
          bottom: offset * 3,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {carouselNewsVideos.map((_, index) => (
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

function NewsPost({ style, videoData, navigation, ...rest }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();

  return (
    <BasePressable
      style={[
        {
          width: 320,
          borderWidth: 2,
          borderRadius: 8,
          borderColor: ctxColors.borderSecondary,
          padding: 16,
        },
        style,
      ]}
      {...rest}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CommentsProfileSmallImage source={{ uri: videoData?.picture }} />
        <BaseText
          style={{
            marginLeft: 12,
            fontSize: ctxFontSizes.xs,
            fontWeight: "medium",
          }}
        >
          {shortenText(videoData?.channelName, 30)}
        </BaseText>
        <BaseText
          style={{
            marginLeft: 4,
            fontSize: ctxFontSizes.xs,
            color: ctxColors.textSecondary,
          }}
        >
          • {videoData.uploadedDate}
        </BaseText>
      </View>
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <BaseText
          style={{
            flex: 1,
            flexShrink: 1,
            fontSize: ctxFontSizes.sm,
          }}
        >
          {videoData?.description}
        </BaseText>
        <NewsPostImage source={{ uri: videoData?.picture }} />
      </View>
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RippleButton rippleSize={6}>
            <LikeIcon size={ctxIconSizes.xs} />
          </RippleButton>
          <BaseText
            style={{
              marginLeft: 12,
              fontSize: ctxFontSizes.xs,
              color: ctxColors.textSecondary,
            }}
          >
            {videoData?.likes}
          </BaseText>
          <RippleButton rippleSize={6} style={{ marginLeft: 12 }}>
            <DislikeIcon size={ctxIconSizes.xs} />
          </RippleButton>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RippleButton rippleSize={6} style={{ marginLeft: 12 }}>
            <ShareIcon size={ctxIconSizes.xs} />
          </RippleButton>
          <RippleButton rippleSize={6} style={{ marginLeft: 12 }}>
            <MessageTextIcon size={ctxIconSizes.xs} />
          </RippleButton>
          <BaseText
            style={{
              marginLeft: 12,
              fontSize: ctxFontSizes.xs,
              color: ctxColors.textSecondary,
            }}
          >
            {videoData?.commentsCount}
          </BaseText>
          <RippleButton rippleSize={6} style={{ marginLeft: 12 }}>
            <DotVerticalIcon size={ctxIconSizes.xs} />
          </RippleButton>
        </View>
      </View>
    </BasePressable>
  );
}
