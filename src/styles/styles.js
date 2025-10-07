import { Dimensions, StyleSheet } from "react-native";

//TODO: export and use screenWidth and screenHeight to other components
//TODO: maybe use useWindowDimensions hook?
export const screenWidth = Dimensions.get("window").width * 1; //Multiply by 1 to get 100%
export const screenHeight = Dimensions.get("window").height * 1; //Multiply by 1 to get 100%
export const globalHorizontalSpacing = 16;

export const styles = StyleSheet.create({
  /******************************Headers******************************/
  headerLeft: {
    marginLeft: globalHorizontalSpacing,
  },
  headerTitle: {
    marginLeft: 12,
  },
  headerRightContainer: {
    marginRight: globalHorizontalSpacing,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    marginLeft: 20,
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
  /******************************Images******************************/
  coverImages: {
    borderRadius: 8,
    width: "100%",
    height: screenHeight * 0.15,
  },
  /******************************Videos******************************/
  videoView: {
    width: "100%`",
    height: screenHeight * 0.25,
  },
  /******************************Buttons******************************/
  baseButton: {
    borderRadius: 9999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  iconTextButton: {
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  wideButton: {
    borderRadius: 9999,
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
