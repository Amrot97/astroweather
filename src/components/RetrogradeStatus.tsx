import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider, useTheme, MD3Theme, Icon } from 'react-native-paper';
import { RetrogradePlanetInfo } from '../data/mockData';

interface Props {
  data: RetrogradePlanetInfo[];
}

export const RetrogradeStatus: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const styles = dynamicStyles(theme);

  if (!data || data.length === 0) {
    return null; // Don't render if no data
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.mainTitle}>Planetary Climate: Retrogrades</Text>
        {data.map((planet, index) => (
          <View key={planet.id}>
            <View style={styles.planetEntry}>
              <View style={styles.planetHeader}>
                <Text style={styles.planetSymbol}>{planet.astrologicalSymbol}</Text>
                <Text style={styles.planetName}>{planet.planetName}</Text>
                <View style={[styles.statusBadge, planet.isRetrograde ? styles.retrogradeBadge : styles.directBadge]}>
                    <Text style={styles.statusBadgeText}>
                        {planet.isRetrograde ? 'RETROGRADE' : 'DIRECT'}
                    </Text>
                </View>
              </View>
              <Text style={styles.datesText}>
                {planet.datesLabel} {planet.datesValue}
              </Text>
              {planet.isRetrograde && planet.interpretation && (
                <Text style={styles.interpretationText}>{planet.interpretation}</Text>
              )}
            </View>
            {index < data.length - 1 && <Divider style={styles.divider} />}
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};

const dynamicStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 12,
      backgroundColor: theme.dark ? '#1F1F33' : theme.colors.surface,
      elevation: 1,
    },
    mainTitle: {
      fontSize: 14,
      fontWeight: '600',
      letterSpacing: 1.5,
      color: theme.dark ? 'rgba(229, 229, 231, 0.9)' : theme.colors.onSurfaceVariant,
      textTransform: 'uppercase',
      marginBottom: 16,
      textAlign: 'center',
    },
    planetEntry: {
      paddingVertical: 12,
    },
    planetHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    planetSymbol: {
      fontSize: 22, // Larger symbol
      marginRight: 10,
      color: theme.colors.onSurfaceVariant,
      width: 28, // For alignment
      textAlign: 'center',
    },
    planetName: {
      fontSize: 17,
      fontWeight: '600',
      color: theme.colors.onSurface,
      flex: 1, // Allow name to take space before badge
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12, // More rounded badge
        marginLeft: 'auto',
    },
    retrogradeBadge: {
        backgroundColor: theme.dark ? theme.colors.errorContainer : '#FFCDD2', // Using theme error or light red
    },
    directBadge: {
        backgroundColor: theme.dark ? theme.colors.tertiaryContainer : '#C8E6C9', // Using theme tertiary or light green
    },
    statusBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: theme.dark ? theme.colors.onErrorContainer : '#B71C1C', // Dark red text for retro
        // For direct, we could use a different color if needed, but often black/dark is fine.
    },
    datesText: {
      fontSize: 13,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 6,
      marginLeft: 38, // Align with planet name, after symbol
    },
    interpretationText: {
      fontSize: 14,
      color: theme.colors.onSurface,
      lineHeight: 20,
      fontStyle: 'italic',
      marginLeft: 38, // Align with planet name
      paddingRight: 8, // Ensure text doesn't touch edge if long
    },
    divider: {
      backgroundColor: theme.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    },
  });

export default RetrogradeStatus; 