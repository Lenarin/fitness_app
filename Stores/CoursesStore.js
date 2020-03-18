
import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import Course from './Models/Courses';
import exercisesStore from './ExercisesStore';
import * as courseImages from '../assets/couses_images';

class CoursesStore {
    @persist('list')
    @observable
    Courses = [];

    // Mock course
    constructor() {
        this.Courses.push(new Course(
            'Фитнес с гантельками 101',
            courseImages.Course_1_Image_14,
            'Базовая тренировка по фитнессу с гантелями для отличного начала дня!',
            [
                exercisesStore.Exercises[0],
                exercisesStore.Exercises[1],
                exercisesStore.Exercises[2],
                exercisesStore.Exercises[3],
                exercisesStore.Exercises[4],
                exercisesStore.Exercises[5],
                exercisesStore.Exercises[6],
                exercisesStore.Exercises[7],
                exercisesStore.Exercises[8],
                exercisesStore.Exercises[9],
                exercisesStore.Exercises[10],
                exercisesStore.Exercises[11],
                exercisesStore.Exercises[12],
                exercisesStore.Exercises[13],
            ],
        ),
        new Course(
            'Утренняя разминка',
            courseImages.Course_1_Image_2,
            'Разминка на утро перед тяжким рабочим днем',
            [
                exercisesStore.Exercises[2],
                exercisesStore.Exercises[4],
                exercisesStore.Exercises[5],
                exercisesStore.Exercises[7],
            ],
        ));
    }

    @action
    pushCourse(course) {
        this.Courses.push(course);
    }

    @action
    setCompleted = (obj) => {
        obj.setCompleted(true);
    }
}

const coursesStore = new CoursesStore();

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('Courses', coursesStore);

export default coursesStore;
