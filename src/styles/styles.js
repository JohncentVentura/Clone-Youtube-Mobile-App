import { Dimensions, StyleSheet } from "react-native";

export const screenWidth = Dimensions.get("window").width * 1; //Multiply by 1 to get 100%
export const screenHeight = Dimensions.get("window").height * 1; //Multiply by 1 to get 100%
export const globalHorizontalSpacing = 16;

export const styles = StyleSheet.create({
  /******************************Headers******************************/
  headerLeft: {
    marginVertical: 8,
  },
  headerTitle: {
    marginLeft: 14,
  },
  headerRightContainer: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    marginLeft: 24,
    marginVertical: 8,
  },
  /******************************Containers******************************/
  screenContainer: {
    width: screenWidth,
    flex: 1,
  },
  paddedHorizontalContainer: {
    paddingHorizontal: globalHorizontalSpacing,
    width: "100%",
  },
  /******************************Videos******************************/
  videoView: {
    width: "100%`",
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
