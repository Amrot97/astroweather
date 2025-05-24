import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { Card, Text, Chip, Divider, useTheme, IconButton } from 'react-native-paper';
import { format, formatDistanceToNow } from 'date-fns';
import { MoonData } from '../data/mockData';
import { zodiacColors } from '../theme/theme';
import * as Haptics from 'expo-haptics';

interface Props {
  data: MoonData;
}

export const MoonTracker: React.FC<Props> = ({ data }) => {
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

  return (
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
    marginRight: 20,
  },
  moonDetails: {
    flex: 1,
  },
  moonSign: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    color: '#E5E5E7',
  },
  signName: {
    fontWeight: '700',
  },
  phase: {
    fontSize: 16,
    color: 'rgba(229, 229, 231, 0.7)',
    marginBottom: 8,
  },
  elementChip: {
    alignSelf: 'flex-start',
  },
  elementChipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    marginVertical: 16,
    backgroundColor: 'rgba(229, 229, 231, 0.1)',
  },
  moodContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  moodLabel: {
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.6)',
    marginBottom: 4,
  },
  moodText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E5E5E7',
  },
  listsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  listColumn: {
    flex: 1,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#A78BFA',
  },
  listItem: {
    marginBottom: 4,
  },
  listItemText: {
    fontSize: 13,
    color: 'rgba(229, 229, 231, 0.7)',
  },
  nextChangeContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  nextChangeLabel: {
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.6)',
    marginBottom: 4,
  },
  nextChangeTime: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  nextChangeDate: {
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.6)',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
  },
  tipEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.6)',
    lineHeight: 16,
  },
}); 