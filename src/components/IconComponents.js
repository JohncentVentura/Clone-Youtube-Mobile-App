import { ThIcon } from "./ThemedComponents";
import { icons } from "../styles/icons";

export function YoutubeIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.youtube.iconComponent}
      name={icons.youtube.iconName}
      {...rest}
    />
  );
}

export function ArrowBackIcon({ navigation, ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.arrowBack.iconComponent}
      name={icons.arrowBack.iconName}
      onPress={() => {
        navigation.goBack();
        console.log(icons.arrowBack.label + " icon pressed");
      }}
      {...rest}
    />
  );
}

export function ShareScreenIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.screenShare.iconComponent}
      name={icons.screenShare.iconName}
      {...rest}
    />
  );
}

export function Notificationcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.notification.iconComponent}
      name={icons.notification.iconName}
      {...rest}
    />
  );
}

export function SearchIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.search.iconComponent}
      name={icons.search.iconName}
      {...rest}
    />
  );
}

export function CompassIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.compass.iconComponent}
      name={icons.compass.iconName}
      {...rest}
    />
  );
}

export function DotVerticalIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.dotVertical.iconComponent}
      name={icons.dotVertical.iconName}
      {...rest}
    />
  );
}

export function ShareIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.share.iconComponent}
      name={icons.share.iconName}
      {...rest}
    />
  );
}

export function LikeIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.like.iconComponent}
      name={icons.like.iconName}
      {...rest}
    />
  );
}

export function DislikeIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.dislike.iconComponent}
      name={icons.dislike.iconName}
      {...rest}
    />
  );
}

export function RemixIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.remix.iconComponent}
      name={icons.remix.iconName}
      {...rest}
    />
  );
}

export function DownloadIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.download.iconComponent}
      name={icons.download.iconName}
      {...rest}
    />
  );
}

export function ReportIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.report.iconComponent}
      name={icons.report.iconName}
      {...rest}
    />
  );
}

export function SaveIcon({ ...rest }) {
  return (
    <ThIcon
      IconComponent={icons.save.iconComponent}
      name={icons.save.iconName}
      {...rest}
    />
  );
}
