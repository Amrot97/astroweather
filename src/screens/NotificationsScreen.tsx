import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, List, Divider } from 'react-native-paper';
import { BaseScreen } from './BaseScreen';

export const NotificationsScreen: React.FC = () => {
  return (
    <BaseScreen title="Notifications">
      <ScrollView style={styles.container}>
        <List.Section>
          <List.Subheader style={styles.sectionTitle}>Today</List.Subheader>
          <List.Item
            title="Mercury Retrograde Alert"
            description="Mercury will be retrograde for the next 3 weeks"
            left={props => <List.Icon {...props} icon="alert" color="#FF6B6B" />}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Full Moon Tonight"
            description="The moon will be at its fullest at 8:30 PM"
            left={props => <List.Icon {...props} icon="moon-full" color="#6B4EFF" />}
          />
        </List.Section>

        <List.Section>
          <List.Subheader style={styles.sectionTitle}>This Week</List.Subheader>
          <List.Item
            title="Venus Transit"
            description="Venus will transit through your 7th house"
            left={props => <List.Icon {...props} icon="star" color="#FFD700" />}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Jupiter Alignment"
            description="Jupiter will align with your natal chart"
            left={props => <List.Icon {...props} icon="star" color="#FFD700" />}
          />
        </List.Section>
      </ScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    color: 'white',
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}); 