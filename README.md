# Caffeine Tracker - Android App

A React Native mobile application for tracking caffeine intake throughout the day, built with Expo.

## Features

- **Track Caffeine Intake**: Add drinks with customizable volume and caffeine content
- **Custom Drinks**: Create and save your own drink types with specific caffeine concentrations
- **Real-time Calculations**: See current caffeine levels based on 5-hour half-life formula
- **Visual Chart**: Interactive line chart showing caffeine levels throughout the day
- **Drink History**: View and manage all recorded drinks with timestamps
- **Persistent Storage**: All data is saved locally using AsyncStorage
- **Dark Theme**: Beautiful dark mode UI optimized for mobile

## Installation & Running

### Prerequisites

- Node.js installed
- Expo CLI installed globally: `npm install -g expo-cli`
- Expo Go app on your Android device (download from Play Store)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Scan the QR code with Expo Go app on your Android device

## Features Explained

### Caffeine Calculation

The app uses a 5-hour half-life formula to calculate remaining caffeine:
- Each drink's caffeine decreases by half every 5 hours
- Caffeine is considered cleared after 12 hours
- Current level is the sum of all remaining caffeine from all drinks

### Custom Drinks

Save your favorite drinks with their specific caffeine content:
- Enter drink name (e.g., "Juhla Mokka")
- Specify caffeine content in mg per 100ml
- Use in future drink entries

### Time Input

- Enter time manually using HH:MM format
- Use "Now" button to quickly set current time

## Project Structure

```
caffeine-tracker-android/
├── App.js                      # Main application component
├── components/
│   ├── AddDrink.jsx           # Form to add new drinks
│   ├── CaffeineChart.jsx      # Chart visualization
│   ├── CustomDrinkManager.jsx # Manage custom drinks
│   ├── DrinkHistory.jsx       # List of recorded drinks
│   └── Status.jsx             # Current caffeine level display
├── utils/
│   └── caffeine.js            # Caffeine calculation utilities
├── app.json                   # Expo configuration
└── package.json               # Dependencies

```

## Technologies

- **React Native**: Mobile app framework
- **Expo**: Development and build toolchain
- **AsyncStorage**: Local data persistence
- **react-native-chart-kit**: Chart visualization
- **@react-native-picker/picker**: Dropdown selection

## Based On

This Android app is a mobile adaptation of the web-based Caffeine Tracker, maintaining all core functionality while optimizing for mobile UX.
