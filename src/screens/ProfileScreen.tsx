import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Avatar, List, Switch } from 'react-native-paper';
import { BaseScreen } from './BaseScreen';

export const ProfileScreen: React.FC = () => {
  return (
    <BaseScreen title="Profile">
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Avatar.Image
            size={80}
            source={{ uri: 'https://ui-avatars.com/api/?name=User&background=6B4EFF&color=fff' }}
          />
          <Text variant="headlineMedium" style={styles.name}>
            User Name
          </Text>
          <Text variant="bodyLarge" style={styles.email}>
            user@example.com
          </Text>
        </View>

        <List.Section>
          <List.Subheader style={styles.sectionTitle}>Preferences</List.Subheader>
          <List.Item
            title="Notifications"
            left={props => <List.Icon {...props} icon="bell" />}
            right={props => <Switch value={true} />}
          />
          <List.Item
            title="Dark Mode"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={props => <Switch value={true} />}
          />
        </List.Section>

        <List.Section>
          <List.Subheader style={styles.sectionTitle}>Account</List.Subheader>
          <List.Item
            title="Edit Profile"
            left={props => <List.Icon {...props} icon="account-edit" />}
          />
          <List.Item
            title="Privacy Settings"
            left={props => <List.Icon {...props} icon="shield-account" />}
          />
          <List.Item
            title="Help & Support"
            left={props => <List.Icon {...props} icon="help-circle" />}
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
  header: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  name: {
    marginTop: 16,
    color: 'white',
  },
  email: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  sectionTitle: {
    color: 'white',
  },
}); 