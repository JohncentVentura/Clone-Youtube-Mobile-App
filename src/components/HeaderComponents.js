import {
  ArrowBackIcon,
  DotVerticalIcon,
  MicIcon,
  NotificationIcon,
  SearchIcon,
  ShareScreenIcon,
} from "./IconComponents";
import { ThText, AnimFadeRoundButton } from "./ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

export function HeaderArrowBack({ style, navigation, ...rest }) {
  return (
    <AnimFadeRoundButton
      style={[styles.headerLeftIcon, style]}
      onPress={() => navigation.goBack()}
      {...rest}
    >
      <ArrowBackIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderDotVertical({ style, ...rest }) {
  return (
    <AnimFadeRoundButton style={[styles.headerRightIcon, style]} {...rest}>
      <DotVerticalIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderMic({ style, ...rest }) {
  return (
    <AnimFadeRoundButton style={[styles.headerRightIcon, style]} {...rest}>
      <MicIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderNotifications({ style, navigation, ...rest }) {
  return (
    <AnimFadeRoundButton
      style={[styles.headerRightIcon, style]}
      onPress={() => {
        navigation.navigate("NotificationsScreen");
      }}
      {...rest}
    >
      <NotificationIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderSearch({ style, navigation, search, ...rest }) {
  return (
    <AnimFadeRoundButton
      style={[styles.headerRightIcon, style]}
      onPress={() => {
        navigation.navigate("SearchScreen", { search: search });
      }}
      {...rest}
    >
      <SearchIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderShareScreen({ style, setVisible, ...rest }) {
  return (
    <AnimFadeRoundButton
      style={[styles.headerRightIcon, style]}
      onPress={() => setVisible(true)}
      {...rest}
    >
      <ShareScreenIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderText({ style, children, ...rest }) {
  const { fontSizes } = useTheme();

  return (
    <ThText
      style={[
        styles.headerTitle,
        {
          fontSize: fontSizes.xl,
          fontWeight: "bold",
        },
      ]}
    >
      {children}
    </ThText>
  );
}
