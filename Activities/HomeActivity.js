import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FoodWidget from '../Widgets/FoodWidget/FoodWidget';
import WaterWidget from '../Widgets/WaterWidget/WaterWidget';
import { createStackNavigator } from '@react-navigation/stack';
import FoodListActivity from '../Widgets/FoodWidget/Activities/FoodListActivity'

const HomeStack = createStackNavigator();


const widgets = [
  {
    name: "Food",
    widget: FoodWidget,
    activity: FoodListActivity,
  },
  {
    name: "Water",
    widget: WaterWidget,
    activity: null
  }
];

function Test() {
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
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Test} />
      {widgets.map(elem => elem.activity ? <HomeStack.Screen name={elem.name} component={elem.activity} /> : null)}
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