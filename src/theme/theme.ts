import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';
import { MD3Type } from 'react-native-paper/lib/typescript/types';

const fontConfig = {
  fontFamily: 'System',
} as Partial<MD3Type>;

// Only using dark theme to match Celestial Type
export const darkTheme = {
  ...MD3DarkTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#8B5CF6',
    onPrimary: '#FFFFFF',
    primaryContainer: '#6B46C1',
    onPrimaryContainer: '#E9D5FF',
    secondary: '#A78BFA',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#7C3AED',
    onSecondaryContainer: '#EDE9FE',
    tertiary: '#C084FC',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#9333EA',
    onTertiaryContainer: '#F3E8FF',
    error: '#F87171',
    onError: '#FFFFFF',
    errorContainer: '#DC2626',
    onErrorContainer: '#FEE2E2',
    background: '#0F0F1E',
    onBackground: '#E5E5E7',
    surface: '#1A1A2E',
    onSurface: '#E5E5E7',
    surfaceVariant: '#252538',
    onSurfaceVariant: '#C8C6CA',
    outline: '#4A4A5A',
    outlineVariant: '#2D2D3D',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#E5E5E7',
    inverseOnSurface: '#0F0F1E',
    inversePrimary: '#6B46C1',
    elevation: {
      level0: 'transparent',
      level1: '#1F1F33',
      level2: '#252538',
      level3: '#2A2A3D',
      level4: '#2F2F42',
      level5: '#343447',
    },
    surfaceDisabled: 'rgba(229, 229, 231, 0.12)',
    onSurfaceDisabled: 'rgba(229, 229, 231, 0.38)',
    backdrop: 'rgba(15, 15, 30, 0.8)',
  },
};

// Using dark theme as light theme too for consistency
export const lightTheme = darkTheme;

export const cosmicGradients = {
  primary: ['#8B5CF6', '#6B46C1', '#4C1D95'],
  secondary: ['#A78BFA', '#8B5CF6', '#7C3AED'],
  accent: ['#C084FC', '#A78BFA', '#8B5CF6'],
  dark: ['#1A1A2E', '#0F0F1E', '#09090F'],
  card: ['#252538', '#1F1F33', '#1A1A2E'],
  glow: ['#8B5CF6', '#A78BFA', '#C084FC'],
  // Time-based gradients with purple theme
  morning: ['#8B5CF6', '#A78BFA', '#C084FC'],
  afternoon: ['#7C3AED', '#8B5CF6', '#A78BFA'],
  evening: ['#6B46C1', '#7C3AED', '#8B5CF6'],
  night: ['#4C1D95', '#6B46C1', '#7C3AED'],
};

export const planetColors = {
  sun: '#F59E0B',
  moon: '#E0E7FF',
  mercury: '#8B5CF6',
  venus: '#EC4899',
  mars: '#EF4444',
  jupiter: '#A78BFA',
  saturn: '#6B7280',
  uranus: '#06B6D4',
  neptune: '#3B82F6',
  pluto: '#7C3AED',
};

export const zodiacColors = {
  aries: '#EF4444',
  taurus: '#10B981',
  gemini: '#F59E0B',
  cancer: '#E0E7FF',
  leo: '#F97316',
  virgo: '#8B7355',
  libra: '#EC4899',
  scorpio: '#DC2626',
  sagittarius: '#9333EA',
  capricorn: '#6B7280',
  aquarius: '#06B6D4',
  pisces: '#8B5CF6',
};

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#6B4EFF',
    secondary: '#4B2EFF',
    background: '#0F0F1E',
    surface: '#1F1F33',
    text: '#FFFFFF',
  },
}; 