import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BaseScreen } from './BaseScreen';
import { RootStackNavigationProp } from '../navigation/types';
import { generateRetrogradeInfo } from '../data/mockData';

export const RetrogradeStatusScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const retrogradeInfo = generateRetrogradeInfo();

  return (
    <BaseScreen title="Retrograde Status" showBackButton>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text variant="bodyLarge" style={styles.intro}>
            Planetary retrogrades can bring delays, introspection, and opportunities for review. Here's what's happening now:
          </Text>

          {retrogradeInfo.map((planet) => (
            <View key={planet.id} style={styles.section}>
              <View style={styles.header}>
                <Text variant="headlineSmall" style={styles.symbol}>
                  {planet.astrologicalSymbol}
                </Text>
                <View style={styles.titleContainer}>
                  <Text variant="titleLarge" style={styles.title}>
                    {planet.planetName}
                  </Text>
                  <Text
                    variant="bodyLarge"
                    style={[
                      styles.status,
                      planet.isRetrograde ? styles.retrograde : styles.direct,
                    ]}
                  >
                    {planet.statusText}
                  </Text>
                </View>
              </View>

              {planet.datesLabel && planet.datesValue && (
                <View style={styles.dates}>
                  <Text variant="titleMedium" style={styles.datesLabel}>
                    {planet.datesLabel}
                  </Text>
                  <Text variant="bodyLarge" style={styles.datesValue}>
                    {planet.datesValue}
                  </Text>
                </View>
              )}

              {planet.interpretation && (
                <View style={styles.interpretation}>
                  <Text variant="titleMedium" style={styles.interpretationTitle}>
                    What This Means
                  </Text>
                  <Text variant="bodyLarge" style={styles.interpretationText}>
                    {planet.interpretation}
                  </Text>
                </View>
              )}
            </View>
          ))}
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
  intro: {
    color: '#FFFFFF',
    marginBottom: 24,
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#1F1F33',
    padding: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  symbol: {
    fontSize: 32,
    marginRight: 12,
    color: '#FFFFFF',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
  },
  retrograde: {
    color: '#EF4444',
  },
  direct: {
    color: '#10B981',
  },
  dates: {
    marginBottom: 16,
  },
  datesLabel: {
    color: '#6B4EFF',
    marginBottom: 4,
  },
  datesValue: {
    color: '#FFFFFF',
  },
  interpretation: {
    borderTopWidth: 1,
    borderTopColor: '#2A2A4A',
    paddingTop: 16,
  },
  interpretationTitle: {
    color: '#6B4EFF',
    marginBottom: 8,
  },
  interpretationText: {
    color: '#FFFFFF',
    lineHeight: 24,
  },
}); 