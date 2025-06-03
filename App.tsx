import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Navigation } from './src/navigation/Navigation';
import { theme } from './src/theme/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
} 