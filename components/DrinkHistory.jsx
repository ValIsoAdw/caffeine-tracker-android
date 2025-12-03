import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const DrinkHistory = ({ drinks, onDelete }) => {
    const sortedDrinks = [...drinks].sort((a, b) => new Date(b.time) - new Date(a.time));

    const renderItem = ({ item }) => {
        const drinkTime = new Date(item.time);
        const timeString = drinkTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
            <View style={styles.historyItem}>
                <View style={styles.drinkInfo}>
                    <Text style={styles.drinkName}>{item.name}</Text>
                    <Text style={styles.drinkDetails}>
                        {item.amount} mg • {timeString}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(item.id)}
                >
                    <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
            </View>
        );
    };

    if (drinks.length === 0) {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>Drink History</Text>
                <Text style={styles.emptyText}>No drinks recorded yet</Text>
            </View>
        );
    }

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Drink History</Text>
            <FlatList
                data={sortedDrinks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
            />
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
        marginBottom: 12,
    },
    historyItem: {
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
    emptyText: {
        color: '#94a3b8',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default DrinkHistory;
