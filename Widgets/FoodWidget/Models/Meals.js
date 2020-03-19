import { persist } from 'mobx-persist';
import { observable, action } from 'mobx';

class Meal {
    @persist('list')
    @observable
    EatenFood = [];

    @persist
    @observable
    MealTime = Date.now();

    @persist
    @observable
    Id = `_${Math.random().toString(36).substr(2, 9)}`;

    @action
    addFood(food) {
        this.EatenFood.push(food);
    }

    @action
    removeFood(food) {
        this.EatenFood.remove(food);
    }
}

export default Meal;
