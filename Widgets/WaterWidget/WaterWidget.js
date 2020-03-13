import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { observer } from 'mobx-react'
import { Card, Avatar, IconButton, Colors } from 'react-native-paper'
import WaterStore from './WaterStore';
import { useNavigation } from '@react-navigation/native';

//TODO: надо чет сделать с песистом
const store = new WaterStore();

/*
*/

const WaterWidget = observer(() => {
    const navigator = useNavigation();

	return (
        <Card 
            elevation={1} 
            style={styles.card} 
            theme={{ roundness: 12 }}
            onPress={() => navigator.navigate("FoodList")}
        >
            <Card.Title title="Вода" left={(props) => <Avatar.Icon {...props} icon="water" style={styles.cardIcon}/>} />
            
            <Card.Content style={styles.cardContent}>
                <Text>
                    Сегодня Вы выпили {store.current} стаканов воды
                </Text>
            </Card.Content>

            <Card.Actions style={styles.cardActions}>
                <IconButton color={Colors.grey800} icon="minus-circle-outline" onPress={() => store.dec()} />
                <IconButton color={Colors.grey800} icon="plus-circle-outline" onPress={() => store.inc()} />
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
        backgroundColor: "#4bd1df"
    },
    card: {
        margin: 10,
        backgroundColor: "#fafafa"
    },
    actionIcon: {
        color: "e6e6e6"
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

export default WaterWidget;