import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';
import {
    Card, Avatar, IconButton, Colors, Button, Subheading,
} from 'react-native-paper';
import rootStore from '../../Stores/Stores';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardIcon: {
        backgroundColor: '#94d148',
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

const AntropometryWidget = observer(() => {
    const navigator = useNavigation();

    return (
        <Card
            elevation={1}
            style={styles.card}
            theme={{ roundness: 12 }}
            onPress={() => navigator.navigate('MealsList')}
        >
            <Card.Title title="Я" left={(props) => <Avatar.Icon {...props} icon="human" style={styles.cardIcon} />} />

            <Card.Content style={styles.cardContent}>
                <Subheading>
                    {`Текущая цель: ${rootStore.antropometryStore.CurrentGoal}`}
                </Subheading>
            </Card.Content>

            <Card.Actions style={styles.cardActions}>
                <Button color={Colors.cyan700} onPress={() => navigator.navigate('Antropometry')}>Изменить</Button>
            </Card.Actions>
        </Card>
    );
});

export default AntropometryWidget;
