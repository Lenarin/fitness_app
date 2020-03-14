
import { observable, action } from "mobx";
import { Course, Exercise } from './Models/Courses';
import { persist } from "mobx-persist";

class CoursesStore {
    @persist('list')
    @observable
    Courses = [];

    @persist
    @observable
    Completed = false;
/*
    constructor() {
        this.Courses.push(new Course(
            "Универсальный план для спортзала",
            [
                new Exercise("Растяжка",)
            ]
        ))
    }
*/
    @action
    pushCourse (course) {
        this.Courses.push(course);
    }

    @action
    setCompleted (completed) {
        this.Completed = completed;
    }
}

export default CoursesStore;

