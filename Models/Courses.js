class Course {
    Label = "";
    Exercises = [];
    Completed = false;
    constructor(label, exercises) {
        this.Label = label;
        this.Exercise = exercises;
    }

    setCompleted(completed) {
        this.Completed = completed;
    }
}

class Exercise {
    Title = '';
    Text = '';
    Completed = false;
    TimeToDo = '';
    Repeats = 10;

    constructor(title, text, timeToDo, repeats) {
        this.Title = title;
        this.Text = text;
        this.TimeToDo = timeToDo;
        this.Repeats = repeats;
    }
}

export {Course, Exercise}