import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { ThText } from "../components/ThemedComponents";
import { ThemeProvider } from "../styles/ThemeContext";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export default function AppNavigator() {
  const [fontsLoaded] = useFonts({
    "roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "roboto-medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "roboto-regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <ThemeProvider>
      <NavigationContainer>
        {!fontsLoaded ? (
          <ActivityIndicator />
        ) : isLoggedIn ? (
          <MainNavigator />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </ThemeProvider>
  );
}
