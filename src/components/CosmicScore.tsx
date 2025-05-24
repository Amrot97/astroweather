import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { CosmicScore as CosmicScoreType } from '../data/mockData';
import { cosmicGradients } from '../theme/theme';

interface Props {
  data: CosmicScoreType;
}

const { width } = Dimensions.get('window');

export const CosmicScore: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Pulse animation for the emoji
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getGradientColors = () => {
    if (data.score >= 4) return cosmicGradients.morning;
    if (data.score >= 3) return cosmicGradients.afternoon;
    if (data.score >= 2) return cosmicGradients.evening;
    return cosmicGradients.night;
  };

  const fillPercentage = (data.score / data.maxScore) * 100;
  const circularProgressSize = Math.min(width * 0.5, 180); // Capped size

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Card style={styles.card} mode="elevated" elevation={2}>
        <LinearGradient
          colors={['#252538', '#1F1F33', '#1A1A2E']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.content}>
            <Text style={styles.title}>TODAY'S COSMIC WEATHER</Text>
            
            <View style={styles.scoreContainer}>
              <AnimatedCircularProgress
                size={circularProgressSize}
                width={15}
                fill={fillPercentage}
                tintColor="#8B5CF6"
                backgroundColor="rgba(139, 92, 246, 0.2)"
                rotation={-90}
                lineCap="round"
                duration={2000}
              >
                {() => (
                  <View style={styles.innerCircle}>
                    <Animated.View
                      style={[
                        styles.emojiContainer,
                        { transform: [{ scale: pulseAnim }] },
                      ]}
                    >
                      <Text style={styles.emoji}>{data.weatherEmoji}</Text>
                    </Animated.View>
                    <Text style={styles.score}>
                      {data.score}/{data.maxScore}
                    </Text>
                    <Text style={styles.description}>{data.description}</Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.details}>{data.details}</Text>
            </View>

            {/* Energy bars visualization */}
            <View style={styles.energyBars}>
              <View style={styles.energyBarRow}>
                <Text style={styles.energyLabel}>Harmony</Text>
                <View style={styles.energyBarContainer}>
                  <Animated.View
                    style={[
                      styles.energyBar,
                      {
                        width: `${data.score >= 3 ? 80 : 40}%`,
                        backgroundColor: '#A78BFA',
                      },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.energyBarRow}>
                <Text style={styles.energyLabel}>Challenge</Text>
                <View style={styles.energyBarContainer}>
                  <Animated.View
                    style={[
                      styles.energyBar,
                      {
                        width: `${data.score <= 3 ? 60 : 20}%`,
                        backgroundColor: '#EC4899',
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    borderRadius: 16,
    width: 'auto',
  },
  gradient: {
    padding: 20,
    borderRadius: 16,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(229, 229, 231, 0.9)',
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiContainer: {
    marginBottom: 10,
  },
  emoji: {
    fontSize: 48,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E5E5E7',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: 'rgba(229, 229, 231, 0.9)',
    fontWeight: '500',
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  details: {
    fontSize: 14,
    color: 'rgba(229, 229, 231, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
  },
  energyBars: {
    width: '100%',
    marginTop: 20,
  },
  energyBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  energyLabel: {
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.6)',
    width: 70,
  },
  energyBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  energyBar: {
    height: '100%',
    borderRadius: 4,
  },
}); 