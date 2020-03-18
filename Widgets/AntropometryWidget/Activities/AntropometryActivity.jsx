import React, { useState } from 'react';
import {
    StyleSheet, Platform, KeyboardAvoidingView,
} from 'react-native';
import { observer } from 'mobx-react';
import {
    Colors, Button, Dialog, Portal, Provider, RadioButton, TextInput,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import rootStore from '../../../Stores/Stores';

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

const AntropometryActivity = observer(() => {
    const [goalDialogVisible, setGoalDialogVisible] = useState(false);
    const [genderDialogVisible, setGenderDialogVisible] = useState(false);
    const [birthdayDialogVisible, setBirthdayDialogVisible] = useState(false);

    const handleHeightChange = (newVal) => {
        if (newVal === '') {
            rootStore.antropometryStore.Height = 0;
            return;
        }

        const num = Number.parseFloat(newVal);

        if (Number.isFinite(num) && num >= 0 && num < 300) {
            rootStore.antropometryStore.Height = num;
        }
    };

    return (
        <Provider>
            <KeyboardAvoidingView
                style={styles.heightInput}
                behavior="height"
            >
                <ScrollView style={styles.container}>
                    <Button
                        icon="trophy"
                        style={styles.antropometryInput}
                        mode="outlined"
                        theme={{
                            roundness: 5,
                            colors: {
                                primary: Colors.amber700,
                            },
                        }}
                        onPress={() => setGoalDialogVisible(true)}
                        contentStyle={styles.buttonContent}
                    >
                        {`Текущая цель: ${rootStore.antropometryStore.CurrentGoal}`}
                    </Button>

                    <Portal>
                        <Dialog
                            visible={goalDialogVisible}
                            onDismiss={() => setGoalDialogVisible(false)}
                        >
                            <Dialog.Title>
                                Выберите цель
                            </Dialog.Title>

                            <Dialog.Content>
                                <RadioButton.Group
                                    value={rootStore.antropometryStore.CurrentGoal}
                                    onValueChange={(value) => {
                                        rootStore.antropometryStore.CurrentGoal = value;
                                        setGoalDialogVisible(false);
                                    }}
                                >
                                    <RadioButton.Item label="не задано" value="не задано" />
                                    <RadioButton.Item label="набор массы" value="набор массы" />
                                    <RadioButton.Item label="поддержание веса" value="поддержание веса" />
                                    <RadioButton.Item label="похудение" value="похудение" />
                                </RadioButton.Group>
                            </Dialog.Content>
                        </Dialog>
                    </Portal>

                    <Button
                        icon="gender-male-female"
                        style={styles.antropometryInput}
                        mode="outlined"
                        theme={buttonTheme}
                        onPress={() => setGenderDialogVisible(true)}
                        contentStyle={styles.buttonContent}
                    >
                        {`Пол: ${rootStore.antropometryStore.Gender}`}
                    </Button>

                    <Portal>
                        <Dialog
                            visible={genderDialogVisible}
                            onDismiss={() => setGenderDialogVisible(false)}
                        >
                            <Dialog.Title>
                                Выберите Ваш пол
                            </Dialog.Title>

                            <Dialog.Content>
                                <RadioButton.Group
                                    onValueChange={(value) => {
                                        rootStore.antropometryStore.Gender = value;
                                        setGenderDialogVisible(false);
                                    }}
                                    value={rootStore.antropometryStore.Gender}
                                >
                                    <RadioButton.Item label="не задано" value="не указан" />
                                    <RadioButton.Item label="мужской" value="мужской" />
                                    <RadioButton.Item label="женский" value="женский" />
                                </RadioButton.Group>
                            </Dialog.Content>
                        </Dialog>
                    </Portal>

                    <Button
                        icon="calendar"
                        style={styles.antropometryInput}
                        mode="outlined"
                        theme={buttonTheme}
                        onPress={() => setBirthdayDialogVisible(true)}
                        contentStyle={styles.buttonContent}
                    >
                        {(new Date(rootStore.antropometryStore.BirtDate)).toLocaleDateString()}
                    </Button>

                    {birthdayDialogVisible && (
                        <DateTimePicker
                            timeZoneOffsetInMinutes={0}
                            value={new Date(rootStore.antropometryStore.BirtDate)}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || new Date(rootStore.antropometryStore.BirtDate);
                                setBirthdayDialogVisible(Platform.OS === 'ios');
                                rootStore.antropometryStore.BirtDate = currentDate;
                            }}
                        />
                    )}

                    <TextInput
                        label="Текущий вес"
                        mode="outlined"
                        value={rootStore.antropometryStore.CurrentWeight.toString()}
                        disabled
                        style={styles.antropometryInput}
                        theme={{
                            colors: {
                                primary: Colors.cyan700,
                            },
                        }}
                    />

                    <TextInput
                        label="Рост"
                        mode="outlined"
                        value={rootStore.antropometryStore.Height.toString()}
                        onChangeText={handleHeightChange}
                        keyboardType="numeric"
                        style={styles.antropometryInput}
                        theme={{
                            colors: {
                                primary: Colors.cyan700,
                            },
                        }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Provider>
    );
});

export default AntropometryActivity;
