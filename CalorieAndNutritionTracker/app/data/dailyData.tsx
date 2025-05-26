// app/data/dailyData.ts
import { FoodItem } from "./foodData";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    fiber: number;
    sugar: number;
    nutrients: {
      sodium: number;
      calcium: number;
      iron: number;
      vitaminC: number;
      vitaminD: number;
    };
    foodItems: FoodItem[];
    timestamp: number; // For sorting meals by time
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
  
  // Sample daily data with empty meals
  export const dailyData: DailyData = {
    date: new Date().toISOString().split('T')[0],
    caloriesConsumed: 0,
    caloriesGoal: 2000,
    streak: 0,
    macros: {
      carbs: {
        name: "Carbohydrates",
        current: 0,
        goal: 250,
        unit: "g",
        color: "#3DD598"
      },
      protein: {
        name: "Protein",
        current: 0,
        goal: 120,
        unit: "g",
        color: "#FFB572"
      },
      fat: {
        name: "Fat",
        current: 0,
        goal: 65,
        unit: "g",
        color: "#9059FF"
      }
    },
    nutrients: [
      {
        name: "Fiber",
        current: 0,
        goal: 25,
        unit: "g",
        color: "#4CD964"
      },
      {
        name: "Sugar",
        current: 0,
        goal: 50,
        unit: "g",
        color: "#FF2D55"
      },
      {
        name: "Sodium",
        current: 0,
        goal: 2300,
        unit: "mg",
        color: "#5AC8FA"
      },
      {
        name: "Calcium",
        current: 0,
        goal: 1000,
        unit: "mg",
        color: "#007AFF"
      },
      {
        name: "Iron",
        current: 0,
        goal: 18,
        unit: "mg",
        color: "#FF9500"
      },
      {
        name: "Vitamin C",
        current: 0,
        goal: 90,
        unit: "mg",
        color: "#00C7BE"
      },
      {
        name: "Vitamin D",
        current: 0,
        goal: 15,
        unit: "mcg",
        color: "#AF52DE"
      }
    ],
    meals: []
  };

  // Type for nutrient updates
  interface NutrientUpdates {
    'Fiber': number;
    'Sugar': number;
    'Sodium': number;
    'Calcium': number;
    'Iron': number;
    'Vitamin C': number;
    'Vitamin D': number;
    [key: string]: number;
  }

  // Utility functions for managing daily data
  export const DailyDataManager = {
    async load(): Promise<DailyData> {
      try {
        console.log('Loading daily data...');
        const storedData = await AsyncStorage.getItem('dailyData');
        console.log('Stored data:', storedData);
        
        if (storedData) {
          const parsedData = JSON.parse(storedData) as DailyData;
          const today = new Date().toISOString().split('T')[0];
          console.log('Today:', today);
          console.log('Stored date:', parsedData.date);
          
          if (parsedData.date === today) {
            console.log('Found today\'s data');
            // Ensure all numeric values are properly initialized
            const sanitizedData = {
              ...parsedData,
              caloriesConsumed: Number(parsedData.caloriesConsumed) || 0,
              caloriesGoal: Number(parsedData.caloriesGoal) || 2000,
              streak: Number(parsedData.streak) || 0,
              macros: {
                carbs: {
                  ...parsedData.macros.carbs,
                  current: Number(parsedData.macros.carbs.current) || 0,
                  goal: Number(parsedData.macros.carbs.goal) || 250
                },
                protein: {
                  ...parsedData.macros.protein,
                  current: Number(parsedData.macros.protein.current) || 0,
                  goal: Number(parsedData.macros.protein.goal) || 120
                },
                fat: {
                  ...parsedData.macros.fat,
                  current: Number(parsedData.macros.fat.current) || 0,
                  goal: Number(parsedData.macros.fat.goal) || 65
                }
              },
              nutrients: parsedData.nutrients.map((nutrient: NutritionItem) => ({
                ...nutrient,
                current: Number(nutrient.current) || 0,
                goal: Number(nutrient.goal) || 0
              })),
              meals: parsedData.meals.map((meal: MealEntry) => ({
                ...meal,
                calories: Number(meal.calories) || 0,
                carbs: Number(meal.carbs) || 0,
                protein: Number(meal.protein) || 0,
                fat: Number(meal.fat) || 0,
                fiber: Number(meal.fiber) || 0,
                sugar: Number(meal.sugar) || 0,
                nutrients: {
                  sodium: Number(meal.nutrients.sodium) || 0,
                  calcium: Number(meal.nutrients.calcium) || 0,
                  iron: Number(meal.nutrients.iron) || 0,
                  vitaminC: Number(meal.nutrients.vitaminC) || 0,
                  vitaminD: Number(meal.nutrients.vitaminD) || 0
                }
              }))
            };
            console.log('Returning sanitized data:', JSON.stringify(sanitizedData, null, 2));
            return sanitizedData;
          } else {
            console.log('Data is from a different day');
          }
        } else {
          console.log('No stored data found');
        }
        
        // If no data or not today's data, create new
        console.log('Creating new data');
        const newData = {
          ...dailyData,
          date: new Date().toISOString().split('T')[0],
          meals: []
        };
        await this.save(newData);
        return newData;
      } catch (error) {
        console.error('Error loading daily data:', error);
        return dailyData;
      }
    },

    async save(data: DailyData): Promise<void> {
      try {
        console.log('Saving daily data...');
        // Ensure all numeric values are valid before saving
        const sanitizedData = {
          ...data,
          date: data.date,
          caloriesConsumed: Number(data.caloriesConsumed) || 0,
          caloriesGoal: Number(data.caloriesGoal) || 2000,
          streak: Number(data.streak) || 0,
          macros: {
            carbs: {
              ...data.macros.carbs,
              current: Number(data.macros.carbs.current) || 0,
              goal: Number(data.macros.carbs.goal) || 250
            },
            protein: {
              ...data.macros.protein,
              current: Number(data.macros.protein.current) || 0,
              goal: Number(data.macros.protein.goal) || 120
            },
            fat: {
              ...data.macros.fat,
              current: Number(data.macros.fat.current) || 0,
              goal: Number(data.macros.fat.goal) || 65
            }
          },
          nutrients: data.nutrients.map((nutrient: NutritionItem) => ({
            ...nutrient,
            current: Number(nutrient.current) || 0,
            goal: Number(nutrient.goal) || 0
          })),
          meals: data.meals.map((meal: MealEntry) => ({
            ...meal,
            calories: Number(meal.calories) || 0,
            carbs: Number(meal.carbs) || 0,
            protein: Number(meal.protein) || 0,
            fat: Number(meal.fat) || 0,
            fiber: Number(meal.fiber) || 0,
            sugar: Number(meal.sugar) || 0,
            nutrients: {
              sodium: Number(meal.nutrients.sodium) || 0,
              calcium: Number(meal.nutrients.calcium) || 0,
              iron: Number(meal.nutrients.iron) || 0,
              vitaminC: Number(meal.nutrients.vitaminC) || 0,
              vitaminD: Number(meal.nutrients.vitaminD) || 0
            }
          }))
        };
        console.log('Saving sanitized data:', JSON.stringify(sanitizedData, null, 2));
        await AsyncStorage.setItem('dailyData', JSON.stringify(sanitizedData));
        console.log('Data saved successfully');
      } catch (error) {
        console.error('Error saving daily data:', error);
      }
    },

    async addMeal(meal: MealEntry): Promise<DailyData> {
      try {
        console.log('Adding meal:', JSON.stringify(meal, null, 2));
        const currentData = await this.load();
        
        // Ensure meal values are numbers
        const sanitizedMeal = {
          ...meal,
          calories: Number(meal.calories) || 0,
          carbs: Number(meal.carbs) || 0,
          protein: Number(meal.protein) || 0,
          fat: Number(meal.fat) || 0,
          fiber: Number(meal.fiber) || 0,
          sugar: Number(meal.sugar) || 0,
          nutrients: {
            sodium: Number(meal.nutrients.sodium) || 0,
            calcium: Number(meal.nutrients.calcium) || 0,
            iron: Number(meal.nutrients.iron) || 0,
            vitaminC: Number(meal.nutrients.vitaminC) || 0,
            vitaminD: Number(meal.nutrients.vitaminD) || 0
          }
        };
        
        // Add the meal
        currentData.meals.push(sanitizedMeal);
        
        // Update totals
        currentData.caloriesConsumed = Number(currentData.caloriesConsumed) + sanitizedMeal.calories;
        currentData.macros.carbs.current = Number(currentData.macros.carbs.current) + sanitizedMeal.carbs;
        currentData.macros.protein.current = Number(currentData.macros.protein.current) + sanitizedMeal.protein;
        currentData.macros.fat.current = Number(currentData.macros.fat.current) + sanitizedMeal.fat;
        
        // Update nutrients
        const nutrientUpdates: NutrientUpdates = {
          'Fiber': sanitizedMeal.fiber,
          'Sugar': sanitizedMeal.sugar,
          'Sodium': sanitizedMeal.nutrients.sodium,
          'Calcium': sanitizedMeal.nutrients.calcium,
          'Iron': sanitizedMeal.nutrients.iron,
          'Vitamin C': sanitizedMeal.nutrients.vitaminC,
          'Vitamin D': sanitizedMeal.nutrients.vitaminD
        };

        currentData.nutrients = currentData.nutrients.map((nutrient: NutritionItem) => ({
          ...nutrient,
          current: Number(nutrient.current) + (Number(nutrientUpdates[nutrient.name]) || 0)
        }));

        console.log('Updated data:', JSON.stringify(currentData, null, 2));
        // Save updated data
        await this.save(currentData);
        return currentData;
      } catch (error) {
        console.error('Error adding meal:', error);
        throw error;
      }
    }
  };