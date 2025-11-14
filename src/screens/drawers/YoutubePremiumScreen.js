import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
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
  LearningIcon,
  MembershipIndividualIcon,
  MembershipFamilyIcon,
  PhoneSpeakerIcon,
  PhoneTextIcon,
  VideoIcon,
} from "../../components/IconComponents";
import { YoutubePremiumLogoImage } from "../../components/ImageComponents";
import {
  MinimizingButton,
  OutlinedButton,
} from "../../components/PressableComponents";
import { BaseText } from "../../components/TextComponents";
import { useThemeContext } from "../../context/ThemeContext";
import { useScrollToTopOnFocus } from "../../hooks/useScrollToTopOnFocus";
import { useSetVideoData } from "../../hooks/useSetVideoData";
import { styles } from "../../styles/styles";
import { navPaths } from "../../utils/constants";

export default function MoviesScreen({ navigation }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const scrollToTopRef = useRef(null);
  const [premiumVideos, setPremiumVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query: "premium videos",
    queryResults: 4,
    setVideos: setPremiumVideos,
    setIsLoading,
  });

  return (
    <ScreenScrollView isLoading={isLoading} ref={scrollToTopRef}>
      <LinearGradientView
        style={[{ alignItems: "center" }, styles.screenPadHorizontal]}
        colors={[ctxColors.tintedRed, ctxColors.tintedBlue, ctxColors.bg]}
      >
        <YoutubePremiumLogoImage style={{ marginTop: 70 }} />
        <BaseText
          style={{
            marginTop: 40,
            fontSize: ctxFontSizes.xl2,
            fontWeight: "bold",
          }}
        >
          All YouTube.
        </BaseText>
        <BaseText
          style={{
            marginTop: 8,
            fontSize: ctxFontSizes.xl2,
            fontWeight: "bold",
          }}
        >
          No Interruptions.
        </BaseText>
        <BaseText
          style={{
            marginTop: 50,
            fontSize: ctxFontSizes.xl,
            textAlign: "center",
          }}
        >
          YouTube and YouTube Music ad-free, offline, and in the background
        </BaseText>
        <BaseText
          style={{
            marginTop: 36,
            fontSize: ctxFontSizes.xl,
            textAlign: "center",
          }}
        >
          1-month trial for ₱0 • Then ₱189.00/month • Cancel anytime
        </BaseText>
        <MinimizingButton
          style={[
            { marginTop: 32, backgroundColor: ctxColors.blue },
            styles.wideButton,
          ]}
        >
          <BaseText
            style={{
              fontSize: ctxFontSizes.xl,
              fontWeight: "medium",
              color: ctxColors.textContrast,
            }}
          >
            Try 1 month for ₱0
          </BaseText>
        </MinimizingButton>
        <BaseText style={{ marginTop: 16, fontSize: ctxFontSizes.sm }}>
          or save money with a{" "}
          <BaseText
            style={{ fontSize: ctxFontSizes.sm, color: ctxColors.blue }}
          >
            family or student plan
          </BaseText>
        </BaseText>
        <BaseText
          style={{
            marginTop: 32,
            fontSize: ctxFontSizes.xs,
            color: ctxColors.textSecondary,
            textAlign: "center",
          }}
        >
          You'll be reminded 7 days before your trial ends. Recurring billing.
          By continuing, you verify that you are at least 18 years old and agree
          to{" "}
          <BaseText
            style={{ fontSize: ctxFontSizes.xs, color: ctxColors.blue }}
          >
            these terms
          </BaseText>
          . No refunds for partial billing periods.{" "}
          <BaseText
            style={{ fontSize: ctxFontSizes.xs, color: ctxColors.blue }}
          >
            Restrictions apply.
          </BaseText>
        </BaseText>
      </LinearGradientView>
      <IconText
        style={{ marginTop: 72 }}
        Icon={VideoIcon}
        text="Ad-free so you can immerse in your favorite videos without interruption"
      />
      <IconText
        style={{ marginTop: 48 }}
        Icon={ActiveSubscriptionIcon}
        text="Downlaod videos to watch later when you're offline or on the go"
      />
      <IconText
        style={{ marginTop: 48 }}
        Icon={PhoneTextIcon}
        text="Background play so you can watch while using other apps or with your screen locked"
      />
      <IconText
        style={{ marginTop: 48 }}
        Icon={PhoneSpeakerIcon}
        text="Stream all the music you want to hear, ad-free on the YouTube Music app"
      />
      <View
        style={{
          marginTop: 116,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BaseText
          style={{
            fontSize: ctxFontSizes.xl2,
            fontWeight: "bold",
          }}
        >
          Pick a membership that fits you
        </BaseText>
        <MembershipCard
          style={{ marginTop: 64 }}
          TitleIcon={MembershipIndividualIcon}
          titleText="Individual"
          monthlyPrice="₱189.00/month"
        >
          <BaseText
            style={{ fontSize: ctxFontSizes.xs, color: ctxColors.blue }}
          >
            Restricitons only.
          </BaseText>
        </MembershipCard>
        <MembershipCard
          style={{ marginTop: 32 }}
          TitleIcon={MembershipFamilyIcon}
          titleText="Individual"
          monthlyPrice="₱379.00/month"
        >
          <BaseText
            style={{
              fontSize: ctxFontSizes.xs,
              color: ctxColors.textSecondary,
            }}
          >
            Add up to 5 family members (ages 13+) in your household.{" "}
            <BaseText
              style={{ fontSize: ctxFontSizes.xs, color: ctxColors.blue }}
            >
              Restrictions apply.
            </BaseText>
          </BaseText>
        </MembershipCard>
        <MembershipCard
          style={{ marginTop: 32, marginBottom: 32 }}
          TitleIcon={LearningIcon}
          titleText="Student"
          monthlyPrice="₱115.00/month"
        >
          <BaseText
            style={{
              fontSize: ctxFontSizes.xs,
              color: ctxColors.textSecondary,
            }}
          >
            Eligible students only. Annual verifiication required.{" "}
            <BaseText
              style={{ fontSize: ctxFontSizes.xs, color: ctxColors.blue }}
            >
              Restrictions apply.
            </BaseText>
          </BaseText>
        </MembershipCard>
      </View>
    </ScreenScrollView>
  );
}

function IconText({ style, Icon, text, ...rest }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();

  return (
    <View
      style={[
        styles.screenPadHorizontal,
        { flexDirection: "row", alignItems: "center" },
        style,
      ]}
      {...rest}
    >
      <Icon size={ctxIconSizes.xl2} style={{ marginLeft: 32 }} />
      <BaseText
        style={{ marginLeft: 48, fontSize: ctxFontSizes.sm, flexShrink: 1 }}
      >
        {text}
      </BaseText>
    </View>
  );
}

export function MembershipCard({
  style,
  TitleIcon,
  titleText,
  monthlyPrice,
  children,
  ...rest
}) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();

  return (
    <LinearGradient
      colors={[
        ctxColors.tintedRed,
        ctxColors.bg,
        ctxColors.bg,
        ctxColors.tintedBlue,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[
        {
          width: "85%",
          borderRadius: 12,
          padding: 16,
          backgroundColor: ctxColors.bg,
          marginVertical: 10,
        },
        style,
      ]}
      {...rest}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <TitleIcon size={ctxIconSizes.lg} />
        <BaseText
          style={{
            marginLeft: 8,
            fontSize: ctxFontSizes.lg,
            fontWeight: "bold",
            color: ctxColors.textPrimary,
          }}
        >
          {titleText}
        </BaseText>
      </View>
      <DrawerDivider
        style={{ marginTop: 8, backgroundColor: ctxColors.bgContrast }}
      />
      <BaseText
        style={{
          marginTop: 8,
          fontSize: ctxFontSizes.xs,
          color: ctxColors.textSecondary,
        }}
      >
        Monthly
      </BaseText>
      <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "medium" }}>
        {monthlyPrice}
      </BaseText>
      <BaseText
        style={{
          marginBottom: 8,
          fontWeight: "medium",
          fontSize: ctxFontSizes.sm,
        }}
      >
        1-month trial for ₱0
      </BaseText>
      {children}
      <MinimizingButton
        style={[
          { marginTop: 16, backgroundColor: ctxColors.blue },
          styles.wideButton,
        ]}
      >
        <BaseText
          style={{
            fontWeight: "medium",
            color: ctxColors.textContrast,
          }}
        >
          Try 1 month for ₱0
        </BaseText>
      </MinimizingButton>
    </LinearGradient>
  );
}
