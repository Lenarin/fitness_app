import { persist } from 'mobx-persist';
import { observable } from 'mobx';

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
}

export default Meal;
