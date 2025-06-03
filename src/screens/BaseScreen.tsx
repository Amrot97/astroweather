import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Appbar, useTheme, MD3Theme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns';

interface BaseScreenProps {
  title: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export const BaseScreen: React.FC<BaseScreenProps> = ({
  title,
  children,
  showBackButton = false,
  onBackPress,
}) => {
  const theme = useTheme();
  const styles = dynamicStyles(theme);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#6B4EFF', '#4B2EFF']}
        style={styles.headerBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Appbar.Header style={styles.appBar} elevated={false}>
          {showBackButton && (
            <Appbar.BackAction
              onPress={onBackPress}
              color="white"
            />
          )}
          <Appbar.Content
            title={title}
            titleStyle={styles.headerTitle}
            subtitle={format(new Date(), 'EEEE, MMMM d')}
            subtitleStyle={styles.headerSubtitle}
            style={{ alignItems: 'flex-start' }}
          />
        </Appbar.Header>
      </LinearGradient>

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const dynamicStyles = (theme: MD3Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1E',
  },
  headerBackground: {
    width: '100%',
  },
  appBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 4,
    fontFamily: theme.fonts.headlineLarge.fontFamily,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
    fontFamily: theme.fonts.titleSmall.fontFamily,
  },
  content: {
    flex: 1,
    padding: 16,
  },
}); 