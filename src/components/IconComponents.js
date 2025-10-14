import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { ThIcon } from "./ThemedComponents";

/******************************MainBottomTabBar Icons******************************/
export function ActiveHomeIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="home-sharp" {...rest} />;
}

export function InactiveHomeIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="home-outline" {...rest} />;
}

export function ActiveShortsIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="videocam" {...rest} />;
}

export function InactiveShortsIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="videocam-outline" {...rest} />;
}

export function UploadIcon({ ...rest }) {
  return <ThIcon IconComponent={Feather} name="plus" {...rest} />;
}

export function ActiveSubscriptionIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="albums" {...rest} />;
}

export function InactiveSubscriptionIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="albums-outline" {...rest} />;
}

export function ActiveYouIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="person-circle" {...rest} />;
}

export function InactiveYouIcon({ ...rest }) {
  return (
    <ThIcon IconComponent={Ionicons} name="person-circle-outline" {...rest} />
  );
}

/******************************Menu Icons******************************/
export function ArrowBackIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="arrow-back" {...rest} />;
}

export function ArrowUpLeftIcon({ ...rest }) {
  return <ThIcon IconComponent={Feather} name="arrow-up-left" {...rest} />;
}

export function ClockRotateLeftIcon({ ...rest }) {
  return (
    <ThIcon IconComponent={FontAwesome6} name="clock-rotate-left" {...rest} />
  );
}

export function CompassIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="compass-outline" {...rest} />;
}

export function CourseIcon({ ...rest }) {
  return <ThIcon IconComponent={SimpleLineIcons} name="graduation" {...rest} />;
}

export function DislikeIcon({ ...rest }) {
  return <ThIcon IconComponent={Foundation} name="dislike" {...rest} />;
}

export function DontRecommendChannelIcon({ ...rest }) {
  return <ThIcon IconComponent={MaterialIcons} name="person-off" {...rest} />;
}

export function DotVerticalIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={MaterialCommunityIcons}
      name="dots-vertical"
      {...rest}
    />
  );
}

export function DownloadIcon({ ...rest }) {
  return <ThIcon IconComponent={Octicons} name="download" {...rest} />;
}

export function EyeInvisbleIcon({ ...rest }) {
  return <ThIcon IconComponent={AntDesign} name="eye-invisible" {...rest} />;
}

export function FashionAndBeautyIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="brush-outline" {...rest} />;
}

export function GamingIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={MaterialCommunityIcons}
      name="youtube-gaming"
      {...rest}
    />
  );
}

export function InformationIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={MaterialCommunityIcons}
      name="information-outline"
      {...rest}
    />
  );
}

export function LikeIcon({ ...rest }) {
  return <ThIcon IconComponent={Foundation} name="like" {...rest} />;
}

export function LiveIcon({ ...rest }) {
  return <ThIcon IconComponent={MaterialIcons} name="live-tv" {...rest} />;
}

export function MicIcon({ ...rest }) {
  return <ThIcon IconComponent={MaterialIcons} name="mic" {...rest} />;
}

export function MovieIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={MaterialCommunityIcons}
      name="movie-open-outline"
      {...rest}
    />
  );
}

export function MusicIcon({ ...rest }) {
  return (
    <ThIcon IconComponent={Ionicons} name="musical-note-outline" {...rest} />
  );
}

export function NewsIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="newspaper-outline" {...rest} />;
}

export function NotificationsIcon({ ...rest }) {
  return (
    <ThIcon IconComponent={Ionicons} name="notifications-outline" {...rest} />
  );
}

export function NotificationsOffIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={Ionicons}
      name="notifications-off-outline"
      {...rest}
    />
  );
}

export function NotInterestedIcon({ ...rest }) {
  return <ThIcon IconComponent={MaterialIcons} name="block" {...rest} />;
}

export function PlayNextInQueueIcon({ ...rest }) {
  return <ThIcon IconComponent={MaterialIcons} name="queue" {...rest} />;
}

export function RemixIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="videocam-outline" {...rest} />;
}

export function ReportIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="flag-outline" {...rest} />;
}

export function SaveIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="bookmark-outline" {...rest} />;
}

export function SaveToWatchLaterIcon({ ...rest }) {
  return <ThIcon IconComponent={FontAwesome5} name="clock" {...rest} />;
}

export function SearchIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="search" {...rest} />;
}

export function ShareIcon({ ...rest }) {
  return (
    <ThIcon IconComponent={MaterialCommunityIcons} name="share" {...rest} />
  );
}

export function ShareScreenIcon({ ...rest }) {
  return <ThIcon IconComponent={MaterialIcons} name="connected-tv" {...rest} />;
}

export function SportsIcon({ ...rest }) {
  return <ThIcon IconComponent={Ionicons} name="trophy-outline" {...rest} />;
}

export function YoutubeKidsIcon({ ...rest }) {
  return <ThIcon IconComponent={Feather} name="youtube" {...rest} />;
}

export function YoutubeMainIcon({ ...rest }) {
  return <ThIcon IconComponent={Fontisto} name="youtube-play" {...rest} />;
}

export function YoutubeMusicIcon({ ...rest }) {
  return <ThIcon IconComponent={Entypo} name="youtube-with-circle" {...rest} />;
}

export function YoutubePremiumIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={MaterialCommunityIcons}
      name="youtube-tv"
      {...rest}
    />
  );
}
