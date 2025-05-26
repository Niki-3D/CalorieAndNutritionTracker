export interface FoodItem {
    id: string;
    name: string;
    calories: number;
    servingSize: string;
    brand: string;
    category: string;
    favorite: boolean;
    macros: {
      carbs: number;
      protein: number;
      fat: number;
      fiber: number;
      sugar: number;
    };
    nutrients: {
      sodium: number;
      calcium: number;
      iron: number;
      vitaminC: number;
      vitaminD: number;
    };
  }
  
  export const foodItems: FoodItem[] = [
    { id: "1", name: "Banana", calories: 105, servingSize: "1 medium (7-8 inches long)", brand: "Chiquita", category: "fruits", favorite: false, macros: { carbs: 27, protein: 1.3, fat: 0.4, fiber: 3.1, sugar: 14.4 }, nutrients: { sodium: 1, calcium: 5, iron: 0.3, vitaminC: 10.3, vitaminD: 0 } },
    { id: "2", name: "Apple", calories: 95, servingSize: "1 medium (3 inches in diameter)", brand: "Gala", category: "fruits", favorite: true, macros: { carbs: 25, protein: 0.5, fat: 0.3, fiber: 4.5, sugar: 19 }, nutrients: { sodium: 2, calcium: 11, iron: 0.2, vitaminC: 8.4, vitaminD: 0 } },
    { id: "3", name: "Orange", calories: 62, servingSize: "1 medium (2-5/8 inches in diameter)", brand: "Navel", category: "fruits", favorite: false, macros: { carbs: 15.4, protein: 1.2, fat: 0.2, fiber: 3.1, sugar: 12.2 }, nutrients: { sodium: 0, calcium: 40, iron: 0.1, vitaminC: 69.7, vitaminD: 0 } },
    { id: "4", name: "Spinach", calories: 23, servingSize: "100g", brand: "Organic Farms", category: "vegetables", favorite: true, macros: { carbs: 3.6, protein: 2.9, fat: 0.4, fiber: 2.2, sugar: 0.4 }, nutrients: { sodium: 79, calcium: 99, iron: 2.7, vitaminC: 28.1, vitaminD: 0 } },
    { id: "5", name: "Carrot", calories: 41, servingSize: "1 medium", brand: "Farmer's Market", category: "vegetables", favorite: false, macros: { carbs: 9.6, protein: 0.9, fat: 0.2, fiber: 2.8, sugar: 4.7 }, nutrients: { sodium: 69, calcium: 33, iron: 0.3, vitaminC: 5.9, vitaminD: 0 } },
    { id: "6", name: "Broccoli", calories: 55, servingSize: "1 cup chopped", brand: "Green Valley", category: "vegetables", favorite: false, macros: { carbs: 11.2, protein: 3.7, fat: 0.6, fiber: 5.1, sugar: 2.6 }, nutrients: { sodium: 33, calcium: 47, iron: 0.7, vitaminC: 81.2, vitaminD: 0 } },
    { id: "7", name: "Chicken Breast", calories: 165, servingSize: "100g", brand: "Tyson", category: "meat", favorite: true, macros: { carbs: 0, protein: 31, fat: 3.6, fiber: 0, sugar: 0 }, nutrients: { sodium: 74, calcium: 15, iron: 1, vitaminC: 0, vitaminD: 0 } },
    { id: "8", name: "Ground Beef", calories: 250, servingSize: "100g", brand: "Angus", category: "meat", favorite: false, macros: { carbs: 0, protein: 26, fat: 17, fiber: 0, sugar: 0 }, nutrients: { sodium: 76, calcium: 18, iron: 2.7, vitaminC: 0, vitaminD: 0.1 } },
    { id: "9", name: "Salmon", calories: 208, servingSize: "100g", brand: "Wild Catch", category: "meat", favorite: true, macros: { carbs: 0, protein: 22, fat: 13, fiber: 0, sugar: 0 }, nutrients: { sodium: 59, calcium: 9, iron: 0.3, vitaminC: 0, vitaminD: 11 } },
    { id: "10", name: "Spaghetti Bolognese", calories: 670, servingSize: "1 plate", brand: "Homemade", category: "full dish", favorite: false, macros: { carbs: 85, protein: 33, fat: 22, fiber: 5.2, sugar: 8.3 }, nutrients: { sodium: 680, calcium: 87, iron: 4.8, vitaminC: 12, vitaminD: 0.2 } },
    { id: "11", name: "Caesar Salad", calories: 480, servingSize: "1 bowl", brand: "Fresh & Green", category: "full dish", favorite: true, macros: { carbs: 12, protein: 28, fat: 35, fiber: 4, sugar: 3.5 }, nutrients: { sodium: 950, calcium: 186, iron: 2.2, vitaminC: 15.3, vitaminD: 0.1 } },
    { id: "12", name: "Beef Stir Fry", calories: 550, servingSize: "1 plate", brand: "Homemade", category: "full dish", favorite: false, macros: { carbs: 45, protein: 38, fat: 25, fiber: 6.5, sugar: 9.2 }, nutrients: { sodium: 850, calcium: 92, iron: 5.2, vitaminC: 45.6, vitaminD: 0.2 } },
    { id: "13", name: "Tofu", calories: 94, servingSize: "100g", brand: "House Foods", category: "protein", favorite: false, macros: { carbs: 2.3, protein: 10, fat: 5.3, fiber: 0.9, sugar: 0.7 }, nutrients: { sodium: 7, calcium: 350, iron: 2.7, vitaminC: 0, vitaminD: 0 } },
    { id: "14", name: "Oatmeal", calories: 150, servingSize: "40g dry", brand: "Quaker", category: "grains", favorite: true, macros: { carbs: 27, protein: 5, fat: 3, fiber: 4, sugar: 1 }, nutrients: { sodium: 0, calcium: 54, iron: 1.7, vitaminC: 0, vitaminD: 0 } },
    { id: "15", name: "Pizza", calories: 280, servingSize: "1 slice", brand: "Domino's", category: "full dish", favorite: false, macros: { carbs: 35, protein: 12, fat: 14, fiber: 2, sugar: 3.5 }, nutrients: { sodium: 1200, calcium: 200, iron: 2.5, vitaminC: 10, vitaminD: 0.1 } },
    { id: "16", name: "Salad", calories: 120, servingSize: "1 cup", brand: "Green Salad", category: "full dish", favorite: true, macros: { carbs: 15, protein: 5, fat: 0.5, fiber: 3, sugar: 2 }, nutrients: { sodium: 100, calcium: 30, iron: 0.5, vitaminC: 30, vitaminD: 0 } },
    { id: "17", name: "Sushi", calories: 200, servingSize: "1 piece", brand: "Sushi Spot", category: "full dish", favorite: false, macros: { carbs: 25, protein: 10, fat: 10, fiber: 1, sugar: 1 }, nutrients: { sodium: 200, calcium: 20, iron: 0.8, vitaminC: 15, vitaminD: 0 } },
    { id: "18", name: "Rice Bowl", calories: 300, servingSize: "1 bowl", brand: "Asian Express", category: "full dish", favorite: true, macros: { carbs: 45, protein: 12, fat: 5, fiber: 2, sugar: 2 }, nutrients: { sodium: 150, calcium: 25, iron: 1.2, vitaminC: 10, vitaminD: 0 } },
    { id: "19", name: "Pad Thai", calories: 600, servingSize: "1 bowl", brand: "Thai Express", category: "full dish", favorite: false, macros: { carbs: 55, protein: 25, fat: 30, fiber: 4, sugar: 15 }, nutrients: { sodium: 1200, calcium: 40, iron: 3.5, vitaminC: 30, vitaminD: 0.1 } },
    { id: "20", name: "Pasta Carbonara", calories: 700, servingSize: "1 plate", brand: "Italian Delight", category: "full dish", favorite: true, macros: { carbs: 75, protein: 20, fat: 35, fiber: 3, sugar: 4 }, nutrients: { sodium: 1100, calcium: 35, iron: 2.8, vitaminC: 15, vitaminD: 0.2 } },
    { id: "21", name: "Pasta Alfredo", calories: 650, servingSize: "1 plate", brand: "Italian Express", category: "full dish", favorite: false, macros: { carbs: 60, protein: 22, fat: 30, fiber: 2, sugar: 3 }, nutrients: { sodium: 1000, calcium: 30, iron: 2.5, vitaminC: 12, vitaminD: 0.1 } },
    { id: "22", name: "Chicken Alfredo", calories: 800, servingSize: "1 plate", brand: "Italian Express", category: "full dish", favorite: true, macros: { carbs: 60, protein: 35, fat: 40, fiber: 2, sugar: 3 }, nutrients: { sodium: 1200, calcium: 40, iron: 3.5, vitaminC: 15, vitaminD: 0.2 } },
    { id: "23", name: "Chicken Caesar", calories: 750, servingSize: "1 plate", brand: "Italian Express", category: "full dish", favorite: false, macros: { carbs: 60, protein: 35, fat: 40, fiber: 2, sugar: 3 }, nutrients: { sodium: 1200, calcium: 40, iron: 3.5, vitaminC: 15, vitaminD: 0.2 } },
    { id: "24", name: "Chicken Parmesan", calories: 850, servingSize: "1 plate", brand: "Italian Express", category: "full dish", favorite: true, macros: { carbs: 60, protein: 35, fat: 40, fiber: 2, sugar: 3 }, nutrients: { sodium: 1200, calcium: 40, iron: 3.5, vitaminC: 15, vitaminD: 0.2 } },
    { id: "25", name: "Chicken Tikka Masala", calories: 700, servingSize: "1 plate", brand: "Indian Express", category: "full dish", favorite: false, macros: { carbs: 60, protein: 35, fat: 40, fiber: 2, sugar: 3 }, nutrients: { sodium: 1200, calcium: 40, iron: 3.5, vitaminC: 15, vitaminD: 0.2 } },
    { id: "26", name: "Roasted Chicken", calories: 800, servingSize: "1 whole", brand: "Roasted Chicken", category: "full dish", favorite: true, macros: { carbs: 60, protein: 35, fat: 40, fiber: 2, sugar: 3 }, nutrients: { sodium: 1200, calcium: 40, iron: 3.5, vitaminC: 15, vitaminD: 0.2 } },
    { id: "27", name: "Fish and Chips", calories: 750, servingSize: "1 portion", brand: "Fish and Chips", category: "full dish", favorite: false, macros: { carbs: 60, protein: 35, fat: 40, fiber: 2, sugar: 3 }, nutrients: { sodium: 1200, calcium: 40, iron: 3.5, vitaminC: 15, vitaminD: 0.2 } },
    { id: "28", name: "Greek Yogurt", calories: 100, servingSize: "1 cup", brand: "Chobani", category: "dairy", favorite: false, macros: { carbs: 7, protein: 17, fat: 0.7, fiber: 0, sugar: 6 }, nutrients: { sodium: 50, calcium: 200, iron: 0.1, vitaminC: 0, vitaminD: 0 } },
    { id: "29", name: "Avocado", calories: 240, servingSize: "1 medium", brand: "Hass", category: "fruits", favorite: true, macros: { carbs: 12, protein: 3, fat: 22, fiber: 10, sugar: 1 }, nutrients: { sodium: 10, calcium: 18, iron: 0.8, vitaminC: 12, vitaminD: 0 } },
    { id: "30", name: "Whole Milk", calories: 150, servingSize: "1 cup", brand: "Organic Valley", category: "dairy", favorite: false, macros: { carbs: 12, protein: 8, fat: 8, fiber: 0, sugar: 12 }, nutrients: { sodium: 120, calcium: 276, iron: 0, vitaminC: 0, vitaminD: 2.4 } },
    { id: "31", name: "Peanut Butter", calories: 190, servingSize: "2 tbsp", brand: "Skippy", category: "nuts", favorite: true, macros: { carbs: 7, protein: 8, fat: 16, fiber: 2, sugar: 3 }, nutrients: { sodium: 150, calcium: 17, iron: 0.6, vitaminC: 0, vitaminD: 0 } },
    { id: "32", name: "Brown Rice", calories: 216, servingSize: "1 cup cooked", brand: "Uncle Ben's", category: "grains", favorite: false, macros: { carbs: 45, protein: 5, fat: 1.8, fiber: 3.5, sugar: 0.7 }, nutrients: { sodium: 10, calcium: 20, iron: 0.8, vitaminC: 0, vitaminD: 0 } },
    { id: "33", name: "Quinoa", calories: 222, servingSize: "1 cup cooked", brand: "Ancient Harvest", category: "grains", favorite: true, macros: { carbs: 39, protein: 8, fat: 3.6, fiber: 5, sugar: 1.6 }, nutrients: { sodium: 13, calcium: 31, iron: 2.8, vitaminC: 0, vitaminD: 0 } },
    { id: "34", name: "Almonds", calories: 160, servingSize: "1 oz", brand: "Blue Diamond", category: "nuts", favorite: true, macros: { carbs: 6, protein: 6, fat: 14, fiber: 3.5, sugar: 1 }, nutrients: { sodium: 0, calcium: 75, iron: 1.1, vitaminC: 0, vitaminD: 0 } },
    { id: "35", name: "Blueberries", calories: 85, servingSize: "1 cup", brand: "Driscoll's", category: "fruits", favorite: true, macros: { carbs: 21, protein: 1, fat: 0.5, fiber: 3.6, sugar: 15 }, nutrients: { sodium: 1, calcium: 9, iron: 0.4, vitaminC: 14, vitaminD: 0 } },
    { id: "36", name: "Eggs", calories: 78, servingSize: "1 large", brand: "Eggland's Best", category: "protein", favorite: false, macros: { carbs: 0.6, protein: 6, fat: 5, fiber: 0, sugar: 0.6 }, nutrients: { sodium: 62, calcium: 25, iron: 0.6, vitaminC: 0, vitaminD: 1.1 } },
    { id: "37", name: "Chicken Breast", calories: 165, servingSize: "100g", brand: "Kirkland", category: "protein", favorite: true, macros: { carbs: 0, protein: 31, fat: 3.6, fiber: 0, sugar: 0 }, nutrients: { sodium: 74, calcium: 15, iron: 0.9, vitaminC: 0, vitaminD: 0 } },
    { id: "38", name: "Broccoli", calories: 55, servingSize: "1 cup cooked", brand: "Green Giant", category: "vegetables", favorite: false, macros: { carbs: 11, protein: 4, fat: 0.5, fiber: 5, sugar: 2 }, nutrients: { sodium: 40, calcium: 62, iron: 1.1, vitaminC: 81, vitaminD: 0 } },
    { id: "39", name: "Tofu", calories: 144, servingSize: "100g", brand: "Nasoya", category: "protein", favorite: true, macros: { carbs: 3.9, protein: 15, fat: 8, fiber: 1, sugar: 0.5 }, nutrients: { sodium: 13, calcium: 350, iron: 2.7, vitaminC: 0, vitaminD: 0 } },
    { id: "40", name: "Spinach", calories: 41, servingSize: "1 cup cooked", brand: "Fresh Express", category: "vegetables", favorite: false, macros: { carbs: 6.7, protein: 5.4, fat: 0.5, fiber: 4.3, sugar: 0.8 }, nutrients: { sodium: 126, calcium: 245, iron: 6.4, vitaminC: 17, vitaminD: 0 } },
    { id: "41", name: "Salmon", calories: 208, servingSize: "100g", brand: "Wild Planet", category: "protein", favorite: true, macros: { carbs: 0, protein: 20, fat: 13, fiber: 0, sugar: 0 }, nutrients: { sodium: 59, calcium: 9, iron: 0.3, vitaminC: 0, vitaminD: 10.9 } },
    { id: "42", name: "Apple", calories: 95, servingSize: "1 medium", brand: "Gala", category: "fruits", favorite: true, macros: { carbs: 25, protein: 0.5, fat: 0.3, fiber: 4.4, sugar: 19 }, nutrients: { sodium: 2, calcium: 11, iron: 0.2, vitaminC: 8.4, vitaminD: 0 } },
    { id: "43", name: "Carrot", calories: 41, servingSize: "1 medium", brand: "Bolthouse", category: "vegetables", favorite: false, macros: { carbs: 10, protein: 1, fat: 0.2, fiber: 2.8, sugar: 4.7 }, nutrients: { sodium: 69, calcium: 30, iron: 0.3, vitaminC: 7.6, vitaminD: 0 } },
    { id: "44", name: "Oats", calories: 150, servingSize: "1/2 cup", brand: "Quaker", category: "grains", favorite: true, macros: { carbs: 27, protein: 5, fat: 3, fiber: 4, sugar: 1 }, nutrients: { sodium: 0, calcium: 20, iron: 1.5, vitaminC: 0, vitaminD: 0 } },
    { id: "45", name: "Cottage Cheese", calories: 206, servingSize: "1 cup", brand: "Daisy", category: "dairy", favorite: false, macros: { carbs: 8, protein: 28, fat: 9, fiber: 0, sugar: 6 }, nutrients: { sodium: 746, calcium: 187, iron: 0.3, vitaminC: 0, vitaminD: 0.1 } },
    { id: "46", name: "Sweet Potato", calories: 112, servingSize: "1 medium", brand: "Organic", category: "vegetables", favorite: true, macros: { carbs: 26, protein: 2, fat: 0.1, fiber: 4, sugar: 5 }, nutrients: { sodium: 72, calcium: 39, iron: 1.2, vitaminC: 3.1, vitaminD: 0 } },
    { id: "47", name: "Beef", calories: 250, servingSize: "100g", brand: "Grass-fed", category: "protein", favorite: false, macros: { carbs: 0, protein: 26, fat: 17, fiber: 0, sugar: 0 }, nutrients: { sodium: 72, calcium: 18, iron: 2.6, vitaminC: 0, vitaminD: 0.2 } },

  ];
