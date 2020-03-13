import CourseStore from '../Widgets/CoursesWidget/CoursesStore';
import TickStore from './TickStore';
import FoodStore from '../Widgets/FoodWidget/FoodStore';
import { observable, autorun } from 'mobx';
import { AsyncStorage } from 'react-native';

// если хранить стейт в одном объекте, то можно удобно восстанавливать его целиком
// с другой стороны мы предполагали модульную архитектуру микро приложений, изолтрованных друг от друга
// тогда логичней было бы складывать стор рядом с соответствующим виджетом
let rootStore = observable({
    tickStore: new TickStore()
});

export { rootStore };