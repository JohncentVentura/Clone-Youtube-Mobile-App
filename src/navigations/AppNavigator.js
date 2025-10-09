import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ModalProvider } from "../context/ModalContext";
import { SearchProvider } from "../context/SearchContext";
import { ThemeProvider } from "../context/ThemeContext";
import { fontPaths } from "../utils/paths";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export default function AppNavigator() {
  const [isFontsLoaded] = useFonts({
    "roboto-bold": fontPaths.robotoBold,
    "roboto-medium": fontPaths.robotoMedium,
    "roboto-regular": fontPaths.robotoRegular,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isFontsLoaded) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <SafeAreaProvider>
      <ModalProvider>
        <SearchProvider>
          <ThemeProvider>
            <NavigationContainer>
              {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
            </NavigationContainer>
          </ThemeProvider>
        </SearchProvider>
      </ModalProvider>
    </SafeAreaProvider>
  );
}
