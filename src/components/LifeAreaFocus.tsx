import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Text, Surface, useTheme, Chip, IconButton } from 'react-native-paper';
import { LifeAreaFocus as LifeAreaFocusType } from '../data/mockData';
import { planetColors } from '../theme/theme';

interface Props {
  data: LifeAreaFocusType[];
}

const { width } = Dimensions.get('window');

export const LifeAreaFocus: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  const getPlanetColor = (planet: string) => {
    return (planetColors as any)[planet.toLowerCase()] || theme.colors.primary;
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated" elevation={1}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.header}>
            <Text style={styles.title}>TODAY'S FOCUS AREAS</Text>
            <IconButton
              icon="target"
              size={20}
              onPress={() => {}}
              style={styles.infoButton}
              iconColor="rgba(229, 229, 231, 0.6)"
            />
          </View>

          {/* Focus Areas List - Restored to detailed cards */}
          <View style={styles.areasContainer}>
            {data.map((area, index) => (
              <Surface
                key={area.house}
                style={[
                  styles.areaCard,
                  index === 0 && styles.primaryArea,
                ]}
                elevation={index === 0 ? 2 : 1}
              >
                <View style={styles.areaHeader}>
                  <Text style={styles.areaEmoji}>{area.emoji}</Text>
                  <View style={styles.areaInfo}>
                    <Text style={styles.areaName}>{area.name}</Text>
                    <Text style={styles.houseLabel}>House {area.house}</Text>
                  </View>
                </View>

                {area.planets && area.planets.length > 0 && (
                  <View style={styles.planetsContainer}>
                    {area.planets.map((planet) => (
                      <Chip
                        key={planet}
                        mode="flat"
                        style={[
                          styles.planetChip,
                          { backgroundColor: getPlanetColor(planet) },
                        ]}
                        textStyle={styles.planetChipText}
                      >
                        {planet}
                      </Chip>
                    ))}
                  </View>
                )}

                {area.energy && <Text style={styles.energyText}>{area.energy}</Text>}

                {area.activities && area.activities.length > 0 && (
                  <View style={styles.activitiesContainer}>
                    <Text style={styles.activitiesLabel}>
                      {index === 0 ? '✨ Excellent for:' : '✓ Good for:'}
                    </Text>
                    <View style={styles.activitiesList}>
                      {area.activities.map((activity, idx) => (
                        <Text key={idx} style={styles.activityItem}>
                          • {activity}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}

                {index === 0 && (
                  <View style={styles.priorityBadge}>
                    <Text style={styles.priorityText}>TOP PRIORITY</Text>
                  </View>
                )}
              </Surface>
            ))}
          </View>

          {/* Energy Distribution - Restored */}
          {data && data.length > 0 && (
            <View style={styles.energyDistribution}>
              <Text style={styles.energyTitle}>Energy Distribution</Text>
              <View style={styles.energyBars}>
                {data.map((area) => (
                  <View key={area.house} style={styles.energyBarItem}>
                    <Text style={styles.energyBarLabel}>{area.emoji}</Text>
                    <View style={styles.energyBarContainer}>
                      <View
                        style={[
                          styles.energyBar,
                          {
                            width: `${Math.min(100, area.planets.length * 30 + 20)}%`,
                            backgroundColor: '#8B5CF6',
                          },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Card.Content>
      </Card>
    </View>
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
    overflow: 'hidden',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  areasContainer: {
    gap: 16,
    marginBottom: 20,
  },
  areaCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#252538',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  primaryArea: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)', 
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  areaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  areaEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  areaInfo: {
    flex: 1,
  },
  areaName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E5E5E7',
  },
  houseLabel: {
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.6)',
  },
  planetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  planetChip: {
    height: 24,
  },
  planetChipText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  energyText: {
    fontSize: 14,
    color: 'rgba(229, 229, 231, 0.7)',
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 20,
  },
  activitiesContainer: {
    marginTop: 8, 
  },
  activitiesLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#A78BFA',
    marginBottom: 6,
  },
  activitiesList: {
    marginLeft: 8, 
  },
  activityItem: {
    fontSize: 13,
    color: 'rgba(229, 229, 231, 0.7)',
    marginBottom: 4,
    lineHeight: 18,
  },
  priorityBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  energyDistribution: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(229, 229, 231, 0.1)',
  },
  energyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(229, 229, 231, 0.9)',
    marginBottom: 12,
    textAlign: 'center',
  },
  energyBars: {
    gap: 8,
  },
  energyBarItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  energyBarLabel: {
    fontSize: 16,
    width: 30, 
    marginRight: 8,
    textAlign: 'center',
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