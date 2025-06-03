import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import { HomeScreen } from '../screens/HomeScreen';
import { MoonTrackerScreen } from '../screens/MoonTrackerScreen';
import { LifeAreasScreen } from '../screens/LifeAreasScreen';
import { RetrogradeStatusScreen } from '../screens/RetrogradeStatusScreen';
import { CosmicInsightsScreen } from '../screens/CosmicInsightsScreen';
import { RootStackParamList, MainTabParamList } from './types';

// Placeholder screens until we create the actual components
const PlaceholderScreen = ({ title }: { title: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F0F1E' }}>
    <Text style={{ color: '#FFFFFF', fontSize: 20 }}>{title}</Text>
  </View>
);

const ProfileScreen = () => <PlaceholderScreen title="Profile" />;
const NotificationsScreen = () => <PlaceholderScreen title="Notifications" />;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1F1F33',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#6B4EFF',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0F0F1E' },
        }}
      >
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="MoonTracker" component={MoonTrackerScreen} />
        <Stack.Screen name="LifeAreas" component={LifeAreasScreen} />
        <Stack.Screen name="RetrogradeStatus" component={RetrogradeStatusScreen} />
        <Stack.Screen name="CosmicInsights" component={CosmicInsightsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 