import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Status = ({ currentLevel }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Current Caffeine Level</Text>
            <Text style={styles.level}>{Math.round(currentLevel)} mg</Text>
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
        marginBottom: 8,
    },
    level: {
        fontSize: 32,
        fontWeight: '700',
        color: '#38bdf8',
        textAlign: 'center',
    },
});

export default Status;
