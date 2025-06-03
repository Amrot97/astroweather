import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BaseScreen } from './BaseScreen';
import { RootStackNavigationProp } from '../navigation/types';
import { generateLifeAreaFocus } from '../data/mockData';

export const LifeAreasScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const lifeAreas = generateLifeAreaFocus();

  return (
    <BaseScreen title="Life Areas" showBackButton>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {lifeAreas.map((area, index) => (
            <View key={index} style={styles.section}>
              <View style={styles.header}>
                <Text variant="headlineSmall" style={styles.emoji}>
                  {area.emoji}
                </Text>
                <Text variant="titleLarge" style={styles.title}>
                  {area.name}
                </Text>
              </View>

              <View style={styles.details}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Planets
                </Text>
                <Text variant="bodyLarge" style={styles.description}>
                  {area.planets.join(', ')}
                </Text>

                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Energy
                </Text>
                <Text variant="bodyLarge" style={styles.description}>
                  {area.energy}
                </Text>

                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Recommended Activities
                </Text>
                <Text variant="bodyLarge" style={styles.description}>
                  {area.activities.join(', ')}
                </Text>
              </View>
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
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  title: {
    color: '#FFFFFF',
    flex: 1,
  },
  details: {
    marginTop: 8,
  },
  sectionTitle: {
    color: '#6B4EFF',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    color: '#FFFFFF',
    lineHeight: 24,
  },
}); 