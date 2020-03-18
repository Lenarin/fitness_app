import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
// import { observer } from 'mobx-react';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e6e6e6',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: 25,
    },
    card: {
        margin: 10,
        backgroundColor: '#fafafa',
    },
    cardIcon: {
        backgroundColor: '#52cbbc',
    },
    cardActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});


const CalendarCard = (() => {
    const commitsData = [
        { date: '2020-03-06', count: 2 },
        { date: '2020-03-05', count: 5 },
        { date: '2020-03-10', count: 3 },
        { date: '2020-03-11', count: 3 },
        { date: '2020-03-09', count: 3 },
    ];

    const chartConfig = {
        backgroundColor: Colors.white,
        backgroundGradientFrom: Colors.white,
        backgroundGradientTo: Colors.white,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
            margin: 10,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
        },
    };

    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width - chartConfig.style.margin * 2);

    useEffect(() => {
        const handler = ({ window }) => setScreenWidth(window.width - (chartConfig.style.margin * 2));

        Dimensions.addEventListener('change', handler);

        return () => Dimensions.removeEventListener('change', handler);
    });

    return (
        <View style={{ margin: chartConfig.style.margin }}>
            <ContributionGraph
                width={screenWidth}
                height={220}
                values={commitsData}
                numDays={90}
                endDate={new Date(Date.now())}
                chartConfig={chartConfig}
            />
        </View>
    );
});

export default function CalendarActivity() {
    return (
        <View style={styles.container}>
            <CalendarCard />
        </View>
    );
}
