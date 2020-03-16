import React, { useEffect, useState } from 'react'
import { StyleSheet, AsyncStorage, Dimensions, View } from 'react-native'
import { observer } from 'mobx-react'
import { Card, Button, Avatar, Text, Colors, Subheading } from 'react-native-paper'
import FoodStore from './FoodStore';
import { useNavigation } from '@react-navigation/native';
import { create } from 'mobx-persist';
import { ProgressChart } from 'react-native-chart-kit';


const foodStore = new FoodStore();

const hydrate = create({
    storage: AsyncStorage
});

hydrate('Food', foodStore);

const FoodWidget = observer(() => {
    const navigator = useNavigation();

    const data = {
        labels: ["Б", "Ж", "У", "ККал"], // optional
        data: [0.5, 0.4, 0.6, 0.8]
    };

    const chartConfig = {
        backgroundColor: "#fafafa",
        backgroundGradientFrom: "#fafafa",
        backgroundGradientTo: "#fafafa",
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
                <Subheading>
                    Потребление за день:
                </Subheading>
                
                <ProgressChart
                    data={data}
                    width={screenWidth - 50}
                    height={220}
                    chartConfig={chartConfig}
                    hideLegend={false}
                    style={{
                        marginVertical: 8,
                    }}
                />
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