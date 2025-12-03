import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getChartData } from '../utils/caffeine';

const CaffeineChart = ({ drinks }) => {
    const chartData = getChartData(drinks);
    const screenWidth = Dimensions.get('window').width;

    // Only show every 4th label to avoid crowding
    const filteredLabels = chartData.labels.map((label, index) =>
        index % 4 === 0 ? label : ''
    );

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Caffeine Levels Today</Text>
            <LineChart
                data={{
                    labels: filteredLabels,
                    datasets: [
                        {
                            data: chartData.data,
                        },
                    ],
                }}
                width={screenWidth - 64}
                height={220}
                yAxisSuffix=" mg"
                chartConfig={{
                    backgroundColor: '#1e293b',
                    backgroundGradientFrom: '#1e293b',
                    backgroundGradientTo: '#1e293b',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(56, 189, 248, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '2',
                        strokeWidth: '2',
                        stroke: '#38bdf8',
                    },
                }}
                bezier
                style={styles.chart}
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
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
});

export default CaffeineChart;
