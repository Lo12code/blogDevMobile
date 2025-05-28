import '../firebase/config.js';

import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const headerBackgroundColor = colorScheme === 'dark' ? '#1c1c1c' : '#f2f2f2'; // Exemplo de cores
  const headerTextColor = colorScheme === 'dark' ? '#ffffff' : '#000000'; // Exemplo de cores


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: headerBackgroundColor, // Cor de fundo do header
          },
          headerTintColor: headerTextColor, // Cor do título e do botão de voltar
          headerTitleStyle: {
            fontWeight: 'bold', // Estilo do texto do título
            // fontFamily: 'SuaFonteAqui', // Se tiver fontes customizadas
          },
          // Você pode adicionar outras opções padrão aqui
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
