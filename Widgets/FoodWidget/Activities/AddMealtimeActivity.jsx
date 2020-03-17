import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import {
    TextInput, Colors, Button, List,
} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 50,
        marginTop: 50,
    },
    buttonAddMeasurement: {
        marginTop: 20,
        backgroundColor: '#ffa726',
    },
    buttonContent: {
        paddingTop: 8,
        paddingBottom: 8,
    },
});

const FoodListItem = ({ food }) => {
    return (
        <List.Accordion title={(new Date(food.MealTime)).toLocaleString().slice(-3)}>
        </List.Accordion>
    );
};

const AddMealtimeActivity = observer(() => {
    const [food, setFood] = useState([
        {
            Name: 'Еда1',
            Proteins: 1, // Б
            Fats: 2, // Ж
            Carbohydrates: 3, // У
            Calories: 4,
        },
        {
            Name: 'Еда2',
            Proteins: 1, // Б
            Fats: 2, // Ж
            Carbohydrates: 3, // У
            Calories: 4,
        },
        {
            Name: 'Еда3',
            Proteins: 1, // Б
            Fats: 2, // Ж
            Carbohydrates: 3, // У
            Calories: 4,
        },
    ]);

    const [currMeal, setCurrMeal] = useState('');

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    label="Блюдо"
                    mode="outlined"
                    value={currMeal}
                    onChangeText={setCurrMeal}
                    keyboardType="numeric"
                    theme={{
                        colors: {
                            primary: Colors.cyan700,
                        },
                    }}
                />

                <Button
                    mode="contained"
                    theme={{ roundness: 10 }}
                    style={styles.buttonAddMeasurement}
                    contentStyle={styles.buttonContent}
                >
                    Добавить измерение
                </Button>
            </View>

            <FlatList
                data={food}
                renderItem={({ item }) => null}
            />
        </View>
    );
});

export default AddMealtimeActivity;
