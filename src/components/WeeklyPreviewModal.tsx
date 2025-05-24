import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Card, Text, IconButton, Divider, useTheme, MD3Theme } from 'react-native-paper';
import { format } from 'date-fns';
import { WeeklyPreview as WeeklyPreviewType } from '../data/mockData'; // Ensure this path is correct

interface Props {
  visible: boolean;
  onClose: () => void;
  data: WeeklyPreviewType[];
}

export const WeeklyPreviewModal: React.FC<Props> = ({ visible, onClose, data }) => {
  const theme = useTheme();
  const styles = dynamicStyles(theme);

  const getScoreEmoji = (score: number) => {
    if (score >= 4) return '✨'; // Very Good
    if (score >= 3) return '👍'; // Good
    if (score >= 2) return '↔️'; // Neutral
    return '⚠️'; // Challenging
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <Card style={styles.card}>
          <Card.Title
            title="7-Day Cosmic Outlook"
            titleStyle={styles.title}
            right={(props) => <IconButton {...props} icon="close" onPress={onClose} iconColor={theme.colors.onSurfaceVariant} />}
            style={styles.cardTitle}
          />
          <Divider style={styles.titleDivider} />
          <Card.Content style={styles.cardContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {data.map((day, index) => (
                <View key={index}>
                  <View style={styles.dayContainer}>
                    <Text style={styles.dateText}>{format(day.date, 'EEE, MMM d')}</Text>
                    <View style={styles.dayDetails}>
                      <Text style={styles.detailText}>
                        {getScoreEmoji(day.cosmicScore)} Cosmic Score: {day.cosmicScore.toFixed(1)}/5
                      </Text>
                      <Text style={styles.detailText}>🌙 Moon in {day.moonSign}</Text>
                      <Text style={styles.keyEventText}>🔑 {day.keyEvent}</Text>
                    </View>
                  </View>
                  {index < data.length - 1 && <Divider style={styles.dayDivider} />}
                </View>
              ))}
            </ScrollView>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

const dynamicStyles = (theme: MD3Theme) => StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  card: {
    width: '100%',
    maxWidth: 500, // Max width for larger screens
    maxHeight: '80%', // Max height
    borderRadius: 16,
    backgroundColor: '#1F1F33', // Dark card background
  },
  cardTitle: {
    paddingHorizontal: 8, // Reduce padding to bring close button nearer
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onSurface, // Use theme color
    marginLeft: 8, // Align with content
  },
  titleDivider: {
    backgroundColor: 'rgba(229, 229, 231, 0.1)',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16, // Add padding at the bottom
    flexShrink: 1, // Allows ScrollView to shrink if content is small
  },
  dayContainer: {
    paddingVertical: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary, // Use theme primary color for dates
    marginBottom: 8,
  },
  dayDetails: {
    marginLeft: 8, // Indent details slightly
  },
  detailText: {
    fontSize: 14,
    color: 'rgba(229, 229, 231, 0.85)', // Light text for details
    marginBottom: 4,
    lineHeight: 20,
  },
  keyEventText: {
    fontSize: 14,
    color: 'rgba(229, 229, 231, 0.95)', // Slightly brighter for key event
    fontWeight: '500',
    marginTop: 2,
    lineHeight: 20,
  },
  dayDivider: {
    backgroundColor: 'rgba(229, 229, 231, 0.08)', // Subtle divider
  },
});

export default WeeklyPreviewModal; 