import React, { useEffect } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { rootStore } from '../../../Stores/Stores'
import { observer } from 'mobx-react'
import { ScrollView } from 'react-native-gesture-handler'

/*
<ScrollView
                sections={foodStore.Meals}
                keyExtractor={meal => meal.MealTime}
                renderItem={Meal}
            />
*/

const FoodListActivity = observer(({navigation}) => {
    useEffect(() => console.log('FOOD LIST'));

	return (
		<View style={styles.container}>
            {/*<Button title="Add mealtime" onPress={() => navigation.navigate("NewMealtime")}/>*/}
            <Text>ASDJASKDASDKASJ</Text>
		</View>
	)
});

const Meal = (props) => {
    return (
        <Card>
            <Text>{props.MealTime.toDateString()}</Text>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
	  flex: 1,
	  flexDirection: "column",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default FoodListActivity;