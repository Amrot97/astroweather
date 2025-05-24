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

          {/* Focus Areas List - SIMPLIFIED */}
          <View style={styles.areasListContainer}> 
            {data.map((area) => {
              const houseInfo = `(${area.house}th House)`;
              const planetDetails = area.planets.length > 0 ? `Planets: ${area.planets.join(', ')}` : '';
              const energyDetails = area.energy ? `Energy: ${area.energy}` : '';
              let fullDetails = [planetDetails, energyDetails].filter(Boolean).join('. ');
              if (fullDetails) fullDetails += '.';

              return (
                <Surface key={area.id} style={styles.focusAreaItem} elevation={1}>
                  <View style={styles.areaItemHeader}>
                    <Text style={styles.areaNameText}>{area.name}</Text>
                    <Text style={styles.houseInfoText}>{houseInfo}</Text>
                  </View>
                  {area.emoji && <Text style={styles.areaEmoji}>{area.emoji}</Text>} {/* Optional emoji */}
                  {fullDetails.length > 0 && <Text style={styles.areaDetailsText}>{fullDetails}</Text>}
                  
                  {area.activities && area.activities.length > 0 && (
                    <View style={styles.activitiesSection}>
                      <Text style={styles.activitiesTitle}>✓ Good for:</Text>
                      {area.activities.map((activity, idx) => (
                        <Text key={idx} style={styles.activityItemText}>
                          • {activity}
                        </Text>
                      ))}
                    </View>
                  )}
                </Surface>
              );
            })}
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
    paddingHorizontal: 16, // Added padding to Card.Content if needed, or here
    paddingTop: 16, // Added padding
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: 'rgba(229, 229, 231, 0.9)',
  },
  infoButton: {
    margin: -8, // Keep if IconButton is kept
  },
  areasListContainer: { // New container for the list of focus areas
    paddingHorizontal: 16, // Added padding to Card.Content or here
    paddingBottom: 16, // Added padding
  },
  focusAreaItem: { // Style for each individual focus area item
    backgroundColor: '#252538', // Slightly different background for each item
    borderRadius: 12,
    padding: 16,
    marginBottom: 12, // Space between items
  },
  areaItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  areaNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E5E5E7',
    flexShrink: 1, // Allow text to shrink if too long
  },
  houseInfoText: {
    fontSize: 12,
    color: 'rgba(229, 229, 231, 0.6)',
    marginLeft: 8,
  },
  areaEmoji: {
    fontSize: 24, // Optional emoji display
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  areaDetailsText: {
    fontSize: 13,
    color: 'rgba(229, 229, 231, 0.8)',
    marginBottom: 12,
    lineHeight: 18,
  },
  activitiesSection: {
    marginTop: 8,
  },
  activitiesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A78BFA', // Accent color for title
    marginBottom: 6,
  },
  activityItemText: {
    fontSize: 13,
    color: 'rgba(229, 229, 231, 0.7)',
    marginBottom: 4,
    marginLeft: 8, // Indent bullet points slightly
  },
}); 