import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
// import { observer } from 'mobx-react';
import {
    Colors, Card, Avatar, Paragraph,
} from 'react-native-paper';
import { observer } from 'mobx-react';
import { FlatList } from 'react-native-gesture-handler';
import achievementStore from '../Stores/AchievementsStore';

const russianMonths = [
    'Январь',
    'Февраль',
    'Март',
    'Апреть',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e6e6e6',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: 25,
    },
    card: {
        margin: 10,
        backgroundColor: '#fafafa',
    },
    cardIcon: {
        backgroundColor: '#52cbbc',
    },
    cardActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});


const CalendarCard = observer(({ setDate, achievements }) => {
    const [commitsData, setCommitsData] = useState([]);

    const chartConfig = {
        backgroundColor: Colors.white,
        backgroundGradientFrom: Colors.white,
        backgroundGradientTo: Colors.white,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 165, 0, ${opacity || 1})`,
        style: {
            borderRadius: 16,
            margin: 10,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
        },
    };

    useEffect(() => {
        setCommitsData(achievements.map((value) => {
            return { date: value.Date, count: value.Price };
        }));
    }, []);


    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width - chartConfig.style.margin * 2);

    useEffect(() => {
        const handler = ({ window }) => setScreenWidth(window.width - (chartConfig.style.margin * 2));

        Dimensions.addEventListener('change', handler);

        return () => Dimensions.removeEventListener('change', handler);
    });

    return (
        <View style={{ margin: chartConfig.style.margin }}>
            <ContributionGraph
                width={screenWidth}
                height={220}
                values={commitsData}
                numDays={90}
                endDate={new Date(Date.now())}
                chartConfig={chartConfig}
                onDayPress={(elem) => setDate(new Date(elem.date))}
                getMonthLabel={(monthIndex) => russianMonths[monthIndex]}
            />
        </View>
    );
});

const AchievementCard = (({ achievement }) => {
    return (
        <Card
            elevation={1}
            style={styles.card}
            theme={{ roundness: 5 }}
        >
            <Card.Title
                title={achievement.Title}
                subtitle={`${new Date(achievement.Date).toLocaleDateString()}, ${new Date(achievement.Date).toTimeString().slice(0, 5)}`}
                left={(props) => <Avatar.Icon {...props} icon={achievement.IconName} backgroundColor={achievement.IconColor} />}
            />

            <Card.Content>
                <Paragraph>
                    {achievement.Description}
                </Paragraph>
            </Card.Content>
        </Card>
    );
});

const AchievementList = observer(({ achievements }) => {
    return (
        <FlatList
            data={achievements}
            renderItem={({ item }) => <AchievementCard achievement={item} />}
            keyExtractor={(item, index) => `${index}`}
        />
    );
});


const CalendarActivity = observer(() => {
    const [date, setDate] = useState(new Date(Date.now()));
    return (
        <View style={styles.container}>
            <CalendarCard setDate={setDate} achievements={achievementStore.Achievements} />
            <AchievementList achievements={achievementStore.Achievements.filter((val) => (new Date(val.Date).toDateString() === date.toDateString()))} />
        </View>
    );
});

export default CalendarActivity;
