import React, { useEffect, useState } from 'react';
import {
    StyleSheet, AsyncStorage, Dimensions,
} from 'react-native';
import { observer } from 'mobx-react';
import {
    Card, Button, Avatar, Colors, Subheading,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { create } from 'mobx-persist';
import { ProgressChart } from 'react-native-chart-kit';
import FoodStore from './FoodStore';
import antropometryStore from '../../Stores/AntropometryStore';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        margin: 10,
        backgroundColor: '#fafafa',
    },
    cardIcon: {
        backgroundColor: Colors.teal400,
    },
    cardActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

const foodStore = new FoodStore();

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('Food', foodStore);

const FoodWidget = observer(() => {
    const navigator = useNavigation();

    const chartData = [0, 0, 0, 0];

    if (antropometryStore.CanCalculateDCI) {
        const nutrients = foodStore.getNutrientsPercentage(antropometryStore.DCI);

        chartData[0] = nutrients.Proteins > 1 ? 1 : nutrients.Proteins;
        chartData[1] = nutrients.Fats > 1 ? 1 : nutrients.Fats;
        chartData[2] = nutrients.Carbohydrates > 1 ? 1 : nutrients.Carbohydrates;
        chartData[3] = nutrients.Calories > 1 ? 1 : nutrients.Calories;
    }

    const data = {
        labels: ['Б', 'Ж', 'У', 'ККал'], // optional
        data: chartData,
    };

    const chartConfig = {
        backgroundColor: '#fafafa',
        backgroundGradientFrom: '#fafafa',
        backgroundGradientTo: '#fafafa',
        color: (opacity = 1, index) => {
            const dataColors = [
                `rgba(81, 48, 168, ${opacity})`,
                `rgba(211, 47, 47, ${opacity})`,
                `rgba(255, 160, 0, ${opacity})`,
                `rgba(0, 200, 83, ${opacity})`,
                `rgba(48, 63, 159, ${opacity})`,
                `rgba(0, 151, 167, ${opacity})`,
            ];

            return dataColors[index];
        },
        labelColor: (opacity = 1) => `rgba(15, 15, 15, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
        },
    };

    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

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
            onPress={() => navigator.navigate('MealsList')}
        >
            <Card.Title title="Питание" left={(props) => <Avatar.Icon {...props} icon="food" style={styles.cardIcon} />} />

            <Card.Content>
                {antropometryStore.CanCalculateDCI
                    ? (
                        <>
                            <Subheading>
                                {`Норма калорий за день: ${antropometryStore.DCI.toFixed(0)}`}
                            </Subheading>
                            <Subheading>
                                {`Потребление за день: ${foodStore.ConsumedToday.Calories} ккал`}
                            </Subheading>
                        </>
                    )
                    : null}

                <ProgressChart
                    data={data}
                    width={screenWidth - 25}
                    height={220}
                    chartConfig={chartConfig}
                    hideLegend={false}
                    style={{
                        marginLeft: -15,
                        marginVertical: 8,
                    }}
                />
            </Card.Content>

            <Card.Actions style={styles.cardActions}>
                <Button color={Colors.cyan700} onPress={() => navigator.navigate('AddMealtime')}>+ прием пищи</Button>
            </Card.Actions>
        </Card>
    );
});

export { FoodWidget, foodStore };
