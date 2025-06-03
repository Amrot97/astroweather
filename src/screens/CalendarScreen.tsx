import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { BaseScreen } from './BaseScreen';

export const CalendarScreen: React.FC = () => {
  return (
    <BaseScreen title="Calendar">
      <ScrollView style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Weekly Overview
        </Text>
        {/* Calendar content will be added here */}
      </ScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 16,
    color: 'white',
  },
}); 