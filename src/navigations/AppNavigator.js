import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SearchProvider } from "../context/SearchContext";
import { ThemeProvider } from "../context/ThemeContext";
import { UIProvider } from "../context/UIContext";
import { navigationRef } from "./NavigationConfig";
import { fontPaths } from "../styles/paths";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isFontsLoaded] = useFonts({
    "roboto-bold": fontPaths.robotoBold,
    "roboto-medium": fontPaths.robotoMedium,
    "roboto-regular": fontPaths.robotoRegular,
  });

  if (!isFontsLoaded) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <SafeAreaProvider>
      <SearchProvider>
        <ThemeProvider>
          <UIProvider>
            <NavigationContainer ref={navigationRef}>
              {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
            </NavigationContainer>
          </UIProvider>
        </ThemeProvider>
      </SearchProvider>
    </SafeAreaProvider>
  );
}
