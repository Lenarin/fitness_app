import React from 'react';
import {
    View, StyleSheet, Text,
} from 'react-native';
import { observer } from 'mobx-react';
import { Card } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

/*
<ScrollView
                sections={foodStore.Meals}
                keyExtractor={meal => meal.MealTime}
                renderItem={Meal}
            />
*/

const MealsListActivity = observer(() => (
    <View style={styles.container}>
        {/* <Button title="Add mealtime" onPress={() => navigation.navigate("NewMealtime")}/> */}
        <Text>ASDJASKDASDKASJ</Text>
    </View>
));

const Meal = ({ mealTime }) => (
    <Card>
        <Text>{(new Date(mealTime)).toDateString()}</Text>
    </Card>
);

export default MealsListActivity;
