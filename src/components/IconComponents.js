import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useTheme } from "../context/ThemeContext";
import { useUI } from "../context/UIContext";
import { styles } from "../styles/styles";
import { RippleButton } from "./PressableComponents";

export function BaseIcon({ IconComponent, ...rest }) {
  const { colors, iconSizes } = useTheme();

  return (
    <IconComponent size={iconSizes.base} color={colors.iconPrimary} {...rest} />
  );
}

//#region BottomTabBar Icons
export function ActiveHomeIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="home-sharp" {...rest} />;
}

export function InactiveHomeIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="home-outline" {...rest} />;
}

export function ActiveShortsIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="videocam" {...rest} />;
}

export function InactiveShortsIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="videocam-outline" {...rest} />
  );
}

export function UploadIcon({ ...rest }) {
  return <BaseIcon IconComponent={Feather} name="plus" {...rest} />;
}

export function ActiveSubscriptionIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="albums" {...rest} />;
}

export function InactiveSubscriptionIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="albums-outline" {...rest} />;
}

export function ActiveYouIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="person-circle" {...rest} />;
}

export function InactiveYouIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="person-circle-outline" {...rest} />
  );
}
//#endregion

//#region Header Icons
export function HeaderArrowBackIcon({ navigation, ...rest }) {
  return (
    <RippleButton onPress={() => navigation.goBack()} {...rest}>
      <ArrowBackIcon />
    </RippleButton>
  );
}

export function HeaderDotVerticalIcon({ style, ...rest }) {
  return (
    <RippleButton style={[styles.headerRightIcon, style]} {...rest}>
      <DotVerticalIcon />
    </RippleButton>
  );
}

export function HeaderMicIcon({ style, ...rest }) {
  return (
    <RippleButton style={[styles.headerRightIcon, style]} {...rest}>
      <MicIcon />
    </RippleButton>
  );
}

export function HeaderNotificationsIcon({ style, navigation, ...rest }) {
  return (
    <RippleButton
      style={[styles.headerRightIcon, style]}
      onPress={() => {
        navigation.navigate("NotificationsScreen");
      }}
      {...rest}
    >
      <NotificationsIcon />
    </RippleButton>
  );
}

export function HeaderSearchIcon({ style, navigation, ...rest }) {
  return (
    <RippleButton
      style={[styles.headerRightIcon, style]}
      onPress={() => {
        navigation.navigate("SearchScreen", { search: "" });
      }}
      {...rest}
    >
      <SearchIcon />
    </RippleButton>
  );
}

export function HeaderShareScreenIcon({ style, ...rest }) {
  const { setShowShareScreenModal } = useUI();

  return (
    <RippleButton
      style={[styles.headerRightIcon, style]}
      onPress={() => setShowShareScreenModal(true)}
      {...rest}
    >
      <ShareScreenIcon />
    </RippleButton>
  );
}
//#endregion

//#region Menu Icons
export function ArrowBackIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="arrow-back" {...rest} />;
}

export function ArrowUpLeftIcon({ ...rest }) {
  return <BaseIcon IconComponent={Feather} name="arrow-up-left" {...rest} />;
}

export function ClockRotateLeftIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={FontAwesome6} name="clock-rotate-left" {...rest} />
  );
}

export function CloseIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="close" {...rest} />;
}

export function CompassIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="compass-outline" {...rest} />;
}

export function CourseIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={SimpleLineIcons} name="graduation" {...rest} />
  );
}

export function DislikeIcon({ ...rest }) {
  return <BaseIcon IconComponent={SimpleLineIcons} name="dislike" {...rest} />;
}

export function DontRecommendChannelIcon({ ...rest }) {
  return <BaseIcon IconComponent={MaterialIcons} name="person-off" {...rest} />;
}

export function DotVerticalIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="dots-vertical"
      {...rest}
    />
  );
}

export function DownloadIcon({ ...rest }) {
  return <BaseIcon IconComponent={Octicons} name="download" {...rest} />;
}

export function ExclamationCircleIcon({ ...rest }) {
  return <BaseIcon IconComponent={AntDesign} name="exclamation-circle" {...rest} />;
}

export function EyeInvisbleIcon({ ...rest }) {
  return <BaseIcon IconComponent={AntDesign} name="eye-invisible" {...rest} />;
}

export function FashionAndBeautyIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="brush-outline" {...rest} />;
}

export function GamingIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="youtube-gaming"
      {...rest}
    />
  );
}

export function InformationIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="information-outline"
      {...rest}
    />
  );
}

export function LikeIcon({ ...rest }) {
  return <BaseIcon IconComponent={SimpleLineIcons} name="like" {...rest} />;
}

export function LiveIcon({ ...rest }) {
  return <BaseIcon IconComponent={MaterialIcons} name="live-tv" {...rest} />;
}

export function MessageTextIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="message-text-outline"
      {...rest}
    />
  );
}

export function MicIcon({ ...rest }) {
  return <BaseIcon IconComponent={MaterialIcons} name="mic" {...rest} />;
}

export function MovieIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="movie-open-outline"
      {...rest}
    />
  );
}

export function MusicIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="musical-note-outline" {...rest} />
  );
}

export function NewsIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="newspaper-outline" {...rest} />
  );
}

export function NotificationsIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="notifications-outline" {...rest} />
  );
}

export function NotificationsOffIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={Ionicons}
      name="notifications-off-outline"
      {...rest}
    />
  );
}

export function NotInterestedIcon({ ...rest }) {
  return <BaseIcon IconComponent={MaterialIcons} name="block" {...rest} />;
}

export function PlayNextInQueueIcon({ ...rest }) {
  return <BaseIcon IconComponent={MaterialIcons} name="queue" {...rest} />;
}

export function QuestionCircleIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={FontAwesome5} name="question-circle" {...rest} />
  );
}

export function RemixIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="videocam-outline" {...rest} />
  );
}

export function ReportIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="flag-outline" {...rest} />;
}

export function SaveIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="bookmark-outline" {...rest} />
  );
}

export function SaveToWatchLaterIcon({ ...rest }) {
  return <BaseIcon IconComponent={FontAwesome5} name="clock" {...rest} />;
}

export function SearchIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="search" {...rest} />;
}

export function ShareIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={MaterialCommunityIcons} name="share" {...rest} />
  );
}

export function ShareScreenIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={MaterialIcons} name="connected-tv" {...rest} />
  );
}

export function SportsIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="trophy-outline" {...rest} />;
}

export function YoutubeKidsIcon({ ...rest }) {
  return <BaseIcon IconComponent={Feather} name="youtube" {...rest} />;
}

export function YoutubeMusicIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Entypo} name="youtube-with-circle" {...rest} />
  );
}

export function YoutubePremiumIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="youtube-tv"
      {...rest}
    />
  );
}
//#endregion
