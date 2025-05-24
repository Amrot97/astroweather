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

export interface TimeBasedContent {
  period: 'morning' | 'afternoon' | 'evening';
  title: string;
  content: string;
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
      house: 10,
      name: 'Career & Public Life',
      emoji: '💼',
      planets: ['Venus', 'Mercury'],
      energy: 'High visibility and recognition',
      activities: ['Presentations', 'Networking', 'Job interviews', 'Public speaking'],
    },
    {
      house: 7,
      name: 'Relationships',
      emoji: '💕',
      planets: ['Venus'],
      energy: 'Harmony and connection',
      activities: ['Date nights', 'Partner discussions', 'Collaborations', 'Contracts'],
    },
    {
      house: 2,
      name: 'Money & Resources',
      emoji: '💰',
      planets: ['Mars'],
      energy: 'Financial motivation',
      activities: ['Budget planning', 'Investment decisions', 'Shopping', 'Salary negotiations'],
    },
    {
      house: 5,
      name: 'Creativity & Romance',
      emoji: '🎨',
      planets: ['Sun'],
      energy: 'Playful and expressive',
      activities: ['Art projects', 'Dating', 'Hobbies', 'Fun activities'],
    },
    {
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
      description: 'Opportunities and expansion available',
      impact: 'positive' as const,
      advice: 'Say yes to new opportunities',
    },
    {
      id: '4',
      emoji: '🪐',
      title: 'Saturn squares your Moon',
      description: 'Emotional responsibilities weigh heavy',
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
  
  if (hour >= 6 && hour < 12) {
    return {
      period: 'morning',
      title: 'Your Day Ahead',
      content: 'The morning brings fresh cosmic energy. Set your intentions and align with the universe.',
      affirmation: 'I am open to the abundance the universe offers today',
    };
  } else if (hour >= 12 && hour < 18) {
    return {
      period: 'afternoon',
      title: 'Afternoon Shift',
      content: 'Energy shifts as the sun moves through the sky. Adjust your focus accordingly.',
      affirmation: 'I flow with the cosmic rhythms of the day',
    };
  } else {
    return {
      period: 'evening',
      title: 'Evening Reflection',
      content: 'As the day winds down, the cosmos invite introspection and rest.',
      affirmation: 'I release today with gratitude and welcome peaceful rest',
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
  cosmicScore: number; 
  detailedWeatherDescription: string; 
  moonInfoForDay: string; 
  keyHighlightForDay: string; 
  focusForDay: string; 
}

// For the "Moon Movement This Week" card
export interface WeeklyMoonSignChange {
// ... (interface unchanged) ...
}
export interface WeeklyMoonPhase {
// ... (interface unchanged) ...
}
export interface MoonMovementData {
// ... (interface unchanged) ...
}

// For the "Weekly Highlights" card
export interface WeeklyHighlightItem {
// ... (interface unchanged) ...
}

// For the "Weekly Focus Areas" card
export interface WeeklyFocusPeriod {
// ... (interface unchanged) ...
}

// The comprehensive forecast object for the new weekly view
export interface AstroWeeklyForecast {
// ... (interface unchanged) ...
}

// CORRECTED AND EXPANDED generateAstroWeeklyForecast
export const generateAstroWeeklyForecast = (): AstroWeeklyForecast => {
  const today = new Date();
  const dailyChipsData: DailyWeatherChip[] = [];
  
  const sampleWeatherDetails = [
    "Excellent energy for new beginnings and important decisions. Seize the day!",
    "Mixed energies today. Good for routine tasks and steady progress. Some minor obstacles possible but surmountable.",
    "A low energy day. Focus on rest, reflection, and gentle activities. Avoid major decisions or confrontations.",
    "Generally positive energy with brief moments of tension. Stay flexible, adaptable, and communicative.",
    "A dynamic day! Expect the unexpected and embrace change with an open mind. Good for spontaneity.",
    "Focus on creative pursuits and self-expression. Inspiration is high! Connect with your passions.",
    "A grounding day. Perfect for planning, organizing, and attending to practical matters. Solidify foundations."
  ];
  const sampleMoonInfos = [
    "Moon in Aries. Mood: Energetic & Impulsive. Channel drive constructively.",
    "Moon in Taurus. Mood: Sensual & Grounded. Enjoy simple pleasures and nature.",
    "Moon in Gemini. Mood: Chatty & Curious. Great for learning, writing, and socialising.",
    "Moon in Cancer. Mood: Nurturing & Sensitive. Focus on home, family, and emotional needs.",
    "Moon in Leo. Mood: Confident & Expressive. Shine bright, share your talents, and have fun.",
    "Moon in Virgo. Mood: Analytical & Organized. Excellent for details, health routines, and service.",
    "Moon in Libra. Mood: Harmonious & Diplomatic. Seek balance in relationships and aesthetics."
  ];
  const sampleDailyHighlights = [
    "Sun trine Moon: Overall harmony and ease throughout the day. Go with the flow and enjoy.",
    "Mercury conjunct Venus: Ideal for charming communication, expressing affection, and social graces.",
    "Mars sextile Jupiter: Opportunities for bold, expansive action. Luck favors the brave and proactive.",
    "Venus square Saturn: Potential challenges in love or finances; patience, realism, and hard work needed.",
    "Jupiter enters new sign: A significant shift in areas of luck, growth, philosophy, and expansion.",
    "Uranus conjunct Sun: Unexpected events bringing excitement or disruption. Stay adaptable and innovative.",
    "Full Moon peak: Heightened emotions and culmination of projects. Release what no longer serves you well."
  ];
  const sampleDailyFocus = [
    "Focus on personal projects, creativity, and self-expression. Let your inner child play and take initiative!",
    "Attend to financial matters, build security, and appreciate your resources. Practical steps forward bring stability.",
    "Emphasize communication, learning, teaching, and networking. Share your ideas and connect with others.",
    "Nurture home and family connections. Create a comforting, supportive, and emotionally secure environment.",
    "Advance your career and public image. Take the lead, showcase your abilities, and seek recognition.",
    "Prioritize health, wellness, daily routines, and acts of service. Small improvements make a big difference now.",
    "Cultivate relationships, partnerships, and seek harmony in collaborations. Connect deeply and beautify your surroundings."
  ];

  for (let i = 0; i < 7; i++) {
    const date = addDays(today, i);
    const scoreData = generateCosmicScore(); 
    dailyChipsData.push({
      id: `chip-${i}`,
      date: date,
      dayAbbreviation: format(date, 'E'),
      dateOfMonth: format(date, 'd'),
      weatherEmoji: scoreData.weatherEmoji,
      cosmicScore: scoreData.score,
      detailedWeatherDescription: sampleWeatherDetails[i % sampleWeatherDetails.length],
      moonInfoForDay: sampleMoonInfos[i % sampleMoonInfos.length],
      keyHighlightForDay: sampleDailyHighlights[i % sampleDailyHighlights.length],
      focusForDay: sampleDailyFocus[i % sampleDailyFocus.length],
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
    ],
  };

  const highlightsData: WeeklyHighlightItem[] = [
    {
      id: 'wh1',
      dayAbbreviation: format(addDays(today, 0), 'E'), 
      title: 'New Moon in Aries',
      description: 'Fresh starts, new beginnings & bold moves.',
    },
    {
      id: 'wh2',
      dayAbbreviation: format(addDays(today, 2), 'E'), 
      title: 'Mercury enters Gemini',
      description: 'Communication flows more easily, great for talks.',
    },
    {
      id: 'wh3',
      dayAbbreviation: format(addDays(today, 4), 'E'), 
      title: 'Venus harmonizes with Moon',
      description: 'Relationship harmony peaks, enjoy connections.',
    },
    {
      id: 'wh4',
      dayAbbreviation: format(addDays(today, 6), 'E'),
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

// --- START: Data Structures and Generator for Retrograde Tracker ---

export interface RetrogradePlanetInfo {
  id: string;
  planetName: string;
  astrologicalSymbol: string; // e.g., ☿ for Mercury
  isRetrograde: boolean;
  statusText: string; // "Currently Retrograde" or "Currently Direct"
  datesLabel?: string; // "Retrograde Period:" or "Direct Since:"
  datesValue?: string; // e.g., "Oct 25 - Nov 15" or "Aug 10"
  interpretation?: string; // User-friendly advice if retrograde
}

export const generateRetrogradeInfo = (): RetrogradePlanetInfo[] => {
  const planets = [
    { name: 'Mercury', symbol: '☿' },
    { name: 'Venus', symbol: '♀️' },
    { name: 'Mars', symbol: '♂️' },
    { name: 'Jupiter', symbol: '♃' },
    { name: 'Saturn', symbol: '♄' },
  ];

  const today = new Date();

  return planets.map((planet, index) => {
    const isRetro = Math.random() < 0.3; // Approx 30% chance of being retrograde for mock
    let interpretationText, datesLabelText, datesValueText, statusText;

    if (isRetro) {
      const startDate = addDays(today, -(Math.floor(Math.random() * 30) + 5)); // Started 5-35 days ago
      const endDate = addDays(today, Math.floor(Math.random() * 40) + 10); // Ends in 10-50 days
      datesLabelText = 'Retrograde Period:';
      datesValueText = `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`;
      statusText = 'Currently Retrograde';

      switch (planet.name) {
        case 'Mercury':
          interpretationText = 'Review communications, travel, and tech. Double-check details. Good for reflection.';
          break;
        case 'Venus':
          interpretationText = 'Re-evaluate relationships, values, and finances. Old connections may reappear.';
          break;
        case 'Mars':
          interpretationText = 'Energy may be lower or turned inward. Review motivations before acting. Avoid new conflicts.';
          break;
        case 'Jupiter':
          interpretationText = 'Review your beliefs and growth areas. Inner expansion over outer pushes.';
          break;
        case 'Saturn':
          interpretationText = 'Re-assess responsibilities, boundaries, and long-term plans. Karmic lessons may surface.';
          break;
        default:
          interpretationText = 'A period for review and re-assessment related to this planet\'s themes.';
      }
    } else {
      const directSinceDate = addDays(today, -(Math.floor(Math.random() * 60) + 10)); // Went direct 10-70 days ago
      datesLabelText = 'Direct Since:';
      datesValueText = format(directSinceDate, 'MMM d');
      statusText = 'Currently Direct';
      interpretationText = undefined; // No specific interpretation needed if direct for this MVP
    }

    return {
      id: `retro-${planet.name.toLowerCase()}`,
      planetName: planet.name,
      astrologicalSymbol: planet.symbol,
      isRetrograde: isRetro,
      statusText: statusText,
      datesLabel: datesLabelText,
      datesValue: datesValueText,
      interpretation: interpretationText,
    };
  });
};

// --- END: Data Structures and Generator for Retrograde Tracker ---