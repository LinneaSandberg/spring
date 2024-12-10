import { SplashScreen, Stack } from "expo-router";
import AuthContextProvider from '../context/AuthContextProvider';
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Uncut: require('../assets/fonts/UncutSans-Variable.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login/index" />
          <Stack.Screen name="login/forgot" />
          <Stack.Screen name="signup/index" />
          <Stack.Screen name="welcome/index" />
          <Stack.Screen name="home/index" />
          <Stack.Screen name="home/budget" />
          <Stack.Screen name="home/add" />
          <Stack.Screen name="home/edit" />
        </Stack>
      </ThemeProvider>
    </AuthContextProvider>
  );
}