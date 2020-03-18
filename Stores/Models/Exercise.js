import { observable, action } from 'mobx';

class Exercise {
    @observable
    Image = '';

    @observable
    Title = '';

    @observable
    Text = '';

    @observable
    Completed = false;

    @observable
    TimeToDo = '';

    @observable
    Repeats = 10;

    constructor(title, image, text, timeToDo, repeats) {
        this.Image = image;
        this.Title = title;
        this.Text = text;
        this.TimeToDo = timeToDo;
        this.Repeats = repeats;
    }

    @action
    setCompleted(completed) {
        this.Completed = completed;
    }
}

export default Exercise;
