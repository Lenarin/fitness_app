class Meal {
    EatenFood = []
    
    MealTime = (new Date()).getTime();
}

class Product {
    Name = '';
    Proteins = 0; //Б
    Fats = 0; //Ж
    Carbohydrates = 0; //У
    Calories = 0;
}

export {Meal, Product}