import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';
import {
    Card, Avatar, IconButton, Colors, Button, Subheading,
} from 'react-native-paper';
import { create } from 'mobx-persist';
import WaterStore from './WaterStore';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardIcon: {
        backgroundColor: '#4bd1df',
    },
    card: {
        margin: 10,
        backgroundColor: '#fafafa',
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

const waterStore = new WaterStore();

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('Water', waterStore);

const WaterWidget = observer(() => {
    return (
        <Card
            elevation={1}
            style={styles.card}
            theme={{ roundness: 12 }}
        >
            <Card.Title title="Вода" left={(props) => <Avatar.Icon {...props} icon="water" style={styles.cardIcon} />} />

            <Card.Content style={styles.cardContent}>
                <Subheading>
                    Стаканов воды выпито:
                    {' '}
                    {waterStore.current}
                </Subheading>
            </Card.Content>

            <Card.Actions style={styles.cardActions}>
                <Button color={Colors.cyan700} onPress={() => waterStore.reset()}>Сбросить</Button>
                <IconButton color={Colors.grey800} icon="minus-circle-outline" onPress={() => waterStore.decrement()} />
                <IconButton color={Colors.grey800} icon="plus-circle-outline" onPress={() => waterStore.increment()} />
            </Card.Actions>
        </Card>
    );
});

export default WaterWidget;
