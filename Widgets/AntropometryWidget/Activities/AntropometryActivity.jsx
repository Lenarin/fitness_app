import React, { useState, useCallback } from 'react';
import {
    View, StyleSheet, Platform, KeyboardAvoidingView,
} from 'react-native';
import { observer } from 'mobx-react';
import {
    Colors, Button, Dialog, Portal, Paragraph, Provider, RadioButton, TextInput,
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
        marginTop: 20,
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
                                    onValueChange={(value) => {
                                        rootStore.antropometryStore.CurrentGoal = value;
                                    }}
                                    value={rootStore.antropometryStore.CurrentGoal}
                                >
                                    <View>
                                        <RadioButton value="не задано" />
                                        <Paragraph>не задано</Paragraph>
                                    </View>

                                    <View>
                                        <RadioButton value="набор массы" />
                                        <Paragraph>набор массы</Paragraph>
                                    </View>

                                    <View>
                                        <RadioButton value="набор массы" />
                                        <Paragraph>поддержание веса</Paragraph>
                                    </View>

                                    <View>
                                        <RadioButton value="похудение" />
                                        <Paragraph>похудение</Paragraph>
                                    </View>
                                </RadioButton.Group>
                            </Dialog.Content>

                            <Dialog.Actions>
                                <Button onPress={() => setGoalDialogVisible(false)}>ОК</Button>
                            </Dialog.Actions>
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
                                    }}
                                    value={rootStore.antropometryStore.Gender}
                                >
                                    <View>
                                        <RadioButton value="не указан" />
                                        <Paragraph>не задано</Paragraph>
                                    </View>

                                    <View>
                                        <RadioButton value="мужской" color={Colors.blue500} />
                                        <Paragraph>мужской</Paragraph>
                                    </View>

                                    <View>
                                        <RadioButton value="женский" color={Colors.pink500} />
                                        <Paragraph>женский</Paragraph>
                                    </View>
                                </RadioButton.Group>
                            </Dialog.Content>

                            <Dialog.Actions>
                                <Button onPress={() => setGenderDialogVisible(false)}>ОК</Button>
                            </Dialog.Actions>
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
                        label="Рост"
                        mode="outlined"
                        value={rootStore.antropometryStore.Height.toString()}
                        onChangeText={handleHeightChange}
                        keyboardType="decimal-pad"
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

/**
 * <Button
                    icon="ruler"
                    style={styles.button}
                    mode="outlined"
                    theme={buttonTheme}
                    contentStyle={styles.buttonContent}
                >
                    {`${rootStore.antropometryStore.Height.toPrecision(1)} см`}
                </Button>
 */

export default AntropometryActivity;
