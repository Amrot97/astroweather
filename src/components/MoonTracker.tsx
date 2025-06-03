import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { Card, Text, Chip, Divider, useTheme, IconButton } from 'react-native-paper';
import { format, formatDistanceToNow } from 'date-fns';
import { MoonData } from '../data/mockData';
import { zodiacColors } from '../theme/theme';
import * as Haptics from 'expo-haptics';

interface Props {
  data: MoonData;
  onPress?: () => void;
}

export const MoonTracker: React.FC<Props> = ({ data, onPress }) => {
  const theme = useTheme();
  const [timeUntilChange, setTimeUntilChange] = useState('');
  const slideAnim = new Animated.Value(1);

  useEffect(() => {
    // Update countdown every minute
    const updateCountdown = () => {
      setTimeUntilChange(formatDistanceToNow(data.nextSignChange));
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);

    // Slide in animation
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 800,
      delay: 200,
      useNativeDriver: true,
    }).start();

    return () => clearInterval(interval);
  }, [data.nextSignChange]);

  const getElementColor = (element: string) => {
    const colors = {
      Fire: '#EF4444',
      Earth: '#10B981',
      Air: '#06B6D4',
      Water: '#8B5CF6',
    } as any;
    return colors[element] || theme.colors.primary;
  };

  const getZodiacColor = () => {
    return (zodiacColors as any)[data.sign.toLowerCase()] || theme.colors.primary;
  };

  const handleChipPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePress = () => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: slideAnim,
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Card style={styles.card} mode="elevated" elevation={1}>
          <Card.Content>
            <View style={styles.header}>
              <Text style={styles.title}>EMOTIONAL WEATHER</Text>
              <IconButton
                icon="information-outline"
                size={20}
                onPress={() => {}}
                style={styles.infoButton}
                iconColor="rgba(229, 229, 231, 0.6)"
              />
            </View>

            {/* Moon Phase Visual */}
            <View style={styles.moonPhaseContainer}>
              <View style={styles.moonInfo}>
                <Text style={styles.phaseEmoji}>{data.phaseEmoji}</Text>
                <View style={styles.moonDetails}>
                  <Text style={styles.moonSign}>
                    Moon in{' '}
                    <Text style={[styles.signName, { color: getZodiacColor() }]}>
                      {data.sign}
                    </Text>
                  </Text>
                  <Text style={styles.phase}>{data.phase}</Text>
                  <Chip
                    mode="flat"
                    style={[
                      styles.elementChip,
                      { backgroundColor: getElementColor(data.element) },
                    ]}
                    textStyle={styles.elementChipText}
                    onPress={handleChipPress}
                  >
                    {data.element} Element
                  </Chip>
                </View>
              </View>
            </View>

            <Divider style={styles.divider} />

            {/* Mood and Energy */}
            <View style={styles.moodContainer}>
              <Text style={styles.moodLabel}>Current Mood</Text>
              <Text style={styles.moodText}>{data.mood}</Text>
            </View>

            {/* Good For / Avoid Lists */}
            <View style={styles.listsContainer}>
              <View style={styles.listColumn}>
                <Text style={styles.listTitle}>✓ Good for</Text>
                {data.goodFor.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.listItemText}>• {item}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.listColumn}>
                <Text style={[styles.listTitle, { color: '#EC4899' }]}>
                  ✗ Avoid
                </Text>
                {data.avoid.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={[styles.listItemText, { color: 'rgba(229, 229, 231, 0.6)' }]}>
                      • {item}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Next Sign Change */}
            <View style={styles.nextChangeContainer}>
              <Text style={styles.nextChangeLabel}>Moon moves to next sign in</Text>
              <Text style={styles.nextChangeTime}>{timeUntilChange}</Text>
              <Text style={styles.nextChangeDate}>
                {format(data.nextSignChange, 'EEEE, MMM d, h:mm a')}
              </Text>
            </View>

            {/* Moon Tip */}
            <View style={styles.tipContainer}>
              <Text style={styles.tipEmoji}>💡</Text>
              <Text style={styles.tipText}>
                The Moon affects your emotions and instincts. Work with its energy for better results.
              </Text>
            </View>
          </Card.Content>
        </Card>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#1F1F33',
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: 'rgba(229, 229, 231, 0.9)',
  },
  infoButton: {
    margin: -8,
  },
  moonPhaseContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  moonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phaseEmoji: {
    fontSize: 64,
  },
  moonDetails: {
    marginLeft: 16,
  },
  moonSign: {
    fontSize: 16,
    color: 'rgba(229, 229, 231, 0.9)',
  },
  signName: {
    fontWeight: 'bold',
  },
  phase: {
    fontSize: 14,
    color: 'rgba(229, 229, 231, 0.7)',
    marginTop: 4,
  },
  elementChip: {
    marginTop: 8,
  },
  elementChipText: {
    color: 'white',
    fontSize: 12,
  },
  divider: {
    backgroundColor: 'rgba(229, 229, 231, 0.1)',
    marginVertical: 16,
  },
  moodContainer: {
    marginBottom: 16,
  },
  moodLabel: {
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.6)',
    marginBottom: 4,
  },
  moodText: {
    fontSize: 16,
    color: 'rgba(229, 229, 231, 0.9)',
  },
  listsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  listColumn: {
    flex: 1,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(229, 229, 231, 0.9)',
    marginBottom: 8,
  },
  listItem: {
    marginBottom: 4,
  },
  listItemText: {
    fontSize: 13,
    color: 'rgba(229, 229, 231, 0.9)',
  },
  nextChangeContainer: {
    backgroundColor: 'rgba(229, 229, 231, 0.05)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  nextChangeLabel: {
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.6)',
  },
  nextChangeTime: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(229, 229, 231, 0.9)',
    marginTop: 4,
  },
  nextChangeDate: {
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.6)',
    marginTop: 2,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 229, 231, 0.05)',
    padding: 12,
    borderRadius: 8,
  },
  tipEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: 'rgba(229, 229, 231, 0.8)',
  },
}); 