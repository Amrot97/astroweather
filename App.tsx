import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View, Platform, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from './src/theme/theme';
import { HomeScreen } from './src/screens/HomeScreen';

const { width } = Dimensions.get('window');

export default function App() {
  const colorScheme = useColorScheme();
  // Always use dark theme to match Celestial Type
  const currentTheme = darkTheme;

  const appPaperTheme = {
    ...currentTheme,
    fonts: currentTheme.fonts,
    icons: (props: any) => <MaterialCommunityIcons name={props.name} color={props.color} size={props.size} style={props.style} />,
  };

  // Web-specific wrapper for proper mobile rendering
  const AppContent = () => (
    <SafeAreaProvider>
      <PaperProvider theme={appPaperTheme}>
        <NavigationContainer>
          <StatusBar style="light" />
          <HomeScreen />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );

  // Add web-specific container for better mobile rendering
  if (Platform.OS === 'web') {
    return (
      <View style={{
        flex: 1,
        maxWidth: 428, // Max width for mobile view
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        backgroundColor: currentTheme.colors.background,
        overflow: 'hidden',
      }}>
        <AppContent />
      </View>
    );
  }

  return <AppContent />;
} 