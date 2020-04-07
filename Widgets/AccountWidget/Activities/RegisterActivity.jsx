import React, { useState } from 'react';
import {
    StyleSheet, KeyboardAvoidingView, Text,
} from 'react-native';
import {
    Colors, Button, Provider, TextInput, Card,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ValidateEmail, ValidatePassword, ValidateUsername } from '../../../Misc/Validator';
import User from '../../../Stores/Models/User';
import { RegisterUser, LoginUser } from '../../../Api/UserApi';
import userStore from '../../../Stores/UserStore';
import authorizationStore from '../../../Stores/AuthorizationStore';


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

const RegisterActivity = (() => {
    const Navigator = useNavigation();

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [loginError, setLoginError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');
    // TODO Continue registration process
    const handleRegister = async () => {
        let hasErrors = false;
        if (!ValidateUsername(login)) {
            setLoginError('Логин должен быть не менее пяти символов и не длинне 50');
            hasErrors = true;
        } else {
            setLoginError('');
        }

        if (!ValidateEmail(email)) {
            setEmailError('Неверный email');
            hasErrors = true;
        } else {
            setEmailError('');
        }

        if (!ValidatePassword(password)) {
            setPasswordError('Пароль должен быть не менее 8ми символов латинского алфавита и цифр, не менее одной цифры и не менее одной буквы');
            hasErrors = true;
        } else {
            setPasswordError('');
        }

        if (password !== passwordCheck || !passwordCheck) {
            setPasswordCheckError('Пароли не совпадают');
            hasErrors = true;
        } else {
            setPasswordCheckError('');
        }

        if (hasErrors) return;

        let user = new User(null, login, email, password);

        try {
            user = await RegisterUser(user);
            const auth = await LoginUser(user);
            authorizationStore.SetAuthorization(auth);
            userStore.SetUser(user);
            Navigator.goBack();
        } catch (err) {
            if (err.username) setLoginError(err.username);
            if (err.email) setEmailError(err.email);
            if (err.password) setPasswordError(err.password);
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
