import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Card, Avatar, Colors, Button, Text } from 'react-native-paper'

const AddWeightMeasureActivity = observer(({navigation}) => {
	return (
		<View style={styles.container}>
            <Text>TODO AddWeightMeasureActivity</Text>
		</View>
	)
});

const styles = StyleSheet.create({
    container: {
	  flex: 1,
	  flexDirection: "column",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default AddWeightMeasureActivity;