import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';

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
}

const userStore = new UserStore();

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('User', userStore);

export default userStore;
