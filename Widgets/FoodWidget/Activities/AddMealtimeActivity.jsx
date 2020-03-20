/* eslint-disable no-param-reassign */
// because I am changing object fields
import React, { useState, useCallback, useRef } from 'react';
import {
    View, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { observer } from 'mobx-react';
import {
    TextInput, Colors, Appbar, FAB, Card, IconButton, Button,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
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
    buttonMealTime: {
        marginBottom: 15,
        marginHorizontal: 15,
    },
    buttonContent: {
        paddingTop: 8,
        paddingBottom: 8,
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
        marginLeft: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    nutriensContainer: {
        margin: 10,
    },
});

const buttonTheme = {
    roundness: 5,
    colors: {
        primary: Colors.amber700,
    },
};

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

    const [caloriesStrVal, setCaloriesStrVal] = useState('');
    const [proteinsStrVal, setProteinsStrVal] = useState('');
    const [fatsStrVal, setFatsStrVal] = useState('');
    const [carbohydratesStrVal, setCarbohydratesStrVal] = useState('');

    const setNutrientValueInput = (propName, input, state, stateSetter) => {
        if (input.trim() === '') {
            food[propName] = 0;
            stateSetter('');
        }

        const num = Number.parseFloat(input);

        if (Number.isFinite(num) && num > 0) {
            food[propName] = num;
        }

        stateSetter(input);
    };

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
                        food.Name = val;
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
                        value={caloriesStrVal}
                        onChangeText={(val) => setNutrientValueInput('Calories', val, caloriesStrVal, setCaloriesStrVal)}
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
                        value={proteinsStrVal}
                        onChangeText={(val) => setNutrientValueInput('Proteins', val, proteinsStrVal, setProteinsStrVal)}
                        onSubmitEditing={() => refFatsInput.current.focus()}
                    />

                    <TextInput
                        theme={inputOutline}
                        dense
                        mode="outlined"
                        placeholder="Жиры (г)"
                        keyboardType="numeric"
                        returnKeyType="next"
                        ref={refFatsInput}
                        value={fatsStrVal}
                        onChangeText={(val) => setNutrientValueInput('Fats', val, fatsStrVal, setFatsStrVal)}
                        onSubmitEditing={() => refCarbohydratesInput.current.focus()}
                    />

                    <TextInput
                        theme={inputOutline}
                        dense
                        mode="outlined"
                        placeholder="Углеводы (г)"
                        keyboardType="numeric"
                        returnKeyType="done"
                        ref={refCarbohydratesInput}
                        value={carbohydratesStrVal}
                        onChangeText={(val) => setNutrientValueInput('Carbohydrates', val, carbohydratesStrVal, setCarbohydratesStrVal)}
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

    const [mealTimeDialogVisible, setMealTimeDialogVisible] = useState(false);

    return (
        <View style={styles.container} behavior="padding">
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
                    disabled={meal.EatenFood.length === 0}
                    onPress={handleMealSubmit}
                />
            </Appbar.Header>

            {mealTimeDialogVisible && (
                <DateTimePicker
                    timeZoneOffsetInMinutes={0}
                    value={new Date(meal.MealTime)}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        const currentTime = selectedTime || new Date(meal.MealTime);

                        setMealTimeDialogVisible(Platform.OS === 'ios');
                        meal.MealTime = currentTime.getTime();
                    }}
                />
            )}

            <KeyboardAvoidingView behavior="padding">
                <ScrollView
                    style={styles.foodList}
                >
                    <Button
                        icon="clock-outline"
                        style={styles.buttonMealTime}
                        mode="outlined"
                        theme={buttonTheme}
                        onPress={() => setMealTimeDialogVisible(true)}
                        contentStyle={styles.buttonContent}
                    >
                        {(new Date(meal.MealTime)).toTimeString().slice(0, 5)}
                    </Button>

                    {meal.EatenFood.slice().map((food) => (
                        <FoodListItem
                            food={food}
                            onDelete={(item) => {
                                meal.removeFood(item);
                            }}
                            key={food.Id}
                        />
                    ))}

                    <View height={50} />
                </ScrollView>
            </KeyboardAvoidingView>

            <FAB
                theme={{
                    colors: {
                        accent: Colors.amber700,
                    },
                }}
                style={styles.fab}
                color={Colors.white}
                icon="plus"
                onPress={() => {
                    if (meal.EatenFood.length === 0 || meal.EatenFood[meal.EatenFood.length - 1].Name.trim() !== '') {
                        meal.addFood(new Product());
                    }
                }}
            />
        </View>
    );
});

export default AddMealtimeActivity;
