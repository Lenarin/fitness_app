import React from 'react';
import {
    View, StyleSheet, FlatList,
} from 'react-native';
import { observer } from 'mobx-react';
import {
    Button, Banner, Headline, Colors, Avatar, List, FAB,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import rootStore from '../../../Stores/Stores';
import { foodStore } from '../FoodWidget';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingTop: 25,
    },
    listHeader: {
        paddingTop: 25,
        marginHorizontal: 12,
    },
    listFooter: {
        height: 75,
    },
    bannerIcon: {
        backgroundColor: '#94d148',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

const Mealtime = ({ item }) => {
    return (
        <List.Accordion
            title={`${(new Date(item.MealTime)).toUTCString().slice(0, -7)}`}
        >
            {item.EatenFood.map((food) => (
                <List.Accordion
                    key={food.Name}
                    style={{ marginLeft: 20 }}
                    title={food.Name}
                    description={`${food.Calories} ккал`}
                >
                    <List.Item style={{ marginLeft: 40 }} title={`Белки: ${food.Proteins}г`} />
                    <List.Item style={{ marginLeft: 40 }} title={`Жиры: ${food.Fats}г`} />
                    <List.Item style={{ marginLeft: 40 }} title={`Углеводы: ${food.Carbohydrates}г`} />
                </List.Accordion>
            ))}

            <Button
                icon="close"
                onPress={() => foodStore.removeMeal(item)}
                color={Colors.red500}
            >
                Удалить
            </Button>
        </List.Accordion>
    );
};

const MealsListActivity = observer(() => {
    const navigator = useNavigation();

    return (
        <View style={styles.container}>
            <Banner
                visible={!rootStore.antropometryStore.CanCalculateDCI}
                actions={[
                    {
                        label: 'Ввести данные',
                        onPress: () => navigator.navigate('Antropometry'),
                        color: Colors.cyan500,
                    },
                ]}
                icon={(props) => <Avatar.Icon {...props} icon="human" style={styles.bannerIcon} />}
            >
                Для расчета дневной нормы калорий необходимо ввести антропометрические данные
            </Banner>

            <FlatList
                data={foodStore.Meals}
                renderItem={(item) => <Mealtime {...item} />}
                ListFooterComponent={<View style={styles.listFooter} />}
                ListHeaderComponent={(
                    <Headline style={styles.listHeader}>
                        Приемы пищи
                    </Headline>
                )}
                keyExtractor={(item) => item.Id}
                extraData={foodStore.Meals.length}
            />

            <FAB
                theme={{
                    colors: {
                        accent: Colors.amber700,
                    },
                }}
                color={Colors.white}
                style={styles.fab}
                icon="plus"
                onPress={() => navigator.navigate('AddMealtime')}
            />
        </View>
    );
});

export default MealsListActivity;
