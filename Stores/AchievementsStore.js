import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import { PostAchievementsByUsername, GetAchievementsByUsername } from '../Api/AchievementsApi';
import userStore from './UserStore';
import authorizationStore from './AuthorizationStore';
import Achievement from './Models/Achievements';

class AchievementsStore {
    @persist('list')
    @observable
    Achievements = [];

    @action
    async addAchievement(achievement) {
        this.Achievements.push(achievement);

        if (userStore.User === null) return;

        if (authorizationStore.Authorization.AccessTokenExp < (Date.now() / 1000)) await authorizationStore.refreshTokens();

        PostAchievementsByUsername(userStore.User.Username, achievement, authorizationStore.Authorization.AccessToken);
    }

    @action
    async fetchAchievements() {
        if (userStore.User == null) throw Error('Not loggened in');

        if (authorizationStore.Authorization.AccessTokenExp < (Date.now() / 1000)) await authorizationStore.refreshTokens();

        const achievements = await GetAchievementsByUsername(userStore.User.Username, authorizationStore.Authorization.AccessToken);

        this.Achievements = achievements.map((val) => new Achievement(val.date, val.price, 'dumbbell', val.iconColor, val.description, val.title, val.id));
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
