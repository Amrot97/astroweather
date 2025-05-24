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
    return planetColors[planet.toLowerCase()] || theme.colors.primary;
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated" elevation={1}>
        <Card.Content>
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

          {/* Visual House Wheel */}
          <View style={styles.wheelContainer}>
            <Surface style={styles.wheel} elevation={1}>
              {data.map((area, index) => (
                <View
                  key={area.house}
                  style={[
                    styles.houseSegment,
                    {
                      transform: [
                        { rotate: `${(index * 180) / data.length}deg` },
                      ],
                    },
                  ]}
                >
                  <View style={styles.houseIndicator}>
                    <Text style={styles.houseNumber}>{area.house}</Text>
                  </View>
                </View>
              ))}
              <View style={styles.centerDot} />
            </Surface>
          </View>

          {/* Focus Areas List */}
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

                {/* Planets in this house */}
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

                <Text style={styles.energyText}>{area.energy}</Text>

                {/* Activities */}
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

                {index === 0 && (
                  <View style={styles.priorityBadge}>
                    <Text style={styles.priorityText}>TOP PRIORITY</Text>
                  </View>
                )}
              </Surface>
            ))}
          </View>

          {/* Energy Distribution */}
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
                          width: `${area.planets.length * 40}%`,
                          backgroundColor: '#8B5CF6',
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
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
  wheelContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  wheel: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  houseSegment: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
  },
  houseIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  houseNumber: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  centerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E7',
  },
  areasContainer: {
    gap: 12,
  },
  areaCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#252538',
    marginBottom: 12,
  },
  primaryArea: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 1,
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
    marginBottom: 2,
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
  },
  energyBars: {
    gap: 8,
  },
  energyBarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  energyBarLabel: {
    fontSize: 16,
    width: 30,
  },
  energyBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 3,
    marginLeft: 8,
  },
  energyBar: {
    height: '100%',
    borderRadius: 3,
  },
}); 