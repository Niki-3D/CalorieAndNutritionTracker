// app/data/dailyData.ts

export interface NutritionItem {
    name: string;
    current: number;
    goal: number;
    unit: string;
    color: string;
  }
  
  export interface MealEntry {
    id: string;
    name: string;
    time: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    foodItems: string[];
  }
  
  export interface DailyData {
    date: string; // ISO format date
    caloriesConsumed: number;
    caloriesGoal: number;
    streak: number; // How many days in a row they've hit their goal
    macros: {
      carbs: NutritionItem;
      protein: NutritionItem;
      fat: NutritionItem;
    };
    nutrients: NutritionItem[]; // Essential nutrients like vitamins, minerals, etc.
    meals: MealEntry[];
  }
  
  // Sample daily data
  export const dailyData: DailyData = {
    date: new Date().toISOString().split('T')[0],
    caloriesConsumed: 1450,
    caloriesGoal: 2000,
    streak: 5, // 5 days in a row hitting the target
    macros: {
      carbs: {
        name: "Carbohydrates",
        current: 115,
        goal: 250,
        unit: "g",
        color: "#3DD598"
      },
      protein: {
        name: "Protein",
        current: 65,
        goal: 120,
        unit: "g",
        color: "#FFB572"
      },
      fat: {
        name: "Fat",
        current: 35,
        goal: 65,
        unit: "g",
        color: "#9059FF"
      }
    },
    nutrients: [
      {
        name: "Fiber",
        current: 12,
        goal: 25,
        unit: "g",
        color: "#4CD964"
      },
      {
        name: "Sugar",
        current: 28,
        goal: 50,
        unit: "g",
        color: "#FF2D55"
      },
      {
        name: "Sodium",
        current: 1200,
        goal: 2300,
        unit: "mg",
        color: "#5AC8FA"
      },
      {
        name: "Calcium",
        current: 500,
        goal: 1000,
        unit: "mg",
        color: "#007AFF"
      },
      {
        name: "Iron",
        current: 8,
        goal: 18,
        unit: "mg",
        color: "#FF9500"
      },
      {
        name: "Vitamin C",
        current: 35,
        goal: 90,
        unit: "mg",
        color: "#00C7BE"
      },
      {
        name: "Vitamin D",
        current: 5,
        goal: 15,
        unit: "mcg",
        color: "#AF52DE"
      }
    ],
    meals: [
      {
        id: "breakfast-1",
        name: "Breakfast",
        time: "8:30 AM",
        calories: 450,
        carbs: 60,
        protein: 20,
        fat: 15,
        foodItems: ["2", "4"] // IDs reference foodItems from foodData.ts
      },
      {
        id: "lunch-1",
        name: "Lunch",
        time: "12:45 PM",
        calories: 550,
        carbs: 45,
        protein: 35,
        fat: 12,
        foodItems: ["7", "5", "6"]
      },
      {
        id: "snack-1",
        name: "Afternoon Snack",
        time: "3:30 PM",
        calories: 150,
        carbs: 10,
        protein: 5,
        fat: 8,
        foodItems: ["1"]
      },
      {
        id: "dinner-1",
        name: "Dinner",
        time: "7:00 PM",
        calories: 300,
        carbs: 0,
        protein: 5,
        fat: 0,
        foodItems: ["11"]
      }
    ]
  };