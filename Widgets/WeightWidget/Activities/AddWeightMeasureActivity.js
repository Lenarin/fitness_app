import React, { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { TextInput, Colors, Button, Text } from 'react-native-paper'
import { weightStore } from '../WeightWidget';
import { useNavigation } from '@react-navigation/native';
import Measure from '../Models/Measure';

const AddWeightMeasureActivity = observer(() => {
    const navigator = useNavigation();

    const [weight, setWeight] = useState('');

    const hangleWeightSubmit = useCallback(() => {
        if (weight === '') {
            return;
        }

        const measurement = new Measure();
        measurement.Weight = Number.parseFloat(weight);

        weightStore.addMeasurement(measurement);

        navigator.goBack();
    });

    const handleWeightChange = useCallback(text => {
        if (isValidWeight(text)) {
            setWeight(text);
        }
    });

    const isValidWeight = (text) => {
        if (text === '') {
            return true;
        }
      
        const parsedNum = Number.parseFloat(text);
        if (!isNaN(parsedNum) && parsedNum > 0 && parsedNum < 500) {
            return true;
        }

        return false;
    };

    return (
        <View style={styles.container}>
            <TextInput
                label={"Введите Ваш вес"}
                mode={"outlined"}
                value={weight}
                onChangeText={handleWeightChange}
                keyboardType={"numeric"}
                theme={{
                    colors: {
                        primary: Colors.cyan700,
                    }
                }}
            />

            <Button    
                mode={"contained"}
                theme={{ roundness: 50 }}
                onPress={hangleWeightSubmit}
                style={styles.buttonAddMeasurement}
                contentStyle={styles.buttonContent}
            >
                Добавить измерение
            </Button>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
	      marginHorizontal: 50,
        marginTop: 50
    },
    buttonAddMeasurement: {
        marginTop: 20,
        backgroundColor: "#f1b514"
    },
    buttonContent: {
        paddingTop: 8,
        paddingBottom: 8,
    }
});

export default AddWeightMeasureActivity;