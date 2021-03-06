import { persist } from 'mobx-persist';
import { observable } from 'mobx';

class Product {
    @persist
    @observable
    Name = '';

    @persist
    @observable
    Proteins = 0; // Б

    @persist
    @observable
    Fats = 0; // Ж

    @persist
    @observable
    Carbohydrates = 0; // У

    @persist
    @observable
    Calories = 0;

    @persist
    @observable
    Id = `_${Math.random().toString(36).substr(2, 9)}`;
}

export default Product;
