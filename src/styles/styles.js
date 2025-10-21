import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width * 1; //Multiply by 1 to get 100%
const screenHeight = Dimensions.get("window").height * 1; //Multiply by 1 to get 100%
const screenHorizontalSpacing = 16;

export const styles = StyleSheet.create({
  //#region Main & Headers
  mainBottomTab: {
    borderTopWidth: 2,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    marginLeft: 16,
  },
  headerRightIconsContainer: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightIcon: {
    marginLeft: 24,
  },
  //#endregion
  //#region Screen
  screenContainer: {
    position: "relative",
    width: screenWidth,
    flex: 1,
  },
  screenPadHorizontal: {
    paddingHorizontal: screenHorizontalSpacing,
  },
  screenPadLeft: {
    paddingLeft: screenHorizontalSpacing,
  },
  //#endregion
  //#region Videos
  videoView: {
    width: screenWidth,
    height: screenHeight * 0.25,
  },
  //#endregion
  //#region Buttons
  baseButton: {
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  smallIconTextButton: {
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  wideButton: {
    borderRadius: 99,
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  
});
