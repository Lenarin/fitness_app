import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';

const mockData = [
    {
        EatenFood: [
            {
                Name: 'Еда1',
                Proteins: 1, // Б
                Fats: 2, // Ж
                Carbohydrates: 3, // У
                Calories: 4,
            },
            {
                Name: 'Еда2',
                Proteins: 1, // Б
                Fats: 2, // Ж
                Carbohydrates: 3, // У
                Calories: 4,
            },
            {
                Name: 'Еда3',
                Proteins: 1, // Б
                Fats: 2, // Ж
                Carbohydrates: 3, // У
                Calories: 4,
            },
        ],
        MealTime: Date.now(),
        Id: `_${Math.random().toString(36).substr(2, 9)}`,
    },
    {
        EatenFood: [
            {
                Name: 'Еда1',
                Proteins: 1, // Б
                Fats: 2, // Ж
                Carbohydrates: 3, // У
                Calories: 4,
            },
            {
                Name: 'Еда2',
                Proteins: 1, // Б
                Fats: 2, // Ж
                Carbohydrates: 3, // У
                Calories: 4,
            },
            {
                Name: 'Еда3',
                Proteins: 1, // Б
                Fats: 2, // Ж
                Carbohydrates: 3, // У
                Calories: 4,
            },
        ],
        MealTime: Date.now(),
        Id: `_${Math.random().toString(36).substr(2, 9)}`,
    },
];

class FoodStore {
    // приемы пищи
    @persist('list')
    @observable
    Meals = [];//mockData;// 

    @action
    addMeal(meal) {
        this.Meals.push(meal);
    }

    @action
    removeMeal(meal) {
        this.Meals.remove(meal);
    }

    // возвращает объект, содержащий количество потребленных за день веществ
    @computed
    get ConsumedToday() {
        const today = Math.trunc(Date.now() / 86400000);

        const consumed = {
            Proteins: 0, // Б
            Fats: 0, // Ж
            Carbohydrates: 0, // У
            Calories: 0,
        };

        this.Meals
            .filter((meal) => Math.trunc(meal.MealTime / 86400000) === today)
            .forEach((meal) => meal.EatenFood.forEach((food) => {
                consumed.Proteins += food.Proteins;
                consumed.Fats += food.Fats;
                consumed.Carbohydrates += food.Carbohydrates;
                consumed.Calories += food.Calories;
            }));

        return consumed;
    }

    getNutrientsPercentage(caloriesNum) {
        const nutrients = {
            Proteins: 0, // Б
            Fats: 0, // Ж
            Carbohydrates: 0, // У
            Calories: 0,
        };

        if (!Number.isFinite(caloriesNum)) {
            return nutrients;
        }

        const consumedToday = this.ConsumedToday;

        if (caloriesNum > 0) {
            const micronutrient = caloriesNum / 6;

            nutrients.Proteins = consumedToday.Proteins / (micronutrient / 4);
            nutrients.Fats = consumedToday.Fats / (micronutrient / 9);
            nutrients.Carbohydrates = consumedToday.Carbohydrates / (micronutrient / 4);
            nutrients.Calories = consumedToday.Calories / caloriesNum;
        }

        return nutrients;
    }
}

export default FoodStore;
