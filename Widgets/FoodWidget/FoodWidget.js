import React from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { observer } from 'mobx-react'
import { Card, Avatar, Paragraph } from 'react-native-paper'
import FoodStore from './FoodStore';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import FoodListActivity from './Activities/FoodListActivity';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const FoodWidget = observer(() => {
    const navigator = useNavigation();
    console.log(navigator);

	return (
        <Card 
            elevation={1} 
            style={styles.card} 
            theme={{ roundness: 12 }}
            onPress={() => navigator.navigate("Food")}
        >
            <Card.Title title="Питание" left={(props) => <Avatar.Icon {...props} icon="food" style={styles.cardIcon}/>} />
            
            <Card.Content>
                <Paragraph>Потребление калорий за день: {FoodStore.ConsumedTodayCalories}</Paragraph>
            </Card.Content>

            <Stack.Navigator>
                <Stack.Screen name={"FoodList"} component={FoodListActivity}/>
            </Stack.Navigator>
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
    }
});

export default FoodWidget;