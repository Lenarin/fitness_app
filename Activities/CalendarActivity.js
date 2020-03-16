import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { ContributionGraph } from 'react-native-chart-kit'
import { observer } from 'mobx-react'
import { Colors } from 'react-native-paper'



const CalendarCard = observer(() => {
	const commitsData = [
		{ date: "2017-01-02", count: 1 },
		{ date: "2017-01-03", count: 2 },
		{ date: "2017-01-04", count: 3 },
		{ date: "2017-01-05", count: 4 },
		{ date: "2017-01-06", count: 5 },
		{ date: "2017-01-30", count: 2 },
		{ date: "2017-01-31", count: 3 },
		{ date: "2017-03-01", count: 2 },
		{ date: "2017-04-02", count: 4 },
		{ date: "2017-03-05", count: 2 },
		{ date: "2017-02-30", count: 4 }
	];

	const chartConfig = {
        backgroundColor: "#fff",
        backgroundGradientFrom: Colors.cyan700,
        backgroundGradientTo: Colors.cyan700,
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
			borderRadius: 16,
			margin: 10
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
    };

	const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width - chartConfig.style.margin * 2);

    useEffect(() => {
        const handler = ({ window }) => setScreenWidth(window.width - (chartConfig.style.margin * 2));

        Dimensions.addEventListener('change', handler);

        return () => Dimensions.removeEventListener('change', handler);
    });

	return (
		<View style={{margin: chartConfig.style.margin}}>
			<ContributionGraph 
				width={screenWidth}
				height={220}
				values={commitsData}
				numDays={93}
				endDate={Date.now()}
				chartConfig={chartConfig}
			/>
		</View>
	)
})

export default function CalendarActivity() {
	return (
		<View style={styles.container}>
			<CalendarCard />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: '#e6e6e6',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		paddingTop: 25
	},
	card: {
        margin: 10,
        backgroundColor: "#fafafa"
    },
    cardIcon: {
        backgroundColor: "#52cbbc"
    },
    cardActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
  });