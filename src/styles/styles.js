import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width * 1; //Multiply by 1 to get 100%
const screenHeight = Dimensions.get("window").height * 1; //Multiply by 1 to get 100%
const screenHorizontalSpacing = 16;

export const styles = StyleSheet.create({
  /******************************Headers******************************/
  headerTitle: {
    marginLeft: 14,
  },
  headerRightIconsContainer: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightIcon: {
    marginLeft: 16,
  },
  /******************************Screen******************************/
  screenContainer: {
    width: screenWidth,
    flex: 1,
  },
  screenMarginAndPadHorizontal: {
    marginHorizontal: screenHorizontalSpacing / 2,
    paddingHorizontal: screenHorizontalSpacing / 2,
  },
  screenPadHorizontal: {
    paddingHorizontal: screenHorizontalSpacing,
  },
  screenPadLeft: {
    paddingLeft: screenHorizontalSpacing,
  },
  screenPadRight: {
    paddingRight: screenHorizontalSpacing,
  },
  /******************************Videos******************************/
  videoView: {
    width: screenWidth,
    height: screenHeight * 0.25,
  },
  /******************************Buttons******************************/
  baseButton: {
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  iconTextButton: {
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
