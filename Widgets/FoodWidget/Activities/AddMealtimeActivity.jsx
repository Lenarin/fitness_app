
/* eslint-disable no-param-reassign */
// because I am changing object fields
import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { observer } from 'mobx-react';
import {
    TextInput, Colors, Appbar, FAB, Card, IconButton,
} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
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
    buttonFold: {
        position: 'absolute',
        right: -4,
        top: -4,
        width: 36,
        height: 36,
    },
    foodName: {
        width: 275,
        borderRadius: 5,
    },
    nutriensContainer: {
        margin: 10,
    },
});

/*<KeyboardAvoidingView
                behavior="height"
            >
                
            </KeyboardAvoidingView> */

const FoodListItem = observer(({ item }) => {
    const [opened, setOpened] = useState(true);

    const inputOutline = {
        colors: {
            primary: Colors.cyan700,
        },
    };

    return (
        <Card
            elevation={2}
            style={styles.foodCard}
            theme={{ roundness: 7 }}
        >
            <TextInput
                style={styles.foodName}
                underlineColor="rgba(255, 255, 255, 0)"
                theme={inputOutline}
                dense
                mode="flat"
                placeholder="Название"
                returnKeyType="next"
                value={item.Name}
                onEndEditing={(val) => {
                    item.Name = val;
                }}
            />

            <IconButton
                style={styles.buttonFold}
                color={Colors.grey400}
                icon={opened ? 'chevron-up' : 'chevron-down'}
                onPress={() => setOpened(!opened)}
                animated
            />

            {opened ? (
                <View style={styles.nutriensContainer}>
                    <TextInput
                        theme={inputOutline}
                        dense
                        mode="outlined"
                        placeholder="Калории"
                        keyboardType="numeric"
                        returnKeyType="next"
                        value={item.Calories ? item.Calories.toString() : ''}
                        onChangeText={(val) => {
                            item.Calories = val;
                        }}
                    />

                    <TextInput
                        theme={inputOutline}
                        dense
                        mode="outlined"
                        placeholder="Белки"
                        keyboardType="numeric"
                        returnKeyType="next"
                        value={item.Proteins ? item.Proteins.toString() : ''}
                        onChangeText={(val) => {
                            item.Proteins = val;
                        }}
                    />

                    <TextInput
                        theme={inputOutline}
                        dense
                        mode="outlined"
                        placeholder="Жиры"
                        keyboardType="numeric"
                        returnKeyType="done"
                        value={item.Fats ? item.Fats.toString() : ''}
                        onChangeText={(val) => {
                            item.Fats = val;
                        }}
                    />

                    <TextInput
                        theme={inputOutline}
                        dense
                        mode="outlined"
                        placeholder="Углеводы"
                        keyboardType="numeric"
                        value={item.Carbohydrates ? item.Carbohydrates.toString() : ''}
                        onChangeText={(val) => {
                            item.Carbohydrates = val;
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
        return 0;
    });

    return (
        <View style={styles.container}>
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

                <Appbar.Content title="" />

                <Appbar.Action icon="check" onPress={handleMealSubmit} />
            </Appbar.Header>

            <FlatList
                style={styles.foodList}
                data={meal.EatenFood}
                renderItem={(item) => {
                    return <FoodListItem {...item} />;
                }}
                keyExtractor={(item) => item.Name}
                extraData={meal.EatenFood.length}
            />

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
