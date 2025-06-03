import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Main: undefined;
  MoonTracker: undefined;
  LifeAreas: undefined;
  RetrogradeStatus: undefined;
  CosmicInsights: undefined;
  Profile: undefined;
  Notifications: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Profile: undefined;
  Notifications: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>; 