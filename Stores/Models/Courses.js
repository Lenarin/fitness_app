import { observable, action } from 'mobx';

class Course {
    Label = "";
    Description = "";
    Image = "";
    Exercises = [];
    Completed = false;

    constructor(label, image, description, exercises) {
        this.Label = label;
        this.Image = image;
        this.Description = description;
        this.Exercises = exercises;
    }

    setCompleted(completed) {
        this.Completed = completed;
    }
}

class Exercise {
    Image = "";
    Title = '';
    Text = '';
    Completed = false;
    TimeToDo = '';
    Repeats = 10;

    constructor(title, image, text, timeToDo, repeats) {
        this.Image = image;
        this.Title = title;
        this.Text = text;
        this.TimeToDo = timeToDo;
        this.Repeats = repeats;
    }
}

export {Course, Exercise}