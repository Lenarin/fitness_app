import React, { useEffect, useState } from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { observer } from 'mobx-react'
import { Card, Button, Avatar, Text, Colors } from 'react-native-paper'
import FoodStore from './FoodStore';
import { useNavigation } from '@react-navigation/native';
import { create } from 'mobx-persist';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const foodStore = new FoodStore();

const hydrate = create({
    storage: AsyncStorage
});

hydrate('Food', foodStore);

const FoodWidget = observer(() => {
    const navigator = useNavigation();

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 0, // optional, defaults to 2dp
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
            onPress={() => navigator.navigate("FoodList")}
        >
            <Card.Title title="Питание" left={(props) => <Avatar.Icon {...props} icon="food" style={styles.cardIcon}/>} />

            <Card.Content>
            <LineChart
                data={data}
                width={screenWidth - 50} // from react-native
                height={220}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />

                <Text>
                    Потребление калорий за день: {foodStore.ConsumedTodayCalories}
                </Text>
            </Card.Content>

            <Card.Actions style={styles.cardActions}>
                <Button color={Colors.cyan700} onPress={() => navigator.navigate("FoodList")}>Подробнее</Button>
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

export default FoodWidget;