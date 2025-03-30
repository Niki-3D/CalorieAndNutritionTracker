export interface FoodItem {
    id: string;
    name: string;
    calories: number;
    servingSize: string;
    brand: string;
    category: string;
    favorite: boolean;
  }
  
  export const foodItems: FoodItem[] = [
    { id: "1", name: "Banana", calories: 105, servingSize: "1 medium (7-8 inches long)", brand: "Chiquita", category: "fruits", favorite: false },
    { id: "2", name: "Apple", calories: 95, servingSize: "1 medium (3 inches in diameter)", brand: "Gala", category: "fruits", favorite: true },
    { id: "3", name: "Orange", calories: 62, servingSize: "1 medium (2-5/8 inches in diameter)", brand: "Navel", category: "fruits", favorite: false },
    { id: "4", name: "Spinach", calories: 23, servingSize: "100g", brand: "Organic Farms", category: "vegetables", favorite: true },
    { id: "5", name: "Carrot", calories: 41, servingSize: "1 medium", brand: "Farmer's Market", category: "vegetables", favorite: false },
    { id: "6", name: "Broccoli", calories: 55, servingSize: "1 cup chopped", brand: "Green Valley", category: "vegetables", favorite: false },
    { id: "7", name: "Chicken Breast", calories: 165, servingSize: "100g", brand: "Tyson", category: "meat", favorite: true },
    { id: "8", name: "Ground Beef", calories: 250, servingSize: "100g", brand: "Angus", category: "meat", favorite: false },
    { id: "9", name: "Salmon", calories: 208, servingSize: "100g", brand: "Wild Catch", category: "meat", favorite: true },
    { id: "10", name: "Spaghetti Bolognese", calories: 670, servingSize: "1 plate", brand: "Homemade", category: "full dish", favorite: false },
    { id: "11", name: "Caesar Salad", calories: 480, servingSize: "1 bowl", brand: "Fresh & Green", category: "full dish", favorite: true },
    { id: "12", name: "Beef Stir Fry", calories: 550, servingSize: "1 plate", brand: "Homemade", category: "full dish", favorite: false },
  ];