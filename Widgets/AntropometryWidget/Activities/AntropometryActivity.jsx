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
import antropometryStore from '../../../Stores/AntropometryStore';

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

const dailyActivity = [
    {
        label: 'Базовый обмен веществ',
        value: 1.00,
    },
    {
        label: 'Минимальная физ. нагрузка',
        value: 1.20,
    },
    {
        label: '3 раза в неделю',
        value: 1.38,
    },
    {
        label: '5 раз в неделю',
        value: 1.46,
    },
    {
        label: '5 раз в неделю (интенсивно)',
        value: 1.55,
    },
    {
        label: 'Каждый день',
        value: 1.64,
    },
    {
        label: '2 раза в день',
        value: 1.73,
    },
    {
        label: 'Тяжелая физ. нагрузка',
        value: 1.90,
    },
];

const AntropometryActivity = observer(() => {
    const [goalDialogVisible, setDailyActivityDialogVisible] = useState(false);
    const [genderDialogVisible, setGenderDialogVisible] = useState(false);
    const [birthdayDialogVisible, setBirthdayDialogVisible] = useState(false);

    const handleHeightChange = (newVal) => {
        if (newVal === '') {
            antropometryStore.Height = 0;
            return;
        }

        const num = Number.parseFloat(newVal);

        if (Number.isFinite(num) && num >= 0 && num < 300) {
            antropometryStore.Height = num;
        }
    };

    return (
        <Provider>
            <KeyboardAvoidingView behavior="height">
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
                        onPress={() => setDailyActivityDialogVisible(true)}
                        contentStyle={styles.buttonContent}
                    >
                        {dailyActivity.find((it) => it.value === antropometryStore.DailyActivityCoefficient).label}
                    </Button>

                    <Portal>
                        <Dialog
                            visible={goalDialogVisible}
                            onDismiss={() => setDailyActivityDialogVisible(false)}
                        >
                            <Dialog.Title>
                                Физическая активность
                            </Dialog.Title>

                            <Dialog.Content>
                                <RadioButton.Group
                                    value={antropometryStore.DailyActivityCoefficient.toFixed(2)}
                                    onValueChange={(value) => {
                                        antropometryStore.DailyActivityCoefficient = Number.parseFloat(value);
                                        setDailyActivityDialogVisible(false);
                                    }}
                                >
                                    {dailyActivity.map((item) => (
                                        <RadioButton.Item
                                            key={item.value.toFixed(2)}
                                            label={item.label}
                                            value={item.value.toFixed(2)}
                                        />
                                    ))}
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
                        {`Пол: ${antropometryStore.Gender}`}
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
                                        antropometryStore.Gender = value;
                                        setGenderDialogVisible(false);
                                    }}
                                    value={antropometryStore.Gender}
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
                        {antropometryStore.Age > 0
                            ? (new Date(antropometryStore.BirtDate)).toLocaleDateString()
                            : 'не указана'}
                    </Button>

                    {birthdayDialogVisible && (
                        <DateTimePicker
                            timeZoneOffsetInMinutes={0}
                            value={new Date(antropometryStore.BirtDate)}
                            mode="date"
                            display="default"
                            maximumDate={new Date()}
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || new Date(antropometryStore.BirtDate);

                                setBirthdayDialogVisible(Platform.OS === 'ios');
                                antropometryStore.BirtDate = currentDate.getTime();
                            }}
                        />
                    )}

                    <TextInput
                        label="Текущий вес"
                        mode="outlined"
                        value={antropometryStore.CurrentWeight.toString()}
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
                        value={antropometryStore.Height.toString()}
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
