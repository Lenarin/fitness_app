import CourseStore from './CoursesStore';
import TickStore from './TickStore';
import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import { create, persist } from 'mobx-persist';

class RootStore {
    @persist('object')
    @observable
    tickStore = new TickStore();

    //for example
    @persist('object')
    @observable
    tick2Store = new TickStore();

    @persist('object')
    @observable
    coursesStore = new CourseStore();
}

const rootStore = new RootStore();

const hydrate = create({
    storage: AsyncStorage
});

hydrate('App', rootStore);

export { rootStore };