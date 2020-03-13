import React from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import {tickStore} from './../Stores/Stores'
import { observer } from 'mobx-react'


const CoursesActivity = observer(({navigation}) => {
	return (
		<View style={styles.container}>
			<Text>
				<b>{tickStore.current}</b>
			</Text>
			<Button title="Incriment" onPress={() => tickStore.inc()} />
			<Button title="Decrement" onPress={() => tickStore.dec()} />
		</View>
	)
})

const styles = StyleSheet.create({
    container: {
	  flex: 1,
	  flexDirection: "column",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default CoursesActivity;