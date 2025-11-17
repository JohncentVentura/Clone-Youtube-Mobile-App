import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, View } from "react-native";
import {
  ScreenContainer,
  LinearGradientView,
  DrawerDivider,
} from "../components/ContainerComponents";
import {
  CameraIcon,
  CloseIcon,
  MusicIcon,
  SparkleIcon,
} from "../components/IconComponents";
import { MinimizingButton } from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { useSetImageData } from "../hooks/useSetImageData";
import { screenWidth, screenHeight, styles } from "../styles/styles";

export default function UploadScreen() {
  const [permission, requestCameraPermission] = useCameraPermissions();
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const cameraRef = useRef(null);
  const [uploadBackroundImages, setUploadBackroundImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
            //justifyContent: "flex-end",
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
        facing="front"
        ref={cameraRef}
        isLoading={isLoading}
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
          <View
            style={{
              borderRadius: 99,
              padding: 4,
              backgroundColor: ctxColors.transparentBlack,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CloseIcon color={ctxColors.white} size={ctxIconSizes.lg} />
          </View>
          <View
            style={{
              borderRadius: 99,
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: ctxColors.transparentBlack,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MusicIcon color={ctxColors.white} size={ctxIconSizes.lg} />
            <BaseText color={ctxColors.white}>Add Sound</BaseText>
          </View>
          <View
            style={{
              borderRadius: 99,
              padding: 6,
              backgroundColor: ctxColors.transparentBlack,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SparkleIcon color={ctxColors.white} size={ctxIconSizes.sm} />
          </View>
        </View>
        <View
          style={{
            marginLeft: "auto",
            marginTop: "50%",
            borderRadius: 99,
            paddingHorizontal: 8,
            paddingVertical: 10,
            backgroundColor: ctxColors.transparentBlack,
          }}
        >
          <Pressable
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <CameraIcon color={ctxColors.white} size={ctxIconSizes.sm} />
          </Pressable>
          <Pressable
            style={({ pressed }) => ({
              marginTop: 10,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <CameraIcon color={ctxColors.white} size={ctxIconSizes.sm} />
          </Pressable>
          <Pressable
            style={({ pressed }) => ({
              marginTop: 10,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <CameraIcon color={ctxColors.white} size={ctxIconSizes.sm} />
          </Pressable>
          <Pressable
            style={({ pressed }) => ({
              marginTop: 10,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <CameraIcon color={ctxColors.white} size={ctxIconSizes.sm} />
          </Pressable>
          <Pressable
            style={({ pressed }) => ({
              marginTop: 10,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <CameraIcon color={ctxColors.white} size={ctxIconSizes.sm} />
          </Pressable>
          <Pressable
            style={({ pressed }) => ({
              marginTop: 10,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <CameraIcon color={ctxColors.white} size={ctxIconSizes.sm} />
          </Pressable>
          <Pressable
            style={({ pressed }) => ({
              marginTop: 10,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <CameraIcon color={ctxColors.white} size={ctxIconSizes.sm} />
          </Pressable>
        </View>
        <View
          style={{
            marginTop: "auto",
            marginBottom: 32,
            width: "100%",
            alignItems: "center",
          }}
        >
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
            <View
              style={{
                borderRadius: 99,
                width: 70,
                height: 70,
                backgroundColor: ctxColors.primary,
              }}
            ></View>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}
