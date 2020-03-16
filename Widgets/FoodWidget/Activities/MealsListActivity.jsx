import React, { useEffect } from 'react';
import {
    View, Button, StyleSheet, Text,
} from 'react-native';
import { observer } from 'mobx-react';
import { ScrollView } from 'react-native-gesture-handler';

/*
<ScrollView
                sections={foodStore.Meals}
                keyExtractor={meal => meal.MealTime}
                renderItem={Meal}
            />
*/

const MealsListActivity = observer(({ navigation }) => (
    <View style={styles.container}>
        {/* <Button title="Add mealtime" onPress={() => navigation.navigate("NewMealtime")}/> */}
        <Text>ASDJASKDASDKASJ</Text>
    </View>
));

const Meal = (props) => (
    <Card>
        <Text>{(new Date(props.MealTime)).toDateString()}</Text>
    </Card>
);

const styles = StyleSheet.create({
    container: {
	  flex: 1,
	  flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MealsListActivity;
