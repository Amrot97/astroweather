import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';

// Components
import { DashboardHeader } from '../components/DashboardHeader';
import { CosmicScore } from '../components/CosmicScore';
import { MoonTracker } from '../components/MoonTracker';
import { LifeAreaFocus } from '../components/LifeAreaFocus';
import { TransitAlerts } from '../components/TransitAlerts';
import { BaseScreen } from './BaseScreen';

// Navigation
import { RootStackNavigationProp } from '../navigation/types';

// Data
import {
  generateCosmicScore,
  generateMoonData,
  generateLifeAreaFocus,
  generateTransitAlerts,
  getTimeBasedContent,
  mockUserProfile,
} from '../data/mockData';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  // Data states
  const [cosmicScore, setCosmicScore] = useState(generateCosmicScore());
  const [moonData, setMoonData] = useState(generateMoonData());
  const [lifeAreas, setLifeAreas] = useState(generateLifeAreaFocus());
  const [transitAlerts, setTransitAlerts] = useState(generateTransitAlerts());
  const [timeContent, setTimeContent] = useState(getTimeBasedContent());
  const [userProfile] = useState(mockUserProfile);

  const refreshData = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCosmicScore(generateCosmicScore());
    setMoonData(generateMoonData());
    setLifeAreas(generateLifeAreaFocus());
    setTransitAlerts(generateTransitAlerts());
    setTimeContent(getTimeBasedContent());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    refreshData();
    setTimeout(() => setRefreshing(false), 1000);
  }, [refreshData]);

  useEffect(() => {
    // Update time-based content every hour
    const hourlyInterval = setInterval(() => {
      setTimeContent(getTimeBasedContent());
    }, 3600000);

    return () => {
      clearInterval(hourlyInterval);
    };
  }, []);

  return (
    <BaseScreen title="AstroWeather">
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View style={styles.content}>
          {/* Dashboard Header */}
          <DashboardHeader userProfile={userProfile} timeContent={timeContent} />

          {/* Cosmic Score */}
          <CosmicScore data={cosmicScore} />

          {/* Moon Tracker */}
          <MoonTracker 
            data={moonData}
            onPress={() => navigation.navigate('MoonTracker')}
          />

          {/* Life Area Focus */}
          <LifeAreaFocus 
            data={lifeAreas}
            onPress={() => navigation.navigate('LifeAreas')}
          />

          {/* Transit Alerts */}
          <TransitAlerts 
            data={transitAlerts}
            onPress={() => navigation.navigate('Notifications')}
          />

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 80,
  },
  bottomSpacing: {
    height: 20,
  },
}); 