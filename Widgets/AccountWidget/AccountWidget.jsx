import React from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import {
    Card, Avatar, Colors, Button, Subheading,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import userStore from '../../Stores/UserStore';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardIcon: {
        backgroundColor: '#ad1d20',
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

const AccountWidget = observer(() => {
    const navigator = useNavigation();

    return (
        <Card
            elevation={1}
            style={styles.card}
            theme={{ roundness: 12 }}
        >
            <Card.Title
                title={userStore.User ? `Привет, ${userStore.User.FirstName}` : 'Добро пожаловать'}
                left={(props) => <Avatar.Icon {...props} icon="human" style={styles.cardIcon} />}
            />

            <Card.Content style={styles.cardContent}>
                {!userStore.User
                    // eslint-disable-next-line react/jsx-curly-brace-presence
                    ? <Subheading>{'Позжалуйста, авторизируйтесь для сохраненния ваших данных'}</Subheading>
                    : null}
            </Card.Content>

            <Card.Actions style={styles.cardActions}>
                {!userStore.User
                    ? (
                        <>
                            <Button color={Colors.cyan700} onPress={() => { }}>Вход</Button>
                            <Button color={Colors.cyan700} onPress={() => navigator.navigate('Register')}>Регистрация</Button>
                        </>
                    )
                    : <Button color={Colors.cyan700} onPress={() => { }}>Выход</Button>}
            </Card.Actions>
        </Card>
    );
});


export default AccountWidget;
