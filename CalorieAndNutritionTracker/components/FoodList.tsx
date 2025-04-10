import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FoodItemComponent from "./FoodItem";
import { FoodItem } from "../app/data/foodData";
import { dailyData } from "../app/data/dailyData";

interface FoodListProps {
  filteredItems: FoodItem[];
  toggleFavorite: (id: string) => void;
}

const FoodList = ({ filteredItems, toggleFavorite }: FoodListProps) => {
  // Function to add a meal to today's log
  const addMealToToday = (id: string, servingMultiplier: number) => {
    // Find the selected food item
    const foodItem = filteredItems.find(item => item.id === id);
    
    if (foodItem) {
      // In a real app, you would update your state or make an API call
      // For now, we'll just show an alert to demonstrate
      Alert.alert(
        "Meal Added",
        `Added ${foodItem.name} (${servingMultiplier}x serving) to today's log.\nTotal calories: ${Math.round(foodItem.calories * servingMultiplier)}`,
        [{ text: "OK" }]
      );
      
      // Here you would update your dailyData or make an API call
      // Example of what you might do in a real implementation:
      /* 
      const newMeal = {
        id: `meal-${Date.now()}`,
        name: foodItem.name,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        calories: Math.round(foodItem.calories * servingMultiplier),
        carbs: Math.round(estimatedCarbs),
        protein: Math.round(estimatedProtein),
        fat: Math.round(estimatedFat),
        foodItems: [foodItem.id]
      };
      
      // Update your state or make API call
      addMealToDaily(newMeal);
      */
    }
  };

  return (
    <>
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => (
            <FoodItemComponent 
              item={item} 
              toggleFavorite={toggleFavorite}
              addMealToToday={addMealToToday} 
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="nutrition-outline" size={50} color="#ddd" />
          <Text style={styles.emptyStateText}>No food items found</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 80, 
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 16,
    color: "#999",
  },
});

export default FoodList;