import { format, addHours, addDays } from 'date-fns';

export interface CosmicScore {
  score: number;
  maxScore: number;
  weatherEmoji: string;
  description: string;
  details: string;
}

export interface MoonData {
  sign: string;
  element: string;
  phase: string;
  phaseEmoji: string;
  mood: string;
  goodFor: string[];
  avoid: string[];
  nextSignChange: Date;
}

export interface LifeAreaFocus {
  // id: string; // Removed for revert
  house: number;
  name: string;
  emoji: string;
  planets: string[];
  energy: string;
  activities: string[];
}

export interface TransitAlert {
  id: string;
  emoji: string;
  title: string;
  description: string;
  impact: 'positive' | 'challenging' | 'neutral';
  advice: string;
}

// New interfaces for structured time-based content
interface MorningContentDetails {
  overallCosmicScoreText: string; 
  moonMood: string; 
  keyOpportunity: string;
  oneThingToWatchFor: string;
}
interface AfternoonContentDetails {
  moonChangeStatus: string; 
  eveningEnergyPreview: string;
  bestTimeWindow: string; 
}
interface EveningContentDetails {
  tomorrowsCosmicScoreText: string; 
  moonMovementOvernight: string;
  restRecommendation: string;
}

export interface TimeBasedContent {
  period: 'morning' | 'afternoon' | 'evening';
  title: string; 
  // Removed old 'content' field, replaced by period-specific details
  morningDetails?: MorningContentDetails;
  afternoonDetails?: AfternoonContentDetails;
  eveningDetails?: EveningContentDetails;
  affirmation: string;
}

// Mock data generators
export const generateCosmicScore = (): CosmicScore => {
  const scores = [
    {
      score: 4.5,
      weatherEmoji: '☀️',
      description: 'Bright & Energetic',
      details: 'The cosmos align in your favor today. Excellent energy for new beginnings and important decisions.',
    },
    {
      score: 3.5,
      weatherEmoji: '⛅',
      description: 'Partly Sunny',
      details: 'Mixed energies today. Good for routine tasks and steady progress. Some minor obstacles possible.',
    },
    {
      score: 2.5,
      weatherEmoji: '☁️',
      description: 'Cloudy',
      details: 'Low energy day. Focus on rest and reflection. Avoid major decisions or confrontations.',
    },
    {
      score: 4.0,
      weatherEmoji: '🌤️',
      description: 'Mostly Clear',
      details: 'Generally positive energy with brief moments of tension. Stay flexible and adaptable.',
    },
  ];
  
  return {
    ...scores[Math.floor(Math.random() * scores.length)],
    maxScore: 5,
  };
};

export const generateMoonData = (): MoonData => {
  const moonSigns = [
    {
      sign: 'Gemini',
      element: 'Air',
      mood: 'Chatty & Curious',
      goodFor: ['Communication', 'Learning', 'Short trips', 'Social media'],
      avoid: ['Deep emotional talks', 'Major commitments', 'Routine tasks'],
    },
    {
      sign: 'Cancer',
      element: 'Water',
      mood: 'Nurturing & Sensitive',
      goodFor: ['Home activities', 'Family time', 'Cooking', 'Self-care'],
      avoid: ['Harsh criticism', 'Public speaking', 'Risk-taking'],
    },
    {
      sign: 'Leo',
      element: 'Fire',
      mood: 'Confident & Creative',
      goodFor: ['Creative projects', 'Romance', 'Leadership', 'Entertainment'],
      avoid: ['Being ignored', 'Mundane tasks', 'Criticism'],
    },
    {
      sign: 'Virgo',
      element: 'Earth',
      mood: 'Organized & Practical',
      goodFor: ['Planning', 'Health routines', 'Work tasks', 'Cleaning'],
      avoid: ['Chaos', 'Spontaneity', 'Messy situations'],
    },
  ];
  
  const phases = [
    { phase: 'New Moon', phaseEmoji: '🌑' },
    { phase: 'Waxing Crescent', phaseEmoji: '🌒' },
    { phase: 'First Quarter', phaseEmoji: '🌓' },
    { phase: 'Waxing Gibbous', phaseEmoji: '🌔' },
    { phase: 'Full Moon', phaseEmoji: '🌕' },
    { phase: 'Waning Gibbous', phaseEmoji: '🌖' },
    { phase: 'Last Quarter', phaseEmoji: '🌗' },
    { phase: 'Waning Crescent', phaseEmoji: '🌘' },
  ];
  
  const selectedMoon = moonSigns[Math.floor(Math.random() * moonSigns.length)];
  const selectedPhase = phases[Math.floor(Math.random() * phases.length)];
  
  return {
    ...selectedMoon,
    ...selectedPhase,
    nextSignChange: addHours(new Date(), Math.floor(Math.random() * 48) + 12),
  };
};

export const generateLifeAreaFocus = (): LifeAreaFocus[] => {
  const areas = [
    {
      // id: 'la_career',
      house: 10,
      name: 'Career & Public Life',
      emoji: '💼',
      planets: ['Venus', 'Mercury'],
      energy: 'High visibility and recognition',
      activities: ['Presentations', 'Networking', 'Job interviews', 'Public speaking'],
    },
    {
      // id: 'la_relationships',
      house: 7,
      name: 'Relationships',
      emoji: '💕',
      planets: ['Venus'],
      energy: 'Harmony and connection',
      activities: ['Date nights', 'Partner discussions', 'Collaborations', 'Contracts'],
    },
    {
      // id: 'la_money',
      house: 2,
      name: 'Money & Resources',
      emoji: '💰',
      planets: ['Mars'],
      energy: 'Financial motivation',
      activities: ['Budget planning', 'Investment decisions', 'Shopping', 'Salary negotiations'],
    },
    {
      // id: 'la_creativity',
      house: 5,
      name: 'Creativity & Romance',
      emoji: '🎨',
      planets: ['Sun'],
      energy: 'Playful and expressive',
      activities: ['Art projects', 'Dating', 'Hobbies', 'Fun activities'],
    },
    {
      // id: 'la_health',
      house: 6,
      name: 'Health & Routine',
      emoji: '🏃',
      planets: ['Mercury'],
      energy: 'Productivity boost',
      activities: ['Exercise', 'Health checkups', 'Work tasks', 'Organization'],
    },
  ];
  
  // Return 2 random areas
  const shuffled = areas.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

export const generateTransitAlerts = (): TransitAlert[] => {
  const alerts = [
    {
      id: '1',
      emoji: '💕',
      title: 'Venus harmonizes with your Moon',
      description: 'Beautiful energy for relationships and self-care',
      impact: 'positive' as const,
      advice: 'Express your feelings and indulge in beauty',
    },
    {
      id: '2',
      emoji: '🔥',
      title: 'Mars challenges your Mercury',
      description: 'Communication may be heated or rushed',
      impact: 'challenging' as const,
      advice: 'Think before speaking, avoid arguments',
    },
    {
      id: '3',
      emoji: '🌟',
      title: 'Jupiter supports your Sun',
      description: 'Opportunities knocking! Expansion available',
      impact: 'positive' as const,
      advice: 'Say yes to new opportunities',
    },
    {
      id: '4',
      emoji: '🪐',
      title: 'Saturn creates tension with your Moon',
      description: 'Emotional responsibilities may feel heavy',
      impact: 'challenging' as const,
      advice: 'Set boundaries and practice self-care',
    },
    {
      id: '5',
      emoji: '⚡',
      title: 'Uranus activates your Venus',
      description: 'Unexpected changes in relationships or finances',
      impact: 'neutral' as const,
      advice: 'Stay flexible and embrace the unexpected',
    },
  ];
  
  // Return 3 random alerts
  const shuffled = alerts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

export const getTimeBasedContent = (): TimeBasedContent => {
  const hour = new Date().getHours();
  // Mock data - in a real app, these would be dynamically generated
  const mockCosmicScore = generateCosmicScore();
  const mockMoonData = generateMoonData();

  if (hour >= 6 && hour < 12) { // Morning
    return {
      period: 'morning',
      title: 'Your Day Ahead',
      morningDetails: {
        overallCosmicScoreText: `${mockCosmicScore.score}/${mockCosmicScore.maxScore} - ${mockCosmicScore.description}`,
        moonMood: mockMoonData.mood,
        keyOpportunity: 'Networking could bring fruitful connections.',
        oneThingToWatchFor: 'Avoid impulsive spending early in the day.',
      },
      affirmation: 'I embrace the opportunities this morning brings.',
    };
  } else if (hour >= 12 && hour < 18) { // Afternoon
    return {
      period: 'afternoon',
      title: 'Afternoon Shift',
      afternoonDetails: {
        moonChangeStatus: `Moon remains in ${mockMoonData.sign} through the afternoon.`,
        eveningEnergyPreview: 'Evening energy will be ideal for creative pursuits.',
        bestTimeWindow: 'Focus on important tasks between 2-4 PM.',
      },
      affirmation: 'I adapt gracefully to the day\'s evolving energies.',
    };
  } else { // Evening
    return {
      period: 'evening',
      title: 'Evening Reflection',
      eveningDetails: {
        tomorrowsCosmicScoreText: 'Tomorrow forecast: Mostly Clear (4/5)', // Placeholder
        moonMovementOvernight: 'Moon will transition to Virgo overnight, plan for practical tasks.',
        restRecommendation: 'Ensure a peaceful wind-down for optimal rejuvenation.',
      },
      affirmation: 'I am grateful for today and welcome restful sleep.',
    };
  }
};

// Additional mock data for user profile
export interface UserProfile {
  name: string;
  birthDate: Date;
  birthTime: string;
  birthPlace: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
}

export const mockUserProfile: UserProfile = {
  name: 'Alex',
  birthDate: new Date(1990, 5, 15),
  birthTime: '14:30',
  birthPlace: 'New York, NY',
  sunSign: 'Gemini',
  moonSign: 'Scorpio',
  risingSign: 'Libra',
};

// Notification preferences
export interface NotificationSettings {
  dailyReport: boolean;
  dailyReportTime: string;
  moonShifts: boolean;
  majorTransits: boolean;
  retrogradeAlerts: boolean;
}

export const defaultNotificationSettings: NotificationSettings = {
  dailyReport: true,
  dailyReportTime: '08:00',
  moonShifts: true,
  majorTransits: true,
  retrogradeAlerts: true,
};

// Weekly preview data
export interface WeeklyPreview {
  date: Date;
  cosmicScore: number;
  moonSign: string;
  keyEvent: string;
}

export const generateWeeklyPreview = (): WeeklyPreview[] => {
  const preview: WeeklyPreview[] = [];
  const events = [
    'New opportunities arise',
    'Focus on relationships',
    'Financial breakthroughs',
    'Creative inspiration flows',
    'Rest and recharge',
    'Communication is key',
    'Take bold action',
  ];
  
  for (let i = 0; i < 7; i++) {
    preview.push({
      date: addDays(new Date(), i),
      cosmicScore: Math.random() * 2 + 3, // 3-5 range
      moonSign: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo'][Math.floor(Math.random() * 6)],
      keyEvent: events[i],
    });
  }
  
  return preview;
};

// --- START: New Data Structures and Generator for Comprehensive Weekly Forecast ---

// For the top day selector in the new weekly forecast view
export interface DailyWeatherChip {
  id: string; // For key prop
  date: Date;
  dayAbbreviation: string; // e.g., "Mon"
  dateOfMonth: string;   // e.g., "20"
  weatherEmoji: string;  // e.g., "☀️"
  cosmicScore: number; // To have the score available if needed
}

// For the "Moon Movement This Week" card
export interface WeeklyMoonSignChange {
  id: string;
  period: string; // e.g., "Mon-Tue"
  sign: string;   // e.g., "Aries"
  zodiacSymbol: string; // e.g., "♈️"
}
export interface WeeklyMoonPhase {
  id: string;
  phaseName: string; // e.g., "New Moon"
  phaseEmoji: string; // e.g., "🌑"
}
export interface MoonMovementData {
  signChanges: WeeklyMoonSignChange[];
  phases: WeeklyMoonPhase[];
}

// For the "Weekly Highlights" card
export interface WeeklyHighlightItem {
  id: string;
  dayAbbreviation: string; // e.g., "Mon"
  title: string;           // e.g., "New Moon in Aries"
  description: string;     // e.g., "Fresh starts, new beginnings"
}

// For the "Weekly Focus Areas" card
export interface WeeklyFocusPeriod {
  id: string;
  title: string;       // e.g., "Early Week (Mon-Wed)"
  description: string; // e.g., "Personal identity & self-expression (1st House)"
}

// The comprehensive forecast object for the new weekly view
export interface AstroWeeklyForecast {
  dailyChips: DailyWeatherChip[];
  moonMovement: MoonMovementData;
  highlights: WeeklyHighlightItem[];
  focusAreas: WeeklyFocusPeriod[];
}

export const generateAstroWeeklyForecast = (): AstroWeeklyForecast => {
  const today = new Date();
  const dailyChipsData: DailyWeatherChip[] = [];
  const tempScores = ['☀️', '⛅', '☁️', '🌧️', '💨', '✨', '🌤️'];

  for (let i = 0; i < 7; i++) {
    const date = addDays(today, i);
    const scoreData = generateCosmicScore(); // Reuse for score and emoji consistency
    dailyChipsData.push({
      id: `chip-${i}`,
      date: date,
      dayAbbreviation: format(date, 'E'),
      dateOfMonth: format(date, 'd'),
      weatherEmoji: scoreData.weatherEmoji,
      cosmicScore: scoreData.score,
    });
  }

  const moonMovementData: MoonMovementData = {
    signChanges: [
      { id: 'msc1', period: 'Mon-Tue', sign: 'Aries', zodiacSymbol: '♈️' },
      { id: 'msc2', period: 'Wed-Thu', sign: 'Taurus', zodiacSymbol: '♉️' },
      { id: 'msc3', period: 'Fri-Sat', sign: 'Gemini', zodiacSymbol: '♊️' },
      { id: 'msc4', period: 'Sun', sign: 'Cancer', zodiacSymbol: '♋️' },
    ],
    phases: [
      { id: 'mp1', phaseName: 'New Moon', phaseEmoji: '🌑' },
      { id: 'mp2', phaseName: 'Waxing Crescent', phaseEmoji: '🌒' },
      { id: 'mp3', phaseName: 'First Quarter', phaseEmoji: '🌓' },
      // { id: 'mp4', phaseName: 'Waxing Gibbous', phaseEmoji: '🌔' }, // Keep it to 3-4 for layout
    ],
  };

  const highlightsData: WeeklyHighlightItem[] = [
    {
      id: 'wh1',
      dayAbbreviation: format(addDays(today, 0), 'E'), // Monday (or today)
      title: 'New Moon in Aries',
      description: 'Fresh starts, new beginnings & bold moves.',
    },
    {
      id: 'wh2',
      dayAbbreviation: format(addDays(today, 2), 'E'), // Wednesday (or today + 2)
      title: 'Mercury enters Gemini',
      description: 'Communication flows more easily, great for talks.',
    },
    {
      id: 'wh3',
      dayAbbreviation: format(addDays(today, 4), 'E'), // Friday (or today + 4)
      title: 'Venus harmonizes with Moon',
      description: 'Relationship harmony peaks, enjoy connections.',
    },
    {
      id: 'wh4',
      dayAbbreviation: format(addDays(today, 6), 'E'), // Sunday (or today + 6)
      title: 'Mars square Mercury',
      description: 'Watch for communication conflicts, think first.',
    },
  ];

  const focusAreasData: WeeklyFocusPeriod[] = [
    {
      id: 'wf1',
      title: 'Early Week (Mon-Wed)',
      description: 'Personal identity & self-expression (1st House activity)',
    },
    {
      id: 'wf2',
      title: 'Mid Week (Thu-Fri)',
      description: 'Career & public reputation (10th House focus)',
    },
    {
      id: 'wf3',
      title: 'Weekend (Sat-Sun)',
      description: 'Home & family matters (4th House vibes)',
    },
  ];

  return {
    dailyChips: dailyChipsData,
    moonMovement: moonMovementData,
    highlights: highlightsData,
    focusAreas: focusAreasData,
  };
};

// --- END: New Data Structures and Generator for Comprehensive Weekly Forecast --- 