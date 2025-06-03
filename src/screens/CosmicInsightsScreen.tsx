import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BaseScreen } from './BaseScreen';
import { RootStackNavigationProp } from '../navigation/types';
import { generateCosmicScore } from '../data/mockData';

export const CosmicInsightsScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const cosmicScore = generateCosmicScore();

  return (
    <BaseScreen title="Cosmic Insights" showBackButton>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.scoreSection}>
            <Text variant="headlineSmall" style={styles.emoji}>
              {cosmicScore.weatherEmoji}
            </Text>
            <Text variant="headlineMedium" style={styles.score}>
              {cosmicScore.score}/{cosmicScore.maxScore}
            </Text>
            <Text variant="titleLarge" style={styles.description}>
              {cosmicScore.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Today's Energy
            </Text>
            <Text variant="bodyLarge" style={styles.details}>
              {cosmicScore.details}
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Best Time for Action
            </Text>
            <Text variant="bodyLarge" style={styles.details}>
              The most favorable cosmic alignment occurs during the waxing moon phase, when the moon is moving from new to full. This period is ideal for initiating new projects and making important decisions.
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Areas of Focus
            </Text>
            <Text variant="bodyLarge" style={styles.details}>
              • Personal growth and self-reflection{'\n'}
              • Career advancement and professional goals{'\n'}
              • Relationship building and social connections{'\n'}
              • Health and wellness practices
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Cosmic Advice
            </Text>
            <Text variant="bodyLarge" style={styles.details}>
              Trust your intuition and stay aligned with your higher purpose. The current cosmic energy supports your growth and transformation. Take advantage of this positive period to make meaningful progress in your life.
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
  scoreSection: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#1F1F33',
    padding: 24,
    borderRadius: 12,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  score: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    color: '#6B4EFF',
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
    marginBottom: 12,
  },
  details: {
    color: '#FFFFFF',
    lineHeight: 24,
  },
}); 