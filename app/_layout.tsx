import { Stack } from "expo-router";
import AuthContextProvider from '../context/AuthContextProvider';

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login/index" />
        <Stack.Screen name="signup/index" />
        <Stack.Screen name="home/index" />
      </Stack>
    </AuthContextProvider>
  );
}