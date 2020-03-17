import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import {
    TextInput, Colors, Button, List, FAB,
} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { foodStore } from '../FoodWidget';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    buttonContent: {
        paddingTop: 8,
        paddingBottom: 8,
    },
});

const FoodListItem = ({ item }) => {
    return (
        <List.Accordion title={(new Date(item.MealTime)).toLocaleString().slice(-3)}>
            {item.EatenFood.map((food) => (
                <List.Accordion key={food.Name} title={food.Name} style={{ marginLeft: 20 }}>
                    <List.Item style={{ marginLeft: 40 }} title={`Белки: ${food.Proteins}г`} />
                    <List.Item style={{ marginLeft: 40 }} title={`Жиры: ${food.Fats}г`} />
                    <List.Item style={{ marginLeft: 40 }} title={`Углеводы: ${food.Carbohydrates}г`} />
                </List.Accordion>
            ))}
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
            <FAB
                theme={{
                    colors: {
                        accent: Colors.amber700,
                    },
                }}
                color={Colors.white}
                style={styles.fab}
                icon="plus"
                onPress={() => console.log('a')}
            />
        </View>
    );
});

/* <View>
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

            <Button
                icon="close"
                onPress={() => foodStore.removeMeal(item)}
                color={Colors.red500}
            >
                Удалить
            </Button> */

export default AddMealtimeActivity;
