import React, { useState } from 'react';
import {
    StyleSheet, KeyboardAvoidingView, Text,
} from 'react-native';
import { observer } from 'mobx-react';
import {
    Colors, Button, Provider, TextInput, Card,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 50,
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

const RegisterActivity = observer(() => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [loginError, setLoginError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');

    const validateEmail = (mail) => {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(mail).toLowerCase());
    };

    const validatePassword = (pass) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(String(pass).toLowerCase());
    };

    const handleRegister = () => {
        if (login.length < 5) {
            setLoginError('Логин должен быть не менее трех символов');
        } else {
            setLoginError('');
        }

        if (!validateEmail(email)) {
            setEmailError('Неверный email');
        } else {
            setEmailError('');
        }

        if (!validatePassword(password)) {
            setPasswordError('Пароль должен быть не менее 8ми символов латинского алфавита и цифр, не менее одной цифры и не менее одной буквы');
        } else {
            setPasswordError('');
        }

        if (password !== passwordCheck || !passwordCheck) {
            setPasswordCheckError('Пароли не совпадают');
        } else {
            setPasswordCheckError('');
        }
    };

    return (
        <Provider>
            <KeyboardAvoidingView behavior="height">
                <ScrollView style={styles.container}>
                    {loginError || emailError || passwordError || passwordCheckError
                        ? (
                            <Card style={styles.antropometryInput}>
                                {loginError ? <Text>{loginError}</Text> : null}
                                {emailError ? <Text>{emailError}</Text> : null}
                                {passwordError ? <Text>{passwordError}</Text> : null}
                                {passwordCheckError ? <Text>{passwordCheckError}</Text> : null}
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
                        label="Email"
                        mode="outlined"
                        value={email}
                        style={styles.antropometryInput}
                        keyboardType="email-address"
                        theme={{
                            colors: {
                                primary: Colors.cyan700,
                            },
                        }}
                        error={emailError}
                        onChangeText={(text) => setEmail(text)}
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
                    <TextInput
                        label="Повторите пароль"
                        mode="outlined"
                        value={passwordCheck}
                        style={styles.antropometryInput}
                        secureTextEntry
                        theme={{
                            colors: {
                                primary: Colors.cyan700,
                            },
                        }}
                        error={passwordCheckError}
                        onChangeText={(text) => setPasswordCheck(text)}
                    />
                </ScrollView>
                <Button
                    style={styles.antropometryInput}
                    mode="outlined"
                    theme={buttonTheme}
                    onPress={() => handleRegister()}
                    contentStyle={styles.buttonContent}
                >
                    Завершить регистрацию
                </Button>
            </KeyboardAvoidingView>
        </Provider>
    );
});

export default RegisterActivity;
