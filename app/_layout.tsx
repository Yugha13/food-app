import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { store } from '@/store/store';
import { theme } from '@/constants/theme';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </ReduxProvider>
  );
}