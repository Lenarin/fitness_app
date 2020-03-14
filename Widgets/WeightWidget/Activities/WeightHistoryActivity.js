import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Card, Avatar, Colors, Button, Text, List, IconButton } from 'react-native-paper'
import { weightStore } from '../WeightWidget';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

const WeightHistoryEntry = observer(({ item }) => {
    return (
        <Card 
            elevation={1} 
            theme={{ roundness: 12 }}
            style={styles.measurementCard}>

            <Card.Title 
                title={item.Weight.toString()}
                subtitle={item.MeasureDate.toLocaleString()}
                right={(props) => 
                    <IconButton
                        {...props} 
                        color={Colors.grey800} 
                        icon="close-circle-outline" 
                        onPress={() => {}}/*weightStore.removeMeasure(item)*/
                    />
                }
            />
        </Card>
    );
});

const WeightHistoryActivity = observer(() => {
    const navigator = useNavigation();

	return (
		<View style={styles.container}>
            <FlatList
                style={styles.list}
                data={weightStore.measurementHistory}
                renderItem={(item) => <WeightHistoryEntry {...item}/>}
                keyExtractor={(item, index) => {
                    return item.MeasureDate.toUTCString()
                }}
            />
            
            <View style={styles.buttonWrapper}>
                <Button    
                    mode={"contained"}
                    theme={{ roundness: 50 }}
                    onPress={() => navigator.navigate("AddWeightMeasure")}
                    style={styles.buttonAddMeasurement}
                    contentStyle={styles.buttonContent}
                >
                    Добавить измерение
                </Button>
            </View>
		</View>
	)
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    list: {
        
    },
    measurementCard: {
        marginTop: 4,
        backgroundColor: "#f7f7f7"
    },
    buttonWrapper: {
        flex: 1,
        alignItems: 'center',
        margin: 8
    },
    buttonAddMeasurement: {
        backgroundColor: "#f1b514"
    },
    buttonContent: {
        paddingTop: 8,
        paddingBottom: 8,
    }
});

export default WeightHistoryActivity;