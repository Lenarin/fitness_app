import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import {
    TextInput, Colors, Button,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { weightStore } from '../WeightWidget';
import Measure from '../Models/Measure';
import rootStore from '../../../Stores/Stores';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 50,
        marginTop: 50,
    },
    buttonAddMeasurement: {
        marginTop: 20,
        backgroundColor: '#ffa726',
    },
    buttonContent: {
        paddingTop: 8,
        paddingBottom: 8,
    },
});

const AddWeightMeasureActivity = observer(() => {
    const navigator = useNavigation();

    const [weight, setWeight] = useState(() => {
        return weightStore.measurementHistory.length === 0
            ? ''
            : weightStore.measurementHistory[weightStore.measurementHistory.length - 1].Weight.toString();
    });

    const hangleWeightSubmit = useCallback(() => {
        if (weight === '') {
            return;
        }

        const measurement = new Measure();
        measurement.Weight = Number.parseFloat(weight);

        weightStore.addMeasurement(measurement);
        rootStore.antropometryStore.CurrentWeight = measurement.Weight;

        navigator.goBack();
    });

    const isValidWeight = (text) => {
        if (text === '') {
            return true;
        }

        const parsedNum = Number.parseFloat(text);
        if (!Number.isNaN(parsedNum) && parsedNum > 0 && parsedNum < 500) {
            return true;
        }

        return false;
    };

    const handleWeightChange = useCallback((text) => {
        if (isValidWeight(text)) {
            setWeight(text);
        }
    });


    return (
        <View style={styles.container}>
            <TextInput
                label="Введите Ваш вес"
                mode="outlined"
                value={weight}
                onChangeText={handleWeightChange}
                keyboardType="numeric"
                theme={{
                    colors: {
                        primary: Colors.cyan700,
                    },
                }}
            />

            <Button
                mode="contained"
                theme={{ roundness: 10 }}
                onPress={hangleWeightSubmit}
                style={styles.buttonAddMeasurement}
                contentStyle={styles.buttonContent}
            >
                Добавить измерение
            </Button>
        </View>
    );
});

export default AddWeightMeasureActivity;
