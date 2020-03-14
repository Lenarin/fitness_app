import React from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { observer } from 'mobx-react'
import { Card, Avatar, Colors, Button, Text } from 'react-native-paper'
import WeightStore from './WeightStore';
import { useNavigation } from '@react-navigation/native';
import { create } from 'mobx-persist';

const weightStore = new WeightStore();

const hydrate = create({
    storage: AsyncStorage
});

hydrate('Weight', weightStore);

const WeightWidget = observer(() => {
    const navigator = useNavigation();

	return (
        <Card 
            elevation={1} 
            style={styles.card} 
            theme={{ roundness: 12 }}
            onPress={() => navigator.navigate("WeightHistory")}
        >
            <Card.Title title="Масса" left={(props) => <Avatar.Icon {...props} icon="weight" style={styles.cardIcon}/>} />
            
            <Card.Content style={styles.cardContent}>
                <Text>
                    {weightStore.measurementHistory.lastItem 
                        ? weightStore.measurementHistory.lastItem.Weight 
                        : "Еще не добавлено ни одного измерения"}
                </Text>
            </Card.Content>

            <Card.Actions style={styles.cardActions}>
                <Button color={Colors.cyan700} onPress={() => navigator.navigate("AddWeightMeasure")}>Добавить измерение</Button>
            </Card.Actions>
        </Card>
	);
});

const styles = StyleSheet.create({
    container: {
	  flex: 1,
	  flexDirection: "column",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardIcon: {
        backgroundColor: "#f1b514"
    },
    card: {
        margin: 10,
        backgroundColor: "#fafafa"
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export { WeightWidget, weightStore};