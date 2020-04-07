
import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import Course from './Models/Courses';
import exercisesStore from './ExercisesStore';
import * as courseImages from '../assets/couses_images';
import GetCourses from '../Api/CoursesApi';

class CoursesStore {
    @persist('list')
    @observable
    Courses = [];

    // Mock course
    constructor() {
        this.Courses.push(
            new Course(
                'Фитнес с гантельками 101',
                courseImages.Course_1_Image_14,
                'Базовая тренировка по фитнессу с гантелями для отличного начала дня!',
                [
                    exercisesStore.Exercises.get('Выпад 1'),
                    exercisesStore.Exercises.get('Махи 1'),
                    exercisesStore.Exercises.get('Я не знаю как это назвать D:'),
                    exercisesStore.Exercises.get('Учимся качать матрасс'),
                    exercisesStore.Exercises.get('Танцуем!'),
                    exercisesStore.Exercises.get('Уклонение от пуль'),
                    exercisesStore.Exercises.get('Качау'),
                    exercisesStore.Exercises.get('Болеем'),
                    exercisesStore.Exercises.get('Целуйтей'),
                    exercisesStore.Exercises.get('Я не знаю как это назвать 2'),
                    exercisesStore.Exercises.get('У меня нет денег на штангу'),
                    exercisesStore.Exercises.get('Михалыч'),
                    exercisesStore.Exercises.get('Михалыч 2'),
                    exercisesStore.Exercises.get('Гантельки'),
                ],
            ),
            new Course(
                'Утренняя разминка',
                courseImages.Course_1_Image_2,
                'Разминка на утро перед тяжким рабочим днем',
                [
                    exercisesStore.Exercises.get('Я не знаю как это назвать D:'),
                    exercisesStore.Exercises.get('Танцуем!'),
                    exercisesStore.Exercises.get('Уклонение от пуль'),
                    exercisesStore.Exercises.get('Болеем'),
                ],
            ),
        );

        GetCourses().then((courses) => {
            courses.forEach((course) => {
                if (this.Courses.find((elem) => elem.Label === course.label) === undefined) {
                    const exercises = [];
                    course.exercises.forEach((elem) => {
                        const ex = exercisesStore.Exercises.get(elem);
                        if (ex !== undefined) {
                            exercises.push(ex);
                        }
                    });
                    if (exercises.length > 0) {
                        this.Courses.push(new Course(course.label, exercises[0].Image, course.description, exercises));
                    }
                }
            });
        });
    }

    @action
    pushCourse(course) {
        this.Courses.push(course);
    }

    @action
    setCompleted = (obj) => {
        // eslint-disable-next-line no-param-reassign
        obj.Completed = true;
    }
}

const coursesStore = new CoursesStore();

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('Courses', coursesStore);

export default coursesStore;
