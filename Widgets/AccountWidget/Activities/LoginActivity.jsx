import React, { useState } from 'react';
import {
    StyleSheet, KeyboardAvoidingView, Text,
} from 'react-native';
import {
    Colors, Button, Provider, TextInput, Card,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ValidatePassword, ValidateUsername } from '../../../Misc/Validator';
import { LoginUser } from '../../../Api/UserApi';
import User from '../../../Stores/Models/User';
import AuthorizationStore from '../../../Stores/AuthorizationStore';
import UserStore from '../../../Stores/UserStore';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    antropometryInput: {
        marginVertical: 10,
    },
    buttonContent: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    heightInput: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    radioGroupItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const buttonTheme = {
    roundness: 5,
    colors: {
        primary: Colors.cyan700,
    },
};

const LoginActivity = (() => {
    const Navigator = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [serverError, setServerError] = useState('');
    // TODO Continue login process
    const handleLogin = async () => {
        let hasErrors = false;
        if (!ValidateUsername(username)) {
            setUsernameError('Некорректный логин');
            hasErrors = true;
        } else {
            setUsernameError('');
        }

        if (!ValidatePassword(password)) {
            setPasswordError('Пароль должен быть не менее 8ми символов латинского алфавита и цифр, не менее одной цифры и не менее одной буквы');
            hasErrors = true;
        } else {
            setPasswordError('');
        }

        if (hasErrors) return;

        try {
            const user = new User(null, username, null, password);
            const auth = await LoginUser(user);
            AuthorizationStore.SetAuthorization(auth);
            UserStore.SetUser(user);
            Navigator.goBack();
        } catch (err) {
            setServerError(err.message);
        }
    };

    return (
        <Provider>
            <KeyboardAvoidingView behavior="padding">
                <ScrollView style={styles.container}>
                    {usernameError || passwordError || serverError
                        ? (
                            <Card style={{ padding: 10 }}>
                                {usernameError ? <Text>{usernameError}</Text> : null}
                                {passwordError ? <Text>{passwordError}</Text> : null}
                                {serverError ? <Text>{serverError}</Text> : null}
                            </Card>
                        )
                        : null}
                    <TextInput
                        label="Логин"
                        mode="outlined"
                        value={username}
                        style={styles.antropometryInput}
                        theme={{
                            colors: {
                                primary: Colors.cyan700,
                            },
                        }}
                        error={usernameError}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <TextInput
                        label="Пароль"
                        mode="outlined"
                        value={password}
                        style={styles.antropometryInput}
                        secureTextEntry
                        theme={{
                            colors: {
                                primary: Colors.cyan700,
                            },
                        }}
                        error={passwordError}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Button
                        style={styles.antropometryInput}
                        mode="contained"
                        theme={buttonTheme}
                        onPress={() => handleLogin()}
                        contentStyle={styles.buttonContent}
                    >
                        Войти
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </Provider>
    );
});

export default LoginActivity;
