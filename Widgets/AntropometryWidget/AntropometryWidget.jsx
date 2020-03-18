import React from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import {
    Card, Avatar, Colors, Button, Chip,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import antropometryStore from '../../Stores/AntropometryStore';

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
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    antropometryChip: {
        marginVertical: 6,
        marginHorizontal: 6,
    },
    cardActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

const AntropometryWidget = observer(() => {
    const navigator = useNavigation();

    let genderIcon = 'gender-male-female';
    if (antropometryStore.Gender === 'мужской') {
        genderIcon = 'gender-male';
    } else if (antropometryStore.Gender === 'женский') {
        genderIcon = 'gender-female';
    }


    return (
        <Card
            elevation={1}
            style={styles.card}
            theme={{ roundness: 12 }}
            onPress={() => navigator.navigate('Antropometry')}
        >
            <Card.Title title="Антропометрия" left={(props) => <Avatar.Icon {...props} icon="human" style={styles.cardIcon} />} />

            <Card.Content style={styles.cardContent}>
                {antropometryStore.Height > 0
                    ? (
                        <Chip
                            style={styles.antropometryChip}
                            mode="flat"
                            icon="ruler"
                        >
                            {`${antropometryStore.Height} см`}
                        </Chip>
                    ) : null}

                {antropometryStore.CurrentWeight > 0
                    ? (
                        <Chip
                            style={styles.antropometryChip}
                            mode="flat"
                            icon="weight"
                        >
                            {`${antropometryStore.CurrentWeight} кг`}
                        </Chip>
                    ) : null}

                {antropometryStore.Gender !== 'не указан'
                    ? (
                        <Chip
                            style={styles.antropometryChip}
                            mode="flat"
                            icon={genderIcon}
                        >
                            {`${antropometryStore.Gender}`}
                        </Chip>
                    ) : null}

                {antropometryStore.Age > 0
                    ? (
                        <Chip
                            style={styles.antropometryChip}
                            mode="flat"
                            icon="calendar"
                        >
                            {(new Date(antropometryStore.BirtDate)).toLocaleDateString()}
                        </Chip>
                    ) : null}
            </Card.Content>

            <Card.Actions style={styles.cardActions}>
                <Button color={Colors.cyan700} onPress={() => navigator.navigate('Antropometry')}>Изменить</Button>
            </Card.Actions>
        </Card>
    );
});

export default AntropometryWidget;
