import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeActivity from './Activities/HomeActivity';
import GoalsActivity from './Activities/GoalsActivity';
import CoursesActivity from './Activities/CoursesActivity';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions = {({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "md-home";
            } else
            if (route.name === "Goals") {
              iconName = "md-trophy";
            } else
            if (route.name === "Courses") {
              iconName = "md-cube";
            }

            return <Ionicons name={iconName} color={color} size={24}></Ionicons>
          }
        })}>
        <Tab.Screen name="Home" component={HomeActivity}/>
        <Tab.Screen name="Goals" component={GoalsActivity} />
        <Tab.Screen name="Courses" component={CoursesActivity} />
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
