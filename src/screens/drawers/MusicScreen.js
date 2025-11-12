import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { MoviesCard } from "../../components/CardsComponents";
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
import { useSetVideoData } from "../../hooks/useSetVideoData";
import { useSetChannelData } from "../../hooks/useSetChannelData";
import { screenWidth, styles } from "../../styles/styles";
import { navPaths } from "../../utils/constants";
import { shortenText } from "../../utils/utils";

export default function MusicScreen({ navigation }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const [musicVideos, setMusicVideos] = useState([]);
  const [musicChannel, setMusicChannel] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useSetVideoData({
    query: "Music",
    queryResults: 5,
    setVideos: setMusicVideos,
    setIsLoading,
  });

  useEffect(() => {
    if (musicVideos.length > 0 && musicVideos[0]) {
      setMusicChannel(musicVideos[musicVideos.length - 1]);
    }
  }, [musicVideos]);

  return (
    <ScreenScrollView isLoading={isLoading}>
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
        <BaseText style={{ marginTop: 32, fontSize: ctxFontSizes.xl, fontWeight: "bold" }}>
          New & Trending Songs
        </BaseText>
      </View>
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
