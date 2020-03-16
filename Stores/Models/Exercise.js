class Exercise {
    Image = '';

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

    setCompleted(completed) {
        this.Completed = completed;
    }
}

export default Exercise;
