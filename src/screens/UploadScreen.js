import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { use, useEffect, useRef, useState } from "react";
import { Image, Pressable, View } from "react-native";
import {
  ScreenContainer,
  LinearGradientView,
  DrawerDivider,
} from "../components/ContainerComponents";
import {
  CameraIcon,
  CloseIcon,
  ColorFilterIcon,
  FlashIcon,
  KeyboardArrowDownIcon,
  LightIcon,
  MusicIcon,
  PersonGreenScreenIcon,
  RetouchIcon,
  RotateIcon,
  SparkleIcon,
  SparklesIcon,
  TimerIcon,
} from "../components/IconComponents";
import { MinimizingButton } from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { useSetImageData } from "../hooks/useSetImageData";
import { screenWidth, screenHeight, styles } from "../styles/styles";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function UploadScreen({ navigation }) {
  const [permission, requestCameraPermission] = useCameraPermissions();
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const cameraRef = useRef(null);
  const [uploadBackroundImages, setUploadBackroundImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraFacingDirection, setCameraFacingDiretction] = useState("back");

  const menuAnim = useSharedValue(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuTimer, setMenuTimer] = useState("15s");
  const [selectedImage, setSelectedImage] = useState(null);

  useSetImageData({
    query: "Dancing Shorts",
    queryResults: 1,
    setData: setUploadBackroundImages,
    setIsLoading,
  });

  useEffect(() => {
    if (
      !permission ||
      !permission.granted ||
      permission.status === "denied" ||
      permission.status === "undetermined"
    )
      requestCameraPermission();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);

    menuAnim.value = withTiming(isMenuOpen ? 0 : 1, {
      duration: 250,
    });
  };

  const menuStyle = useAnimatedStyle(() => ({
    height: interpolate(menuAnim.value, [0, 1], [0, 150]),
    opacity: menuAnim.value,
    overflow: "hidden",
  }));

  const openGallery = async () => {
    // Request permission first
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Please allow access to your gallery 😢");
      return;
    }

    // Now open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return !permission || !permission.granted ? (
    <LinearGradientView
      style={styles.screenContainer}
      colors={[ctxColors.tintedRed, ctxColors.tintedBlue]}
    >
      <Image
        style={{ width: "100%", height: "100%" }}
        resizeMode={"stretch"}
        source={{ uri: uploadBackroundImages[0]?.picture }}
      />
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: ctxColors.transparentBlack,
            width: "100%",
            height: "100%",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <CameraIcon
          style={{ marginTop: "100%" }}
          size={ctxIconSizes.xl2}
          color={ctxColors.white}
        />
        <BaseText
          style={{
            marginTop: 16,
            fontSize: ctxFontSizes.xl,
            fontWeight: "bold",
            color: ctxColors.white,
            textAlign: "center",
          }}
        >
          To record, let YouTube access your camera and microphone
        </BaseText>
        <BaseText style={{ marginTop: 16, color: ctxColors.white }}>
          Change your permissions any time in Settings
        </BaseText>
        <MinimizingButton
          style={[
            {
              marginTop: 16,
              backgroundColor: ctxColors.white,
              textAlign: "center",
            },
            styles.wideButton,
          ]}
        >
          <BaseText
            style={{ fontSize: ctxFontSizes.sm, color: ctxColors.black }}
          >
            Add from Gallery
          </BaseText>
        </MinimizingButton>
        <MinimizingButton
          style={[
            { marginTop: 16, backgroundColor: ctxColors.transparentWhite },
            styles.wideButton,
          ]}
        >
          <BaseText
            style={{ fontSize: ctxFontSizes.sm, color: ctxColors.white }}
          >
            Open Settings
          </BaseText>
        </MinimizingButton>
      </View>
    </LinearGradientView>
  ) : (
    <ScreenContainer>
      <CameraView
        style={{ flex: 1 }}
        facing={cameraFacingDirection}
        ref={cameraRef}
        isLoading={isLoading}
      />
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            //backgroundColor: ctxColors.transparentBlack,
            width: "100%",
            height: "100%",
            alignItems: "flex-start",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <DrawerDivider
          style={{
            marginVertical: 16,
            height: 4,
            backgroundColor: ctxColors.transparentWhite,
          }}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MinimizingButton
            style={{
              borderRadius: 99,
              paddingHorizontal: 4,
              paddingVertical: 4,
              backgroundColor: ctxColors.transparentBlack,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <CloseIcon color={ctxColors.white} size={ctxIconSizes.lg} />
          </MinimizingButton>
          <MinimizingButton
            style={{
              borderRadius: 99,
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: ctxColors.transparentBlack,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MusicIcon size={ctxIconSizes.sm} color={ctxColors.white} />
            <BaseText style={{ marginLeft: 2, color: ctxColors.white }}>
              Add Sound
            </BaseText>
          </MinimizingButton>
          <MinimizingButton
            style={{
              borderRadius: 99,
              paddingHorizontal: 6,
              paddingVertical: 6,
              backgroundColor: ctxColors.transparentBlack,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SparkleIcon color={ctxColors.white} size={ctxIconSizes.sm} />
          </MinimizingButton>
        </View>

        <View
          style={{
            marginLeft: "auto",
            marginTop: isMenuOpen ? "20%" : "40%",
            borderRadius: 99,
            paddingHorizontal: 4,
            paddingTop: 10,
            backgroundColor: ctxColors.transparentBlack,
            alignItems: "center",
          }}
        >
          <UploadMenuItem
            onPress={() =>
              setCameraFacingDiretction(
                cameraFacingDirection === "front" ? "back" : "front"
              )
            }
          >
            <RotateIcon color={ctxColors.white} size={ctxIconSizes.sm} />
          </UploadMenuItem>
          <UploadMenuItem style={{ marginTop: 8 }}>
            <TimerIcon color={ctxColors.white} size={ctxIconSizes.lg} />
          </UploadMenuItem>
          <UploadMenuItem
            style={{ marginTop: 8 }}
            onPress={() => {
              if (menuTimer === "15s") {
                setMenuTimer("3m");
              } else {
                setMenuTimer("15s");
              }
            }}
          >
            <BaseText
              style={{
                fontSize: ctxFontSizes.sm,
                fontWeight: "bold",
                color: ctxColors.white,
              }}
            >
              {menuTimer}
            </BaseText>
          </UploadMenuItem>
          <UploadMenuItem style={{ marginTop: 8 }}>
            <SparklesIcon color={ctxColors.white} size={ctxIconSizes.base} />
          </UploadMenuItem>
          <UploadMenuItem style={{ marginTop: 8 }}>
            <BaseText
              style={{ fontSize: ctxFontSizes.lg, color: ctxColors.white }}
            >
              1x
            </BaseText>
          </UploadMenuItem>
          <UploadMenuItem style={{ marginTop: 8 }}>
            <PersonGreenScreenIcon
              color={ctxColors.white}
              size={ctxIconSizes.xs}
            />
          </UploadMenuItem>

          <Animated.View style={menuStyle}>
            <UploadMenuItem style={{ marginTop: 8 }}>
              <RetouchIcon color={ctxColors.white} size={ctxIconSizes.xs2} />
            </UploadMenuItem>
            <UploadMenuItem style={{ marginTop: 8 }}>
              <ColorFilterIcon color={ctxColors.white} size={ctxIconSizes.sm} />
            </UploadMenuItem>
            <UploadMenuItem style={{ marginTop: 8 }}>
              <FlashIcon color={ctxColors.white} size={ctxIconSizes.sm} />
            </UploadMenuItem>
            <UploadMenuItem style={{ marginTop: 8 }}>
              <LightIcon color={ctxColors.white} size={ctxIconSizes.sm} />
            </UploadMenuItem>
            
          </Animated.View>

          <UploadMenuItem style={{ marginTop: 8 }} onPress={toggleMenu}>
            <KeyboardArrowDownIcon
              style={{
                transform: [{ rotate: isMenuOpen ? "180deg" : "0deg" }],
              }}
              color={ctxColors.white}
              size={ctxIconSizes.lg}
            />
          </UploadMenuItem>
        </View>

        <View
          style={{
            marginTop: "auto",
            marginBottom: 32,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={openGallery}
            style={{
              backgroundColor: "#333",
              borderRadius: 12,
            }}
          >
            <Image
              source={selectedImage && { uri: selectedImage }}
              style={{ width: 50, height: 50, borderRadius: 12 }}
            />
          </Pressable>
          <View
            style={{
              borderRadius: 99,
              width: 80,
              height: 80,
              backgroundColor: ctxColors.white,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MinimizingButton
              style={{
                borderRadius: 99,
                width: 70,
                height: 70,
                backgroundColor: ctxColors.primary,
              }}
            />
          </View>
          <View style={{ width: 50, height: 50 }}></View>
        </View>
      </View>
    </ScreenContainer>
  );
}

function UploadMenuItem({ style, children, ...rest }) {
  return (
    <MinimizingButton
      style={[
        { borderRadius: 0, paddingHorizontal: 4, paddingVertical: 4 },
        style,
      ]}
      {...rest}
    >
      {children}
    </MinimizingButton>
  );
}
