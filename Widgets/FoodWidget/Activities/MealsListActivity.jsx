import React from 'react';
import {
    View, StyleSheet, Text, Image,
} from 'react-native';
import { observer } from 'mobx-react';
import {
    Card, Button, Banner,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import rootStore from '../../../Stores/Stores';

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

const MealsListActivity = observer(() => {
    const navigator = useNavigation();

    return (
        <View style={styles.container}>
            <Banner
                visible={rootStore.antropometryStore.DCI === 0}
                actions={[
                    {
                        label: 'Задать',
                        onPress: () => navigator.navigate('Antropometry'),
                    },
                ]}
                icon={({ size }) => (
                    <Image
                        source={{ uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4' }}
                        style={{
                            width: size,
                            height: size,
                        }}
                    />
                )}
            >
                There was a problem processing a transaction on your credit card.
            </Banner>

            <Text>
                {rootStore.antropometryStore.DCI}
            </Text>

            <Button title="Добавить новый прием пищи" onPress={() => navigator.navigate('AddMealtime')} />
        </View>
    );
});

const Meal = ({ mealTime }) => (
    <Card>
        <Text>{(new Date(mealTime)).toDateString()}</Text>
    </Card>
);

export default MealsListActivity;
