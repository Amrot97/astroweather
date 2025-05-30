import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
  StatusBar,
} from 'react-native';
import { Appbar, Text, FAB, Portal, Provider, useTheme, MD3Theme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';

// Components
import { DashboardHeader } from '../components/DashboardHeader';
import { CosmicScore } from '../components/CosmicScore';
import { MoonTracker } from '../components/MoonTracker';
import { LifeAreaFocus } from '../components/LifeAreaFocus';
import { TransitAlerts } from '../components/TransitAlerts';
import WeeklyPreviewModal from '../components/WeeklyPreviewModal';
import RetrogradeStatus from '../components/RetrogradeStatus';

// Data
import {
  generateCosmicScore,
  generateMoonData,
  generateLifeAreaFocus,
  generateTransitAlerts,
  getTimeBasedContent,
  mockUserProfile,
  AstroWeeklyForecast as AstroWeeklyForecastType,
  generateAstroWeeklyForecast,
  RetrogradePlanetInfo as RetrogradePlanetInfoType,
  generateRetrogradeInfo,
} from '../data/mockData';

import { cosmicGradients } from '../theme/theme';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const styles = dynamicStyles(theme);
  const [refreshing, setRefreshing] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  // Data states
  const [cosmicScore, setCosmicScore] = useState(generateCosmicScore());
  const [moonData, setMoonData] = useState(generateMoonData());
  const [lifeAreas, setLifeAreas] = useState(generateLifeAreaFocus());
  const [transitAlerts, setTransitAlerts] = useState(generateTransitAlerts());
  const [timeContent, setTimeContent] = useState(getTimeBasedContent());
  const [userProfile] = useState(mockUserProfile);

  // State for Weekly Preview Modal
  const [astroWeeklyForecast, setAstroWeeklyForecast] = useState<AstroWeeklyForecastType | null>(null);
  const [isWeeklyModalVisible, setIsWeeklyModalVisible] = useState(false);

  // State for Retrograde Status
  const [retrogradeInfo, setRetrogradeInfo] = useState<RetrogradePlanetInfoType[]>([]);

  const refreshData = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCosmicScore(generateCosmicScore());
    setMoonData(generateMoonData());
    setLifeAreas(generateLifeAreaFocus());
    setTransitAlerts(generateTransitAlerts());
    setTimeContent(getTimeBasedContent());
    setAstroWeeklyForecast(generateAstroWeeklyForecast());
    setRetrogradeInfo(generateRetrogradeInfo());
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

    // Load initial weekly forecast data
    setAstroWeeklyForecast(generateAstroWeeklyForecast());
    // Load initial retrograde info
    setRetrogradeInfo(generateRetrogradeInfo());

    return () => {
      clearInterval(hourlyInterval);
    };
  }, []);

  const getHeaderGradientColors = () => {
    // Always use primary purple gradient for consistency with Celestial Type
    return cosmicGradients.primary;
  };

  return (
    <Provider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        <LinearGradient
          colors={getHeaderGradientColors()}
          style={styles.headerBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Appbar.Header style={styles.appBar} elevated={false}>
            <Appbar.Content
              title="AstroWeather"
              titleStyle={styles.headerTitle}
              subtitle={format(new Date(), 'EEEE, MMMM d')}
              subtitleStyle={styles.headerSubtitle}
              style={{ alignItems: 'flex-start' }}
            />
            <Appbar.Action
              icon="account-circle"
              onPress={() => { /* TODO: Navigation to profile */ }}
              color="white"
            />
          </Appbar.Header>
        </LinearGradient>

        {/* Main Content */}
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
            {/* New Dashboard Header Card */}
            <DashboardHeader userProfile={userProfile} timeContent={timeContent} />

            {/* Cosmic Score */}
            <CosmicScore data={cosmicScore} />

            {/* Moon Tracker */}
            <MoonTracker data={moonData} />

            {/* Life Area Focus */}
            <LifeAreaFocus data={lifeAreas} />

            {/* Transit Alerts */}
            <TransitAlerts data={transitAlerts} />

            {/* Retrograde Status - New Component */}
            <RetrogradeStatus data={retrogradeInfo} />

            {/* Bottom Spacing */}
            <View style={styles.bottomSpacing} />
          </View>
        </ScrollView>

        {/* Floating Action Button */}
        <Portal>
          <FAB.Group
            open={fabOpen}
            visible
            icon={fabOpen ? 'close' : 'plus'}
            actions={[
              {
                icon: 'calendar-week',
                label: 'Weekly Preview',
                onPress: () => setIsWeeklyModalVisible(true),
              },
            ]}
            onStateChange={({ open }) => setFabOpen(open)}
            onPress={() => {
              if (fabOpen) {
                // Already handled by onStateChange
              }
            }}
            style={styles.fab}
            fabStyle={{ backgroundColor: theme.colors.primary }}
          />
          
          <WeeklyPreviewModal 
            visible={isWeeklyModalVisible} 
            onClose={() => setIsWeeklyModalVisible(false)} 
            data={astroWeeklyForecast} 
          /> 
          
        </Portal>
      </View>
    </Provider>
  );
};

const dynamicStyles = (theme: MD3Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1E',
    width: '100%',
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
  scrollView: {
    flex: 1,
    width: '100%',
  },
  content: {
    paddingBottom: 80,
    width: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  bottomSpacing: {
    height: 20,
  },
}); 