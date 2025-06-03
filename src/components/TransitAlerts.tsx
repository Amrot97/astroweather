import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, Animated, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme, IconButton, Surface, MD3Theme } from 'react-native-paper';
import { TransitAlert } from '../data/mockData';
import * as Haptics from 'expo-haptics';

interface Props {
  data: TransitAlert[];
  onPress?: () => void;
}

const { width } = Dimensions.get('window');

export const TransitAlerts: React.FC<Props> = ({ data, onPress }) => {
  const theme = useTheme();
  const styles = dynamicStyles(theme);
  const scrollX = useRef(new Animated.Value(0)).current;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return '#A78BFA';
      case 'challenging':
        return '#EC4899';
      case 'neutral':
        return '#F59E0B';
      default:
        return theme.colors.primary;
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'trending-up';
      case 'challenging':
        return 'alert-circle-outline';
      case 'neutral':
        return 'swap-horizontal';
      default:
        return 'information-outline';
    }
  };

  const handlePress = () => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Card style={styles.container}>
        <Card.Content style={{ paddingHorizontal: 0 }}>
          <View style={styles.header}>
            <Text style={styles.title}>TODAY'S COSMIC HIGHLIGHTS</Text>
            <Text style={styles.subtitle}>Swipe to explore</Text>
          </View>

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: Platform.OS !== 'web' }
            )}
            scrollEventThrottle={16}
          >
            {data.map((alert, index) => (
              <Surface
                key={alert.id}
                style={[
                  styles.alertCard,
                  { borderColor: getImpactColor(alert.impact) },
                ]}
                elevation={2}
              >
                <View style={styles.alertHeader}>
                  <Text style={styles.alertEmoji}>{alert.emoji}</Text>
                  <View
                    style={[
                      styles.impactBadge,
                      { backgroundColor: getImpactColor(alert.impact) },
                    ]}
                  >
                    <IconButton
                      icon={getImpactIcon(alert.impact)}
                      size={16}
                      iconColor="white"
                      style={styles.impactIcon}
                    />
                    <Text style={styles.impactText}>
                      {alert.impact.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertDescription}>{alert.description}</Text>

                <View style={styles.adviceContainer}>
                  <Text style={styles.adviceLabel}>💡 Advice</Text>
                  <Text style={styles.adviceText}>{alert.advice}</Text>
                </View>

                {/* Timing indicator */}
                <View style={styles.timingContainer}>
                  <View style={styles.timingBar}>
                    <Animated.View
                      style={[
                        styles.timingIndicator,
                        {
                          left: `${(index + 1) * 25}%`,
                          backgroundColor: getImpactColor(alert.impact),
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.timingText}>
                    Peak influence: {index === 0 ? 'Morning' : index === 1 ? 'Afternoon' : 'Evening'}
                  </Text>
                </View>
              </Surface>
            ))}
          </ScrollView>

          {/* Page indicators */}
          <View style={styles.pagination}>
            {data.map((_, index) => {
              const scrollViewWidth = width - 32; // screenWidth - (2 * 16 container margin)
              const itemEffectiveWidth = scrollViewWidth;
              const inputRange = [
                (index - 1) * itemEffectiveWidth,
                index * itemEffectiveWidth,
                (index + 1) * itemEffectiveWidth,
              ];

              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.paginationDot,
                    {
                      width: dotWidth,
                      opacity,
                    },
                  ]}
                />
              );
            })}
          </View>

          {/* Quick Summary */}
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Energy Overview</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <View style={[styles.summaryDot, { backgroundColor: '#A78BFA' }]} />
                <Text style={styles.summaryLabel}>
                  {data.filter(a => a.impact === 'positive').length} Positive
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <View style={[styles.summaryDot, { backgroundColor: '#EC4899' }]} />
                <Text style={styles.summaryLabel}>
                  {data.filter(a => a.impact === 'challenging').length} Challenging
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <View style={[styles.summaryDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.summaryLabel}>
                  {data.filter(a => a.impact === 'neutral').length} Neutral
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const dynamicStyles = (theme: MD3Theme) => StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#1F1F33',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16, 
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(229, 229, 231, 0.9)',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.7)',
  },
  alertCard: {
    width: width - 32, // screenWidth - (2 * 16 container margin)
    paddingHorizontal: 16, // Inner padding for the card content
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: '#252538',
    justifyContent: 'space-between',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  alertEmoji: {
    fontSize: 28,
    marginRight: 10,
  },
  impactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  impactIcon: {
    margin: 0,
    marginRight: 4,
  },
  impactText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E5E5E7',
    marginBottom: 8,
    lineHeight: 24,
  },
  alertDescription: {
    fontSize: 14,
    color: 'rgba(229, 229, 231, 0.8)',
    lineHeight: 20,
    marginBottom: 16,
    flexGrow: 1,
  },
  adviceContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  adviceLabel: {
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.7)',
    marginBottom: 4,
  },
  adviceText: {
    fontSize: 13,
    color: 'rgba(229, 229, 231, 0.9)',
    lineHeight: 18,
  },
  timingContainer: {
    marginTop: 'auto',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  timingBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginBottom: 6,
    position: 'relative',
  },
  timingIndicator: {
    height: '100%',
    width: '10%',
    borderRadius: 3,
    position: 'absolute',
  },
  timingText: {
    fontSize: 11,
    color: 'rgba(229, 229, 231, 0.6)',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 16,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 4,
  },
  summaryContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(229, 229, 231, 0.8)',
    marginBottom: 10,
    marginTop: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.7)',
  },
});