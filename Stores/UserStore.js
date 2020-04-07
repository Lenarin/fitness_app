import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import { LoginUser } from '../Api/UserApi';

class UserStore {
    @persist('object')
    @observable
    User = null;

    @action
    SetPassword(password) {
        this.User.Password = password;
    }

    @action
    SetUser(user) {
        this.User = user;
    }

    @action
    async Login(user) {
        const auth = await LoginUser(user);
        this.SetUser(user);
        return auth;
    }
}

const userStore = new UserStore();

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('User', userStore);

export default userStore;
