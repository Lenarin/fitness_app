
/* eslint-disable no-param-reassign */
// because I am changing object fields
import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { observer } from 'mobx-react';
import {
    TextInput, Colors, Appbar, FAB, Card, IconButton,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { foodStore } from '../FoodWidget';
import Meal from '../Models/Meals';
import Product from '../Models/Product';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    foodList: {
        paddingVertical: 15,
    },
    foodCard: {
        backgroundColor: '#fafafa',
        marginHorizontal: 15,
        marginVertical: 5,
        padding: 5,
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    foodName: {
        borderRadius: 5,
        backgroundColor: '#fafafa',
        flexGrow: 2,
    },
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    nutriensContainer: {
        margin: 10,
    },
});

/* */

const FoodListItem = observer(({ food, onDelete }) => {
    const [opened, setOpened] = useState(true);

    const inputOutline = {
        colors: {
            primary: Colors.cyan700,
        },
    };

    const refProteinsInput = useRef();
    const refFatsInput = useRef();
    const refCarbohydratesInput = useRef();
    const refCaloriesInput = useRef();

    return (
        <Card
            elevation={2}
            style={styles.foodCard}
            theme={{ roundness: 7 }}
        >
            <View style={styles.cardHeader}>
                <TextInput
                    style={styles.foodName}
                    theme={inputOutline}
                    dense
                    mode="flat"
                    placeholder="Название"
                    returnKeyType="next"
                    autoFocus
                    value={food.Name}
                    onChangeText={(val) => {
                        food.Name = val.trim();
                    }}
                    onSubmitEditing={() => refCaloriesInput.current.focus()}
                />

                <View style={styles.actionContainer}>
                    <IconButton
                        color={Colors.red500}
                        icon="close"
                        onPress={() => onDelete(food)}
                        animated
                    />

                    <IconButton
                        color={Colors.grey400}
                        icon={opened ? 'chevron-up' : 'chevron-down'}
                        onPress={() => setOpened(!opened)}
                        animated
                    />
                </View>
            </View>

            {opened ? (
                <View style={styles.nutriensContainer}>
                    <TextInput
                        theme={inputOutline}
                        dense
                        mode="outlined"
                        placeholder="Калории"
                        keyboardType="numeric"
                        returnKeyType="next"
                        ref={refCaloriesInput}
                        value={food.Calories ? food.Calories.toString() : ''}
                        onChangeText={(val) => {
                            food.Calories = Number.parseFloat(val);
                        }}
                        onSubmitEditing={() => refProteinsInput.current.focus()}
                    />

                    <TextInput
                        theme={inputOutline}
                        dense
                        mode="outlined"
                        placeholder="Белки (г)"
                        keyboardType="numeric"
                        returnKeyType="next"
                        ref={refProteinsInput}
                        value={food.Proteins ? food.Proteins.toString() : ''}
                        onChangeText={(val) => {
                            food.Proteins = Number.parseFloat(val);
                        }}
                        onSubmitEditing={() => refFatsInput.current.focus()}
                    />

                    <TextInput
                        theme={inputOutline}
                        dense
                        mode="outlined"
                        placeholder="Жиры (г)"
                        keyboardType="numeric"
                        returnKeyType="done"
                        ref={refFatsInput}
                        value={food.Fats ? food.Fats.toString() : ''}
                        onChangeText={(val) => {
                            food.Fats = Number.parseFloat(val);
                        }}
                        onSubmitEditing={() => refCarbohydratesInput.current.focus()}
                    />

                    <TextInput
                        theme={inputOutline}
                        dense
                        mode="outlined"
                        placeholder="Углеводы (г)"
                        keyboardType="numeric"
                        ref={refCarbohydratesInput}
                        value={food.Carbohydrates ? food.Carbohydrates.toString() : ''}
                        onChangeText={(val) => {
                            food.Carbohydrates = Number.parseFloat(val);
                        }}
                    />
                </View>
            ) : null}
        </Card>
    );
});

const AddMealtimeActivity = observer(() => {
    const meal = useRef(new Meal()).current;

    const navigator = useNavigation();

    const handleMealSubmit = useCallback(() => {
        meal.EatenFood.forEach((food) => {
            if (food.Name === '') {
                meal.EatenFood.remove(food);
            }
        });

        if (meal.EatenFood.length > 0) {
            foodStore.addMeal(meal);
            navigator.navigate('MealsList');
        }
    });

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <Appbar.Header
                theme={{
                    colors: {
                        primary: Colors.cyan700,
                    },
                }}
                statusBarHeight={25}
            >
                <Appbar.BackAction
                    onPress={() => navigator.goBack()}
                />

                <Appbar.Content title="Прием пищи" />

                <Appbar.Action
                    icon="check"
                    onPress={handleMealSubmit}
                />
            </Appbar.Header>

            <ScrollView
                style={styles.foodList}
            >
                {meal.EatenFood.map((food) => (
                    <FoodListItem
                        food={food}
                        onDelete={(item) => meal.EatenFood.remove(item)}
                        key={food.Id}
                    />
                ))}

                <View height={50} />
            </ScrollView>

            <FAB
                theme={{
                    colors: {
                        accent: Colors.amber700,
                    },
                }}
                style={styles.fab}
                color={Colors.white}
                icon="plus"
                onPress={() => meal.EatenFood.push(new Product())}
            />
        </KeyboardAvoidingView>
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
