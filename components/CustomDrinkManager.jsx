import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrinkManager = ({ onUpdate }) => {
    const [customDrinks, setCustomDrinks] = useState([]);
    const [newDrinkName, setNewDrinkName] = useState('');
    const [newDrinkCaffeine, setNewDrinkCaffeine] = useState('');

    useEffect(() => {
        loadCustomDrinks();
    }, []);

    const loadCustomDrinks = async () => {
        try {
            const saved = await AsyncStorage.getItem('caffeine-custom-drinks');
            const drinks = saved ? JSON.parse(saved) : [];
            setCustomDrinks(drinks);
        } catch (error) {
            console.error('Error loading custom drinks:', error);
        }
    };

    const saveCustomDrinks = async (drinks) => {
        try {
            await AsyncStorage.setItem('caffeine-custom-drinks', JSON.stringify(drinks));
            setCustomDrinks(drinks);
            if (onUpdate) {
                onUpdate();
            }
        } catch (error) {
            console.error('Error saving custom drinks:', error);
        }
    };

    const addCustomDrink = () => {
        const caffeine = parseFloat(newDrinkCaffeine);

        if (!newDrinkName.trim() || !caffeine || caffeine <= 0) {
            alert('Please enter a valid drink name and caffeine amount');
            return;
        }

        const newDrink = {
            name: newDrinkName.trim(),
            caffeinePerHundredMl: caffeine,
        };

        saveCustomDrinks([...customDrinks, newDrink]);
        setNewDrinkName('');
        setNewDrinkCaffeine('');
    };

    const deleteCustomDrink = (index) => {
        const updated = customDrinks.filter((_, i) => i !== index);
        saveCustomDrinks(updated);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.drinkItem}>
            <View style={styles.drinkInfo}>
                <Text style={styles.drinkName}>{item.name}</Text>
                <Text style={styles.drinkDetails}>{item.caffeinePerHundredMl} mg/100ml</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteCustomDrink(index)}
            >
                <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Custom Drinks</Text>

            <Text style={styles.label}>Drink Name</Text>
            <TextInput
                style={styles.input}
                value={newDrinkName}
                onChangeText={setNewDrinkName}
                placeholder="e.g., Juhla Mokka"
                placeholderTextColor="#64748b"
            />

            <Text style={styles.label}>Caffeine (mg/100ml)</Text>
            <TextInput
                style={styles.input}
                value={newDrinkCaffeine}
                onChangeText={setNewDrinkCaffeine}
                keyboardType="numeric"
                placeholder="e.g., 80"
                placeholderTextColor="#64748b"
            />

            <TouchableOpacity style={styles.addButton} onPress={addCustomDrink}>
                <Text style={styles.addButtonText}>Add Custom Drink</Text>
            </TouchableOpacity>

            {customDrinks.length > 0 && (
                <>
                    <Text style={styles.listTitle}>Saved Custom Drinks</Text>
                    <FlatList
                        data={customDrinks}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                    />
                </>
            )}
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
    addButton: {
        backgroundColor: '#38bdf8',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
    },
    addButtonText: {
        color: '#0f172a',
        fontSize: 16,
        fontWeight: '700',
    },
    listTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f8fafc',
        marginBottom: 12,
    },
    drinkItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#0f172a',
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#334155',
    },
    drinkInfo: {
        flex: 1,
    },
    drinkName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f8fafc',
        marginBottom: 4,
    },
    drinkDetails: {
        fontSize: 14,
        color: '#94a3b8',
    },
    deleteButton: {
        backgroundColor: '#ef4444',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        minWidth: 32,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
});

export default CustomDrinkManager;
