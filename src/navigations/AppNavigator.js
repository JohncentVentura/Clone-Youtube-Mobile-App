import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { ThemeProvider } from "../styles/ThemeContext";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <ThemeProvider>
      <NavigationContainer>
        {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </ThemeProvider>
  );
}
