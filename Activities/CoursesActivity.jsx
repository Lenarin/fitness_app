import React, { useState } from 'react';
import {
    View, StyleSheet, Text, Image, ScrollView,
} from 'react-native';
import { observer } from 'mobx-react';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';
import {
    Card, Paragraph, Title, Button, Colors,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import coursesStore from '../Stores/CoursesStore';
import achievementStore from '../Stores/AchievementsStore';
import Achievement from '../Stores/Models/Achievements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e6',
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingTop: 25,
    },
    card: {
        margin: 10,
        backgroundColor: '#fafafa',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    exerciseStyle: {
        paddingTop: 30,
        backgroundColor: '#fff',
    },
});

const CoursesStack = createStackNavigator();

const Exercise = observer(({ route }) => {
    const navigator = useNavigation();
    const exercisesList = route.params.course.Exercises;
    const [currentExercise, setCurrentExercise] = useState(route.params.course.Exercises[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <ScrollView
            style={styles.exerciseStyle}
            contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
            }}
        >
            <View>
                <Text style={styles.titleText}>
                    {`Упражнение ${currentIndex + 1} из ${exercisesList.length}`}
                </Text>
                <Text style={styles.titleText}>{currentExercise.Title}</Text>
                <Text style={styles.titleText}>
                    {`${currentExercise.Repeats} повторений`}
                </Text>
                <Image style={{ width: '100%', height: 200, resizeMode: 'contain' }} source={currentExercise.Image} />
                <Text style={{ padding: 10 }}>{currentExercise.Text}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 40 }}>
                <Button
                    onPress={() => navigator.goBack()}
                    color={Colors.red700}
                    mode="contained"
                >
                    Я сдаюсь
                </Button>
                <Button
                    onPress={() => {
                        if (currentIndex !== exercisesList.length - 1) {
                            setCurrentIndex(currentIndex + 1);
                            setCurrentExercise(exercisesList[currentIndex + 1]);
                        } else {
                            coursesStore.setCompleted(route.params.course);
                            achievementStore.addAchievement(new Achievement(new Date(Date.now()), 1, 'food', '#148841', `Тренировка ${route.params.course.Label} завершена`, 'Хорошая тренировка'));
                            navigator.goBack();
                        }
                    }}
                    color={Colors.greenA700}
                    mode="contained"
                >
                    Дальше!
                </Button>
            </View>
        </ScrollView>
    );
});

const CourseCard = observer(({ course }) => {
    const navigator = useNavigation();
    return (
        <Card
            elevation={1}
            style={styles.card}
            theme={{ roundness: 5 }}
            onPress={() => navigator.navigate('Exercise', {
                course,
                currentIndex: 0,
            })}
        >
            <Card.Cover source={course.Image} />
            <Card.Content>
                <Title>
                    {course.Label}
                </Title>
                <Paragraph>
                    {course.Description}
                </Paragraph>
                <Paragraph style={{ textAlign: 'center' }}>
                    {course.Completed ? 'Закончен!' : ''}
                </Paragraph>
            </Card.Content>
        </Card>
    );
});

const Home = observer(() => (
    <View style={styles.container}>
        <FlatList
            data={coursesStore.Courses}
            renderItem={({ item }) => <CourseCard course={item} />}
            keyExtractor={(item, index) => `${index}`}
        />
    </View>
));

function CoursesActivity() {
    return (
        <CoursesStack.Navigator headerMode="none">
            <CoursesStack.Screen name="Home" component={Home} />
            <CoursesStack.Screen name="Exercise" component={Exercise} />
        </CoursesStack.Navigator>
    );
}

export default CoursesActivity;
