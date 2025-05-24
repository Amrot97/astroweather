import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme, MD3Theme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { cosmicGradients } from '../theme/theme'; // Assuming gradients are here
import { UserProfile, TimeBasedContent } from '../data/mockData'; // Assuming types are here

interface Props {
  userProfile: UserProfile;
  timeContent: TimeBasedContent;
}

export const DashboardHeader: React.FC<Props> = ({ userProfile, timeContent }) => {
  const theme = useTheme();
  const styles = dynamicStyles(theme);

  return (
    <Card style={styles.card} mode="elevated" elevation={2}>
      <LinearGradient
        colors={cosmicGradients.primary} // Use the primary purple gradient
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.contentContainer}>
          {/* Welcome Message */}
          <Text style={styles.welcomeText}>
            Hello, {userProfile.name}
          </Text>
          <Text style={styles.welcomeSubtext}>
            {userProfile.sunSign} Sun • {userProfile.moonSign} Moon • {userProfile.risingSign} Rising
          </Text>

          {/* Time-based content */}
          <View style={styles.timeContentOuterContainer}>
            <View style={styles.timeContentInnerContainer}>
              <Text style={styles.timeTitle}>{timeContent.title}</Text>
              {/* Display new structured content based on period */}
              {timeContent.morningDetails && (
                <View style={styles.periodDetailsContainer}>
                  <Text style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Overall Score: </Text>
                    {timeContent.morningDetails.overallCosmicScoreText}
                  </Text>
                  <Text style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Moon Mood: </Text>
                    {timeContent.morningDetails.moonMood}
                  </Text>
                  <Text style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Key Opportunity: </Text>
                    {timeContent.morningDetails.keyOpportunity}
                  </Text>
                  <Text style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Watch For: </Text>
                    {timeContent.morningDetails.oneThingToWatchFor}
                  </Text>
                </View>
              )}
              {timeContent.afternoonDetails && (
                <View style={styles.periodDetailsContainer}>
                  <Text style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Moon Status: </Text>
                    {timeContent.afternoonDetails.moonChangeStatus}
                  </Text>
                  <Text style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Evening Preview: </Text>
                    {timeContent.afternoonDetails.eveningEnergyPreview}
                  </Text>
                  <Text style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Best Window: </Text>
                    {timeContent.afternoonDetails.bestTimeWindow}
                  </Text>
                </View>
              )}
              {timeContent.eveningDetails && (
                <View style={styles.periodDetailsContainer}>
                  <Text style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Tomorrow's Score: </Text>
                    {timeContent.eveningDetails.tomorrowsCosmicScoreText}
                  </Text>
                  <Text style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Moon Overnight: </Text>
                    {timeContent.eveningDetails.moonMovementOvernight}
                  </Text>
                  <Text style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Rest: </Text>
                    {timeContent.eveningDetails.restRecommendation}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Affirmation */}
          <View style={styles.affirmationContainer}>
            <Text style={styles.affirmationLabel}>Today's Affirmation</Text>
            <Text style={styles.affirmationText}>"{timeContent.affirmation}"</Text>
          </View>
        </View>
      </LinearGradient>
    </Card>
  );
};

const dynamicStyles = (theme: MD3Theme) => StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 12, // Add some top margin
    overflow: 'hidden',
    backgroundColor: 'transparent',
    borderRadius: 16,
  },
  gradient: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  contentContainer: {
    alignItems: 'flex-start', // Align text to the left
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: theme.fonts.displayMedium.fontFamily, // Example, adjust as needed
  },
  welcomeSubtext: {
    fontSize: 15,
    color: 'rgba(229, 229, 231, 0.85)',
    marginBottom: 18,
    fontFamily: theme.fonts.bodyMedium.fontFamily, // Example, adjust as needed
  },
  timeContentOuterContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Subtle background for this section
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 18,
  },
  timeContentInnerContainer: {
    // No specific styles needed here for now, but good for structure
  },
  timeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    fontFamily: theme.fonts.headlineSmall.fontFamily, // Example, adjust as needed
  },
  timeContent: {
    fontSize: 15,
    color: 'rgba(229, 229, 231, 0.9)',
    lineHeight: 22,
    fontFamily: theme.fonts.bodyLarge.fontFamily, // Example, adjust as needed
  },
  periodDetailsContainer: {
    marginTop: 8,
  },
  detailItem: {
    fontSize: 15,
    color: 'rgba(229, 229, 231, 0.9)',
    lineHeight: 22,
    fontFamily: theme.fonts.bodyLarge.fontFamily,
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: '600',
    color: 'rgba(229, 229, 231, 1)',
  },
  affirmationContainer: {
    marginTop: 0, // Adjusted from original header
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
  },
  affirmationLabel: {
    fontSize: 13,
    color: 'rgba(229, 229, 231, 0.7)',
    marginBottom: 5,
    fontFamily: theme.fonts.labelMedium.fontFamily, // Example, adjust as needed
  },
  affirmationText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: theme.fonts.bodyMedium.fontFamily, // Example, adjust as needed
  },
}); 