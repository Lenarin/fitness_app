import React from 'react'
import { StyleSheet, Text, AsyncStorage } from 'react-native'
import { observer } from 'mobx-react'
import { Card, Avatar, IconButton, Colors } from 'react-native-paper'
import WaterStore from './WaterStore';
import { useNavigation } from '@react-navigation/native';
import { create } from 'mobx-persist';

const waterStore = new WaterStore();

const hydrate = create({
    storage: AsyncStorage
});

hydrate('Water', waterStore);

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
                    Стаканов воды выпито: {waterStore.current}
                </Text>
            </Card.Content>

            <Card.Actions style={styles.cardActions}>
                <IconButton color={Colors.grey800} icon="minus-circle-outline" onPress={() => waterStore.dec()} />
                <IconButton color={Colors.grey800} icon="plus-circle-outline" onPress={() => waterStore.inc()} />
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