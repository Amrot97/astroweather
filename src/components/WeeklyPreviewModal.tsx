import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import {
  Modal,
  Portal,
  Card,
  Text,
  IconButton,
  Divider,
  useTheme,
  MD3Theme,
  Chip,
} from 'react-native-paper';
import { format } from 'date-fns';
import {
  AstroWeeklyForecast as AstroWeeklyForecastType,
  DailyWeatherChip,
} from '../data/mockData';
import { SvgUri } from 'react-native-svg'; // For zodiac symbols if they are SVGs

// Placeholder for zodiac symbol SVGs - replace with actual SVGs or logic
const zodiacSvgMap: { [key: string]: string } = {
  '♈️': 'https://www.astrology-zodiac-signs.com/images/aries.svg', // Example
  '♉️': 'https://www.astrology-zodiac-signs.com/images/taurus.svg',
  '♊️': 'https://www.astrology-zodiac-signs.com/images/gemini.svg',
  '♋️': 'https://www.astrology-zodiac-signs.com/images/cancer.svg',
  // ... add other signs
};

interface Props {
  visible: boolean;
  onClose: () => void;
  data: AstroWeeklyForecastType | null;
}

const { width } = Dimensions.get('window');
const CHIP_WIDTH = Math.min(width / 5.5, 75); // Adjust for optimal spacing

export const WeeklyPreviewModal: React.FC<Props> = ({ visible, onClose, data }) => {
  const theme = useTheme();
  const styles = dynamicStyles(theme);
  const [selectedDay, setSelectedDay] = useState<DailyWeatherChip | null>(
    data?.dailyChips[0] || null
  );

  React.useEffect(() => {
    if (data && data.dailyChips.length > 0) {
      setSelectedDay(data.dailyChips[0]);
    }
  }, [data]);

  if (!data) {
    return null; // Or a loading indicator inside the modal
  }

  const renderDayChip = (chip: DailyWeatherChip) => (
    <TouchableOpacity
      key={chip.id}
      style={[
        styles.dayChip,
        selectedDay?.id === chip.id && styles.selectedDayChip,
      ]}
      onPress={() => setSelectedDay(chip)}
    >
      <Text
        style={[
          styles.dayChipText,
          selectedDay?.id === chip.id && styles.selectedDayChipText,
        ]}
      >
        {chip.dayAbbreviation}
      </Text>
      <Text
        style={[
          styles.dayChipDateText,
          selectedDay?.id === chip.id && styles.selectedDayChipText,
        ]}
      >
        {chip.dateOfMonth}
      </Text>
      <Text style={styles.dayChipEmoji}>{chip.weatherEmoji}</Text>
    </TouchableOpacity>
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <Card style={styles.card}>
          <View style={styles.headerContainer}>
            <Text style={styles.mainTitle}>Weekly Forecast</Text>
            <IconButton
              icon="close"
              size={24}
              onPress={onClose}
              iconColor={theme.colors.onSurfaceVariant}
              style={styles.closeButton}
            />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Top Day Selector */}
            <View style={styles.dayChipsContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data.dailyChips.map(renderDayChip)}
              </ScrollView>
            </View>

            {/* Selected Day Details (Optional - could show score or specific details for selected day) */}
            {/* For now, the selection just highlights the chip as per image */}

            {/* Moon Movement This Week */}
            <Card style={styles.sectionCard}>
              <Card.Content>
                <Text style={styles.sectionTitle}>MOON MOVEMENT THIS WEEK</Text>
                <View style={styles.moonMovementContent}>
                  <View style={styles.moonSignsContainer}>
                    {data.moonMovement.signChanges.map((signChange) => (
                      <View key={signChange.id} style={styles.moonSignEntry}>
                        <Text style={styles.moonPeriodText}>{signChange.period}: {signChange.sign}</Text>
                        {/* Replace with actual SVG or icon component for zodiacSymbol */}
                        <Text style={styles.zodiacSymbolText}>{signChange.zodiacSymbol}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.moonPhasesContainer}>
                    {data.moonMovement.phases.map((phase) => (
                      <View key={phase.id} style={styles.moonPhaseEntry}>
                        <Text style={styles.moonPhaseEmoji}>{phase.phaseEmoji}</Text>
                        <Text style={styles.moonPhaseText}>{phase.phaseName}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Weekly Highlights */}
            <Card style={styles.sectionCard}>
              <Card.Content>
                <Text style={styles.sectionTitle}>WEEKLY HIGHLIGHTS</Text>
                {data.highlights.map((highlight, index) => (
                  <View key={highlight.id}>
                    <View style={styles.highlightItemContainer}>
                      <Text style={styles.highlightDayAbbr}>{highlight.dayAbbreviation}</Text>
                      <View style={styles.highlightTextContainer}>
                        <Text style={styles.highlightTitle}>{highlight.title}</Text>
                        <Text style={styles.highlightDescription}>{highlight.description}</Text>
                      </View>
                    </View>
                    {index < data.highlights.length - 1 && <Divider style={styles.lightDivider} />}
                  </View>
                ))}
              </Card.Content>
            </Card>

            {/* Weekly Focus Areas */}
            <Card style={styles.sectionCard}>
              <Card.Content>
                <Text style={styles.sectionTitle}>WEEKLY FOCUS AREAS</Text>
                {data.focusAreas.map((focus, index) => (
                  <View key={focus.id} style={styles.focusItemContainer}>
                    <Text style={styles.focusTitle}>{focus.title}</Text>
                    <Text style={styles.focusDescription}>{focus.description}</Text>
                    {/* {index < data.focusAreas.length - 1 && <Divider />} */}
                  </View>
                ))}
              </Card.Content>
            </Card>
            <View style={{height: 20}} /> {/* Bottom padding for scroll */} 
          </ScrollView>
        </Card>
      </Modal>
    </Portal>
  );
};

const dynamicStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'transparent', // Modal itself is transparent, content is card
    },
    card: {
      width: '100%',
      height: '90%', // Take most of the screen height
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 0, // Sharp bottom edges for bottom sheet feel
      borderBottomRightRadius: 0,
      backgroundColor: theme.dark ? '#1A1A2E' : '#F4F4F8', // Darker/Lighter background
      overflow: 'hidden',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 10, // Space before day chips
      backgroundColor: theme.dark ? '#1A1A2E' : '#F4F4F8',
    },
    mainTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
    },
    closeButton: {
      margin: 0,
    },
    dayChipsContainer: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: theme.dark ? '#1A1A2E' : '#F4F4F8', // Match header
      borderBottomWidth: 1,
      borderBottomColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    },
    dayChip: {
      width: CHIP_WIDTH,
      height: CHIP_WIDTH * 1.2, // Make them taller
      borderRadius: 12,
      backgroundColor: theme.dark ? '#2C2C44' : '#FFFFFF',
      paddingVertical: 8,
      paddingHorizontal: 4,
      alignItems: 'center',
      justifyContent: 'space-around',
      marginHorizontal: 4,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    selectedDayChip: {
      backgroundColor: theme.colors.primary,
    },
    dayChipText: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.onSurfaceVariant,
    },
    dayChipDateText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      marginTop: 2,
    },
    selectedDayChipText: {
      color: theme.colors.onPrimary,
    },
    dayChipEmoji: {
      fontSize: 20,
      marginTop: 4,
    },
    sectionCard: {
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 12,
      backgroundColor: theme.dark ? '#252538' : '#FFFFFF',
      elevation: 1,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.onSurfaceVariant,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 12,
    },
    // Moon Movement Specific Styles
    moonMovementContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    moonSignsContainer: {
      flex: 1,
      gap: 6,
    },
    moonPhasesContainer: {
      flexShrink: 0, 
      alignItems: 'flex-start',
      paddingLeft: 10,
      gap: 8,
    },
    moonSignEntry: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    moonPeriodText: {
      fontSize: 14,
      color: theme.colors.onSurface,
      marginRight: 8,
    },
    zodiacSymbolText: { // Placeholder style
        fontSize: 16,
        // Add color if needed, e.g., based on element
    },
    moonPhaseEntry: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    moonPhaseEmoji: {
      fontSize: 20, // Larger emoji
      marginRight: 8,
    },
    moonPhaseText: {
      fontSize: 14,
      color: theme.colors.onSurface,
    },
    // Weekly Highlights Specific Styles
    highlightItemContainer: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'flex-start',
    },
    highlightDayAbbr: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.primary,
      width: 40, // Fixed width for alignment
    },
    highlightTextContainer: {
      flex: 1,
      marginLeft: 8,
    },
    highlightTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.onSurface,
      marginBottom: 2,
    },
    highlightDescription: {
      fontSize: 13,
      color: theme.colors.onSurfaceVariant,
      lineHeight: 18,
    },
    lightDivider: {
        backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    },
    // Weekly Focus Areas Specific Styles
    focusItemContainer: {
      paddingVertical: 8,
    },
    focusTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.onSurface,
      marginBottom: 3,
    },
    focusDescription: {
      fontSize: 13,
      color: theme.colors.onSurfaceVariant,
      lineHeight: 18,
    },
  });

export default WeeklyPreviewModal; 