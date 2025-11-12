import { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import {
  DrawerDivider,
  RowScrollView,
  ScreenScrollView,
} from "../components/ContainerComponents";
import {
  AccountBoxMultipleIcon,
  ClockIcon,
  DotVerticalIcon,
  DownloadIcon,
  GoogleIcon,
  IncognitoIcon,
  KeyboardArrowRightIcon,
  LikeIcon,
  MovieIcon,
  QuestionCircleIcon,
  StatsChartIcon,
  VideoIcon,
  YoutubePremiumIcon,
} from "../components/IconComponents";
import { ChannelProfileImage } from "../components/ImageComponents";
import {
  BasePressable,
  OutlinedButton,
  RippleButton,
  IconTextButton,
} from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { useSetVideoData } from "../hooks/useSetVideoData";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import { shortenText } from "../utils/utils";

export default function YouScreen({ navigation }) {
  const { ctxFontSizes, ctxIconSizes } = useThemeContext();
  const scrollToTopRef = useRef(null);
  const [userQuery, setUserQuery] = useState("Vlogger");
  const [userVideos, setUserVideos] = useState([]);
  const [userData, setUserData] = useState({});
  const [userLikedVideosData, setUserLikedVideosData] = useState({});
  const [userLikedVideosDataCount, setUserLikedVideosDataCount] = useState(6);
  const [userWatchLaterData, setUserWatchLaterData] = useState({});
  const [userWatchLaterDataCount, setUserWatchLaterDataCount] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query: userQuery,
    queryResults: 5,
    setVideos: setUserVideos,
    setIsLoading,
  });

  useEffect(() => {
    if (userVideos.length > 0 && userVideos[0]) {
      setUserData(userVideos[0]);
      setUserLikedVideosData(userVideos[3]);
      setUserWatchLaterData(userVideos[4]);
    }
  }, [userVideos]);

  return (
    <ScreenScrollView isLoading={isLoading} ref={scrollToTopRef}>
      <View
        style={[
          { flexDirection: "row", alignItems: "center" },
          styles.screenPadHorizontal,
        ]}
      >
        <ChannelProfileImage
          source={{ uri: userData.picture }}
          onPress={() => {
            navigation.navigate(navPaths.channelScreen, {
              videoData: userData,
            });
          }}
        />
        <View style={{ marginLeft: 12 }}>
          <BaseText style={{ fontSize: ctxFontSizes.xl, fontWeight: "bold" }}>
            {userData.channelName}
          </BaseText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BaseText style={{ fontSize: ctxFontSizes.xs }}>
              Create a channel
            </BaseText>
            <KeyboardArrowRightIcon size={ctxIconSizes.sm} />
          </View>
        </View>
      </View>

      <RowScrollView style={[{ marginTop: 16 }, styles.screenPadHorizontal]}>
        <IconTextButton
          style={[styles.smallButton]}
          Icon={AccountBoxMultipleIcon}
          text="Switch Account"
          onPress={() => console.log("Switch Account Press")}
        />
        <IconTextButton
          style={[{ marginLeft: 8 }, styles.smallButton]}
          Icon={GoogleIcon}
          text="Google Account"
          onPress={() => console.log("Google Account Press")}
        />
        <IconTextButton
          style={[{ marginLeft: 8, marginRight: 32 }, styles.smallButton]}
          Icon={IncognitoIcon}
          text="Turn on Incognito"
          onPress={() => console.log("Turn on Incognito Press")}
        />
      </RowScrollView>

      <View style={{ marginTop: 32 }}>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
            styles.screenPadHorizontal,
          ]}
        >
          <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
            History
          </BaseText>
          <OutlinedButton>
            <BaseText style={{ fontSize: ctxFontSizes.sm }}>View All</BaseText>
          </OutlinedButton>
        </View>
        <RowScrollView style={{ marginTop: 12 }}>
          {userVideos.map((user, index) => {
            return (
              <UserHistoryCard
                key={user.id}
                style={[
                  index === 0 && { marginLeft: 6 },
                  index === userVideos.length - 1 && { marginRight: 6 },
                ]}
                source={{ uri: user.picture }}
                userData={user}
                onPress={() => {
                  navigation.push(navPaths.mainVideoScreen, {
                    query: userQuery,
                    videoData: user,
                  });
                }}
              />
            );
          })}
        </RowScrollView>
      </View>

      <View style={{ marginTop: 32 }}>
        <View
          style={[
            {
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
            styles.screenPadHorizontal,
          ]}
        >
          <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
            Playlists
          </BaseText>
          <OutlinedButton>
            <BaseText style={{ fontSize: ctxFontSizes.sm }}>View All</BaseText>
          </OutlinedButton>
        </View>
        <RowScrollView style={{ marginTop: 12 }}>
          <UserPlaylistsCard
            style={{ marginLeft: 6 }}
            source={{ uri: userLikedVideosData.picture }}
            userData={userLikedVideosData}
            userDataVideosCount={userLikedVideosDataCount}
            PlaylistsIcon={LikeIcon}
            playlistsName="Liked Videos"
            onPress={() => {
              navigation.push(navPaths.likedVideosScreen, {
                userQuery: userLikedVideosData.title,
                userLikedVideosDataCount: userLikedVideosDataCount,
              });
            }}
          />
          <UserPlaylistsCard
            source={{ uri: userWatchLaterData.picture }}
            userData={userWatchLaterData}
            userDataVideosCount={userWatchLaterDataCount}
            PlaylistsIcon={ClockIcon}
            playlistsName="Watch Later"
            onPress={() => {
              navigation.push(navPaths.watchLaterScreen, {
                userQuery: userWatchLaterData.title,
                userWatchLaterDataCount: userWatchLaterDataCount,
              });
            }}
          />
        </RowScrollView>
      </View>

      <View style={[{ marginTop: 32, marginBottom: 12, width: "100%" }]}>
        <UserIconTextPressable>
          <VideoIcon />
          <BaseText style={{ marginLeft: 16 }}>Your videos</BaseText>
        </UserIconTextPressable>
        <UserIconTextPressable>
          <DownloadIcon />
          <BaseText style={{ marginLeft: 16 }}>Downloads</BaseText>
        </UserIconTextPressable>
        <DrawerDivider />
        <UserIconTextPressable
          onPress={() => navigation.navigate(navPaths.moviesScreen)}
        >
          <MovieIcon />
          <BaseText style={{ marginLeft: 16 }}>Your movies</BaseText>
        </UserIconTextPressable>
        <UserIconTextPressable
          onPress={() => navigation.navigate(navPaths.youtubePremiumScreen)}
        >
          <YoutubePremiumIcon />
          <BaseText style={{ marginLeft: 16 }}>Get YouTube Premium</BaseText>
        </UserIconTextPressable>
        <DrawerDivider />
        <UserIconTextPressable>
          <StatsChartIcon />
          <BaseText style={{ marginLeft: 16 }}>Time watched</BaseText>
        </UserIconTextPressable>
        <UserIconTextPressable>
          <QuestionCircleIcon />
          <BaseText style={{ marginLeft: 16 }}>Help & feedback</BaseText>
        </UserIconTextPressable>
      </View>
    </ScreenScrollView>
  );
}

function UserHistoryCard({ style, source, userData, ...rest }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  return (
    <BasePressable
      style={[{ borderRadius: 8, paddingHorizontal: 10, width: 175 }, style]}
      {...rest}
    >
      <Image
        style={{ borderRadius: 8, width: "100%", height: 75 }}
        resizeMode={"stretch"}
        source={source}
        alt="UserHistoryCard"
      />
      <View
        style={{
          marginTop: 4,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BaseText
          style={{
            flexShrink: 1,
            fontSize: ctxFontSizes.sm,
            fontWeight: "medium",
          }}
        >
          {shortenText(userData.title, 30)}
        </BaseText>
        <RippleButton rippleSize={6}>
          <DotVerticalIcon size={ctxIconSizes.xs2} />
        </RippleButton>
      </View>
      <BaseText
        style={{
          marginTop: 2,
          fontSize: ctxFontSizes.xs,
          colors: ctxColors.textSecondary,
        }}
      >
        {userData.channelName}
      </BaseText>
    </BasePressable>
  );
}

function UserPlaylistsCard({
  style,
  userData,
  userDataVideosCount,
  PlaylistsIcon,
  playlistsName,
  ...rest
}) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const topOffset = 6;

  return (
    <BasePressable
      style={[{ borderRadius: 8, paddingHorizontal: 10, width: 175 }, style]}
      {...rest}
    >
      <View style={{ position: "relative" }}>
        {/*Back layer album stack image*/}
        <Image
          style={{
            position: "absolute",
            top: 0,
            left: "5%",
            borderRadius: 8,
            width: "90%",
            height: 75,
            opacity: 0.5,
          }}
          resizeMode="stretch"
          source={{ uri: userData.picture }}
          alt="AlbumLayer1"
        />
        <Image
          style={{
            marginTop: topOffset,
            borderRadius: 8,
            width: "100%",
            height: 75,
          }}
          resizeMode={"stretch"}
          source={{ uri: userData.picture }}
        />
        <View
          style={{
            position: "absolute",
            top: topOffset,
            right: 0,
            borderRadius: 8,
            width: "100%",
            height: 75,
            backgroundColor: ctxColors.transparentBlack,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PlaylistsIcon
            style={{ color: ctxColors.white }}
            size={ctxIconSizes.sm}
          />
          <BaseText
            style={{
              marginTop: 2,
              fontSize: ctxFontSizes.sm,
              color: ctxColors.white,
            }}
          >
            {userDataVideosCount}
          </BaseText>
        </View>
      </View>
      <View
        style={{
          marginTop: 4,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BaseText
          style={{
            flexShrink: 1,
            fontSize: ctxFontSizes.sm,
            fontWeight: "medium",
          }}
        >
          {playlistsName}
        </BaseText>
        <RippleButton rippleSize={6}>
          <DotVerticalIcon size={ctxIconSizes.xs2} />
        </RippleButton>
      </View>
      <BaseText
        style={{
          marginTop: 2,
          fontSize: ctxFontSizes.xs,
          colors: ctxColors.textSecondary,
        }}
      >
        Private
      </BaseText>
    </BasePressable>
  );
}

function UserIconTextPressable({ style, children, ...rest }) {
  return (
    <BasePressable
      style={[
        {
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
        },
        styles.screenPadHorizontal,
        style,
      ]}
      {...rest}
    >
      {children}
    </BasePressable>
  );
}
