import React from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { observer } from 'mobx-react'
import { Card, Button, Avatar, Text, Colors } from 'react-native-paper'
import FoodStore from './FoodStore';
import { useNavigation } from '@react-navigation/native';
import { create } from 'mobx-persist';


const foodStore = new FoodStore();

const hydrate = create({
    storage: AsyncStorage
});

hydrate('Food', foodStore);

const FoodWidget = observer(() => {
    const navigator = useNavigation();

	return (
        <Card 
            elevation={1} 
            style={styles.card} 
            theme={{ roundness: 12 }}
            onPress={() => navigator.navigate("FoodList")}
        >
            <Card.Title title="Питание" left={(props) => <Avatar.Icon {...props} icon="food" style={styles.cardIcon}/>} />

            <Card.Content>
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