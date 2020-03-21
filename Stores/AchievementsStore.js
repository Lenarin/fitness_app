import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';

class AchievementsStore {
    @persist('list')
    @observable
    Achievements = [];

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
