import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeActivity from './Activities/HomeActivity';
import GoalsActivity from './Activities/GoalsActivity';
import CoursesActivity from './Widgets/CoursesWidget/Activities/CoursesActivity';
import FoodActivity from './Widgets/FoodWidget/Activities/FoodListActivity';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeActivity}/>
        <Tab.Screen name="Goals" component={GoalsActivity} />
        <Tab.Screen name="Courses" component={CoursesActivity} />
        {/*just for test*/}
        <Tab.Screen name="Foods" component={FoodActivity} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
