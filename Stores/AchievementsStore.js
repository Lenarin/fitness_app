import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import Achievement from './Models/Achievements';

class AchievementsStore {
    @persist('list')
    @observable
    Achievements = [];

    // Mock achieves
    constructor() {
        this.Achievements = [
            new Achievement(new Date('2020-03-01'), 1, 'file', '#151697', 'You achived eternity!', 'WAAAAGH'),
            new Achievement(new Date('2020-03-03'), 1, 'file', '#151697', 'You achived eternity!', 'WAAAAGH'),
            new Achievement(new Date('2020-03-04'), 1, 'file', '#151697', 'You achived eternity!', 'WAAAAGH'),
            new Achievement(new Date('2020-03-01'), 1, 'food', '#151697', 'All dinosawrs died!', 'No lizards for you'),
            new Achievement(new Date('2020-03-01'), 1, 'food', '#151697', 'All dinosawrs died!', 'No lizards for you'),
            new Achievement(new Date('2020-03-01'), 1, 'food', '#151697', 'All dinosawrs died!', 'No lizards for you'),
            new Achievement(new Date('2020-03-01'), 1, 'food', '#151697', 'All dinosawrs died!', 'No lizards for you'),
            new Achievement(new Date('2020-03-01'), 1, 'food', '#151697', 'All dinosawrs died!', 'No lizards for you'),
            new Achievement(new Date('2020-03-01'), 1, 'food', '#151697', 'All dinosawrs died!', 'No lizards for you'),
        ];
    }

    @action
    addAchievement(achievement) {
        this.Achievements.push(achievement);
    }

    @action
    delAchievementByIndex(idx) {
        this.Achievements = this.Achievements.filter((index) => (index !== idx));
    }
}

const achievementStore = new AchievementsStore();

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('achievements', achievementStore);

export default achievementStore;
