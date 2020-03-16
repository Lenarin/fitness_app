import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import {
    TextInput, Colors, Button,
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

const AddMealActivity = observer(() => {
    const [food, setFood] = useState([
        {
            Name: 'Еда1',
            Proteins: 0, // Б
            Fats: 0, // Ж
            Carbohydrates: 0, // У
            Calories: 0,
        },
    ]);

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    label="Введите Ваш вес"
                    mode="outlined"
                    value={weight}
                    onChangeText={handleWeightChange}
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
                    onPress={hangleWeightSubmit}
                    style={styles.buttonAddMeasurement}
                    contentStyle={styles.buttonContent}
                >
                    Добавить измерение
                </Button>
            </View>

            <FlatList />
        </View>
    );
});

export default AddMealActivity;
