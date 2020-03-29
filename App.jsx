import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native-paper';
import HomeActivity from './Activities/HomeActivity';
import CalendarActivity from './Activities/CalendarActivity';
import CoursesActivity from './Activities/CoursesActivity';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                shifting
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'md-home';
                        } else
                            if (route.name === 'Goals') {
                                iconName = 'md-trophy';
                            } else
                                if (route.name === 'Courses') {
                                    iconName = 'md-medal';
                                }

                        return <Ionicons name={iconName} color={color} size={24} />;
                    },
                })}
            >
                <Tab.Screen name="Home" options={{ title: 'Главная', tabBarColor: Colors.cyan700 }} component={HomeActivity} />
                <Tab.Screen name="Goals" options={{ title: 'Цели', tabBarColor: Colors.amber700 }} component={CalendarActivity} />
                <Tab.Screen name="Courses" options={{ title: 'Тренировки', tabBarColor: Colors.greenA700 }} component={CoursesActivity} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
