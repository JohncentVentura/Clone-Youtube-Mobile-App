import { Dimensions, StyleSheet } from "react-native";

//Maybe use useWindowDimensions hook?
const screenWidth = Dimensions.get("window").width * 1; //Multiply by 1 to get 100%
const screenHeight = Dimensions.get("window").height * 1; //Multiply by 1 to get 100%
const globalHorizontalSpacing = 16;

export const styles = StyleSheet.create({
  /******************************Headers******************************/
  headerLeftIcon: {
    marginLeft: globalHorizontalSpacing,
  },
  headerTitleIcon: {
    marginLeft: 4,
  },
  headerRightIconsContainer: {
    marginRight: globalHorizontalSpacing,
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightIcon: {
    marginLeft: 24,
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
  mainVideoView: {
    width: screenWidth,
    height: screenHeight * 0.25,
  },
  /******************************Buttons******************************/
  baseButton: {
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
