import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Default drink options
const DEFAULT_DRINKS = [
    { name: 'Coffee', amount: 95, caffeinePerHundredMl: 80 },
    { name: 'Espresso (standard 30 ml)', amount: 63, caffeinePerHundredMl: 210 },
    { name: 'Tea', amount: 26, caffeinePerHundredMl: 11 },
    { name: 'Soda', amount: 55, caffeinePerHundredMl: 11 },
    { name: 'Energy Drink', amount: 100, caffeinePerHundredMl: 32 },
    { name: 'Custom', amount: 0, caffeinePerHundredMl: 0 },
];

const AddDrink = ({ onAdd, customDrinksUpdate }) => {
    const [customDrinks, setCustomDrinks] = useState([]);
    const [allDrinks, setAllDrinks] = useState(DEFAULT_DRINKS);
    const [selectedDrink, setSelectedDrink] = useState(DEFAULT_DRINKS[0].name);
    const [caffeinePerHundredMl, setCaffeinePerHundredMl] = useState(DEFAULT_DRINKS[0].caffeinePerHundredMl.toString());
    const [volume, setVolume] = useState('200');
    const [timeHours, setTimeHours] = useState('');
    const [timeMinutes, setTimeMinutes] = useState('');

    // Load custom drinks
    useEffect(() => {
        loadCustomDrinks();
    }, [customDrinksUpdate]);

    const loadCustomDrinks = async () => {
        try {
            const saved = await AsyncStorage.getItem('caffeine-custom-drinks');
            const customs = saved ? JSON.parse(saved) : [];
            setCustomDrinks(customs);
            const merged = [
                ...DEFAULT_DRINKS.slice(0, -1),
                ...customs.map(d => ({
                    name: d.name,
                    amount: 0,
                    caffeinePerHundredMl: d.caffeinePerHundredMl,
                    isCustom: true,
                })),
                DEFAULT_DRINKS[DEFAULT_DRINKS.length - 1],
            ];
            setAllDrinks(merged);
        } catch (error) {
            console.error('Error loading custom drinks:', error);
        }
    };

    const handleDrinkChange = (value) => {
        setSelectedDrink(value);
        const drink = allDrinks.find(d => d.name === value);
        if (drink) {
            setCaffeinePerHundredMl(drink.caffeinePerHundredMl.toString());
        }
    };

    const setNow = () => {
        const now = new Date();
        setTimeHours(String(now.getHours()).padStart(2, '0'));
        setTimeMinutes(String(now.getMinutes()).padStart(2, '0'));
    };

    const handleSubmit = () => {
        const volumeNum = parseFloat(volume);
        const caffeineNum = parseFloat(caffeinePerHundredMl);
        const hours = parseInt(timeHours);
        const minutes = parseInt(timeMinutes);

        if (!caffeineNum || !volumeNum || isNaN(hours) || isNaN(minutes)) {
            alert('Please fill in all fields');
            return;
        }

        const totalCaffeine = Math.round((volumeNum / 100) * caffeineNum);
        const now = new Date();
        const drinkTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

        onAdd({
            id: Date.now(),
            name: selectedDrink,
            amount: totalCaffeine,
            time: drinkTime.toISOString(),
        });

        // Reset time fields
        setTimeHours('');
        setTimeMinutes('');
    };

    const totalCaffeine = Math.round((parseFloat(volume) / 100) * parseFloat(caffeinePerHundredMl)) || 0;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Add Caffeine</Text>

            <Text style={styles.label}>Drink Type</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedDrink}
                    onValueChange={handleDrinkChange}
                    style={styles.picker}
                    dropdownIconColor="#94a3b8"
                >
                    {allDrinks.map(d => (
                        <Picker.Item
                            key={d.name}
                            label={d.isCustom ? `${d.name} (${d.caffeinePerHundredMl} mg/100ml)` : d.name}
                            value={d.name}
                            color="#f8fafc"
                        />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Volume (ml)</Text>
            <TextInput
                style={styles.input}
                value={volume}
                onChangeText={setVolume}
                keyboardType="numeric"
                placeholder="200"
                placeholderTextColor="#64748b"
            />

            <Text style={styles.label}>Caffeine amount (mg) / 100 ml</Text>
            <TextInput
                style={styles.input}
                value={caffeinePerHundredMl}
                onChangeText={setCaffeinePerHundredMl}
                keyboardType="numeric"
                placeholder="80"
                placeholderTextColor="#64748b"
            />

            <Text style={styles.totalLabel}>Total Caffeine: {totalCaffeine} mg</Text>

            <Text style={styles.label}>Time</Text>
            <View style={styles.timeRow}>
                <TextInput
                    style={[styles.input, styles.timeInput]}
                    value={timeHours}
                    onChangeText={setTimeHours}
                    keyboardType="numeric"
                    placeholder="HH"
                    placeholderTextColor="#64748b"
                    maxLength={2}
                />
                <Text style={styles.timeSeparator}>:</Text>
                <TextInput
                    style={[styles.input, styles.timeInput]}
                    value={timeMinutes}
                    onChangeText={setTimeMinutes}
                    keyboardType="numeric"
                    placeholder="MM"
                    placeholderTextColor="#64748b"
                    maxLength={2}
                />
                <TouchableOpacity style={styles.nowButton} onPress={setNow}>
                    <Text style={styles.nowButtonText}>Now</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Add Drink</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1e293b',
        padding: 16,
        borderRadius: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#334155',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#f8fafc',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#f8fafc',
        marginBottom: 8,
        marginTop: 8,
    },
    pickerContainer: {
        backgroundColor: '#1e293b',
        borderWidth: 1,
        borderColor: '#334155',
        borderRadius: 8,
        marginBottom: 8,
    },
    picker: {
        color: '#f8fafc',
    },
    input: {
        backgroundColor: '#1e293b',
        borderWidth: 1,
        borderColor: '#334155',
        color: '#f8fafc',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#38bdf8',
        marginBottom: 8,
        marginTop: 8,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    timeInput: {
        flex: 1,
        textAlign: 'center',
    },
    timeSeparator: {
        color: '#f8fafc',
        fontSize: 20,
        marginHorizontal: 8,
        fontWeight: '700',
    },
    nowButton: {
        backgroundColor: '#334155',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginLeft: 8,
    },
    nowButtonText: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#38bdf8',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    submitButtonText: {
        color: '#0f172a',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default AddDrink;
