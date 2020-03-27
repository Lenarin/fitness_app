import React, { useState } from 'react';
import {
    StyleSheet, KeyboardAvoidingView, Text,
} from 'react-native';
import {
    Colors, Button, Provider, TextInput, Card,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { ValidatePassword } from '../../../Misc/Validator';

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
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    // TODO Continue login process
    const handleRegister = () => {
        if (login.length < 5) {
            setLoginError('Логин должен быть не менее трех символов');
        } else {
            setLoginError('');
        }

        if (!ValidatePassword(password)) {
            setPasswordError('Пароль должен быть не менее 8ми символов латинского алфавита и цифр, не менее одной цифры и не менее одной буквы');
        } else {
            setPasswordError('');
        }
    };

    return (
        <Provider>
            <KeyboardAvoidingView behavior="padding">
                <ScrollView style={styles.container}>
                    {loginError || passwordError
                        ? (
                            <Card style={{ padding: 10 }}>
                                {loginError ? <Text>{loginError}</Text> : null}
                                {passwordError ? <Text>{passwordError}</Text> : null}
                            </Card>
                        )
                        : null}
                    <TextInput
                        label="Логин"
                        mode="outlined"
                        value={login}
                        style={styles.antropometryInput}
                        theme={{
                            colors: {
                                primary: Colors.cyan700,
                            },
                        }}
                        error={loginError}
                        onChangeText={(text) => setLogin(text)}
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
                        onPress={() => handleRegister()}
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
