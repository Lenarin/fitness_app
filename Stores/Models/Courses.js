class Course {
    Label = '';

    Description = '';

    Image = '';

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

export default Course;
