import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import { WeightWidget } from '../Widgets/WeightWidget/WeightWidget';
import FoodWidget from '../Widgets/FoodWidget/FoodWidget';
import WaterWidget from '../Widgets/WaterWidget/WaterWidget';

import MealsListActivity from '../Widgets/FoodWidget/Activities/MealsListActivity';
import WeightHistoryActivity from '../Widgets/WeightWidget/Activities/WeightHistoryActivity';
import AddWeightMeasureActivity from '../Widgets/WeightWidget/Activities/AddWeightMeasureActivity';

const HomeStack = createStackNavigator();


const widgets = [
  {
    name: "Food",
    widget: FoodWidget,
    activities: [
      {
        name: "MealsList",
        activity: MealsListActivity
      },
      {
        name: "AddMeal",
        activity: AddMealActivity
      }
    ]
  },
  {
    name: "Water",
    widget: WaterWidget,
    activities: []
  },
  {
    name: "Weight",
    widget: WeightWidget,
    activities: [
      {
        name: "WeightHistory",
        activity: WeightHistoryActivity
      },
      {
        name: "AddWeightMeasure",
        activity: AddWeightMeasureActivity
      }
    ]
  }
];

function WidgetList() {
    return (
      <View style={styles.container}>
          <FlatList
            data={widgets}
            renderItem={({item}) => {
              // потому что иначе реакт не поймет, что это компонент
              const Widget = item.widget;    
              return (
                <Widget />
              );
            }}
            keyExtractor={item => item.name}
          />
      </View>
    );
  }

export default function HomeActivity() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={WidgetList} />
      {widgets.map(elem => elem.activities.map(act => (<HomeStack.Screen key={act.name} name={act.name} component={act.activity} />))).flat()}
    </HomeStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 25
  },
});