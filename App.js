import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddDrink from './components/AddDrink';
import Status from './components/Status';
import CaffeineChart from './components/CaffeineChart';
import CustomDrinkManager from './components/CustomDrinkManager';
import DrinkHistory from './components/DrinkHistory';
import { calculateTotalLevel } from './utils/caffeine';

export default function App() {
  const [drinks, setDrinks] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [customDrinksUpdate, setCustomDrinksUpdate] = useState(0);

  // Load drinks from AsyncStorage on mount
  useEffect(() => {
    loadDrinks();
  }, []);

  // Save drinks to AsyncStorage whenever they change
  useEffect(() => {
    saveDrinks();
  }, [drinks]);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const loadDrinks = async () => {
    try {
      const saved = await AsyncStorage.getItem('caffeine-drinks');
      if (saved) {
        setDrinks(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading drinks:', error);
    }
  };

  const saveDrinks = async () => {
    try {
      await AsyncStorage.setItem('caffeine-drinks', JSON.stringify(drinks));
    } catch (error) {
      console.error('Error saving drinks:', error);
    }
  };

  const addDrink = (drink) => {
    setDrinks(prev => [...prev, drink].sort((a, b) => new Date(a.time) - new Date(b.time)));
  };

  const deleteDrink = (id) => {
    setDrinks(prev => prev.filter(drink => drink.id !== id));
  };

  const handleCustomDrinksUpdate = () => {
    setCustomDrinksUpdate(prev => prev + 1);
  };

  const currentLevel = calculateTotalLevel(drinks, currentTime);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.appTitle}>☕ Caffeine Tracker</Text>

        <CaffeineChart drinks={drinks} />

        <Status currentLevel={currentLevel} />

        <DrinkHistory drinks={drinks} onDelete={deleteDrink} />

        <AddDrink onAdd={addDrink} customDrinksUpdate={customDrinksUpdate} />

        <CustomDrinkManager onUpdate={handleCustomDrinksUpdate} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Based on a 5-hour half-life formula (clears after 12h).
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 40,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 20,
  },
  footer: {
    marginTop: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'center',
  },
});
