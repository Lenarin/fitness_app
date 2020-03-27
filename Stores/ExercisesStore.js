import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import Exercise from './Models/Exercise';
import * as courseImages from '../assets/couses_images';

class ExercisesStore {
    @persist('map')
    @observable
    Exercises = new Map();

    // Mock exercises
    constructor() {
        const exes = [
            new Exercise(
                'Выпад 1',
                courseImages.Course_1_Image_1,
                'Резкий выпад с поочередной сменой ног. Спину держать ровно!',
                null,
                20,
            ),
            new Exercise(
                'Махи 1',
                courseImages.Course_1_Image_2,
                'Попеременный подъем рук с гантелями. Руки и спину держать ровно!',
                null,
                20,
            ),
            new Exercise(
                'Я не знаю как это назвать D:',
                courseImages.Course_1_Image_3,
                'Ээээээээ',
                null,
                20,
            ),
            new Exercise(
                'Учимся качать матрасс',
                courseImages.Course_1_Image_4,
                'Отлично тренирует спину, а также учит что делать, когда нет компрессора для матрасса!',
                null,
                100,
            ),
            new Exercise(
                'Танцуем!',
                courseImages.Course_1_Image_5,
                'Дэнс-дэнс-дэнс',
                null, 100,
            ),
            new Exercise(
                'Уклонение от пуль',
                courseImages.Course_1_Image_6,
                'Почувствуй себя Нео на минималках.',
                null, 100,
            ),
            new Exercise(
                'Качау',
                courseImages.Course_1_Image_7,
                'Швыряем воображаемые деньги в стороны. Груз вины в виде гантель прилагается.',
                null, 100,
            ),
            new Exercise(
                'Болеем',
                courseImages.Course_1_Image_8,
                'Спартак чемпион!',
                null, 100,
            ),
            new Exercise(
                'Целуйтей',
                courseImages.Course_1_Image_9,
                'No Comments',
                null, 100,
            ),
            new Exercise(
                'Я не знаю как это назвать 2',
                courseImages.Course_1_Image_10,
                'Да и что тут происходит я тоже не понимаю...',
                null, 100,
            ),
            new Exercise(
                'У меня нет денег на штангу',
                courseImages.Course_1_Image_11,
                'Поэтому я её представляю',
                null, 100,
            ),
            new Exercise(
                'Михалыч',
                courseImages.Course_1_Image_12,
                'Опять лодка не заводится!',
                null, 100,
            ),
            new Exercise(
                'Михалыч 2',
                courseImages.Course_1_Image_13,
                'И так тоже :с',
                null, 100,
            ),
            new Exercise(
                'Гантельки',
                courseImages.Course_1_Image_14,
                'Хлопай гантелями и взлетай!',
                null, 100,
            ),
        ];


        exes.forEach((elem) => {
            this.Exercises.set(elem.Title, elem);
        });
    }

    @action
    setCourse(name, course) {
        this.Exercises.set(name, course);
    }

    @action
    setCompleted = (obj) => {
        obj.setCompleted(true);
    }
}

const exercisesStore = new ExercisesStore();

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('App', exercisesStore);

export default exercisesStore;
