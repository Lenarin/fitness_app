import React, { useState } from 'react';
import {
    StyleSheet, KeyboardAvoidingView, Text,
} from 'react-native';
import { observer } from 'mobx-react';
import {
    Colors, Button, Provider, TextInput, Card,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { ValidateEmail, ValidatePassword } from '../../../Misc/Validator';

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

const RegisterActivity = observer(() => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [loginError, setLoginError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');
    // TODO Continue registration process
    const handleRegister = () => {
        if (login.length < 5) {
            setLoginError('Логин должен быть не менее трех символов');
        } else {
            setLoginError('');
        }

        if (!ValidateEmail(email)) {
            setEmailError('Неверный email');
        } else {
            setEmailError('');
        }

        if (!ValidatePassword(password)) {
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
            <KeyboardAvoidingView behavior="padding">
                <ScrollView style={styles.container}>
                    {loginError || emailError || passwordError || passwordCheckError
                        ? (
                            <Card style={{ padding: 10 }}>
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
                    <Button
                        style={styles.antropometryInput}
                        mode="contained"
                        theme={buttonTheme}
                        onPress={() => handleRegister()}
                        contentStyle={styles.buttonContent}
                    >
                        Завершить регистрацию
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </Provider>
    );
});

export default RegisterActivity;
