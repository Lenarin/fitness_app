import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import { create, persist } from 'mobx-persist';
import AntropometryStore from './AntropometryStore';

class RootStore {
    @persist('object')
    @observable
    antropometryStore = new AntropometryStore();
}

const rootStore = new RootStore();

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('App', rootStore);

export default rootStore;
