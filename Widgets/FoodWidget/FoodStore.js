import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

class FoodStore {
    // приемы пищи
    @persist('list')
    @observable
    Meals = [];

    @action
    addMeal(meal) {
        this.Meals.push(meal);
    }

    // TODO: reimplement
    /*
    @computed
    get ConsumedTodayCalories() {
        const today = (new Date()).toDateString();

        const res = this.Meals.filter(meal => meal.MealTime.toDateString() === today)
            .map(meal => meal.EatenFood.reduce((acc, item) => acc + item))
            .reduce((total, calories) => total + calories, 0);

        return res;
    } */
/*
    // количество калорий по дням
    @computed
    get ConsumedCalories() {
        let days = new Map();

        this.Meals.map(meal => ({
            // посчитали калории за прием пищи
            totalCalories: meal.EatenFood.reduce((acc, item) => acc + item),
            day: meal.MealTime.toDateString()
        })).forEach(meal => {
            // если в мапе нет еще этого дня, то 0
            let cals = days.get(meal.day) || 0;
            days.set(meal.day, cals);
        });

        return days;
    } */
}

export default FoodStore;
