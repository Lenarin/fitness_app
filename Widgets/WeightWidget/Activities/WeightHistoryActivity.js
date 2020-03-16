import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { observer, Observer } from 'mobx-react'
import { Card, Avatar, Colors, Button, Headline, List, IconButton } from 'react-native-paper'
import { weightStore } from '../WeightWidget';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

const WeightHistoryEntry = ({ item }) => {
    return (
        <Card 
            elevation={1} 
            theme={{ roundness: 12 }}
            style={styles.measurementCard}>

            <Card.Title 
                title={item.Weight.toString()}
                subtitle={item.MeasureDate.toLocaleString().slice(0, -3)}
                right={(props) => 
                    <IconButton
                        {...props} 
                        color={Colors.grey800} 
                        icon="close-circle-outline" 
                        onPress={() => weightStore.removeMeasure(item)}/*weightStore.removeMeasure(item)*/
                    />
                }
            />
        </Card>
    );
};

const WeightHistoryActivity = observer(() => {
    const navigator = useNavigation();

	return (
		<View style={styles.container}>
            <FlatList
                data={weightStore.measurementHistory}
                renderItem={(item, index) => {
                    return <WeightHistoryEntry {...item}/>;
                }}
                ListFooterComponent={<View style={styles.listFooter}/>}
                ListHeaderComponent={
                <Headline style={styles.listHeader}>
                    История измерений
                </Headline>
                }
                keyExtractor={(item) => {
                    return item.Id
                }}
                extraData={weightStore.measurementHistory.length}
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
        paddingTop: 50
    },
    measurementCard: {
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: "#f7f7f7"
    },
    listHeader: {
        marginHorizontal: 12
    },
    listFooter: {
        height: 75
    },
    buttonWrapper: {
        position: "absolute",
        flex: 1,
        alignItems: 'center',
        margin: 8,
        bottom: 0,
        width: "100%"
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