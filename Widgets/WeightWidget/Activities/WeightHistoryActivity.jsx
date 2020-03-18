import React from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import {
    Card, Colors, Button, Headline, IconButton,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { weightStore } from '../WeightWidget';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingTop: 50,
    },
    measurementCard: {
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: '#f7f7f7',
    },
    listHeader: {
        marginHorizontal: 12,
    },
    listFooter: {
        height: 75,
    },
    buttonWrapper: {
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        margin: 8,
        bottom: 0,
        width: '100%',
    },
    buttonAddMeasurement: {
        backgroundColor: Colors.amber700,
    },
    buttonContent: {
        paddingTop: 8,
        paddingBottom: 8,
    },
});

const WeightHistoryEntry = ({ item }) => (
    <Card
        elevation={1}
        theme={{ roundness: 12 }}
        style={styles.measurementCard}
    >

        <Card.Title
            title={item.Weight.toString()}
            subtitle={(new Date(item.MeasureDate)).toLocaleString().slice(0, -3)}
            right={(props) => (
                <IconButton
                    {...props}
                    color={Colors.grey800}
                    icon="close-circle-outline"
                    onPress={() => weightStore.removeMeasure(item)}
                />
            )}
        />
    </Card>
);

const WeightHistoryActivity = observer(() => {
    const navigator = useNavigation();

    return (
        <View style={styles.container}>
            <FlatList
                data={weightStore.MeasurementHistory}
                renderItem={(item) => <WeightHistoryEntry {...item} />}
                ListFooterComponent={<View style={styles.listFooter} />}
                ListHeaderComponent={(
                    <Headline style={styles.listHeader}>
                        История измерений
                    </Headline>
                )}
                keyExtractor={(item) => item.Id}
                extraData={weightStore.MeasurementHistory.length}
            />

            <View style={styles.buttonWrapper}>
                <Button
                    mode="contained"
                    theme={{ roundness: 50 }}
                    onPress={() => navigator.navigate('AddWeightMeasure')}
                    style={styles.buttonAddMeasurement}
                    contentStyle={styles.buttonContent}
                >
                    Добавить измерение
                </Button>
            </View>
        </View>
    );
});

export default WeightHistoryActivity;
