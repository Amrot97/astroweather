# AstroWeather - Personalized Daily Cosmic Guidance

A beautiful React Native app that provides personalized astrological weather forecasts to help users navigate their daily life with cosmic awareness.

## 🌟 Features

### Core Features (MVP)

1. **Daily Cosmic Score (1-5 Scale)**
   - Visual weather metaphor for instant understanding
   - Animated circular progress indicator
   - Harmony vs Challenge energy bars
   - Dynamic gradient backgrounds based on score

2. **Moon Tracker**
   - Current moon sign and phase with emoji visualization
   - Elemental energy indicator
   - "Good for" and "Avoid" activity lists
   - Real-time countdown to next sign change
   - Mood and energy descriptions

3. **Life Area Focus**
   - Visual house wheel representation
   - Top 2 activated life areas for the day
   - Planet placements with color coding
   - Specific activity recommendations
   - Energy distribution visualization

4. **Transit Alerts**
   - Swipeable cards for major daily transits
   - Impact indicators (positive/challenging/neutral)
   - Actionable advice for each transit
   - Timing indicators for peak influence
   - Quick energy overview summary

### UX Innovations

1. **Time-Based Content**
   - Morning, afternoon, and evening specific guidance
   - Dynamic affirmations that change throughout the day
   - Adaptive gradient backgrounds based on time

2. **Haptic Feedback**
   - Subtle vibrations on interactions
   - Enhanced tactile experience

3. **Pull-to-Refresh**
   - Regenerates daily guidance
   - Smooth refresh animations

4. **Floating Action Button**
   - Quick access to:
     - Weekly preview
     - Reminder settings
     - Share functionality

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Studio (for Android emulation)

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd AstroWeather
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   # or
   expo start
   ```

5. Run on your device:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## 🎨 Design Philosophy

The app follows these UX principles:

1. **Simplicity First**: Complex astrological data presented in digestible, actionable insights
2. **Visual Hierarchy**: Most important information (cosmic score) is prominently displayed
3. **Progressive Disclosure**: Detailed information available through natural scrolling
4. **Delightful Animations**: Smooth transitions and micro-interactions
5. **Accessibility**: High contrast, clear typography, and intuitive icons

## 📱 App Structure

```
AstroWeather/
├── App.tsx                 # Main app entry point
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── CosmicScore.tsx
│   │   ├── MoonTracker.tsx
│   │   ├── LifeAreaFocus.tsx
│   │   └── TransitAlerts.tsx
│   ├── screens/          # Screen components
│   │   └── HomeScreen.tsx
│   ├── data/            # Mock data generators
│   │   └── mockData.ts
│   └── theme/           # Theme configuration
│       └── theme.ts
```

## 🔮 Future Enhancements

Based on the MVP success, consider adding:

1. **User Profile Setup**
   - Birth chart input wizard
   - Personalization preferences

2. **Weekly/Monthly Views**
   - Cosmic calendar
   - Retrograde tracker
   - Moon phase calendar

3. **Notifications**
   - Daily report at custom time
   - Moon sign changes
   - Major transit alerts

4. **Social Features**
   - Share daily insights
   - Compatibility checks
   - Group cosmic weather

5. **Advanced Features**
   - Meditation timers for cosmic alignment
   - Journal integration
   - Location-based adjustments

## 🛠️ Technical Notes

- Built with React Native + Expo for cross-platform compatibility
- React Native Paper for Material Design components
- TypeScript for type safety
- Mock data simulates backend responses
- Animations using React Native Animated API
- Date handling with date-fns

## 📄 License

This is a prototype for demonstration purposes.

## 🤝 Contributing

This is a prototype, but feel free to:
- Report issues
- Suggest features
- Submit pull requests

---

Made with 🌙 and ⭐ for cosmic guidance seekers 