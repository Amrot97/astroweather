import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BaseScreen } from './BaseScreen';
import { RootStackNavigationProp } from '../navigation/types';
import { generateMoonData } from '../data/mockData';

export const MoonTrackerScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const moonData = generateMoonData();

  return (
    <BaseScreen title="Moon Tracker" showBackButton>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            Moon Phase: {moonData.phase}
          </Text>
          
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Emotional Weather
            </Text>
            <Text variant="bodyLarge" style={styles.description}>
              {moonData.emotionalWeather}
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Current Mood
            </Text>
            <Text variant="bodyLarge" style={styles.description}>
              {moonData.mood}
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Moon's Position
            </Text>
            <Text variant="bodyLarge" style={styles.description}>
              {moonData.position}
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Best Activities
            </Text>
            <Text variant="bodyLarge" style={styles.description}>
              {moonData.bestActivities}
            </Text>
          </View>
        </View>
      </ScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#1F1F33',
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    color: '#6B4EFF',
    marginBottom: 8,
  },
  description: {
    color: '#FFFFFF',
    lineHeight: 24,
  },
}); 