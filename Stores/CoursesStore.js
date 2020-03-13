
import { decorate, observable, action } from "mobx";

class CoursesStore {
    @observable
    Courses = [];

    @observable
    Completed = false;

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

