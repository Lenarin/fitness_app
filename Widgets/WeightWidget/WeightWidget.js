import React, { useEffect, useState } from 'react'
import { StyleSheet, AsyncStorage, Dimensions } from 'react-native'
import { observer } from 'mobx-react'
import { Card, Avatar, Colors, Button, Text } from 'react-native-paper'
import WeightStore from './WeightStore';
import { useNavigation } from '@react-navigation/native';
import { create } from 'mobx-persist';
import { LineChart } from 'react-native-chart-kit';

const weightStore = new WeightStore();

const hydrate = create({
    storage: AsyncStorage
});

hydrate('Weight', weightStore);

const displayLastNum = 6;

const WeightWidget = observer(() => {
    const navigator = useNavigation();

    const data = {
        labels: weightStore.measurementHistory.map(item => {
            const d = new Date(item.MeasureDate);
            return d.getDay() + "/" + d.getMonth() + 1;
        }),
        datasets: [
            {
                data: weightStore.measurementHistory.slice(-displayLastNum).map(item => item.Weight)
            }
        ]
    };

    const weightChartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    };
      
    const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);

    useEffect(() => {
        const handler = ({ window }) => setScreenWidth(window.width);

        Dimensions.addEventListener('change', handler);

        return () => Dimensions.removeEventListener('change', handler);
    });

	return (
        <Card 
            elevation={1} 
            style={styles.card} 
            theme={{ roundness: 12 }}
            onPress={() => navigator.navigate("WeightHistory")}
        >
            <Card.Title title="Масса" left={(props) => <Avatar.Icon {...props} icon="weight" style={styles.cardIcon}/>} />
            
            <Card.Content style={styles.cardContent}>
                {weightStore.measurementHistory.length == 0
                    ? <Text>Еще не добавлено ни одного измерения</Text>
                    : null
                }

                {weightStore.measurementHistory.length > 0 && weightStore.measurementHistory.length <= 2
                    ? <Text>{"Последнее измерение: " + weightStore.measurementHistory[weightStore.measurementHistory.length - 1].Weight + "кг"}</Text>
                    : null
                }

                {weightStore.measurementHistory.length > 2
                    ? <LineChart
                        data={data}
                        width={screenWidth - 50}
                        height={220}
                        chartConfig={weightChartConfig}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    : null
                }
            </Card.Content>

            <Card.Actions style={styles.cardActions}>
                <Button color={Colors.cyan700} onPress={() => navigator.navigate("AddWeightMeasure")}>Добавить измерение</Button>
            </Card.Actions>
        </Card>
	);
});

const styles = StyleSheet.create({
    container: {
	  flex: 1,
	  flexDirection: "column",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardIcon: {
        backgroundColor: "#ffa726"
    },
    card: {
        margin: 10,
        backgroundColor: "#fafafa"
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export { WeightWidget, weightStore};