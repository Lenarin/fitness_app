import { observable, action } from 'mobx';

class Course {
    @observable
    Label = '';

    @observable
    Description = '';

    @observable
    Image = '';

    @observable
    Exercises = [];

    @observable
    Completed = false;

    constructor(label, image, description, exercises) {
        this.Label = label;
        this.Image = image;
        this.Description = description;
        this.Exercises = exercises;
    }

    @action
    setCompleted = (completed) => {
        this.Completed = completed;
    }
}


export default Course;
