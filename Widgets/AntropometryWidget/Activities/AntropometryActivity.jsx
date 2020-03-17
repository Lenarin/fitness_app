import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import {
    Colors, Button, Dialog, Portal, Paragraph, Provider, RadioButton, Text,
} from 'react-native-paper';
import rootStore from '../../../Stores/Stores';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 50,
    },
    button: {
        marginTop: 20,
    },
    buttonContent: {
        paddingTop: 8,
        paddingBottom: 8,
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
    const [heightDialogVisible, setHeightDialogVisible] = useState(false);

    return (
        <Provider>
            <View style={styles.container}>
                <Button
                    icon="trophy"
                    style={styles.button}
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
                            <Button onPress={() => setGoalDialogVisible(false)}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

                <Button
                    icon="gender-male"
                    style={styles.button}
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
                                    <RadioButton value="не задано" />
                                    <Paragraph>не задано</Paragraph>
                                </View>

                                <View>
                                    <RadioButton value="мужской" color={Colors.blue500}/>
                                    <Paragraph>мужской</Paragraph>
                                </View>

                                <View>
                                    <RadioButton value="женский" color={Colors.pink500}/>
                                    <Paragraph>женский</Paragraph>
                                </View>
                            </RadioButton.Group>
                        </Dialog.Content>

                        <Dialog.Actions>
                            <Button onPress={() => setGenderDialogVisible(false)}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

                <Button
                    icon="calendar"
                    style={styles.button}
                    mode="outlined"
                    theme={buttonTheme}
                    contentStyle={styles.buttonContent}
                >
                    {(new Date(rootStore.antropometryStore.BirtDate)).toLocaleDateString()}
                </Button>

                <Button
                    icon="ruler"
                    style={styles.button}
                    mode="outlined"
                    theme={buttonTheme}
                    contentStyle={styles.buttonContent}
                >
                    {`${rootStore.antropometryStore.Height.toPrecision(1)} см`}
                </Button>
            </View>
        </Provider>
    );
});

export default AntropometryActivity;
