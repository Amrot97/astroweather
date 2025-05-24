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