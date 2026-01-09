import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "@/hooks/useThem";
import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL!,
  {
    unsavedChangesWarning: false,
  }
);

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConvexProvider client={convex}>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ThemeProvider>
      </ConvexProvider>
    </GestureHandlerRootView>
  );
}
