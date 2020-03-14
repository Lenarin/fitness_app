import React, {useState} from 'react'
import { View, Button, StyleSheet, Text, Image } from 'react-native'
import { rootStore } from '../Stores/Stores'
import { observer } from 'mobx-react'
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Avatar, Paragraph, Title } from 'react-native-paper'
import { observable } from 'mobx';
import { useNavigation } from '@react-navigation/native';

const CoursesStack = createStackNavigator();

const Exercise = observer(({route}) => {
	const navigator = useNavigation();
	const exercisesList = route.params.course.Exercises;
	const [currentExercise, setCurrentExercise] = useState(route.params.course.Exercises[0]);
	const [currentIndex, setCurrentIndex] = useState(0);
	return (
		<View style={styles.exerciseStyle}>
			<Text style={styles.titleText} >{currentExercise.Title}</Text>
			<Text style={styles.titleText} >Упражнение {currentIndex + 1} из {exercisesList.length + 1}</Text>
			<Text style={styles.titleText} >{currentExercise.Repeats} повторений</Text>
			<Image style={{width: '100%', height: 400, resizeMode: "contain"}} source={currentExercise.Image} />
			<Text style={{padding: 10}}>{currentExercise.Text}</Text>
			<View style={{flexDirection: 'row', justifyContent: "space-around"}}>
				<Button title="Я сдаюсь" onPress={() => {navigator.goBack();}}/>
				<Button title="Дальше!" onPress={() => {
					if (currentIndex !== exercisesList.length) {
						setCurrentIndex(currentIndex + 1);
						setCurrentExercise(exercisesList[currentIndex]);
					} else {
						route.params.course.completed = true;
						navigator.goBack();
					}
				}}/>
			</View>
		</View>
	)
})

const CourseCard = observer(({course}) => {
	const navigator = useNavigation();
	return (
		<Card
			elevation={1}
			style={styles.card}
			theme={{roundness: 5}}
			onPress={() => navigator.navigate("Exercise", {
				course: course,
				currentIndex: 0
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
				<Paragraph>
					{course.Completed ? "Закончен!" : ""}
				</Paragraph>
			</Card.Content>
		</Card>
	)
})

const Home = observer(({navigation}) => {
	return (
		<View style={styles.container}>
			<FlatList 
				data={rootStore.coursesStore.Courses}
				renderItem={({item}) => <CourseCard course={item} />}
				keyExtractor={item => item.Title}
			/>
		</View>
	)
})

function CoursesActivity() {
	return (
		<CoursesStack.Navigator headerMode="none">
			<CoursesStack.Screen name="Home" component={Home} />
			<CoursesStack.Screen name="Exercise" component={Exercise} />
		</CoursesStack.Navigator>
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
	card: {
		margin: 10,
		backgroundColor: "#fafafa"
	},
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	exerciseStyle: {
		padding: 20,
		backgroundColor: '#fff',
		flex: 1
	},
  });

export default CoursesActivity;